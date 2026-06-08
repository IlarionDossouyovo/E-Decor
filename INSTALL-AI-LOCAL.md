# Installation AI Locale - E-Décor

Ce guide explique comment installer et exécuter le système AI sur votre machine locale avec Ollama, Docker et n8n déjà en cours d'exécution.

## Prérequis

Assurez-vous que ces services sont démarrés sur votre machine:

```bash
# Ollama (port 11434)
ollama serve

# n8n (port 5678)
# Via Docker: docker run -it -p 5678:5678 -v n8n_data:/home/node/.n8n n8nio/n8n

# Docker Desktop ou Docker daemon doit être actif
```

## Installation

### 1. Cloner/Mettre à jour le projet

```bash
cd /chemin/vers/E-Decor
npm install
```

### 2. Installer les dépendances Node.js

```bash
npm install electron --save-dev
```

Les dépendances sont déjà dans le package.json:
- electron: ^41.2.0
- vercel: ^51.3.0

## Démarrage des Services

### Option A: Démarrage Manuel

**Terminal 1 - API Server (E-Décor):**
```bash
cd E-Decor
node ai-integration/api-server.js
```
→ Serveur démarré sur http://localhost:3000

**Terminal 2 - Application Electron:**
```bash
cd E-Decor
npm start
```

### Option B: Avec PM2 (gestionnaire de processus)

```bash
# Installer PM2
npm install -g pm2

# Démarrer l'API server
pm2 start ai-integration/api-server.js --name "e-decor-api"

# Démarrer l'automation (cron)
pm2 start automation/ai-automation-360.js --name "e-decor-automation" --cron "*/15 * * * *"

# Voir les logs
pm2 logs e-decor-api
pm2 logs e-decor-automation
```

## Configuration des Connexions AI

Le système est pré-configuré pour se connecter à:

| Service | URL Locale | Port |
|---------|-----------|------|
| Ollama | http://localhost | 11434 |
| n8n | http://localhost | 5678 |
| API E-Décor | http://localhost | 3000 |

### Variables d'environnement (optionnel)

Si vos services sont sur des ports différents:

```bash
# Modifier les variables si nécessaire
export OLLAMA_HOST=localhost
export OLLAMA_PORT=11434
export N8N_WEBHOOK=http://localhost:5678
export EMAIL_TO=electronbusiness07@gmail.com
```

## Importation du Workflow n8n

1. Ouvrir n8n: http://localhost:5678
2. Aller dans Workflows → Import
3. Importer le fichier: `n8n-workflows/05-ai-agent.json`
4. Activer le workflow

## Vérification

### Test Ollama

```bash
curl http://localhost:11434/api/tags
```

Réponse attendue:
```json
{"models":[{"name":"llama3.2","size":"2GB","modified_at":"..."}]}
```

### Test API E-Décor

```bash
curl http://localhost:3000/api/health
```

Réponse:
```json
{"status":"ok","ollama":"available","version":"1.0.0"}
```

### Test Chat AI

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Quel canapé me conseillez-vous pour un petit salon?"}'
```

## Architecture du Système

```
┌─────────────────────────────────────────────────────────────┐
│                    E-Décor Electron                        │
│                         (npm start)                        │
└─────────────────────┬───────────────────────────────────────┘
                      │ IPC (window.api.ai)
┌─────────────────────▼───────────────────────────────────────┐
│              ai-integration/ollama-client.js               │
│                  (connexion Ollama)                        │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP :11434
┌─────────────────────▼───────────────────────────────────────┐
│                      Ollama                                │
│              (LLM local: llama3.2)                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              automation/ai-automation-360.js                │
│         (cron: toutes les 15 minutes)                     │
└──────────┬─────────────────────┬───────────────────────────┘
           │                     │
    ┌──────▼──────┐      ┌──────▼──────┐
    │API Server   │      │n8n Webhook  │
    │:3000       │      │:5678       │
    └─────────────┘      └────────────┘
```

## Commandes Rapides

```bash
# Démarrer tout
cd E-Decor

# Terminal 1: API
node ai-integration/api-server.js &

# Terminal 2: Electron
npm start

# Terminal 3: Automation (optionnel)
node automation/ai-automation-360.js
```

## Dépannage

### Ollama ne répond pas
```bash
# Vérifier le statut
ollama list

# Redémarrer si nécessaire
ollama serve
```

### n8n webhook non reçu
```bash
# Vérifier les logs n8n
# Dans l'interface n8n: Settings → Logs
```

### Erreur de connexion
```bash
# Vérifier les ports
netstat -an | grep 11434
netstat -an | grep 5678
netstat -an | grep 3000
```

## Support

Contact: electronbusiness07@gmail.com