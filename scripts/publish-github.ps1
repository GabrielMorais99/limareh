# Publica o projeto no GitHub (execute na raiz do repo ou de qualquer pasta).
# Uso: powershell -ExecutionPolicy Bypass -File .\scripts\publish-github.ps1
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $root

Write-Host "Diretorio: $root"

if (-not (Test-Path ".git")) {
    git init
}

$remoteUrl = "https://github.com/GabrielMorais99/limareh.git"
$hasOrigin = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    git remote add origin $remoteUrl
    Write-Host "Remote 'origin' adicionado: $remoteUrl"
} else {
    git remote set-url origin $remoteUrl
    Write-Host "Remote 'origin' atualizado para: $remoteUrl"
}

git add -A
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "Nada para commitar (working tree limpo)."
} else {
    git commit -m "Site Limaréh — Vite/React; imgs/ como única fonte de imagens"
}

git branch -M main
Write-Host ""
Write-Host "Enviando para GitHub (pede login/token se necessario)..."
git push -u origin main
