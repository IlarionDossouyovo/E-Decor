# Guide de mise à jour - E-Décor

Ce guide vous explique comment mettre à jour votre projet E-Décor local avec toutes les corrections et améliorations.

## ✅ Corrections déjà appliquées

1. **Dossier assets créé** - Structure prête pour les images
2. **Données blog corrigées** - Caractères mal encodés corrigés

---

## 📋 Étapes pour mettre à jour votre projet local

### Option 1 : Via Git (Recommandé)

```bash
# 1. Naviguer vers votre dossier E-Decor
cd E-Decor

# 2. Récupérer les dernières modifications
git pull origin main

# 3. Installer les dépendances (si nécessaire)
npm install
```

### Option 2 : Download manuel des fichiers

Si vous préférez télécharger manuellement :

1. Allez sur : https://github.com/IlarionDossouyovo/E-Decor
2. Téléchargez leZIP du projet
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

### 2. Installer Node.js (si pas encore fait)

```bash
# Vérifier si Node.js est installé
node --version

# Si pas installé, téléchargez depuis :
# https://nodejs.org (version LTS 20+)
```

---

### 3. Lancer l'application

```bash
# Installer les dépendances
npm install

# Lancer l'application
npm start
```

---

### 4. (Optionnel) Lancer les agents AI

Pour le système d'agents 360°, vous avez besoin d'Ollama :

```bash
# Installer Ollama
# Windows : winget install Ollama.Ollama
# OU téléchargez depuis https://ollama.com

# Dans un terminal séparé, lancer :
ollama serve

# Dans un autre terminal, lancer le serveur agents :
node ai-agents/api-server.js
```

---

## 🔧 Commandes utiles

```bash
# Lancer l'application
npm start

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
