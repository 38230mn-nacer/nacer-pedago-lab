Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Write-Host "=== Nacer Pedago Lab - Installation Graphify ==="

if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    throw "winget est requis pour cette installation automatique."
}

if (-not (Get-Command uv -ErrorAction SilentlyContinue)) {
    Write-Host "Installation de uv..."
    winget install --id astral-sh.uv --exact --accept-package-agreements --accept-source-agreements
    Write-Host ""
    Write-Host "uv vient d etre installe. Fermez puis rouvrez PowerShell, revenez dans ce dossier et relancez :"
    Write-Host "  .\scripts\install-graphify.ps1"
    exit 0
}

Write-Host "Installation / mise a jour de Graphify..."
uv tool install graphifyy --force

if (-not (Get-Command graphify -ErrorAction SilentlyContinue)) {
    Write-Host "La commande graphify n est pas encore visible dans ce terminal."
    Write-Host "Execution de : uv tool update-shell"
    uv tool update-shell
    Write-Host "Fermez puis rouvrez PowerShell, revenez dans ce dossier et relancez ce script."
    exit 0
}

Write-Host "Version Graphify :"
graphify --version

Write-Host ""
Write-Host "Installation du skill Graphify pour Codex dans CE projet..."
graphify install --project --platform codex

Write-Host ""
Write-Host "Construction initiale du graphe..."
graphify .

Write-Host ""
Write-Host "=== Termine ==="
Write-Host "Ouvrez graphify-out\graph.html pour explorer le graphe."
Write-Host "Dans Codex, utilisez ensuite : $graphify ."
