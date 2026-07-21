# Guide de mise à jour - E-Décor

Ce guide vous explique comment mettre à jour votre projet E-Décor local avec toutes les corrections et améliorations.

---

## 🔧 Configuration Requise (AVANT de lancer)

### 1. Vérifier Ollama (déjà fait sur votre machine)
```powershell
# Dans PowerShell - Vérifier les modèles installés
ollama list
```

**Vous avez ces modèles:**
- llama3.2:latest (2.0 Go)
- llama3.1:8b (4.9 Go)
- qwen2.5-coder:7b (4.7 Go)
- phi3:mini (2.2 Go)

### 2. Lancer Ollama AVANT l'application
```powershell
# Dans un terminal PowerShell - Garder ce terminal ouvert
ollama serve
```

### 3. Vérifier qu'Ollama fonctionne
```powershell
# Dans un AUTRE terminal
curl http://localhost:11434/api/tags
```

---

## 📋 Étapes pour mettre à jour votre projet local

### Option 1 : Via Git (Recommandé)

```powershell
# 1. Ouvrir PowerShell et naviguer vers le dossier E-Decor
# Trouvez votre dossier - exemple:
cd C:\Users\AUGUSTIN\Documents\E-Decor
# OU si vous l'avez cloné ailleurs:
# cd D:\Chemin\vers\E-Decor

# 2. Récupérer les dernières modifications
git pull origin main

# 3. Installer les dépendances (si nécessaire)
npm install
```

### Option 2 : Download manuel des fichiers

Si vous préférez télécharger manuellement :

1. Allez sur : https://github.com/IlarionDossouyovo/E-Decor
2. Téléchargez le ZIP du projet
3. Remplacez les fichiers modifiés

---

## 🆕 Étapes post-mise à jour

### 1. Créer les images (obligatoire pour l'affichage)

Créez un dossier `assets/` à la racine avec cette structure :

```
E-Decor/
├── assets/
│   ├── icon.png                    # Icône de l'app (256x256)
│   ├── salon.jpg                   # Image catégorie salons
│   ├── bureau.jpg                  # Image catégorie bureaux
│   ├── cuisine.jpg                 # Image catégorie cuisines
│   ├── jardin.jpg                  # Image catégorie jardins
│   ├── salle-manger.jpg            # Image catégorie salle à manger
│   ├── produits/
│   │   ├── canoe-lino.jpg
│   │   ├── fauteuil-relax.jpg
│   │   ├── table-basse.jpg
│   │   ├── meuble-tv.jpg
│   │   ├── bibliotheque.jpg
│   │   ├── bureau-executif.jpg
│   │   ├── fauteuil-dir.jpg
│   │   ├── caisson.jpg
│   │   ├── bureau-standing.jpg
│   │   ├── ilot-cuisine.jpg
│   │   ├── meub-bas-cuisine.jpg
│   │   ├── etagere-murale.jpg
│   │   ├── salon-jardin.jpg
│   │   ├── transat.jpg
│   │   ├── parasol.jpg
│   │   ├── barbecue.jpg
│   │   ├── table-extensible.jpg
│   │   ├── chaise-cara.jpg
│   │   ├── buffet.jpg
│   │   └── vaisselier.jpg
│   └── blog/
│       ├── blog-salon-scandinave.jpg
│       ├── blog-open-space.jpg
│       ├── blog-bien-choisir.jpg
│       ├── blog-tendances-2024.jpg
│       └── blog-durabilite.jpg
```

**Note** : Vous pouvez utiliser des images placeholder (images libres de droits) pour le moment.

---

---

### 2. Lancer Ollama (IMPORTANT!)

Ollama doit être lancé AVANT l'application E-Décor pour activer les fonctionnalités AI:

```powershell
# Terminal 1 - Lancer Ollama (garder ce terminal ouvert)
ollama serve
```

Vérifier dans un autre terminal:
```powershell
curl http://localhost:11434/api/tags
```

---

### 3. Lancer l'application E-Décor

```powershell
# Terminal 2 - Dans le dossier E-Decor
cd C:\Users\AUGUSTIN\Documents\E-Decor  # ADAPTER le chemin!

# Installer les dépendances (une fois)
npm install

# Lancer l'application
npm start
```

---

### 4. Lancer les serveurs AI (Optionnel)

Pour utiliser les agents AI 360°, lancez ces serveurs:

```powershell
# Terminal 3 - Server API (port 3002)
node ai-integration\api-server.js

# Terminal 4 - Server Agents (port 3003)
node ai-agents\api-server.js
```

---

## 🔧 Commandes utiles

```powershell
# Lancer l'application principale
npm start

# Mode développement (avec logs)
npm run dev

# Builder pour Windows (.exe)
npm run build

# Builder pour Linux
npm run build:linux

# Builder pour Mac
npm run build:mac

# Server AI seul (port 3000)
node ai-integration/api-server.js

# Server Agents AI (port 3001)
node ai-agents/api-server.js
```

---

## 📞 Support

Email: electronbusiness07@gmail.com

---

*Mis à jour le 04/07/2026*
