@echo off
setlocal enableextensions enabledelayedexpansion

REM Get current timestamp via PowerShell in a safe format
for /f "usebackq delims=" %%i in (`powershell -NoProfile -Command "(Get-Date).ToString('yyyy-MM-dd HH:mm:ss')"`) do set NOW=%%i

REM Stage all changes (including deletions)
git add -A

REM If nothing is staged, exit gracefully
git diff --cached --quiet
if %errorlevel%==0 (
  echo [git] No changes to commit.
  exit /b 0
)

REM Commit with timestamp message
git commit -m "Auto-commit %NOW%"
if errorlevel 1 (
  echo [git] Commit failed.
  exit /b 1
)

REM Push to the current branch's remote
git push origin version01_create_userpermission
if errorlevel 1 (
  echo [git] Push failed.
  exit /b 1
)

echo [git] Push completed successfully.
exit /b 0
