$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$appDir = Join-Path $root 'app'

if (-not (Test-Path $appDir)) {
  Write-Error "Cannot find app directory: $appDir"
}

Write-Host "==> Entering app directory: $appDir"
Set-Location $appDir

Write-Host "==> Installing dependencies..."
npm install
if ($LASTEXITCODE -ne 0) {
  throw "npm install failed with exit code $LASTEXITCODE"
}

Write-Host "==> Building extension..."
npm run build
if ($LASTEXITCODE -ne 0) {
  throw "npm run build failed with exit code $LASTEXITCODE"
}

Write-Host ""
Write-Host "Done. Load this folder in browser extension page:"
Write-Host "$appDir\dist"
