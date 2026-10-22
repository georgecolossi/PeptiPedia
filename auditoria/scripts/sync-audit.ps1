# ==============================================================================
# PeptiPedia — Script Permanente de Sincronizacao de Auditoria (sync-audit.ps1)
# ==============================================================================
# Uso:
#   .\auditoria\scripts\sync-audit.ps1 -Version "P2G21" -Description "errata cientifica"
#   .\auditoria\scripts\sync-audit.ps1 -Version "P2H" -WorkspaceDir "C:\Users\georg\Documents\PeptiPedia\workspace"
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
    [switch]$DryRun
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

# Se WorkspaceDir nao foi passado, tentar inferir
if (-not $WorkspaceDir) {
    $SiblingWorkspace = (Resolve-Path (Join-Path $RepoRoot "..\workspace") -ErrorAction SilentlyContinue)
    if ($SiblingWorkspace -and (Test-Path $SiblingWorkspace)) {
        $WorkspaceDir = $SiblingWorkspace.Path
    } else {
        # Fallback para o proprio repo se nao houver workspace separado
        $WorkspaceDir = $RepoRoot
    }
}
Write-Host "  Workspace Ativo:    $WorkspaceDir"

# Determinar versao se nao informada
if (-not $Version) {
    # Tentar inferir da pasta de testes mais recente ou perguntar
    $Snapshots = Get-ChildItem -Path (Join-Path $RepoRoot "auditoria\snapshots") -Directory -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending
    if ($Snapshots -and $Snapshots.Count -gt 0) {
        $Version = $Snapshots[0].Name
        Write-WarningMsg "Versao nao especificada. Inferida do snapshot mais recente: $Version"
    } else {
        Write-Failure "Parametro -Version obrigatorio (ex.: -Version P2G21 ou -Version P2H)"
        exit 1
    }
}
$VersionUpper = $Version.ToUpper()
$VersionLower = $Version.ToLower()
Write-Host "  Versao Identificada: $VersionUpper"

# ------------------------------------------------------------------------------
# 2. VERIFICACOES DE SEGURANCA E GOVERNANCA GIT
# ------------------------------------------------------------------------------
Write-Step "2. Executando verificacoes de seguranca absolutas..."

Push-Location $RepoRoot
try {
    # 2.1. Validar Branch Atual (DEVE ser audit/evidence-sync)
    $CurrentBranch = (git branch --show-current).Trim()
    if ($CurrentBranch -ne "audit/evidence-sync") {
        Write-Failure "Branch atual e '$CurrentBranch'. A sincronizacao e PERMITIDA EXCLUSIVAMENTE na branch 'audit/evidence-sync'. Push para 'main' ou outras branches e ESTRITAMENTE PROIBIDO."
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

    # 2.3. Verificar Alteracoes Fora de auditoria/
    $ChangedFiles = (git status --porcelain)
    foreach ($line in $ChangedFiles) {
        if ($line.Length -gt 3) {
            $filePath = $line.Substring(3).Trim()
            if (-not $filePath.StartsWith("auditoria/") -and -not $filePath.StartsWith("auditoria\")) {
                Write-Failure "Alteracao detectada fora de 'auditoria/': '$filePath'. A branch de auditoria NAO pode modificar arquivos operacionais da raiz."
                exit 1
            }
        }
    }
    Write-Success "Nenhuma alteracao detectada fora do diretorio 'auditoria/'"

    # 2.4. Bloquear Arquivos Secretos, Credenciais ou Dependencias
    $ProhibitedPatterns = @(".env", "id_rsa", "*.key", "token", "password", "node_modules", ".venv", "__pycache__")
    foreach ($line in $ChangedFiles) {
        if ($line.Length -gt 3) {
            $filePath = $line.Substring(3).Trim().ToLower()
            foreach ($pat in $ProhibitedPatterns) {
                if ($filePath -like "*$pat*") {
                    Write-Failure "Arquivo proibido ou sensivel detectado: '$filePath' (padrao: $pat)"
                    exit 1
                }
            }
        }
    }
    Write-Success "Verificacao de segredos e dependencias concluida sem violacoes"

    # --------------------------------------------------------------------------
    # 3. SINCRONIZACAO DO SNAPSHOT A PARTIR DO WORKSPACE
    # --------------------------------------------------------------------------
    if ($WorkspaceDir -and (Test-Path $WorkspaceDir) -and ($WorkspaceDir -ne $RepoRoot)) {
        Write-Step "3. Sincronizando arquivos operacionais do workspace para snapshot $VersionUpper..."
        
        $SnapshotDest = Join-Path $RepoRoot "auditoria\snapshots\$VersionUpper"
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
                if (Test-Path $dstFolder) { Remove-Item -Path $dstFolder -Recurse -Force }
                Copy-Item -Path $srcFolder -Destination $dstFolder -Recurse -Force
            }
        }
        Write-Success "Snapshot atualizado em: $SnapshotDest"

        # Sincronizar testes e screenshots se presentes no workspace
        $TestDest = Join-Path $RepoRoot "auditoria\testes\$VersionUpper"
        New-Item -ItemType Directory -Path $TestDest -Force | Out-Null
        Get-ChildItem -Path $WorkspaceDir -Filter "*test*" -File | ForEach-Object {
            Copy-Item -Path $_.FullName -Destination (Join-Path $TestDest $_.Name) -Force
        }
        Get-ChildItem -Path $WorkspaceDir -Filter "*run*" -File | ForEach-Object {
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
        Write-Success "Testes e screenshots sincronizados em: $TestDest"
    }

    # --------------------------------------------------------------------------
    # 4. EXECUCAO DE TESTES AUTOMATIZADOS (SE DISPONIVEIS)
    # --------------------------------------------------------------------------
    $TestResultsSummary = "Testes nao executados ou ignorados via -SkipTests"
    $TestsPassed = 0
    $TestsFailed = 0

    if (-not $SkipTests) {
        Write-Step "4. Buscando e executando suites de testes disponiveis..."
        $RunnerCandidates = @(
            (Join-Path $WorkspaceDir "run_${VersionLower}_final.py"),
            (Join-Path $RepoRoot "auditoria\testes\$VersionUpper\run_${VersionLower}_final.py"),
            (Join-Path $WorkspaceDir "test_e2e_playwright_${VersionLower}.py"),
            (Join-Path $RepoRoot "auditoria\testes\$VersionUpper\test_e2e_playwright_${VersionLower}.py")
        )
        
        $RunnersFound = $RunnerCandidates | Where-Object { Test-Path $_ }
        if ($RunnersFound) {
            foreach ($runner in $RunnersFound) {
                Write-Host "  Executando: $runner"
                $output = python $runner 2>&1
                if ($LASTEXITCODE -eq 0) {
                    Write-Success "Suite $runner concluida com SUCESSO."
                    $TestsPassed++
                } else {
                    Write-WarningMsg "Suite $runner retornou FALHA (Exit Code: $LASTEXITCODE)."
                    $TestsFailed++
                }
            }
            $TestResultsSummary = "Aprovados: $TestsPassed | Reprovados: $TestsFailed"
        } else {
            Write-WarningMsg "Nenhum script runner automatizado especifico encontrado para $VersionUpper. Pulando execucao automatica."
        }
    }

    # --------------------------------------------------------------------------
    # 5. GERACAO / ATUALIZACAO DO STATUS.MD PADRONIZADO
    # --------------------------------------------------------------------------
    Write-Step "5. Gerando/atualizando relatorio de status padronizado STATUS.md..."
    $ReportsDir = Join-Path $RepoRoot "auditoria\relatorios\$VersionUpper"
    New-Item -ItemType Directory -Path $ReportsDir -Force | Out-Null
    $StatusFilePath = Join-Path $ReportsDir "STATUS.md"

    $CurrentHead = (git rev-parse HEAD).Trim()
    $DateIso = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss zzz")

    if (-not (Test-Path $StatusFilePath)) {
        $StatusLines = @(
            "# Status de Entrega da Microetapa — $VersionUpper",
            "",
            "## 1. Identificacao da Versao e Rastreabilidade Git",
            "",
            "- **Versao:** ``$VersionUpper``",
            "- **Classificacao Editorial:** ``PENDENTE DE AUDITORIA EXTERNA``",
            "- **Commit:** ``$CurrentHead``",
            "- **Data da Sincronizacao:** ``$DateIso``",
            "- **Branch Exclusiva:** ``audit/evidence-sync``",
            "- **Repositorio:** https://github.com/georgecolossi/PeptiPedia",
            "- **Estado da Branch main:** Preservada e intocada no baseline de producao",
            "- **Estado da Publicacao Remota:** Sincronizado via ``sync-audit.ps1``",
            "",
            "---",
            "",
            "## 2. Escopo e Objetivos da Microetapa",
            "",
            "- **Objetivo Central:** $Description",
            "- **Limite de Catalogo:** 57 compostos e 57 estudos auditados.",
            "",
            "---",
            "",
            "## 3. Resumo da Execucao de Testes",
            "",
            "- **Resultado:** $TestResultsSummary",
            "- **Homologacao:** PENDENTE DE AUDITORIA EXTERNA (Nao homologado por conta propria)",
            "",
            "---",
            "",
            "## 4. Evidencias e Manifestos",
            "",
            "- **Snapshots:** ``auditoria/snapshots/$VersionUpper/``",
            "- **Relatorios:** ``auditoria/relatorios/$VersionUpper/``",
            "- **Testes:** ``auditoria/testes/$VersionUpper/``"
        )
        $StatusContent = $StatusLines -join "`n"

        Set-Content -Path $StatusFilePath -Value $StatusContent -Encoding UTF8
        Write-Success "STATUS.md criado em: $StatusFilePath"
    } else {
        Write-Success "STATUS.md ja existente e preservado em: $StatusFilePath"
    }

    # --------------------------------------------------------------------------
    # 6. STAGING E PREPARACAO DO COMMIT (EXCLUSIVAMENTE auditoria/)
    # --------------------------------------------------------------------------
    Write-Step "6. Preparando commit controlado (estritamente 'auditoria/')..."
    
    # Adicionar apenas o diretorio auditoria
    git add -A auditoria/

    $StagedDiff = (git diff --cached --name-only)
    if (-not $StagedDiff) {
        Write-WarningMsg "Nenhuma alteracao pendente para commit em 'auditoria/'."
    } else {
        Write-Host "  Arquivos a serem comitados:"
        $StagedDiff | ForEach-Object { Write-Host "    + $_" -ForegroundColor DarkCyan }

        # Validacao dupla: certificar que 100% dos arquivos comecam com auditoria/
        foreach ($stagedFile in $StagedDiff) {
            if (-not $stagedFile.StartsWith("auditoria/") -and -not $stagedFile.StartsWith("auditoria\")) {
                Write-Failure "Arquivo fora de auditoria detectado no staging: '$stagedFile'. Abortando!"
                git reset
                exit 1
            }
        }

        $CommitMsg = "audit($VersionLower): $Description"
        if ($DryRun) {
            Write-WarningMsg "[DRY-RUN]: git commit -m '$CommitMsg' (simulado - sem comitar em dry-run)"
            git reset
        } else {
            git commit -m $CommitMsg
            Write-Success "Commit criado com sucesso: $CommitMsg"
        }
    }

    # --------------------------------------------------------------------------
    # 7. SINCRONIZACAO COM O GITHUB (PUSH CONTROLADO)
    # --------------------------------------------------------------------------
    Write-Step "7. Verificando ancestrais e integridade remota antes do push..."

    git fetch origin audit/evidence-sync
    $RevCount = (git rev-list --left-right --count origin/audit/evidence-sync...HEAD).Trim().Split("`t")
    $Behind = [int]$RevCount[0]
    $Ahead = [int]$RevCount[1]

    Write-Host "  Commits atras do remoto (behind): $Behind"
    Write-Host "  Commits a frente do remoto (ahead):  $Ahead"

    if ($Behind -gt 0) {
        Write-Failure "O branch local esta $Behind commit(s) atras do remoto. Existe divergencia! Push abortado para evitar conflitos. Nao faca force push ou rebase destrutivo."
        exit 1
    }

    if ($Ahead -eq 0) {
        Write-Success "O branch local ja esta sincronizado com o remoto (ahead = 0). Nenhum push necessario."
    } else {
        Write-Step "Executando push de $Ahead commit(s) para refs/heads/audit/evidence-sync..."
        
        if ($DryRun) {
            Write-WarningMsg "[DRY-RUN]: git push origin refs/heads/audit/evidence-sync (simulacao)"
            git push --dry-run origin refs/heads/audit/evidence-sync
        } else {
            git push origin refs/heads/audit/evidence-sync
            if ($LASTEXITCODE -ne 0) {
                Write-Failure "Falha no git push. Codigo de saida: $LASTEXITCODE"
                exit 1
            }
            Write-Success "Push efetuado com SUCESSO para origin/audit/evidence-sync."
        }
    }

    # --------------------------------------------------------------------------
    # 8. VERIFICACAO FINAL DO HEAD REMOTO
    # --------------------------------------------------------------------------
    Write-Step "8. Verificando HEAD remoto no GitHub..."
    $LocalSha = (git rev-parse HEAD).Trim()
    $RemoteShaLine = (git ls-remote origin refs/heads/audit/evidence-sync)
    $RemoteSha = $RemoteShaLine.Split("`t")[0].Trim()

    Write-Host "  SHA Local:  $LocalSha"
    Write-Host "  SHA Remoto: $RemoteSha"

    if ($DryRun) {
        Write-WarningMsg "[DRY-RUN]: Modo de simulacao ativo. Nenhuma alteracao permanente foi gravada no remoto."
    } elseif ($LocalSha -eq $RemoteSha) {
        Write-Success "Sincronizacao perfeita: HEAD local corresponde exatamente ao HEAD remoto no GitHub!"
    } else {
        Write-WarningMsg "O SHA remoto difere do SHA local. Verifique se o push foi executado com sucesso."
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
    Write-Host "======================================================================`n" -ForegroundColor Green

} finally {
    Pop-Location
}
