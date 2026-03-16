@echo off
setlocal
set ROOT=%~dp0
set APP_DIR=%ROOT%app

if not exist "%APP_DIR%" (
  echo [ERROR] Cannot find app directory: "%APP_DIR%"
  exit /b 1
)

echo ==> Entering app directory: "%APP_DIR%"
cd /d "%APP_DIR%"

echo ==> Installing dependencies...
call npm install
if errorlevel 1 exit /b 1

echo ==> Building extension...
call npm run build
if errorlevel 1 exit /b 1

echo.
echo Done. Load this folder in browser extension page:
echo %APP_DIR%\dist
exit /b 0
