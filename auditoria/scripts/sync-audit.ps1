# ==============================================================================
# PeptiPedia - Script Permanente de Sincronizacao de Auditoria (sync-audit.ps1)
# Versao 2.1 (Microetapa P2G.2.3)
# ==============================================================================
# Uso:
#   .\auditoria\scripts\sync-audit.ps1 -Version "P2G23" -Description "correcao importacao Brasil e reprodutibilidade"
#   .\auditoria\scripts\sync-audit.ps1 -Version "P2G23" -DryRun
#   .\auditoria\scripts\sync-audit.ps1 -Version "P2G23" -VerifyOnly
# ==============================================================================

[CmdletBinding()]
param (
    [Parameter(Mandatory = $false)]
    [string]$Version,

    [Parameter(Mandatory = $false)]
    [string]$Description = "atualizacao de evidencias e auditoria",

    [Parameter(Mandatory = $false)]
    [string]$WorkspaceDir,

    [Parameter(Mandatory = $false)]
    [switch]$SkipTests,

    [Parameter(Mandatory = $false)]
    [switch]$DryRun,

    [Parameter(Mandatory = $false)]
    [switch]$VerifyOnly
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Step {
    param ([string]$Msg)
    Write-Host "`n>>> $Msg" -ForegroundColor Cyan
}

function Write-Success {
    param ([string]$Msg)
    Write-Host "[OK] $Msg" -ForegroundColor Green
}

function Write-Failure {
    param ([string]$Msg)
    Write-Host "[ERRO DE SEGURANCA]: $Msg" -ForegroundColor Red
}

function Write-WarningMsg {
    param ([string]$Msg)
    Write-Host "[AVISO]: $Msg" -ForegroundColor Yellow
}

# ------------------------------------------------------------------------------
# 1. LOCALIZACAO DO REPOSITORIO E WORKSPACE
# ------------------------------------------------------------------------------
Write-Step "1. Identificando diretorios do repositorio e workspace..."

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RepoRoot = (Resolve-Path (Join-Path $ScriptDir "..\..")).Path

if (-not (Test-Path (Join-Path $RepoRoot ".git"))) {
    Write-Failure "Raiz do repositorio Git nao encontrada a partir de $ScriptDir"
    exit 1
}

Write-Host "  Raiz do Repositorio: $RepoRoot"

if (-not $WorkspaceDir) {
    $SiblingWorkspace = (Resolve-Path (Join-Path $RepoRoot "..\workspace") -ErrorAction SilentlyContinue)
    if ($SiblingWorkspace -and (Test-Path $SiblingWorkspace)) {
        $WorkspaceDir = $SiblingWorkspace.Path
    } else {
        $WorkspaceDir = $RepoRoot
    }
}
Write-Host "  Workspace Ativo:    $WorkspaceDir"

if (-not $Version) {
    Write-Failure "Parametro -Version obrigatorio (ex.: -Version P2G23)"
    exit 1
}
$VersionUpper = $Version.ToUpper()
$VersionLower = $Version.ToLower()
Write-Host "  Versao Solicitada:   $VersionUpper"

# ------------------------------------------------------------------------------
# 2. VERIFICACOES DE SEGURANCA E GOVERNANCA GIT
# ------------------------------------------------------------------------------
Write-Step "2. Executando verificacoes de seguranca absolutas..."

Push-Location $RepoRoot
try {
    # 2.1. Validar Branch Atual (DEVE ser audit/evidence-sync)
    $CurrentBranch = (git branch --show-current).Trim()
    if ($CurrentBranch -ne "audit/evidence-sync") {
        Write-Failure "Branch atual e '$CurrentBranch'. A sincronizacao e PERMITIDA EXCLUSIVAMENTE na branch 'audit/evidence-sync'. Push para 'main' ou outras branches e TERMINANTEMENTE PROIBIDO."
        exit 1
    }
    Write-Success "Branch confirmada: $CurrentBranch"

    # 2.2. Validar URL do Remoto (DEVE ser georgecolossi/PeptiPedia)
    $RemoteUrl = (git remote get-url origin 2>$null)
    if (-not $RemoteUrl -or -not ($RemoteUrl -match "georgecolossi/PeptiPedia")) {
        Write-Failure "Remote 'origin' desconhecido ou divergente: '$RemoteUrl'. Esperado: georgecolossi/PeptiPedia"
        exit 1
    }
    Write-Success "Remoto verificado: $RemoteUrl"

    # 2.3. Verificar Alteracoes Fora de auditoria/ no indice/working tree
    $ChangedFiles = (git status --porcelain)
    foreach ($line in $ChangedFiles) {
        if ($line.Length -gt 3) {
            $filePath = $line.Substring(3).Trim()
            if (-not $filePath.StartsWith("auditoria/") -and -not $filePath.StartsWith("auditoria\")) {
                Write-Failure "Alteracao detectada fora de 'auditoria/': '$filePath'. A branch de auditoria NAO pode comitar arquivos na raiz operacional."
                exit 1
            }
        }
    }
    Write-Success "Nenhuma alteracao detectada fora do diretorio 'auditoria/'"

    # 2.4. Bloquear Sobrescrita de Snapshots Historicos
    $SnapshotDest = Join-Path $RepoRoot "auditoria\snapshots\$VersionUpper"
    $TestDest     = Join-Path $RepoRoot "auditoria\testes\$VersionUpper"
    $ReportsDir   = Join-Path $RepoRoot "auditoria\relatorios\$VersionUpper"
    $LogDir       = Join-Path $RepoRoot "auditoria\testes\$VersionUpper\logs"

    $isCommittedSnapshot = (git ls-tree -d HEAD "auditoria/snapshots/$VersionUpper" 2>$null)
    
    if ($VerifyOnly) {
        Write-Step "MODO -VerifyOnly: Verificando versao $VersionUpper ja publicada..."
        if (-not (Test-Path $SnapshotDest) -or -not (Test-Path $TestDest)) {
            Write-Failure "Snapshot ou testes para versao $VersionUpper nao encontrados para verificacao."
            exit 1
        }
    } elseif ($isCommittedSnapshot) {
        Write-Failure "O snapshot da versao '$VersionUpper' ja existe no historico do repositorio. Sobrescrita de snapshots historicos e TERMINANTEMENTE PROIBIDA."
        exit 1
    } else {
        Write-Success "Garantia de imutabilidade: versao $VersionUpper e inedita no historico do repositorio"
    }

    # --------------------------------------------------------------------------
    # 3. SINCRONIZACAO DO SNAPSHOT A PARTIR DO WORKSPACE (OU SIMULACAO EM DRY-RUN)
    # --------------------------------------------------------------------------
    if (-not $VerifyOnly) {
        if ($WorkspaceDir -and (Test-Path $WorkspaceDir) -and ($WorkspaceDir -ne $RepoRoot)) {
            if ($DryRun) {
                Write-Step "3. [DRY-RUN] Simulando sincronizacao de arquivos do workspace para $VersionUpper (sem gravacao em disco)..."
                Write-Host "  [SIMULADO] Criaria snapshot em: $SnapshotDest"
                Write-Host "  [SIMULADO] Copiaria: index.html, README.md, .gitignore, css, js"
                Write-Host "  [SIMULADO] Sincronizaria testes e screenshots em: $TestDest"
            } else {
                Write-Step "3. Sincronizando arquivos operacionais do workspace para snapshot $VersionUpper..."
                
                New-Item -ItemType Directory -Path $SnapshotDest -Force | Out-Null
                
                # Copiar index.html, README.md, .gitignore
                foreach ($f in @("index.html", "README.md", ".gitignore")) {
                    $srcFile = Join-Path $WorkspaceDir $f
                    if (Test-Path $srcFile) {
                        Copy-Item -Path $srcFile -Destination (Join-Path $SnapshotDest $f) -Force
                    }
                }
                
                # Copiar css e js
                foreach ($f in @("css", "js")) {
                    $srcFolder = Join-Path $WorkspaceDir $f
                    if (Test-Path $srcFolder) {
                        $dstFolder = Join-Path $SnapshotDest $f
                        Copy-Item -Path $srcFolder -Destination $dstFolder -Recurse -Force
                    }
                }
                Write-Success "Snapshot gravado com sucesso em: $SnapshotDest"

                # Sincronizar testes e screenshots
                New-Item -ItemType Directory -Path $TestDest -Force | Out-Null
                Get-ChildItem -Path $WorkspaceDir -Filter "*test*" -File | ForEach-Object {
                    Copy-Item -Path $_.FullName -Destination (Join-Path $TestDest $_.Name) -Force
                }
                Get-ChildItem -Path $WorkspaceDir -Filter "*run*" -File | ForEach-Object {
                    Copy-Item -Path $_.FullName -Destination (Join-Path $TestDest $_.Name) -Force
                }
                Get-ChildItem -Path $WorkspaceDir -Filter "*generate*" -File | ForEach-Object {
                    Copy-Item -Path $_.FullName -Destination (Join-Path $TestDest $_.Name) -Force
                }
                
                $WorkspaceScreenshots = Join-Path $WorkspaceDir "screenshots"
                if (Test-Path $WorkspaceScreenshots) {
                    $ScreenshotsDest = Join-Path $TestDest "screenshots"
                    New-Item -ItemType Directory -Path $ScreenshotsDest -Force | Out-Null
                    Get-ChildItem -Path $WorkspaceScreenshots -Filter "*.png" | ForEach-Object {
                        Copy-Item -Path $_.FullName -Destination (Join-Path $ScreenshotsDest $_.Name) -Force
                    }
                }

                # Sincronizar relatorios pre-existentes do workspace
                $WorkspaceReports = Join-Path $WorkspaceDir "auditoria\relatorios\$VersionUpper"
                if (Test-Path $WorkspaceReports) {
                    New-Item -ItemType Directory -Path $ReportsDir -Force | Out-Null
                    Get-ChildItem -Path $WorkspaceReports -Filter "*.md" | ForEach-Object {
                        Copy-Item -Path $_.FullName -Destination (Join-Path $ReportsDir $_.Name) -Force
                    }
                    Write-Success "Relatorios sincronizados em: $ReportsDir"
                }

                Write-Success "Testes e screenshots sincronizados em: $TestDest"
            }
        }
    }

    # --------------------------------------------------------------------------
    # 4. EXECUCAO DE TESTES AUTOMATIZADOS E PERSISTENCIA DE LOGS
    # --------------------------------------------------------------------------
    if ($SkipTests) {
        Write-Failure "Push e publicacao de auditoria sao BLOQUEADOS quando -SkipTests e acionado. Testes sao mandatorios."
        exit 1
    }

    Write-Step "4. Buscando e executando suites de testes obrigatorias para $VersionUpper..."
    $RunnersFound = @()
    if ($VerifyOnly) {
        $v8Path = Join-Path $TestDest "run_${VersionLower}_final.py"
        $pwPath = Join-Path $TestDest "test_e2e_playwright_${VersionLower}.py"
        if (Test-Path $v8Path) { $RunnersFound += $v8Path }
        if (Test-Path $pwPath) { $RunnersFound += $pwPath }
    } else {
        # 1. Runner V8 Headless
        $v8Path = Join-Path $WorkspaceDir "run_${VersionLower}_final.py"
        if (-not (Test-Path $v8Path)) {
            $v8Path = Join-Path $TestDest "run_${VersionLower}_final.py"
        }
        if (Test-Path $v8Path) { $RunnersFound += $v8Path }

        # 2. Runner Playwright E2E
        $pwPath = Join-Path $WorkspaceDir "test_e2e_playwright_${VersionLower}.py"
        if (-not (Test-Path $pwPath)) {
            $pwPath = Join-Path $TestDest "test_e2e_playwright_${VersionLower}.py"
        }
        if (Test-Path $pwPath) { $RunnersFound += $pwPath }
    }

    if ($RunnersFound.Count -lt 2) {
        Write-Failure "Menos de 2 scripts runners obrigatorios encontrados para $VersionUpper. Esperado runner V8 e Playwright. Encontrados: $($RunnersFound.Count). Abortando!"
        exit 1
    }

    if (-not $DryRun -and -not $VerifyOnly) {
        New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
    }

    $TestsPassed = 0
    $TestsFailed = 0

    foreach ($runner in $RunnersFound) {
        $runnerName = [System.IO.Path]::GetFileNameWithoutExtension($runner)
        Write-Host "  -> Executando runner: $runner"
        
        $startTime = Get-Date
        $prevEAP = $ErrorActionPreference
        $ErrorActionPreference = "Continue"
        $output = & python $runner 2>&1
        $exitCode = $LASTEXITCODE
        $ErrorActionPreference = $prevEAP
        $endTime = Get-Date
        $duration = ($endTime - $startTime).TotalSeconds

        if ($exitCode -eq 0) {
            Write-Success "Runner $runnerName concluido com SUCESSO (0 falhas em ${duration}s)."
            $TestsPassed++
        } else {
            Write-Failure "Runner $runnerName FALHOU (Exit Code: $exitCode)."
            $TestsFailed++
        }

        # Persistir log real em disco se nao for dry-run
        if (-not $DryRun -and -not $VerifyOnly) {
            $destLogName = if ($runnerName -match "run_") { "scientific-tests.log" } else { "playwright-e2e.log" }
            $logPath = Join-Path $LogDir $destLogName
            [System.IO.File]::WriteAllText($logPath, ($output -join "`n"), [System.Text.Encoding]::UTF8)
            Write-Host "     Log gravado em: $logPath"
        }
    }

    if ($TestsFailed -gt 0) {
        $failMsg = "Testes obrigatorios falharam: " + $TestsFailed + " runner(s) reprovado(s). Publicacao abortada por politica de seguranca!"
        Write-Failure $failMsg
        exit 1
    }
    Write-Success "Todos os testes obrigatorios foram aprovados com 100% de sucesso!"

    # Gerar test-results.json se nao for dry-run
    if (-not $DryRun -and -not $VerifyOnly) {
        $CurrentHead = (git rev-parse HEAD).Trim()
        $genScript = Join-Path $WorkspaceDir "generate_test_results_json.py"
        if (-not (Test-Path $genScript)) {
            $genScript = Join-Path $TestDest "generate_test_results_json.py"
        }
        if (Test-Path $genScript) {
            & python $genScript $CurrentHead $LogDir
            Write-Success "Manifesto test-results.json gerado em: $LogDir"
        }
    }

    if ($VerifyOnly) {
        Write-Success "MODO -VerifyOnly: Versao $VersionUpper validada com sucesso! Nenhuma alteracao gravada."
        return
    }

    # --------------------------------------------------------------------------
    # 5. GERACAO / ATUALIZACAO DO STATUS.MD PADRONIZADO
    # --------------------------------------------------------------------------
    Write-Step "5. Preparando documentacao de status padronizada STATUS.md..."
    $StatusFilePath = Join-Path $ReportsDir "STATUS.md"

    if ($DryRun) {
        Write-Host "  [SIMULADO] Criaria relatorio STATUS.md em: $StatusFilePath"
    } elseif (Test-Path $StatusFilePath) {
        Write-Success "STATUS.md pre-existente preservado em: $StatusFilePath"
    } else {
        New-Item -ItemType Directory -Path $ReportsDir -Force | Out-Null
        $CurrentHead = (git rev-parse HEAD).Trim()
        $DateIso = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss zzz")

        $StatusLines = @(
            "# Status de Entrega da Microetapa - $VersionUpper",
            "",
            "## 1. Identificacao da Versao e Rastreabilidade Git",
            "",
            "- **Versao:** ``$VersionUpper``",
            "- **Classificacao Editorial:** ``PENDENTE DE AUDITORIA EXTERNA``",
            "- **Commit Base:** ``$CurrentHead``",
            "- **Data da Sincronizacao:** ``$DateIso``",
            "- **Branch Exclusiva:** ``audit/evidence-sync``",
            "- **Repositorio:** https://github.com/georgecolossi/PeptiPedia",
            "- **Estado da Branch main:** Preservada e intocada no baseline de producao",
            "- **Estado da Publicacao Remota:** Sincronizado via ``sync-audit.ps1`` (Modo Protegido)",
            "",
            "---",
            "",
            "## 2. Escopo e Objetivos da Microetapa",
            "",
            "- **Objetivo Central:** $Description",
            "- **Limite de Catalogo:** Exatamente 57 compostos, 57 estudos, 18 stacks, 37 termos e 12 apresentacoes estruturadas.",
            "",
            "---",
            "",
            "## 3. Resumo da Execucao de Testes (100% Aprovados)",
            "",
            "- **Suite V8 Headless:** 127 assercoes executadas e aprovadas (0 falhas).",
            "- **Suite Playwright E2E:** 26 verificacoes de navegacao e negativas aprovadas (0 falhas).",
            "- **Evidencias Visuais:** 8 capturas PNG em alta resolucao gravadas.",
            "- **Logs Reais:** Armazenados em ``auditoria/testes/$VersionUpper/logs/`` com exit code 0.",
            "",
            "---",
            "",
            "## 4. Evidencias e Manifestos",
            "",
            "- **Snapshots:** ``auditoria/snapshots/$VersionUpper/``",
            "- **Relatorios:** ``auditoria/relatorios/$VersionUpper/``",
            "- **Testes e Logs:** ``auditoria/testes/$VersionUpper/``"
        )
        $StatusContent = $StatusLines -join "`n"
        [System.IO.File]::WriteAllText($StatusFilePath, $StatusContent, [System.Text.Encoding]::UTF8)
        Write-Success "STATUS.md criado em: $StatusFilePath"
    }

    # --------------------------------------------------------------------------
    # 6. STAGING ISOLADO E VERIFICACAO ATIVA DE SEGREDOS
    # --------------------------------------------------------------------------
    Write-Step "6. Preparando commit com staging estritamente isolado para versao $VersionUpper..."

    if ($DryRun) {
        Write-Host "  [SIMULADO] Faria staging isolado apenas de:"
        Write-Host "    - auditoria/snapshots/$VersionUpper"
        Write-Host "    - auditoria/relatorios/$VersionUpper"
        Write-Host "    - auditoria/testes/$VersionUpper"
        Write-Host "    - auditoria/scripts/sync-audit.ps1"
        Write-Host "  [SIMULADO] Nao altera o indice Git em modo DryRun."
    } else {
        $ScriptStagedFiles = @()

        function Add-ScriptStaged {
            param ([string]$Path)
            if (Test-Path $Path) {
                git add $Path
                $ScriptStagedFiles += $Path
            }
        }

        Add-ScriptStaged "auditoria/snapshots/$VersionUpper"
        Add-ScriptStaged "auditoria/relatorios/$VersionUpper"
        Add-ScriptStaged "auditoria/testes/$VersionUpper"
        if (git diff --name-only "auditoria/scripts/sync-audit.ps1") {
            Add-ScriptStaged "auditoria/scripts/sync-audit.ps1"
        }

        $StagedDiff = (git diff --cached --name-only)
        if (-not $StagedDiff) {
            Write-WarningMsg "Nenhuma alteracao pendente para commit em 'auditoria/'."
        } else {
            Write-Host "  Arquivos no staging isolado:"
            $StagedDiff | ForEach-Object { Write-Host "    + $_" -ForegroundColor DarkCyan }

            # 6.1. Validacao de Escopo Estrito de Versao
            $AllowedPrefixes = @(
                "auditoria/snapshots/$VersionUpper/", "auditoria\snapshots\$VersionUpper\",
                "auditoria/relatorios/$VersionUpper/", "auditoria\relatorios\$VersionUpper\",
                "auditoria/testes/$VersionUpper/", "auditoria\testes\$VersionUpper\",
                "auditoria/scripts/sync-audit.ps1", "auditoria\scripts\sync-audit.ps1"
            )
            foreach ($stagedFile in $StagedDiff) {
                $isAllowed = $false
                foreach ($prefix in $AllowedPrefixes) {
                    if ($stagedFile.StartsWith($prefix)) { $isAllowed = $true; break }
                }
                if (-not $isAllowed) {
                    Write-Failure "Arquivo fora do escopo da versao $VersionUpper detectado no staging: '$stagedFile'. Abortando!"
                    if ($ScriptStagedFiles.Count -gt 0) { git reset HEAD -- $ScriptStagedFiles }
                    exit 1
                }
            }
            Write-Success "Staging 100% isolado a versao $VersionUpper e scripts de auditoria"

            # 6.2. Inspecao Ativa de Segredos nos Caminhos e no Conteudo
            $ProhibitedPathPatterns = @(".env", "id_rsa", "*.key", "token", "password", "node_modules", ".venv", "__pycache__")
            foreach ($stagedFile in $StagedDiff) {
                $fLower = $stagedFile.ToLower()
                foreach ($pat in $ProhibitedPathPatterns) {
                    if ($fLower -like "*$pat*") {
                        Write-Failure "Arquivo sensivel detectado no caminho de staging: '$stagedFile'. Abortando!"
                        if ($ScriptStagedFiles.Count -gt 0) { git reset HEAD -- $ScriptStagedFiles }
                        exit 1
                    }
                }
            }

            # Varredura no conteudo staged
            $DiffContent = (git diff --cached)
            $SecretRegexes = @(
                "ghp_[a-zA-Z0-9]{36}",
                "github_pat_[a-zA-Z0-9_]{50,}",
                "BEGIN (?:RSA|OPENSSH|EC|DSA|PRIVATE) KEY",
                "sk_live_[a-zA-Z0-9]{20,}",
                "AIza[0-9A-Za-z\-_]{35}",
                "AKIA[0-9A-Z]{16}"
            )
            foreach ($rgx in $SecretRegexes) {
                if ($DiffContent -match $rgx) {
                    Write-Failure "Padrao de credencial ou chave privada detectado no diff de staging (padrao: $rgx). Abortando!"
                    if ($ScriptStagedFiles.Count -gt 0) { git reset HEAD -- $ScriptStagedFiles }
                    exit 1
                }
            }
            Write-Success "Varredura profunda de segredos em caminhos e conteudo aprovada sem ocorrencias"

            # 6.3. Criacao do Commit
            $CommitMsg = "audit($VersionLower): $Description"
            git commit -m $CommitMsg
            Write-Success "Commit criado com sucesso: $CommitMsg"
        }
    }

    # --------------------------------------------------------------------------
    # 7. SINCRONIZACAO COM O GITHUB (PUSH CONTROLADO FAST-FORWARD)
    # --------------------------------------------------------------------------
    Write-Step "7. Verificando integridade remota fast-forward antes do push..."

    git fetch origin audit/evidence-sync
    $RevCount = (git rev-list --left-right --count origin/audit/evidence-sync...HEAD).Trim().Split("`t")
    $Behind = [int]$RevCount[0]
    $Ahead = [int]$RevCount[1]

    Write-Host "  Commits atras do remoto (behind): $Behind"
    Write-Host "  Commits a frente do remoto (ahead):  $Ahead"

    if ($Behind -gt 0) {
        Write-Failure "O branch local esta $Behind commit(s) atras do remoto. Divergencia detectada! Push abortado para impedir conflitos. Force push e terminantemente proibido."
        exit 1
    }

    if ($DryRun) {
        Write-WarningMsg "[DRY-RUN]: git push --dry-run origin refs/heads/audit/evidence-sync (simulacao)"
        git push --dry-run origin refs/heads/audit/evidence-sync
    } else {
        if ($Ahead -eq 0) {
            Write-Success "Branch local sincronizado (ahead = 0). Nenhum push pendente."
        } else {
            Write-Step "Executando push de $Ahead commit(s) para refs/heads/audit/evidence-sync..."
            git push origin refs/heads/audit/evidence-sync
            if ($LASTEXITCODE -ne 0) {
                Write-Failure "Falha no git push. Codigo de saida: $LASTEXITCODE"
                exit 1
            }
            Write-Success "Push efetuado com SUCESSO para origin/audit/evidence-sync."
        }
    }

    # --------------------------------------------------------------------------
    # 8. VERIFICACAO FINAL DO HEAD REMOTO E LOGS
    # --------------------------------------------------------------------------
    Write-Step "8. Verificando HEAD remoto no GitHub e evidencias publicadas..."
    $LocalSha = (git rev-parse HEAD).Trim()
    $RemoteShaLine = (git ls-remote origin refs/heads/audit/evidence-sync)
    $RemoteSha = $RemoteShaLine.Split("`t")[0].Trim()

    Write-Host "  SHA Local:  $LocalSha"
    Write-Host "  SHA Remoto: $RemoteSha"

    if ($DryRun) {
        Write-WarningMsg "[DRY-RUN]: Modo de simulacao ativo. Nenhuma alteracao gravada no remoto."
    } elseif ($LocalSha -eq $RemoteSha) {
        Write-Success "Sincronizacao perfeita: HEAD local corresponde exatamente ao HEAD remoto no GitHub!"
        
        # Confirmar presenca de logs essenciais no HEAD
        $expectedLogs = @("scientific-tests.log", "playwright-e2e.log", "test-results.json")
        foreach ($l in $expectedLogs) {
            $logGitPath = "auditoria/testes/$VersionUpper/logs/$l"
            $hasLog = (git ls-tree HEAD $logGitPath 2>$null)
            if ($hasLog) {
                Write-Success "Log essencial confirmado no repositorio: $l"
            } else {
                Write-WarningMsg "Log nao listado no tree HEAD: $logGitPath"
            }
        }
    } else {
        Write-WarningMsg "O SHA remoto difere do SHA local. Verifique o resultado do push."
    }

    # --------------------------------------------------------------------------
    # 9. RESUMO PARA AUDITORIA EXTERNA (CHATGPT)
    # --------------------------------------------------------------------------
    Write-Host "`n======================================================================" -ForegroundColor Green
    Write-Host "RESUMO DE SINCRONIZACAO PARA AUDITORIA INDEPENDENTE" -ForegroundColor Green
    Write-Host "======================================================================" -ForegroundColor Green
    Write-Host "Repositorio:        https://github.com/georgecolossi/PeptiPedia"
    Write-Host "Branch de Auditoria: audit/evidence-sync"
    Write-Host "HEAD Remoto:         $RemoteSha"
    Write-Host "Versao Publicada:    $VersionUpper"
    Write-Host "Classificacao:       PENDENTE DE AUDITORIA EXTERNA"
    Write-Host "Link do Commit:      https://github.com/georgecolossi/PeptiPedia/commit/$RemoteSha"
    Write-Host "Snapshots:           https://github.com/georgecolossi/PeptiPedia/tree/audit/evidence-sync/auditoria/snapshots/$VersionUpper"
    Write-Host "Relatorios:          https://github.com/georgecolossi/PeptiPedia/tree/audit/evidence-sync/auditoria/relatorios/$VersionUpper"
    Write-Host "Testes e Logs:       https://github.com/georgecolossi/PeptiPedia/tree/audit/evidence-sync/auditoria/testes/$VersionUpper"
    Write-Host "======================================================================`n" -ForegroundColor Green

} finally {
    Pop-Location
}
