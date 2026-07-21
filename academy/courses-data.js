// E-Décor Academy - Course Data
// Formation: Décoration intérieure, extérieur, architecture, etc.

const courseCategories = [
  { id: 'decoration-interieur', name: 'Décoration intérieure', name_en: 'Interior Decoration', icon: '🏠', count: 45 },
  { id: 'decoration-exterieur', name: 'Décoration extérieure', name_en: 'Exterior Decoration', icon: '🌳', count: 23 },
  { id: 'architecture', name: 'Architecture d\'intérieur', name_en: 'Interior Architecture', icon: '🏗️', count: 18 },
  { id: 'home-staging', name: 'Home Staging', name_en: 'Home Staging', icon: '✨', count: 12 },
  { id: 'mobilier', name: 'Mobilier', name_en: 'Furniture', icon: '🛋️', count: 32 },
  { id: 'couleurs', name: 'Couleurs', name_en: 'Colors', icon: '🎨', count: 15 },
  { id: 'eclairage', name: 'Éclairage', name_en: 'Lighting', icon: '💡', count: 20 },
  { id: 'feng-shui', name: 'Feng Shui', name_en: 'Feng Shui', icon: '☯️', count: 10 },
  { id: 'design-contemporain', name: 'Design contemporain', name_en: 'Contemporary Design', icon: '🔷', count: 25 },
  { id: 'design-africain', name: 'Design africain', name_en: 'African Design', icon: '🌍', count: 18 },
  { id: 'decoration-commerciale', name: 'Décoration commerciale', name_en: 'Commercial Decoration', icon: '🏢', count: 14 },
  { id: 'marketing', name: 'Marketing pour décorateurs', name_en: 'Marketing for Decorators', icon: '📈', count: 22 },
  { id: 'vente', name: 'Vente de décoration', name_en: 'Decoration Sales', icon: '💰', count: 16 },
  { id: 'dropshipping', name: 'Dropshipping décoration', name_en: 'Decoration Dropshipping', icon: '📦', count: 28 },
  { id: 'ia-decorateurs', name: 'IA pour décorateurs', name_en: 'AI for Decorators', icon: '🤖', count: 35 }
];

const courses = [
  {
    id: 'c1',
    title: 'Décorer son salon comme un pro',
    title_en: 'Decorate your living room like a pro',
    category: 'decoration-interieur',
    description: 'Apprenez les bases de la décoration intérieure pour transformer votre salon en espace de vie élégant et fonctionnel.',
    description_en: 'Learn the basics of interior decoration to transform your living room into an elegant and functional living space.',
    thumbnail: 'course-salon.jpg',
    duration: '4h30',
    level: 'beginner',
    lessons: 12,
    students: 1250,
    rating: 4.8,
    price: 49.99,
    currency: '€',
    instructor: {
      name: 'Marie Dubois',
      avatar: 'instructor-1.jpg',
      title: 'Architecte d\'intérieur'
    },
    objectives: [
      'Comprendre les principes de base de la décoration',
      'Choisir les bonnes couleurs pour son salon',
      'Optimiser l\'espace et la disposition des meubles',
      'Créer une ambiance chaleureuse et personnalisée'
    ],
    syllabus: [
      { title: 'Introduction à la décoration', duration: '15 min' },
      { title: 'Les styles de décoration', duration: '25 min' },
      { title: 'Couleurs et psychologie', duration: '30 min' },
      { title: 'Disposition des meubles', duration: '20 min' },
      { title: 'Éclairage et ambiance', duration: '25 min' },
      { title: 'Accessoires et细节', duration: '20 min' },
      { title: 'Projet final', duration: '45 min' }
    ],
    tags: ['salon', 'décoration', 'beginner', 'bases'],
    featured: true,
    published: true
  },
  {
    id: 'c2',
    title: 'Feng Shui complet pour la maison',
    title_en: 'Complete Feng Shui for the home',
    category: 'feng-shui',
    description: 'Maîtrisez l\'art du Feng Shui pour harmoniser votre espace de vie et améliorer votre bien-être.',
    description_en: 'Master the art of Feng Shui to harmonize your living space and improve your well-being.',
    thumbnail: 'course-fengshui.jpg',
    duration: '6h00',
    level: 'intermediate',
    lessons: 18,
    students: 890,
    rating: 4.9,
    price: 79.99,
    currency: '€',
    instructor: {
      name: 'Li Wei',
      avatar: 'instructor-2.jpg',
      title: 'Maître Feng Shui'
    },
    objectives: [
      'Comprendre les principes fondamentaux du Feng Shui',
      'Appliquer les energies dans chaque pièce',
      'Optimiser la circulation du chi',
      'Créer un environnement harmonieux'
    ],
    syllabus: [
      { title: 'Histoire et philosophie du Feng Shui', duration: '20 min' },
      { title: 'Les 5 éléments', duration: '30 min' },
      { title: 'Le bagua', duration: '25 min' },
      { title: 'Chambre à coucher', duration: '35 min' },
      { title: 'Salon et séjour', duration: '30 min' },
      { title: 'Cuisine et salle de bain', duration: '25 min' },
      { title: 'Jardin et extérieur', duration: '20 min' },
      { title: 'Projet Feng Shui', duration: '45 min' }
    ],
    tags: ['feng shui', 'harmonie', 'bien-être', 'energie'],
    featured: true,
    published: true
  },
  {
    id: 'c3',
    title: 'Design africain moderne',
    title_en: 'Modern African Design',
    category: 'design-africain',
    description: 'Découvrez comment intégrer les éléments traditionnels africains dans un design contemporain.',
    description_en: 'Discover how to integrate traditional African elements into contemporary design.',
    thumbnail: 'course-african.jpg',
    duration: '5h00',
    level: 'intermediate',
    lessons: 15,
    students: 720,
    rating: 4.7,
    price: 69.99,
    currency: '€',
    instructor: {
      name: 'Kofi Asante',
      avatar: 'instructor-3.jpg',
      title: 'Designer culturel'
    },
    objectives: [
      'Connaître l\'histoire du design africain',
      'Identifier les éléments traditionnels',
      'Les combiner avec le modernisme',
      'Créer des espaces uniques et authentiques'
    ],
    syllabus: [
      { title: 'Histoire du design africain', duration: '25 min' },
      { title: 'Les motifs traditionnels', duration: '30 min' },
      { title: 'Textures et matériaux', duration: '25 min' },
      { title: 'Couleurs africaines', duration: '20 min' },
      { title: 'Artisanat local', duration: '30 min' },
      { title: 'Projets contemporains', duration: '35 min' }
    ],
    tags: ['afrique', 'design', 'tradition', 'moderne', 'culture'],
    featured: true,
    published: true
  },
  {
    id: 'c4',
    title: 'Créer son business de dropshipping décoration',
    title_en: 'Create your decoration dropshipping business',
    category: 'dropshipping',
    description: 'Guide complet pour lancer votre entreprise de dropshipping dans la décoration intérieure.',
    description_en: 'Complete guide to launch your dropshipping business in interior decoration.',
    thumbnail: 'course-dropshipping.jpg',
    duration: '8h00',
    level: 'advanced',
    lessons: 24,
    students: 2100,
    rating: 4.6,
    price: 149.99,
    currency: '€',
    instructor: {
      name: 'Jean-Marc Kouassi',
      avatar: 'instructor-4.jpg',
      title: 'Expert E-commerce'
    },
    objectives: [
      'Choisir sa niche dans la décoration',
      'Trouver des fournisseurs fiables',
      'Créer une boutique en ligne',
      'Marketing et conversions',
      'Gestion des commandes et SAV'
    ],
    syllabus: [
      { title: 'Introduction au dropshipping', duration: '20 min' },
      { title: 'Niche et marché', duration: '30 min' },
      { title: 'Fournisseurs et produits', duration: '45 min' },
      { title: 'Plateformes e-commerce', duration: '35 min' },
      { title: 'Création de boutique', duration: '60 min' },
      { title: 'Photos produits', duration: '25 min' },
      { title: 'SEO et traffic', duration: '50 min' },
      { title: 'Publicité payante', duration: '45 min' },
      { title: 'Service client', duration: '30 min' },
      { title: 'Lancement officiel', duration: '25 min' }
    ],
    tags: ['business', 'dropshipping', 'e-commerce', 'marketing', 'avance'],
    featured: true,
    published: true
  },
  {
    id: 'c5',
    title: 'L\'IA pour les décorateurs',
    title_en: 'AI for Decorators',
    category: 'ia-decorateurs',
    description: 'Utilisez l\'intelligence artificielle pour accélérer vos projets de décoration.',
    description_en: 'Use artificial intelligence to speed up your decoration projects.',
    thumbnail: 'course-ai.jpg',
    duration: '3h30',
    level: 'beginner',
    lessons: 10,
    students: 1850,
    rating: 4.9,
    price: 39.99,
    currency: '€',
    instructor: {
      name: 'Alexandre Martin',
      avatar: 'instructor-5.jpg',
      title: 'Expert IA & Design'
    },
    objectives: [
      'Comprendre les bases de l\'IA',
      'Générer des visualisations 3D',
      'Créer des palettes de couleurs',
      'Automatiser les tâches répétitives'
    ],
    syllabus: [
      { title: 'Introduction à l\'IA', duration: '15 min' },
      { title: 'Outils de génération d\'images', duration: '30 min' },
      { title: 'Midjourney pour la décoration', duration: '35 min' },
      { title: 'DALL-E et designs', duration: '25 min' },
      { title: 'Palettes de couleurs IA', duration: '20 min' },
      { title: 'Visualisation 3D', duration: '30 min' },
      { title: 'Automatisation', duration: '25 min' }
    ],
    tags: ['ia', 'ai', 'technologie', 'modern', 'efficacite'],
    featured: true,
    published: true
  },
  {
    id: 'c6',
    title: 'Home Staging professionnel',
    title_en: 'Professional Home Staging',
    category: 'home-staging',
    description: 'Apprenez à valoriser les biens immobiliers pour des ventes plus rapides.',
    description_en: 'Learn to valorize real estate properties for faster sales.',
    thumbnail: 'course-staging.jpg',
    duration: '5h30',
    level: 'intermediate',
    lessons: 16,
    students: 680,
    rating: 4.8,
    price: 89.99,
    currency: '€',
    instructor: {
      name: 'Sophie Bernard',
      avatar: 'instructor-6.jpg',
      title: 'Home Stager certifiée'
    },
    objectives: [
      'Comprendre le marché immobilier',
      'Techniques de Home Staging',
      'Photographie professionnelle',
      'Estimation du retour sur investissement'
    ],
    syllabus: [
      { title: 'Qu\'est-ce que le Home Staging?', duration: '20 min' },
      { title: 'Le marché immobilier', duration: '25 min' },
      { title: 'Diagnostic et préconisations', duration: '30 min' },
      { title: 'Techniques de préparation', duration: '35 min' },
      { title: 'Photographie Immobilière', duration: '30 min' },
      { title: 'Devis et facturation', duration: '25 min' }
    ],
    tags: ['home staging', 'immobilier', 'professionnel', 'vente'],
    featured: false,
    published: true
  }
];

// Export for use in the app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { courseCategories, courses };
}
