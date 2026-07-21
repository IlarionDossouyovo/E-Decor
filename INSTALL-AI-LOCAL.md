# Installation E-Décor - Windows

Guide complet pour installer et exécuter E-Décor sur Windows.

## 🚀 Installation Rapide

### 1. Prérequis

Installez ces logiciels sur Windows :

| Logiciel | URL | Notes |
|---------|-----|-------|
| Node.js 20+ | https://nodejs.org | LTS version |
| Git | https://git-scm.com | Optionnel pour clone |

### 2. Installation d'Ollama (AI)

```powershell
# Via PowerShell (Administrator)
winget install Ollama.Ollama
```

OU téléchargez depuis : https://github.com/ollama/ollama/releases

Après installation, lancez :
```powershell
ollama serve
```

Vérifiez :
```powershell
ollama list
```

### 3. Clone et Installation E-Décor

```powershell
# Si le dossier existe déjà, le supprimer ou renommer
cd C:\Users\AUGUSTIN
ren E-Decor E-Decor-old

# Cloner le projet
git clone https://github.com/IlarionDossouyovo/E-Decor.git
cd E-Decor

# Installer les dépendances (sans Electron pour éviter les erreurs)
npm install --no-save electron
```

### 4. Lancer l'application

```powershell
npm start
```

## 🔧 Dépannage Windows

### Erreur "destination already exists"

```powershell
# Supprimer le dossier existant
Remove-Item -Recurse -Force C:\Users\AUGUSTIN\E-Decor
# OU le renommer
ren E-Decor E-Decor-old
```

### Erreur npm install avec Electron

Cette erreur est due à un bug Windows avec Electron. Solution :

```powershell
# Supprimer node_modules et package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Réinstaller
npm install
```

Si ça échoue encore :
```powershell
npm cache clean --force
npm install
```

### Ollama ne fonctionne pas

```powershell
# Vérifier qu'Ollama est installé
ollama --version

# Lancer le service
ollama serve

# Dans un autre terminal, tester
curl http://localhost:11434/api/tags
```

## 🤖 Intégration AI Ollama

L'IA est déjà implémentée dans E-Décor :

### Fichiers AI
- `ai-integration/ollama-client.js` - Client Ollama
- `ai-integration/api-server.js` - API server

### Comment ça marche

```
E-Décor (npm start)
       │
       │ IPC (window.api.ai)
       ▼
ollama-client.js
       │
       ▼ HTTP :11434
Ollama (LLM local)
```

### Fonctions AI disponibles

1. **Support client** - Chatbot pour répondre aux questions
2. **Recommandations** - Suggestions de produits basées sur les préférences
3. **List models** - Voir les modèles disponibles

### Configuration

Dans `ai-integration/ollama-client.js` et `ai-agents/agents-config.js` :
```javascript
const OLLAMA_HOST = 'localhost';  // ou votre IP locale
const OLLAMA_PORT = '11434';
const OLLAMA_MODEL = 'llama3.2';  // Modèle par défaut
```

**Modèles disponibles sur votre machine:**
- `llama3.2` - Modèle principal (2 Go) - RECOMMANDÉ
- `llama3.1:8b` - Plus détaillé (4.9 Go)
- `qwen2.5-coder:7b` - Spécialisé code (4.7 Go)
- `phi3:mini` - Léger et rapide (2.2 Go)

Pour changer de modèle, modifiez la variable `OLLAMA_MODEL` dans les fichiers.

### Tester l'AI

```powershell
# Dans le terminal après npm start
curl http://localhost:11434/api/tags
```

Réponse attendue :
```json
{"models":[{"name":"llama3.2","size":"2GB","modified_at":"..."}]}
```

## 🌐 Déploiement Vercel

Pour la version web (sans Electron) :

1. Allez sur https://vercel.com
2. Importez le repo GitHub
3. Root Directory: `web-version`
4. Deploy!

## 📞 Support

Email: electronbusiness07@gmail.com