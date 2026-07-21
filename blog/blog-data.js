// E-Décor Blog - Blog Posts Data
// Blog SEO Premium pour la décoration

const blogCategories = [
  { id: 'decoration', name: 'Décoration', slug: 'decoration', count: 85, icon: '🏠' },
  { id: 'architecture', name: 'Architecture', slug: 'architecture', count: 42, icon: '🏗️' },
  { id: 'immobilier', name: 'Immobilier', slug: 'immobilier', count: 38, icon: '🏢' },
  { id: 'mobilier', name: 'Mobilier', slug: 'mobilier', count: 56, icon: '🛋️' },
  { id: 'jardin', name: 'Jardin', slug: 'jardin', count: 34, icon: '🌳' },
  { id: 'maison', name: 'Maison', slug: 'maison', count: 72, icon: '🏡' },
  { id: 'cuisine', name: 'Cuisine', slug: 'cuisine', count: 48, icon: '🍳' },
  { id: 'salon', name: 'Salon', slug: 'salon', count: 52, icon: '🛋️' },
  { id: 'chambre', name: 'Chambre', slug: 'chambre', count: 36, icon: '🛏️' },
  { id: 'bureau', name: 'Bureau', slug: 'bureau', count: 28, icon: '💼' },
  { id: 'restaurant', name: 'Restaurant', slug: 'restaurant', count: 22, icon: '🍽️' },
  { id: 'hotel', name: 'Hôtel', slug: 'hotel', count: 18, icon: '🏨' },
  { id: 'couleurs', name: 'Couleurs', slug: 'couleurs', count: 44, icon: '🎨' },
  { id: 'eclairage', name: 'Éclairage', slug: 'eclairage', count: 32, icon: '💡' },
  { id: 'tendances', name: 'Tendances', slug: 'tendances', count: 65, icon: '📈' },
  { id: 'minimalisme', name: 'Minimalisme', slug: 'minimalisme', count: 28, icon: '⬜' },
  { id: 'luxe', name: 'Luxe', slug: 'luxe', count: 24, icon: '💎' },
  { id: 'design-moderne', name: 'Design moderne', slug: 'design-moderne', count: 45, icon: '🔷' },
  { id: 'design-africain', name: 'Design africain', slug: 'design-africain', count: 32, icon: '🌍' },
  { id: 'domotique', name: 'Domotique', slug: 'domotique', count: 26, icon: '🏠' },
  { id: 'maison-intelligente', name: 'Maison intelligente', slug: 'maison-intelligente', count: 22, icon: '🤖' },
  { id: 'ecologie', name: 'Écologie', slug: 'ecologie', count: 30, icon: '🌱' },
  { id: 'ia', name: 'IA & Tech', slug: 'ia', count: 38, icon: '🤖' },
  { id: 'business', name: 'Business', slug: 'business', count: 42, icon: '💰' },
  { id: 'dropshipping', name: 'Dropshipping', slug: 'dropshipping', count: 35, icon: '📦' },
  { id: 'marketing', name: 'Marketing', slug: 'marketing', count: 48, icon: '📢' },
  { id: 'ecommerce', name: 'E-commerce', slug: 'ecommerce', count: 40, icon: '🛒' }
];

const blogPosts = [
  {
    id: 'b1',
    title: '10 tendances décoration intérieure 2026',
    title_en: '10 interior design trends 2026',
    slug: 'tendances-decoration-interieur-2026',
    category: 'tendances',
    excerpt: 'Découvrez les tendances qui vont révolutionner la décoration intérieure cette année.',
    excerpt_en: 'Discover the trends that will revolutionize interior decoration this year.',
    content: `
## Les tendances décoration 2026

L'année 2026 apporte son lot de nouveautés dans le monde de la décoration intérieure. Voici les 10 tendances à suivre...

### 1. Le retour du maximalisme colors

Fini le minimalisme extrême! En 2026, les couleurs vives et les motifs audacieux font leur grand retour...

### 2. Le bois naturel

Le bois brut et les finitions naturelles sont plus populaires que jamais...

### 3. Le design biophilique

Intégrer la nature dans nos espaces de vie devient une priorité...

[Contenu complet en développement]
    `,
    thumbnail: 'blog-tendances-2026.jpg',
    author: {
      name: 'Marie Dubois',
      avatar: 'author-1.jpg',
      role: 'Architecte d\'intérieur'
    },
    date: '2026-01-15',
    readTime: '8 min',
    views: 15420,
    likes: 342,
    comments: 28,
    featured: true,
    seo: {
      metaTitle: '10 tendances décoration intérieure 2026 | E-Décor',
      metaDescription: 'Découvrez les tendances décoration 2026: couleurs vives, bois naturel, design biophilique. Guide complet pour votre intérieur.',
      keywords: ['tendances decoration 2026', 'decoration interieur', 'tendances couleurs', 'design interieur'],
      ogImage: 'blog-tendances-2026-og.jpg'
    },
    tags: ['tendances', '2026', 'decoration', 'interieur'],
    products: ['s1', 's2', 's3']
  },
  {
    id: 'b2',
    title: 'Guide complet: Comment choisir ses meubles',
    title_en: 'Complete guide: How to choose your furniture',
    slug: 'guide-choisir-meubles',
    category: 'mobilier',
    excerpt: 'Un guide complet pour bien choisir vos meubles selon votre style, votre budget et vos besoins.',
    excerpt_en: 'A complete guide to choosing your furniture according to your style, budget and needs.',
    content: `
## Comment choisir ses meubles?

Choisir ses meubles est une décision importante qui impactera votre quotidien pendant des années...

### Critères essentiels

1. **La qualité des matériaux**
2. **Le confort**
3. **Le style**
4. **Le budget**

[Contenu complet en développement]
    `,
    thumbnail: 'blog-choisir-meubles.jpg',
    author: {
      name: 'Jean-Pierre Moreau',
      avatar: 'author-2.jpg',
      role: 'Designer furniture'
    },
    date: '2026-01-10',
    readTime: '12 min',
    views: 8950,
    likes: 198,
    comments: 15,
    featured: true,
    seo: {
      metaTitle: 'Guide choisir ses meubles | E-Décor',
      metaDescription: 'Guide complet pour choisir vos meubles: qualité, confort, style, budget. Conseils d\'experts.',
      keywords: ['choisir meuble', 'guide meuble', 'achat meuble', 'conseil decoration'],
      ogImage: 'blog-choisir-meubles-og.jpg'
    },
    tags: ['guide', 'meubles', 'achat', 'conseil'],
    products: ['s1', 's4', 's5']
  },
  {
    id: 'b3',
    title: 'La psychologie des couleurs dans la décoration',
    title_en: 'Color psychology in decoration',
    slug: 'psychologie-couleurs-decoration',
    category: 'couleurs',
    excerpt: 'Comprenez comment les couleurs influencent notre humeur et notre bien-être.',
    excerpt_en: 'Understand how colors influence our mood and well-being.',
    content: `
## La psychologie des couleurs

Les couleurs ne sont pas simplement esthétiques - elles ont un impact réel sur notre psychologie...

### Le bleu: Calme et confiance

Le bleu est associé à la calm, à la confiance et à la productivité...

### Le rouge: Énergie et passion

Le rouge stimule et energetise mais peut aussi aggraver...

[Contenu complet en développement]
    `,
    thumbnail: 'blog-couleurs.jpg',
    author: {
      name: 'Sophie Martin',
      avatar: 'author-3.jpg',
      role: 'Coloriste professionnelle'
    },
    date: '2026-01-08',
    readTime: '10 min',
    views: 12300,
    likes: 287,
    comments: 22,
    featured: true,
    seo: {
      metaTitle: 'Psychologie des couleurs décoration | E-Décor',
      metaDescription: 'Guide psychologie des couleurs: comment les couleurs influencent notre humeur. Tout savoir sur les couleurs.',
      keywords: ['psychologie couleurs', 'couleurs decoration', 'signification couleurs', 'couleur interieur'],
      ogImage: 'blog-couleurs-og.jpg'
    },
    tags: ['couleurs', 'psychologie', 'bien-etre', 'decoration'],
    products: []
  },
  {
    id: 'b4',
    title: '5 erreurs à éviter en décoration salon',
    title_en: '5 mistakes to avoid in living room decoration',
    slug: 'erreurs-decoration-salon',
    category: 'salon',
    excerpt: 'Évitez ces 5 erreurs courantes qui peuvent ruiner l\'ambiance de votre salon.',
    excerpt_en: 'Avoid these 5 common mistakes that can ruin your living room atmosphere.',
    content: `
## Erreurs courantes en décoration salon

Le salon est souvent la pièce maîtresse de la maison. Voici les erreurs à éviter...

### 1. Trop de meubles

L'erreur la plus fréquente: surcharger l'espace...

### 2. Mauvaise proportion

Les meubles doivent être proportionnels à la pièce...

[Contenu complet en développement]
    `,
    thumbnail: 'blog-erreurs-salon.jpg',
    author: {
      name: 'Marie Dubois',
      avatar: 'author-1.jpg',
      role: 'Architecte d\'intérieur'
    },
    date: '2026-01-05',
    readTime: '6 min',
    views: 9800,
    likes: 215,
    comments: 18,
    featured: false,
    seo: {
      metaTitle: '5 erreurs à éviter en décoration salon | E-Décor',
      metaDescription: 'Évitez ces 5 erreurs en décoration salon: trop de meubles, mauvaise proportion, mauvais éclairage.',
      keywords: ['erreurs decoration', 'decoration salon', 'conseil decoration', 'eviter erreur'],
      ogImage: 'blog-erreurs-salon-og.jpg'
    },
    tags: ['erreurs', 'salon', 'decoration', 'conseil'],
    products: ['s1', 's3']
  },
  {
    id: 'b5',
    title: 'L\'IA révolutionne la décoration d\'intérieur',
    title_en: 'AI revolutionizes interior decoration',
    slug: 'ia-revolution-decoration',
    category: 'ia',
    excerpt: 'Découvrez comment l\'intelligence artificielle transforme le métier de décorateur.',
    excerpt_en: 'Discover how artificial intelligence is transforming the decorator profession.',
    content: `
## L'IA dans la décoration

L'intelligence artificielle révolutionne tous les métiers, et la décoration n'y échappe pas...

### Génération d'images

Les outils comme Midjourney et DALL-E permettent de visualiser des projets en quelques secondes...

### Palettes de couleurs

L'IA peut générer des palettes de couleurs cohérentes basées sur des photos...

[Contenu complet en développement]
    `,
    thumbnail: 'blog-ia-decoration.jpg',
    author: {
      name: 'Alexandre Martin',
      avatar: 'author-4.jpg',
      role: 'Expert IA & Design'
    },
    date: '2026-01-03',
    readTime: '15 min',
    views: 18200,
    likes: 456,
    comments: 35,
    featured: true,
    seo: {
      metaTitle: 'L\'IA révolutionne la décoration | E-Décor',
      metaDescription: 'Comment l\'IA révolutionne la décoration: Midjourney, DALL-E, palettes de couleurs. Le futur de la decoration.',
      keywords: ['ia decoration', 'ai decoration', 'intelligence artificielle', 'midjourney', 'dalle'],
      ogImage: 'blog-ia-decoration-og.jpg'
    },
    tags: ['ia', 'ai', 'technologie', 'futur', 'innovation'],
    products: []
  }
];

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { blogCategories, blogPosts };
}
