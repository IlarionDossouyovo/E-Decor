@echo off
echo ============================================
echo    E-Décor - Mise a jour
echo ============================================
echo.

REM Vérifier si on est dans le bon dossier
if not exist "package.json" (
    echo [ERREUR] Ce script doit être exécuté depuis le dossier E-Decor
    echo Veuillez naviguer vers le dossier E-Decor
    pause
    exit /b 1
)

echo [1/4] Verification des dependances...
echo.
npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Echec de l'installation des dépendances
    pause
    exit /b 1
)

echo.
echo [2/4] Recuperation des dernieres modifications Git...
echo.
git pull origin main
if %ERRORLEVEL% NEQ 0 (
    echo [ATTENTION] Git pull a echoue - continuing anyway...
)

echo.
echo [3/4] Nettoyage du cache...
echo.
rmdir /s /q node_modules\.cache 2>nul

echo.
echo [4/4] Verification de la structure...
echo.
if exist "assets" (
    echo [OK] Dossier assets present
) else (
    echo [ATTENTION] Dossier assets manquant!
)

if exist "ai-integration" (
    echo [OK] Dossier ai-integration present
) else (
    echo [ATTENTION] Dossier ai-integration manquant!
)

if exist "ai-agents" (
    echo [OK] Dossier ai-agents present
) else (
    echo [ATTENTION] Dossier ai-agents manquant!
)

echo.
echo ============================================
echo    Mise a jour terminee!
echo ============================================
echo.
echo Prochaines etapes:
echo   1. Ouvrir un terminal et taper: ollama serve
echo   2. Dans un autre terminal, taper: npm start
echo.
pause
