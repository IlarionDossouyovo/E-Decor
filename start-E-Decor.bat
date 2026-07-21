@echo off
echo ============================================
echo    E-Décor - Lancement Complet
echo ============================================
echo.

REM Vérifier si Ollama est installé
where ollama >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Ollama n'est pas installé!
    echo Veuillez installer Ollama depuis https://ollama.com
    pause
    exit /b 1
)

REM Vérifier si Node.js est installé
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Node.js n'est pas installé!
    echo Veuillez installer Node.js depuis https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Ollama et Node.js sont installés
echo.

REM Vérifier si Ollama fonctionne déjà
curl -s http://localhost:11434/api/tags >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [INFO] Ollama est deja en cours d'execution
) else (
    echo [INFO] Demarrage d'Ollama...
    start "Ollama Server" cmd /k "ollama serve"
    timeout /t 3 /nobreak >nul
)

echo.
echo ============================================
echo    Lancement des serveurs...
echo ============================================
echo.

REM Créer les dossiers logs si nécessaire
if not exist "logs" mkdir logs

REM Lancer le serveur API AI en arrière-plan
start "E-Décor API Server" cmd /k "node ai-integration\api-server.js"

REM Lancer le serveur Agents en arrière-plan
start "E-Décor Agents Server" cmd /k "node ai-agents\api-server.js"

echo [OK] Serveurs demarres
echo.
echo ============================================
echo    Lancement de l'application E-Décor...
echo ============================================
echo.

REM Lancer l'application Electron
npm start

pause
