# ==============================================================================
# PeptiPedia - Script Permanente de Sincronizacao de Auditoria (sync-audit.ps1)
# Versao 2.3 (Microetapa P2G.2.5 — Encerramento de Rastreabilidade e Checkout Limpo)
# ==============================================================================
# Uso:
#   .\auditoria\scripts\sync-audit.ps1 -Version "P2G25" -Description "encerramento auditoria rastreabilidade e checkout limpo"
#   .\auditoria\scripts\sync-audit.ps1 -Version "P2G25" -DryRun
#   .\auditoria\scripts\sync-audit.ps1 -Version "P2G25" -VerifyOnly
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
    [switch]$VerifyOnly,

    [Parameter(Mandatory = $false)]
    [switch]$AllowErrata
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
    Write-Failure "Parametro -Version obrigatorio (ex.: -Version P2G25)"
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
    # 2.0. Registrar estado inicial do Git para validacao de nao-destrutibilidade
    $PreGitStatus = (git status --porcelain)
    $PreGitHead   = (git rev-parse HEAD).Trim()
    $PreGitBranch = (git branch --show-current).Trim()

    # 2.1. Validar Branch Atual (DEVE ser audit/evidence-sync)
    if ($PreGitBranch -ne "audit/evidence-sync") {
        Write-Failure "Branch atual e '$PreGitBranch'. A sincronizacao e PERMITIDA EXCLUSIVAMENTE na branch 'audit/evidence-sync'. Push para 'main' ou outras branches e TERMINANTEMENTE PROIBIDO."
        exit 1
    }
    Write-Success "Branch confirmada: $PreGitBranch"

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

    # Snapshots historicos de etapas anteriores sao estritamente imutaveis
    $PriorHistoricalVersions = @("P2G2", "P2G21", "P2G22", "P2G23", "P2G24", "P2G25", "P3", "P31", "P4")
    if ($PriorHistoricalVersions -contains $VersionUpper) {
        Write-Failure "A versao '$VersionUpper' e um snapshot historico anterior imutavel. Qualquer modificacao e TERMINANTEMENTE PROIBIDA."
        exit 1
    }

    $isCommittedSnapshot = (git ls-tree -d HEAD "auditoria/snapshots/$VersionUpper" 2>$null)
    
    if ($VerifyOnly) {
        Write-Step "MODO -VerifyOnly: Verificando versao $VersionUpper ja publicada..."
        if (-not (Test-Path $SnapshotDest) -or -not (Test-Path $TestDest)) {
            Write-Failure "Snapshot ou testes para versao $VersionUpper nao encontrados para verificacao."
            exit 1
        }
    } elseif ($isCommittedSnapshot -and -not $AllowErrata) {
        Write-Failure "O snapshot da versao '$VersionUpper' ja existe no historico do repositorio. Sobrescrita de snapshots e proibida sem autorizacao expressa. Para publicar errata autorizada, informe -AllowErrata."
        exit 1
    } elseif ($isCommittedSnapshot -and $AllowErrata) {
        Write-Success "Errata autorizada para a versao atual $VersionUpper. Snapshots historicos anteriores preservados integralmente."
    } else {
        Write-Success "Garantia de imutabilidade: versao $VersionUpper e inedita no historico do repositorio"
    }

    # --------------------------------------------------------------------------
    # 3. TRATAMENTO DE MODOS ISOLADOS (DRY-RUN E VERIFY-ONLY)
    # --------------------------------------------------------------------------
    if ($DryRun -or $VerifyOnly) {
        Write-Step "3. [ISOLAMENTO TOTAL] Executando testes em ambiente temporario descartavel (Zero escrita em arquivos versionados)..."
        $IsolatedTemp = [System.IO.Path]::Combine([System.IO.Path]::GetTempPath(), "peptipedia_iso_" + [System.Guid]::NewGuid().ToString())
        New-Item -ItemType Directory -Path $IsolatedTemp -Force | Out-Null

        try {
            # Montar snapshot temporario
            $TempSnap = Join-Path $IsolatedTemp "snapshots\$VersionUpper"
            $TempTest = Join-Path $IsolatedTemp "testes\$VersionUpper"
            New-Item -ItemType Directory -Path $TempSnap -Force | Out-Null
            New-Item -ItemType Directory -Path $TempTest -Force | Out-Null

            # Origem dos arquivos: se VerifyOnly usa repo, se DryRun usa workspace
            $SourceApp = if ($VerifyOnly) { $SnapshotDest } else { $WorkspaceDir }
            $CandidateWsTest = Join-Path $WorkspaceDir "auditoria\testes\$VersionUpper"
            $SourceTest = if ($VerifyOnly) { $TestDest } elseif (Test-Path $CandidateWsTest) { $CandidateWsTest } else { $WorkspaceDir }

            Copy-Item -Path (Join-Path $SourceApp "index.html") -Destination (Join-Path $TempSnap "index.html") -Force
            if (Test-Path (Join-Path $SourceApp "css")) { Copy-Item -Path (Join-Path $SourceApp "css") -Destination (Join-Path $TempSnap "css") -Recurse -Force }
            if (Test-Path (Join-Path $SourceApp "js")) { Copy-Item -Path (Join-Path $SourceApp "js") -Destination (Join-Path $TempSnap "js") -Recurse -Force }

            if (Test-Path $CandidateWsTest) {
                Get-ChildItem -Path $CandidateWsTest -File | ForEach-Object {
                    Copy-Item -Path $_.FullName -Destination (Join-Path $TempTest $_.Name) -Force
                }
            }
            Get-ChildItem -Path $SourceTest -Filter "*$VersionLower*" -File | ForEach-Object {
                Copy-Item -Path $_.FullName -Destination (Join-Path $TempTest $_.Name) -Force
            }
            Get-ChildItem -Path $SourceTest -Filter "*generate*" -File | ForEach-Object {
                Copy-Item -Path $_.FullName -Destination (Join-Path $TempTest $_.Name) -Force
            }

            # Localizar runners no ambiente temporario
            $TempRunners = @()
            $v8 = Join-Path $TempTest "run_${VersionLower}_final.py"
            $pw = Join-Path $TempTest "test_e2e_playwright_${VersionLower}.py"
            if (Test-Path $v8) { $TempRunners += $v8 }
            if (Test-Path $pw) { $TempRunners += $pw }

            if ($TempRunners.Count -lt 2) {
                Write-Failure "Menos de 2 runners encontrados no sandbox temporario para $VersionUpper. Abortando!"
                exit 1
            }

            foreach ($tr in $TempRunners) {
                $rName = [System.IO.Path]::GetFileNameWithoutExtension($tr)
                Write-Host "  -> [SANDBOX] Executando runner isolado: $rName"
                Push-Location $TempTest
                try {
                    $output = & python $tr 2>&1
                    $exitCode = $LASTEXITCODE
                } finally {
                    Pop-Location
                }
                if ($exitCode -ne 0) {
                    Write-Failure "Runner $rName falhou no sandbox temporario (Exit Code: $exitCode). Output:`n$output"
                    exit 1
                }
                Write-Success "Runner $rName aprovado no sandbox temporario com exit code 0."
            }

        } finally {
            if (Test-Path $IsolatedTemp) {
                Remove-Item -Path $IsolatedTemp -Recurse -Force -ErrorAction SilentlyContinue
            }
        }

        # Validacao de Nao-Destrutibilidade: garantir que NENHUM arquivo no repo foi modificado
        $PostGitStatus = (git status --porcelain)
        $PostGitHead   = (git rev-parse HEAD).Trim()
        $PostGitBranch = (git branch --show-current).Trim()

        if ($PostGitHead -ne $PreGitHead) {
            Write-Failure "Violacao de nao-destrutibilidade: HEAD foi modificado de $PreGitHead para $PostGitHead!"
            exit 1
        }
        if ($PostGitBranch -ne $PreGitBranch) {
            Write-Failure "Violacao de nao-destrutibilidade: Branch foi modificada de $PreGitBranch para $PostGitBranch!"
            exit 1
        }
        if (($PostGitStatus -join "`n") -ne ($PreGitStatus -join "`n")) {
            Write-Failure "Violacao de nao-destrutibilidade: Estado do indice ou working tree Git foi modificado durante o modo seguro!"
            Write-Host "Diff de status:"
            Write-Host $PostGitStatus
            exit 1
        }
        Write-Success "Garantia absoluta de nao-destrutibilidade: indice Git e arquivos locais 100% inalterados."

        if ($VerifyOnly) {
            Write-Success "MODO -VerifyOnly: Versao $VersionUpper validada com sucesso! Nenhuma alteracao gravada no disco ou Git."
            return
        }

        if ($DryRun) {
            Write-WarningMsg "[DRY-RUN]: Simulacao de fluxo completa concluida com sucesso. Nenhum commit ou push efetuado."
            return
        }
    }

    # --------------------------------------------------------------------------
    # 4. SINCRONIZACAO REAL DE ARQUIVOS (SNAPSHOT, TESTES E RELATORIOS)
    # --------------------------------------------------------------------------
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
            if (Test-Path $dstFolder) { Remove-Item -Path $dstFolder -Recurse -Force }
            Copy-Item -Path $srcFolder -Destination $dstFolder -Recurse -Force
        }
    }
    Write-Success "Snapshot gravado com sucesso em: $SnapshotDest"

    # Sincronizar testes e scripts
    New-Item -ItemType Directory -Path $TestDest -Force | Out-Null
    $WorkspaceTest = Join-Path $WorkspaceDir "auditoria\testes\$VersionUpper"
    if (Test-Path $WorkspaceTest) {
        Copy-Item -Path (Join-Path $WorkspaceTest "*") -Destination $TestDest -Recurse -Force
    } else {
        Get-ChildItem -Path $WorkspaceDir -Filter "*test*" -File | ForEach-Object {
            Copy-Item -Path $_.FullName -Destination (Join-Path $TestDest $_.Name) -Force
        }
        Get-ChildItem -Path $WorkspaceDir -Filter "*run*" -File | ForEach-Object {
            Copy-Item -Path $_.FullName -Destination (Join-Path $TestDest $_.Name) -Force
        }
        Get-ChildItem -Path $WorkspaceDir -Filter "*generate*" -File | ForEach-Object {
            Copy-Item -Path $_.FullName -Destination (Join-Path $TestDest $_.Name) -Force
        }
    }

    # Sincronizar relatorios da versao
    $WorkspaceReports = Join-Path $WorkspaceDir "auditoria\relatorios\$VersionUpper"
    if (Test-Path $WorkspaceReports) {
        New-Item -ItemType Directory -Path $ReportsDir -Force | Out-Null
        Copy-Item -Path (Join-Path $WorkspaceReports "*") -Destination $ReportsDir -Recurse -Force
        Write-Success "Relatorios sincronizados em: $ReportsDir"
    }

    # Sincronizar entradas da versao se existirem
    $WorkspaceEntradas = Join-Path $WorkspaceDir "auditoria\entradas\$VersionUpper"
    $EntradasDest = Join-Path $RepoRoot "auditoria\entradas\$VersionUpper"
    if (Test-Path $WorkspaceEntradas) {
        New-Item -ItemType Directory -Path $EntradasDest -Force | Out-Null
        Copy-Item -Path (Join-Path $WorkspaceEntradas "*") -Destination $EntradasDest -Recurse -Force
        Write-Success "Entradas sincronizadas em: $EntradasDest"
    }

    Write-Success "Testes e relatorios sincronizados em: $TestDest"

    # --------------------------------------------------------------------------
    # 5. EXECUCAO DE TESTES AUTOMATIZADOS E CAPTURA REAL DE LOGS
    # --------------------------------------------------------------------------
    if ($SkipTests) {
        Write-Failure "Push e publicacao de auditoria sao BLOQUEADOS quando -SkipTests e acionado. Testes sao mandatorios."
        exit 1
    }

    Write-Step "4. Executando suites de testes obrigatorias para gerar logs e evidencias reais..."
    New-Item -ItemType Directory -Path $LogDir -Force | Out-Null
    $ScreenshotsDest = Join-Path $TestDest "screenshots"
    New-Item -ItemType Directory -Path $ScreenshotsDest -Force | Out-Null

    $RunnersFound = @()
    $v8Path = Join-Path $TestDest "run_${VersionLower}_final.py"
    $pwPath = Join-Path $TestDest "test_e2e_playwright_${VersionLower}.py"
    if (Test-Path $v8Path) { $RunnersFound += $v8Path }
    if (Test-Path $pwPath) { $RunnersFound += $pwPath }

    if ($RunnersFound.Count -lt 2) {
        Write-Failure "Menos de 2 scripts runners obrigatorios encontrados para $VersionUpper. Abortando!"
        exit 1
    }

    $TestsFailed = 0
    foreach ($runner in $RunnersFound) {
        $runnerName = [System.IO.Path]::GetFileNameWithoutExtension($runner)
        Write-Host "  -> Executando runner: $runner"
        
        $startTime = Get-Date
        $prevEAP = $ErrorActionPreference
        $ErrorActionPreference = "Continue"
        
        Push-Location $TestDest
        try {
            $output = & python $runner 2>&1
            $exitCode = $LASTEXITCODE
        } finally {
            Pop-Location
        }
        $ErrorActionPreference = $prevEAP
        $endTime = Get-Date
        $duration = ($endTime - $startTime).TotalSeconds

        if ($exitCode -eq 0) {
            Write-Success "Runner $runnerName concluido com SUCESSO (0 falhas em ${duration}s)."
        } else {
            Write-Failure "Runner $runnerName FALHOU (Exit Code: $exitCode)."
            $TestsFailed++
        }
    }

    if ($TestsFailed -gt 0) {
        Write-Failure "Testes obrigatorios falharam: $TestsFailed runner(s) reprovado(s). Publicacao abortada por seguranca!"
        exit 1
    }
    Write-Success "Todos os testes obrigatorios foram aprovados com 100% de sucesso!"

    # Gerar test-results.json dinamico
    $genScript = Join-Path $TestDest "generate_test_results_json.py"
    if (-not (Test-Path $genScript)) {
        Write-Failure "Script generate_test_results_json.py obrigatorio nao encontrado em $TestDest! Bloqueio fail-closed!"
        exit 1
    }
    Push-Location $TestDest
    try {
        & python $genScript $LogDir
        if ($LASTEXITCODE -ne 0) {
            Write-Failure "Falha na geracao do manifesto test-results.json! Codigo de saida: $LASTEXITCODE. Publicacao abortada!"
            exit 1
        }
    } finally {
        Pop-Location
    }
    Write-Success "Manifesto test-results.json dinamico gerado em: $LogDir" 

    # --------------------------------------------------------------------------
    # 6. STAGING ISOLADO E COMMIT CANDIDATO
    # --------------------------------------------------------------------------
    Write-Step "6. Preparando commit com staging estritamente isolado para versao $VersionUpper..."

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
    Add-ScriptStaged "auditoria/entradas/$VersionUpper"
    
    # Forcar inclusao de logs de testes que possam ser capturados por *.log no .gitignore
    $VersionLogsDir = "auditoria/testes/$VersionUpper/logs"
    if (Test-Path $VersionLogsDir) {
        git add -f "$VersionLogsDir"
        $ScriptStagedFiles += "$VersionLogsDir"
    }

    if (git diff --name-only "auditoria/scripts/sync-audit.ps1") {
        Add-ScriptStaged "auditoria/scripts/sync-audit.ps1"
    }

    $StagedDiff = (git diff --cached --name-only)
    if (-not $StagedDiff) {
        Write-WarningMsg "Nenhuma alteracao pendente para commit em 'auditoria/'."
        return
    }

    Write-Host "  Arquivos no staging isolado:"
    $StagedDiff | ForEach-Object { Write-Host "    + $_" -ForegroundColor DarkCyan }

    # 6.1. Validacao de Escopo Estrito de Versao
    $AllowedPrefixes = @(
        "auditoria/snapshots/$VersionUpper/", "auditoria\snapshots\$VersionUpper\",
        "auditoria/relatorios/$VersionUpper/", "auditoria\relatorios\$VersionUpper\",
        "auditoria/testes/$VersionUpper/", "auditoria\testes\$VersionUpper\",
        "auditoria/entradas/$VersionUpper/", "auditoria\entradas\$VersionUpper\",
        "auditoria/scripts/sync-audit.ps1", "auditoria\scripts\sync-audit.ps1"
    )
    foreach ($stagedFile in $StagedDiff) {
        $cleanStaged = $stagedFile.Trim('"')
        $isAllowed = $false
        foreach ($prefix in $AllowedPrefixes) {
            if ($cleanStaged.StartsWith($prefix)) { $isAllowed = $true; break }
        }
        if (-not $isAllowed) {
            Write-Failure "Arquivo fora do escopo da versao $VersionUpper detectado no staging: '$stagedFile'. Abortando!"
            if ($ScriptStagedFiles.Count -gt 0) { git reset HEAD -- $ScriptStagedFiles }
            exit 1
        }
    }
    Write-Success "Staging 100% isolado a versao $VersionUpper e scripts de auditoria"

    # 6.2. Inspecao Ativa de Segredos nos Caminhos e Conteudo
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

    # 6.3. Criacao do Commit Candidato Local
    $CommitMsg = "audit($VersionLower): $Description"
    git commit -m $CommitMsg
    Write-Success "Commit candidato criado com sucesso: $CommitMsg"

    # --------------------------------------------------------------------------
    # 7. TESTE GENUINO DE CHECKOUT LIMPO VIA GIT ARCHIVE ANTES DO PUSH
    # --------------------------------------------------------------------------
    Write-Step "7. Executando teste genuino de checkout limpo via git archive no commit candidato..."
    $CleanCheckoutScript = Join-Path $TestDest "test_clean_checkout_reproducibility.py"
    if (-not (Test-Path $CleanCheckoutScript)) {
        Write-Failure "Script test_clean_checkout_reproducibility.py obrigatorio nao localizado em $TestDest! Bloqueio absoluto acionado."
        exit 1
    }

    Write-Host "  -> Executando verificacao reproduzivel de checkout limpo..."
    & python $CleanCheckoutScript --repo-dir $RepoRoot --commit HEAD --version $VersionUpper
    if ($LASTEXITCODE -ne 0) {
        Write-Failure "Teste de checkout limpo reprovado! Codigo de saida: $LASTEXITCODE. Commit candidato preservado localmente em HEAD para auditoria e pericia. Push BLOQUEADO."
        Write-Host "  Instrucoes de recuperacao manual:"
        Write-Host "    1. Auditar commit candidato: git show HEAD"
        Write-Host "    2. Verificar arquivos:       git status"
        Write-Host "    3. Reverter manualmente se necessario: git reset HEAD~1"
        exit 1
    }
    Write-Success "Teste genuino de checkout limpo APROVADO com 100% de sucesso!"

    # 7.05. Adicionar evidencia real de checkout limpo (clean-checkout-report.json) ao commit
    Write-Step "7.05. Adicionando clean-checkout-report.json ao commit candidato para publicacao permanente..."
    $CleanReportRel = "auditoria/relatorios/$VersionUpper/clean-checkout-report.json"
    if (Test-Path $CleanReportRel) {
        git add -f $CleanReportRel
    }
    $CleanReportLog = "auditoria/testes/$VersionUpper/logs/clean-checkout-report.json"
    if (Test-Path $CleanReportLog) {
        git add -f $CleanReportLog
    }
    $HasAmendedDiff = (git diff --cached --name-only)
    if ($HasAmendedDiff) {
        git commit --amend --no-edit
        Write-Success "Evidencia real de checkout limpo incorporada ao commit candidato com sucesso!"
    }

    # 7.1. Validacao Criptografica Rigorosa do Tree SHA do Snapshot
    Write-Step "7.1. Validando consistencia criptografica do Tree SHA do Snapshot..."
    $CandidateSnapTree = (git rev-parse "HEAD:auditoria/snapshots/$VersionUpper").Trim()
    $TestResultsFile = Join-Path $LogDir "test-results.json"
    if (-not (Test-Path $TestResultsFile)) {
        Write-Failure "Manifesto test-results.json obrigatorio nao encontrado em $LogDir! Abortando push."
        exit 1
    }
    $ManifestContent = Get-Content -Raw $TestResultsFile | ConvertFrom-Json
    $RecordedSnapSha = $ManifestContent.environment.testedSnapshotTreeSha
    if (-not $RecordedSnapSha) {
        Write-Failure "CRITICO: testedSnapshotTreeSha em test-results.json e nulo ou vazio! Abortando push por integridade criptografica."
        exit 1
    }
    if ($RecordedSnapSha -ne $CandidateSnapTree) {
        Write-Failure "Divergencia Criptografica Detectada! Tree do Snapshot no Commit Candidato ($CandidateSnapTree) != testedSnapshotTreeSha ($RecordedSnapSha). Push BLOQUEADO!"
        exit 1
    }
    Write-Success "Consistencia Criptografica Confirmada: testedSnapshotTreeSha ($RecordedSnapSha) coincide 100% com o commit candidato." 

    # --------------------------------------------------------------------------
    # 8. SINCRONIZACAO COM O GITHUB (PUSH CONTROLADO FAST-FORWARD)
    # --------------------------------------------------------------------------
    Write-Step "8. Verificando integridade remota fast-forward antes do push..."

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

    # --------------------------------------------------------------------------
    # 9. VERIFICACAO FINAL DO HEAD REMOTO E LOGS
    # --------------------------------------------------------------------------
    Write-Step "9. Verificando HEAD remoto no GitHub e evidencias publicadas..."
    $LocalSha = (git rev-parse HEAD).Trim()
    $RemoteShaLine = (git ls-remote origin refs/heads/audit/evidence-sync)
    $RemoteSha = $RemoteShaLine.Split("`t")[0].Trim()

    Write-Host "  SHA Local:  $LocalSha"
    Write-Host "  SHA Remoto: $RemoteSha"

    if ($LocalSha -eq $RemoteSha) {
        Write-Success "Sincronizacao perfeita: HEAD local corresponde exatamente ao HEAD remoto no GitHub!"
        
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
    # 10. RESUMO PARA AUDITORIA EXTERNA (CHATGPT)
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
