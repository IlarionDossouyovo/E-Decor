const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');

let mainWindow;

// Données des catégories de produits
const categories = [
  {
    id: 'salons',
    name: 'Salons',
    name_en: 'Living Rooms',
    description: 'Meubles pour salons modernes et classiques',
    image: 'salon.jpg',
    products: [
      { id: 's1', name: 'Canapé modulable LINO', price: 1299, currency: '€', image: 'canoe-lino.jpg', description: 'Canapé 3 places modulable en tissu gris' },
      { id: 's2', name: 'Fauteuil relax électrique', price: 649, currency: '€', image: 'fauteuil-relax.jpg', description: 'Fauteuil relax avec relève-pieds électrique' },
      { id: 's3', name: 'Table basse carrée', price: 299, currency: '€', image: 'table-basse.jpg', description: 'Table basse en chêne massif 90x90cm' },
      { id: 's4', name: 'Meuble TV suspendu', price: 449, currency: '€', image: 'meuble-tv.jpg', description: 'Meuble TV 160cm avec rangements' },
      { id: 's5', name: 'Bibliothèque modulable', price: 549, currency: '€', image: 'bibliotheque.jpg', description: 'Étagère 5 modules ajustables' }
    ]
  },
  {
    id: 'bureaux',
    name: 'Bureaux',
    name_en: 'Offices',
    description: 'Mobilier de bureau professionnel et domestique',
    image: 'bureau.jpg',
    products: [
      { id: 'b1', name: 'Bureau exécutif oak', price: 799, currency: '€', image: 'bureau-executif.jpg', description: 'Bureau 160cm en chêne avec tiroirs' },
      { id: 'b2', name: 'Fauteuil de direction', price: 449, currency: '€', image: 'fauteuil-dir.jpg', description: 'Fauteuil ergonomique Mesh' },
      { id: 'b3', name: 'Caisson mobile 3 tiroirs', price: 189, currency: '€', image: 'caisson.jpg', description: 'Caisson sur roulettes mélaminé' },
      { id: 'b4', name: 'Bureau standing électrique', price: 999, currency: '€', image: 'bureau-standing.jpg', description: 'Bureau debout électrique hauteur variable' }
    ]
  },
  {
    id: 'cuisines',
    name: 'Cuisines',
    name_en: 'Kitchens',
    description: 'Équipements et meubles de cuisine',
    image: 'cuisine.jpg',
    products: [
      { id: 'c1', name: 'Îlot central cuisine', price: 1499, currency: '€', image: 'ilot-cuisine.jpg', description: 'Îlot 180cm avec plan de travail stratifié' },
      { id: 'c2', name: 'Meuble bas suspendu', price: 349, currency: '€', image: 'meub bas-cuisine.jpg', description: 'Meuble 60cm avec porte et tiroir' },
      { id: 'c3', name: 'Étagère murale chromée', price: 129, currency: '€', image: 'etagere-murale.jpg', description: 'Étagère 90cm polyvalente' }
    ]
  },
  {
    id: 'jardins',
    name: 'Jardins',
    name_en: 'Gardens',
    description: 'Mobilier d extérieur et de jardin',
    image: 'jardin.jpg',
    products: [
      { id: 'j1', name: 'Salon de jardin 6 pièces', price: 899, currency: '€', image: 'salon-jardin.jpg', description: 'Table + 4 fauteuilles + 2 bancs en树脂' },
      { id: 'j2', name: 'Transat pliant bois', price: 149, currency: '€', image: 'transat.jpg', description: 'Transat en bois d acacia avec toile' },
      { id: 'j3', name: 'Parasol déporté 3m', price: 249, currency: '€', image: 'parasol.jpg', description: 'Parasol déporté avec socle' },
      { id: 'j4', name: 'Barbecue Weber', price: 399, currency: '€', image: 'barbecue.jpg', description: 'Barbecue à charbon 57cm' }
    ]
  },
  {
    id: 'salle-a-manger',
    name: 'Salle à manger',
    name_en: 'Dining Rooms',
    description: 'Tables, chaises et meubles de salle à manger',
    image: 'salle-manger.jpg',
    products: [
      { id: 'sd1', name: 'Table extensible ALIZE', price: 899, currency: '€', image: 'table-extensible.jpg', description: 'Table 6-10 personnes extensible' },
      { id: 'sd2', name: 'Chaise tissu CARA', price: 149, currency: '€', image: 'chaise-cara.jpg', description: 'Chaise upholstrée avec pieds bois' },
      { id: 'sd3', name: 'Buffet 4 portes', price: 699, currency: '€', image: 'buffet.jpg', description: 'Buffet 180cm en bois massif' },
      { id: 'sd4', name: 'Vaisselier moderne', price: 549, currency: '€', image: 'vaisselier.jpg', description: 'Vaisselier 2 tiroirs + niches' }
    ]
  }
];

// Articles de blog par catégorie
const blogArticles = {
  salons: [
    {
      id: 'salon-design-2024',
      title: 'Tendances salon 2024 : Le minimalisme scandinave',
      title_en: 'Living Room Trends 2024: Scandinavian Minimalism',
      excerpt: 'Découvrez comment intégrer le style scandinave dans votre salon pour un espace lumineux et accueillant.',
      content: `Le style scandinave continue de dominer les tendances décoration en 2024. Caractérisé par des lignes épurées, des couleurs neutres et des matériaux naturels, il transforme n\'importe quel salon en espace de vie agréable.

## Les principes clés

1. **Couleurs neutres** : Blanc cassé, gris clair, beige naturel
2. **Matériaux durables** : Bois naturel, lin, laine
3. **Lumière maximisée** : Grands espaces,Rideaux légers
4. **Fonctionnalité** : Meubles multifonctions

## Comment adopter ce style ?

Choisissez des meubles aux lignes simples comme notre canapé LINO ou notre table basse en chêne massif. Ajoutez des touches de textiles avec des coussins en lin naturel et des plaids en laine.

Les meubles modulables sont particulièrement adaptés : ils permettent d\'adapter l\'espace selon vos besoins tout en conservant une esthétique épurée.

##Conseil pro

Optez pour des meubles avec des pieds fins qui laissent voir le sol - cela donne une impression d\'espace et de légèreté.`,
      author: 'Marie Dupont',
      date: '2024-01-15',
      image: 'blog-salon-scandinave.jpg'
    },
    {
      id: 'salon-espace-ouvert',
      title: 'Salon open space : Comment créer des zones',
      title_en: 'Open Space Living: Creating Distinct Zones',
      excerpt: 'Apprenez à délimiter visuellement les espaces dans un salon open space sans utiliser de cloisons.',
      content: `Dans les logements modernes, le salon souvent ouvert sur la cuisine ou la salle à manger. Comment créer une separation visuelle harmonieuse ?

## Techniques de délimitation

### 1. Variation de niveau
Créer une différence de hauteur de quelques centimètres avec undeck ou un tapis sur mesure.

### 2. Changement de sol
Utiliser des revêtements différents : parquet dans le salon, carrelage dans la cuisine.

### 3. Elements de mobilier
Un canapé peut servir de élément séparateur tout en restant confortable.

### 4. Éclairage分区
Installer des éclairages différents pour chaque zone : lumière froide pour le coin travail, lumière chaude pour le coin salon.

## Exemple pratique

Dans un espace de 40m² ouvert :
- Zone Salon : Canapé + table basse +电视 (face au-canapé)
- Zone Salle à manger : Table + chaises (près de la cuisine)
- Zone Travail : Petit bureau + chaise (près de la fenêtre)

Utilisez des tapis pourUnifier chaque zone.`,
      author: 'Jean Martin',
      date: '2024-02-20',
      image: 'blog-open-space.jpg'
    }
  ],
  bureaux: [
    {
      id: 'bureau-productif',
      title: '10 conseils pour un bureau productif',
      title_en: '10 Tips for a Productive Office',
      excerpt: 'Optimisez votre espace de travail pour améliorer votre concentration et votre productivité au quotidien.',
      content: `Un bureau bien aménagé est essentiel pour rester productif. Voici nos 10 conseils essentiels.

## L'environnement physique

1. **Lumière naturelle** : Placez votre bureau près d'une fenêtre
2. **Ergonomie** : Choisir une chaise avec soutien lombaire
3. **Organisation** : Chaque chose à sa place
4. **Plantes** : Ajoutez des vertes pour réduire le stress

## L'équipement essentiel

5. **Bureau adapté** : Hauteur permettant les pieds sous le bureau
6. **Écran à bonne hauteur** : Haut du écran à hauteur des yeux
7. **Support clavier** : Pour les avant-bras horizontaux

## Les outils numériques

8. **Gestionnaire de tâches** : Trello, Notion...
9. **Temps de concentración** : Application comme Forest
10. **Sauvegarde régulière** : Ne perdez pas votre travail

## Le mot de la fin

Le meilleur aménagement est celui qui vous correspond. Expérimentez et adjust selon votre ressenti.`,
      author: 'Sophie Bernard',
      date: '2024-03-10',
      image: 'blog-bureau-productif.jpg'
    },
    {
      id: 'bureau-domicile',
      title: 'Créer un bureau à domicile inspirationnel',
      title_en: 'Creating an Inspirational Home Office',
      excerpt: 'Guide complet pour concevoir un espace de travail à domicile qui vous inspire au quotidien.',
      content: `Le travail à domicile devient la norme. Comment créer un espace qui donne envie de travailler ?

## Choisir le bon emplacement

### Près de la lumière
Préférez une orientation nord ou est pour une lumière constante sans éblouissement.

### Éloigné des distractions
Évitez la cuisine et les zones de passage.

### Espace clos ou ouvert ?
Un bureau fermé est plus propice à la concentration, mais un coin bureaus ouvert permet de rester connecté à la famille.

## Le mobilier essentiel

- **Bureau** : 120-160cm minimum
- **Chaise ergonomique** : Investissement prioritaire
- **Rangement** : Ètagères ou-caisson

## LaPersonalisation

Ajoutez des éléments qui vous inspirent :
- Tableau d'inspiration
- Plantes
- Objets souvenirs
- Citations motivantes

L'important est de se sentir bien pour être productif.`,
      author: 'Pierre Lefebvre',
      date: '2024-04-05',
      image: 'blog-bureau-domicile.jpg'
    }
  ],
  cuisines: [
    {
      id: 'cuisine-moderne',
      title: 'Cuisine moderne : Les erreurs à éviter',
      title_en: 'Modern Kitchen: Mistakes to Avoid',
      excerpt: 'Découvrez les erreurs courantes lors de l\'aménagement d\'une cuisine et comment les éviter.',
      content: `L'aménagement d'une cuisine est un projet complexe. Voici les erreurs à éviter absoluments.

## Erreurs d'agencement

### 1. Triangle d'activité rompu
Le réfrigérateur, l'évier et la table de cuisson doivent former un triangle idéal de moins de 3.60m par côté.

### 2. Espace de travail insuffisant
Prévoyez au moins 60cm de plan de travail de chaque côté du évier.

### 3. Éclairage mal placé
Un seul plafonnier crée des ombres. Combinez éclairage général, plan de travail et éclairage d'appoint.

## Erreurs de stockage

### 4. Placards trop hauts
Les objets quotidiens doivent être accessibles sans escabeau.

### 5. Tiroirs mal conçus
Préférez les tiroirs aux placards pour une meilleure visibility.

### 6. Pas assez de rangement
Penser à laverticalité avec des étagères murales.

## Erreurs de style

### 7. Trop de tendances
Choisissez desClassiques qui dureront.

### 8. Ignoring ventilation
Une hotte puissante est essentielle.

Planifiez soigneusement et consultez un professionnel.`,
      author: 'Claire Moreau',
      date: '2024-01-25',
      image: 'blog-cuisine-erreurs.jpg'
    },
    {
      id: 'cuisine-couteau',
      title: 'Les ustensiles indispensables',
      title_en: 'Essential Kitchen Utensils',
      excerpt: 'Liste des ustensiles de cuisine essentiels pour équiper votre cuisine correctement.',
      content: `Une cuisine bien équipée fait la différence. Voici les ustensiles indispensables.

## Ustensiles de base

### Coupe
- Couteau chef 20cm
- Couteau office 10cm
- Planche à decouper

### Cuisson
- Casserole 20cm
- Sauteuse 28cm
- Poêle 24cm

### Préparation
- Maryse
- Fouet
- Spatule
- Cuiller en bois

## Ustensiles spécialisés

### Blender
Indispensable pour les smoothies et soupes.

### Robot culinary
Pour gagner du temps sur les tâches répétitives.

### Balance
Pour la pâtisserie précise.

## Qualité vs Quantité

Mieux vaut quelques ustensiles de qualité que beaucoup deMediocre. Investissez dans :
- Un bon couteau (Sharp)
- Une poêle en fonte
- Une casserole en inox

Ces outils vous serviront des années.`,
      author: 'Marie Dupont',
      date: '2024-03-01',
      image: 'blog-cuisine-ustensiles.jpg'
    }
  ],
  jardins: [
    {
      id: 'jardin-convivial',
      title: 'Créer un espace extérieur convivial',
      title_en: 'Creating a Welcoming Outdoor Space',
      excerpt: 'Transformez votre jardin en espace de vie supplémentaire pour profiter des beaux jours.',
      content: `Le jardin est une pièce à vivre supplémentaire. Comment l'amobilier pour qu'il devienne le lieu privilégié de vos été ?

## Definir les zones

### Zone repas
Table + chaises pour les repas en plein air.

### Zone détente
Salon de jardin ou transats pour la relaxation.

### Zone BBQ
Espace dédié au barbecue et à la cuisson.

## Choisir le bon mobilier

### Matériaux résilients
- Résine tressée : léger et résistant
- Bois exotique : noble mais entretien regular
- Aluminium : léger et moderne

### Confort
Choisir des coussins déhoussables et lavables.

## Accessoires indispensables

### Parasol ou pergola
Pour se protéger du soleil.

### Éclairage
Guirlandes lumineuses ou lanternes.

### heating
Brasero ou fireplace extérieur pour les soirs fraîcheur.

## Entretien

Lassez choisi des matériaux nécessitant peu d'entretien. Un mobilier de qualité demande quelques minutes par Saison.`,
      author: 'Laurent Petit',
      date: '2024-05-15',
      image: 'blog-jardin-convivial.jpg'
    },
    {
      id: 'jardin-petit-espace',
      title: 'Aménagements pour petit balcon',
      title_en: 'Small Balcony Solutions',
      excerpt: 'Idées astucieuses pour transformer un petit balcon en oasis urbaine.',
      content: `Pas besoin de grand espace pour créer un coin détente extérieur. Voici comment optimiser un petit balcon.

## Optimiser l'espace

### Meubles rabattables
Table et chaises rabattables contre le mur.

### Utiliser la hauteur
Étagères murales, jardinières suspendues.

### Rangement intégré
Coffre de rangement qui fait aussi banquette.

## Solutions verticales

### Jardinières murales
Pour cultiver herbes et fleurs sans emprise au sol.

### Treillis
Pour les plantes grimpantes et créer un écran de verdure.

## Choix du mobilier

### Dimensions réduites
Choisir des meubles compacts.

### Multifonction
Banc avec rangement, table basse avec range-coussins.

### Léger
Mobilier léger pour faciliter le rangement l'hiver.

## Ambiance

### Éclairage LED
Consommation faible, ambiance assuré.

### Végétaux
Même un petit balcon peut accueillir plantes aromatiques.

### Tapis extérieur
Pour délimiter l'espace et apporte du confort.

L'erreur à éviter : surcharger. Moins c'est plus sur un petit espace.`,
      author: 'Sophie Bernard',
      date: '2024-06-01',
      image: 'blog-petit-balcon.jpg'
    }
  ],
  'salle-a-manger': [
    {
      id: 'salle-manger-famille',
      title: 'Salle à manger familiale : Les bonnes dimensions',
      title_en: 'Family Dining Room: Right Dimensions',
      excerpt: 'Guide pour choisir la table et les chaises parfaits pour votre salle à manger familiale.',
      content: `La salle à manger est le cœur de la maison familiale. Comment choisir le bon mobilier ?

## Calculer l'espace nécessaire

### Table pour 4 personnes
Table 90x90cm minimum : 160x160cm avec places.

### Table pour 6 personnes
Table 140x80cm : 240x180cm avec places.

### Table pour 8 personnes
Table 180x90cm : 280x190cm avec places.

## Choisir la bonne hauteur

### Table standard
75cm de hauteur.

### Chaises
45-48cm de hauteur d'assise.

### Relation table-chaises
Il doit y avoir 25-30cm entre l'assise et le dessous du plateau.

## Formes de tables

### Rectangle
Classique et polyvalent.

### Ovale
Plus chaleureux, adapté aux échanges.

### Ronde
Idéale pour la conversation, mais prend plus de place.

## Materiaux

### Bois massif
Noble et durable mais entretien.

### Verre
Moderne et facile d'entretien.

### Stratifié
Pratique et économique.

Choisirselon le Style de votre intérieur et votre budget.`,
      author: 'Jean Martin',
      date: '2024-02-10',
      image: 'blog-salle-manger-famille.jpg'
    },
    {
      id: 'salle-manger-style',
      title: 'Styles de salle à manger : Trouvez le vôtre',
      title_en: 'Dining Room Styles: Find Your Match',
      excerpt: 'Découvez les différents styles de salle à manger et trova quello più adatto al vostro interno.',
      content: `Chaque style de salle à manger reflète votre personnalité. Découvrir les tendances principales.

## Style scandinave

### Caractéristiques
Lignes épurées, bois clair, couleurs neutres.

### Mobilier
Table et chaises en bois naturel, formes simples.

### Accessoires
Textileslin, plaids en laine.

## Style industriel

### Caractéristiques
Matériaux bruts,、金属, brique.

### Mobilier
Table en metal et bois, chaises en cuir.

### Accessoires
Éclairage apparent, objets manufacturés.

## Style classique

### Caractéristiques
Élégance, détails sculptés.

### Mobilier
Table en bois sombre, chaises upholstrées.

### Accessoires
Vaisselier, tableaux classiques.

## Style japandi

### Caractéristiques
Fusion japonais-scandinave, Minimalisme.

### Mobilier
Lignes très épurées, bois clair.

### Accessoires
Très peu, chaque objet compte.

## Comment choisir ?

1. Regardez ce qui vous plaitsur les magazines
2. Considérez votreStyle de vie
3. Pensez à la durée - les tendances passent

Le meilleurStyle est celui qui vous ressemble.`,
      author: 'Marie Dupont',
      date: '2024-04-20',
      image: 'blog-salle-manger-style.jpg'
    }
  ]
};

// Blog posts globaux
const globalBlogPosts = [
  {
    id: 'bien-choisir-meubles',
    title: 'Comment bien choisir ses meubles',
    title_en: 'How to Choose Furniture Well',
    excerpt: 'Guide complet pour choisir des meubles de qualité qui dureront dans le temps.',
    content: `Choisir ses meubles est un investissement important. Voici nos conseils pour faire le bon choix.

## Critères de qualité

### Structure
Vérifier les jointures et assembleurs. Le bois massif estpreferable aux panneaux.

### Finitions
Pas de défauts visibles, toucher lisse.

### Stabilité
Meuble droit qui ne bascule pas.

## Matériaux à privilégier

### Bois massif
Chêne, noyer, hêtre - durables et repairables.

### Métal
Acier, aluminium - moderne et résistant.

### Tissus
Lin, coton, cuir - facile d'entretien et durable.

##Budget

### Entrée de gamme
Pour les locations ou premier appartement.

### Milieu de gamme
Le meilleur rapport qualité-prix.

### Haut de gamme
Investissement pour long terme.

## Questions à se poser

1. Quelle est la fréquence d'utilisation ?
2. Ai-je des enfants ?
3. Vais-je dém搬迁 ?
4. QuelStyle je souhaite ?

Les meilleures décisions viennent après réflexion.`,
    author: 'Pierre Lefebvre',
    date: '2024-01-01',
    image: 'blog-bien-choisir.jpg'
  },
  {
    id: 'tendances-2024',
    title: 'Tendances décoration 2024',
    title_en: 'Decor Trends 2024',
    excerpt: 'Découvrez les tendances qui marqueront la decoration cette année.',
    content: `Les tendances décoration 2024 reflètent un besoin de chaleur et d'authenticité.

## Couleurs tendances

### Terres cuites
Orange cuivré, terre d'ombre - apporte de la chaleur.

### Verts-deep
Vert forêt, sauge - rappele la nature.

### Crèmes
Ivoire, champagne - luminosité et douceur.

## Matériaux stars

### Terre cuite
Poteries, tuiles, objets decoration.

### Verre texturé
Parois, cloches, abat-jour.

### Métal martelé
Luminaires,ubinature, objets.

## Styles dominants

### Japandi
Fusion japonais-scandinave, Minimalisme wisdom.

### Cottage-core
Style campagne romantique, fleurs, bois naturel.

### Maximalisme
Oser les motifs, les couleurs, lesSuperpositions.

## Comment adopter

1. Commencer par les accessoires
2. Tester avant de s'engager
3. Mixer avec l'existant

Les tendances sont des inspirations, non des obligations.`,
    author: 'Claire Moreau',
    date: '2024-01-10',
    image: 'blog-tendances-2024.jpg'
  },
  {
    id: 'durabilite-meubles',
    title: 'Meubles durables : Investissement Malin',
    title_en: 'Sustainable Furniture: Smart Investment',
    excerpt: 'Pourquoi choisir des meubles durables est un choix économique et écologique intelligently.',
    content: `Face à l'obsolescence programmée, choisir des meubles durables devient un acte responsible.

## L'aspect économique

### Coût initial vs Coût global
Un meuble bon marché dura 2-3 ans.
Un meuble de qualité dure 10-20 ans.
Le coût annuel est souvent inférieur.

### Réparation vs Remplacement
Les meubles de qualité sont réparables.
Les meubles low-cost sont jetables.

## L'aspect environnemental

### Impact carbone
Moins de production = moins d'émissions.

### Déchet减少
Moins de meubles jetés.

### Ressources
Le bois massif gère mieux que les panneaux.

## Comment reconnaître qualité

### Labels
FSC, PEFC, Écolabel européen.

### Fabrication
Made in France/Europe = standards élevés.

### Garantie
5-10 ans de garantie = confiance.

## Entretien

Un meuble de qualité se/entretient facilement :
- Depoussiérage régulier
- Traitement 1-2 fois par an
- Rparation immédiate des dommages

Choisir durable, c'est penser à demain.`,
    author: 'Laurent Petit',
    date: '2024-03-20',
    image: 'blog-durabilite.jpg'
  }
];

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets', 'icon.png'),
    title: 'E-Décor - Meubles & Décoration'
  });

  mainWindow.loadFile('index.html');

  // Créer le menu
  const menuTemplate = [
    {
      label: 'Fichier',
      submenu: [
        { label: 'Accueil', click: () => mainWindow.webContents.send('navigate', 'home') },
        { label: 'Catalogue', click: () => mainWindow.webContents.send('navigate', 'catalog') },
        { type: 'separator' },
        { label: 'Quitter', role: 'quit' }
      ]
    },
    {
      label: 'Catégories',
      submenu: [
        { label: 'Salons', click: () => mainWindow.webContents.send('navigate', 'category', 'salons') },
        { label: 'Bureaux', click: () => mainWindow.webContents.send('navigate', 'category', 'bureaux') },
        { label: 'Cuisines', click: () => mainWindow.webContents.send('navigate', 'category', 'cuisines') },
        { label: 'Jardins', click: () => mainWindow.webContents.send('navigate', 'category', 'jardins') },
        { label: 'Salle à manger', click: () => mainWindow.webContents.send('navigate', 'category', 'salle-a-manger') }
      ]
    },
    {
      label: 'Blog',
      submenu: [
        { label: 'Tous les articles', click: () => mainWindow.webContents.send('navigate', 'blog') },
        { type: 'separator' },
        { label: 'Articles tendances', click: () => mainWindow.webContents.send('navigate', 'blog-category', 'tendances') }
      ]
    },
    {
      label: 'Affichage',
      submenu: [
        { label: 'Plein écran', role: 'togglefullscreen' },
        { type: 'separator' },
        { label: 'Zoom +', role: 'zoomIn' },
        { label: 'Zoom -', role: 'zoomOut' },
        { label: 'Réinitialiser', role: 'resetZoom' }
      ]
    },
    {
      label: 'Aide',
      submenu: [
        { label: 'À propos', click: () => mainWindow.webContents.send('show-about') },
        { label: 'Développeur', role: 'toggleDevTools' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC handlers pour récupérer les données
ipcMain.handle('get-categories', () => {
  return categories;
});

ipcMain.handle('get-products', (event, categoryId) => {
  const category = categories.find(c => c.id === categoryId);
  return category ? category.products : [];
});

ipcMain.handle('get-product', (event, categoryId, productId) => {
  const category = categories.find(c => c.id === categoryId);
  if (category) {
    return category.products.find(p => p.id === productId);
  }
  return null;
});

ipcMain.handle('get-blog-articles', (event, categoryId) => {
  if (categoryId && blogArticles[categoryId]) {
    return blogArticles[categoryId];
  }
  return globalBlogPosts;
});

ipcMain.handle('get-global-blog', () => {
  return globalBlogPosts;
});

ipcMain.handle('get-blog-post', (event, postId) => {
  // Chercher dans les articles globaux
  let post = globalBlogPosts.find(p => p.id === postId);
  if (post) return post;
  
  // Chercher dans les articles par catégorie
  for (const catArticles of Object.values(blogArticles)) {
    post = catArticles.find(p => p.id === postId);
    if (post) return post;
  }
  return null;
});

ipcMain.handle('get-all-categories', () => {
  return categories;
});

ipcMain.handle('search-products', (event, query) => {
  const results = [];
  const lowerQuery = query.toLowerCase();
  
  categories.forEach(category => {
    category.products.forEach(product => {
      if (product.name.toLowerCase().includes(lowerQuery) || 
          product.description.toLowerCase().includes(lowerQuery)) {
        results.push({
          ...product,
          categoryId: category.id,
          categoryName: category.name
        });
      }
    });
  });
  
  return results;
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});