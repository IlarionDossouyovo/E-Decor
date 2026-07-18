# E-Décor by Electron v1.1.0

Développé par OpenHands AI pour E-Décor - Entreprise e-commerce dropshipping spécialisée dans la décoration d'intérieur en partenariat avec ORCA-Décor.

[![Electron](https://img.shields.io/badge/Electron-41.2.0-blue)](https://www.electronjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green)](https://nodejs.org/)

## 🏠 Presentation

E-Décor est une application e-commerce pour la vente internationale de meubles et articles de decoration:
- **Salons**: Canapés, fauteuils, tables basses, meubles TV
- **Bureaux**: Bureaux exécutifs, fauteuils de direction, rangements
- **Cuisines**: Îlots, meubles bas, étageres
- **Jardins**: Salons extérieurs, transats, barbecues
- **Salles à manger**: Tables, chaises, buffets

## 🚀 Installation

```bash
# Cloner le depot
git clone https://github.com/IlarionDossouyovo/E-Decor.git
cd E-Decor

# Installer les dependances
npm install

# Lancer l'application
npm start
```

## 📦 Structure du projet

```
E-Decor/
├── main.js              # Processus principal Electron
├── preload.js          # API bridge securise
├── index.html         # Interface utilisateur
├── styles.css       # Styles CSS
├── renderer.js      # Logique frontend
├── package.json   # Configuration
├── assets/**/*    # Images et icônes
├── ai-integration/  # Integration AI (Ollama)
├── ai-agents/      # Systeme Agents AI 360°
└── web-version/    # Version web Vercel
```

## 🌐 Fonctionnalites (v1.2.0)

- Catalogue produits par categorie
- Articles de blog pour chaque categorie
- Recherche de produits
- Support multilingue (FR/EN)
- Design responsive
- Menu natif Electron
- **Panier avec persistence localStorage**
- **Gestion des quantites**
- **Animations et transitions UI**
- **Systeme de paiement (demo)**
- **Integration AI Ollama**
- **Systeme d'Agents AI 360°**

## 🛠️ Commandes

```bash
npm start          # Lancer l'application
npm run build       # Compiler pour Windows
npm run build:linux # Compiler pour Linux
npm run build:mac   # Compiler pour Mac
```

## 📦 Build et Distribution

Les builds compilés sont disponibles dans le dossier `dist/` :

| Fichier | Description | Taille |
|---------|-------------|--------|
| `E-Décor-1.2.0.AppImage` | Application Linux portable | ~115 MB |
| `e-decor_1.2.0_amd64.snap` | Paquet Snap Linux | ~96 MB |
| `linux-unpacked/` | Version décompressée Linux | ~257 MB |

### Exécuter le build Linux

```bash
# En tant qu'AppImage
chmod +x dist/E-Décor-1.2.0.AppImage
./dist/E-Décor-1.2.0.AppImage

# Ou via le dossier décompressé
./dist/linux-unpacked/e-decor
```

### Déploiement Web (Vercel)

1. Aller sur https://vercel.com
2. Importer le repo GitHub
3. Configurer : **Root Directory** = `web-version`
4. Deploy!

## 📝 license

MIT - E-Décor Team 2024

---

*Application creee par AI OpenHands pour E-Décor*