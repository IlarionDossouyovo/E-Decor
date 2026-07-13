// E-Décor - Renderer JavaScript
console.log('[E-Décor] === Script renderer.js chargé ===');

let currentLanguage = 'fr';
let currentPage = 'home';
let categoriesData = [];
let aiStatus = { available: false };
let aiConversations = [];

// Données intégrées pour la version web (sans Electron)
// Catégories avec sous-catégories
const builtInCategories = [
  {
    id: 'salons',
    name: 'Salons',
    name_en: 'Living Rooms',
    description: 'Meubles pour salons modernes et classiques',
    icon: '🛋️',
    subcategories: [
      { id: 'canapes', name: 'Canapés', name_en: 'Sofas', description: 'Canapés, causeuses et divans' },
      { id: 'fauteuils', name: 'Fauteuils', name_en: 'Armchairs', description: 'Fauteuils, relax et accoudoirs' },
      { id: 'tables-basses', name: 'Tables basses', name_en: 'Coffee Tables', description: 'Tables basses et tables d\'appoint' },
      { id: 'meubles-tv', name: 'Meubles TV', name_en: 'TV Units', description: 'Meubles TV et supports muraux' },
      { id: 'bibliotheques', name: 'Bibliothèques', name_en: 'Bookshelves', description: 'Étagères et bibliothèques' }
    ],
    products: [
      { id: 's1', name: 'Canapé modulable LINO', price: 1299, currency: '€', description: 'Canapé 3 places modulable en tissu gris', subcategory: 'canapes' },
      { id: 's2', name: 'Fauteuil relax électrique', price: 649, currency: '€', description: 'Fauteuil relax avec relève-pieds électrique', subcategory: 'fauteuils' },
      { id: 's3', name: 'Table basse carrée', price: 299, currency: '€', description: 'Table basse en chêne massif 90x90cm', subcategory: 'tables-basses' },
      { id: 's4', name: 'Meuble TV suspendu', price: 449, currency: '€', description: 'Meuble TV 160cm avec rangements', subcategory: 'meubles-tv' },
      { id: 's5', name: 'Bibliothèque modulable', price: 549, currency: '€', description: 'Étagère 5 modules ajustables', subcategory: 'bibliotheques' }
    ]
  },
  {
    id: 'bureaux',
    name: 'Bureaux',
    name_en: 'Offices',
    description: 'Mobilier de bureau professionnel et domestique',
    icon: '💼',
    subcategories: [
      { id: 'bureaux', name: 'Bureaux', name_en: 'Desks', description: 'Bureaux debout et classiques' },
      { id: 'chaises', name: 'Chaises de bureau', name_en: 'Office Chairs', description: 'Fauteuils et chaises ergonomiques' },
      { id: 'rangements', name: 'Rangements', name_en: 'Storage', description: 'Caissons, tiroirs et armoires' },
      { id: 'luminaires', name: 'Luminaires', name_en: 'Lighting', description: 'Lampes de bureau et éclairage' }
    ],
    products: [
      { id: 'b1', name: 'Bureau exécutif oak', price: 799, currency: '€', description: 'Bureau 160cm en chêne avec tiroirs', subcategory: 'bureaux' },
      { id: 'b2', name: 'Fauteuil de direction', price: 449, currency: '€', description: 'Fauteuil ergonomique Mesh', subcategory: 'chaises' },
      { id: 'b3', name: 'Caisson mobile 3 tiroirs', price: 189, currency: '€', description: 'Caisson sur roulettes mélaminé', subcategory: 'rangements' },
      { id: 'b4', name: 'Bureau standing électrique', price: 999, currency: '€', description: 'Bureau debout électrique hauteur variable', subcategory: 'bureaux' }
    ]
  },
  {
    id: 'cuisines',
    name: 'Cuisines',
    name_en: 'Kitchens',
    description: 'Équipements et meubles de cuisine',
    icon: '🍳',
    subcategories: [
      { id: 'ilot-central', name: 'Îlots centraux', name_en: 'Kitchen Islands', description: 'Îlots et plans de travail' },
      { id: 'meubles-bas', name: 'Meubles bas', name_en: 'Base Cabinets', description: 'Meubles de rangement bas' },
      { id: 'etagere-murale', name: 'Étagères murales', name_en: 'Wall Shelves', description: 'Étagères et rangements muraux' },
      { id: 'tables-chaises', name: 'Tables & Chaises', name_en: 'Tables & Chairs', description: 'Tables et chaises de cuisine' }
    ],
    products: [
      { id: 'c1', name: 'Îlot central cuisine', price: 1499, currency: '€', description: 'Îlot 180cm avec plan de travail stratifié', subcategory: 'ilot-central' },
      { id: 'c2', name: 'Meuble bas suspendu', price: 349, currency: '€', description: 'Meuble 60cm avec porte et tiroir', subcategory: 'meubles-bas' },
      { id: 'c3', name: 'Étagère murale chromée', price: 129, currency: '€', description: 'Étagère 90cm polyvalente', subcategory: 'etagere-murale' }
    ]
  },
  {
    id: 'jardins',
    name: 'Jardins',
    name_en: 'Gardens',
    description: 'Mobilier d\'extérieur et de jardin',
    icon: '🌳',
    subcategories: [
      { id: 'salon-exterieur', name: 'Salons d\'extérieur', name_en: 'Outdoor Living', description: 'Salons et ensembles de jardin' },
      { id: 'transats', name: 'Transats & Bain de soleil', name_en: 'Loungers', description: 'Transats et chaises longues' },
      { id: 'parasols', name: 'Parasols & Voiles', name_en: 'Umbrellas', description: 'Parasols et voiles d\'ombrage' },
      { id: 'barbecue', name: 'Barbecue & Plancha', name_en: 'BBQ & Grill', description: 'Barbecues et planchas' }
    ],
    products: [
      { id: 'j1', name: 'Salon de jardin 6 pièces', price: 899, currency: '€', description: 'Table + 4 fauteuilles + 2 bancs', subcategory: 'salon-exterieur' },
      { id: 'j2', name: 'Transat pliant bois', price: 149, currency: '€', description: 'Transat en bois d\'acacia avec toile', subcategory: 'transats' },
      { id: 'j3', name: 'Parasol déporté 3m', price: 249, currency: '€', description: 'Parasol déporté avec socle', subcategory: 'parasols' },
      { id: 'j4', name: 'Barbecue Weber', price: 399, currency: '€', description: 'Barbecue à charbon 57cm', subcategory: 'barbecue' }
    ]
  },
  {
    id: 'salle-a-manger',
    name: 'Salle à manger',
    name_en: 'Dining Rooms',
    description: 'Tables, chaises et meubles de salle à manger',
    icon: '🍽️',
    subcategories: [
      { id: 'tables', name: 'Tables', name_en: 'Tables', description: 'Tables fixes et extensibles' },
      { id: 'chaises', name: 'Chaises', name_en: 'Chairs', description: 'Chaises et fauteuils de salle à manger' },
      { id: 'buffets', name: 'Buffets & Vaisseliers', name_en: 'Sideboards', description: 'Buffets et vaisseliers' },
      { id: 'vitrines', name: 'Vitrines', name_en: 'Display Cabinets', description: 'Vitrines et cabinets' }
    ],
    products: [
      { id: 'sd1', name: 'Table extensible ALIZE', price: 899, currency: '€', description: 'Table 6-10 personnes extensible', subcategory: 'tables' },
      { id: 'sd2', name: 'Chaise tissu CARA', price: 149, currency: '€', description: 'Chaise upholstrée avec pieds bois', subcategory: 'chaises' },
      { id: 'sd3', name: 'Buffet 4 portes', price: 699, currency: '€', description: 'Buffet 180cm en bois massif', subcategory: 'buffets' },
      { id: 'sd4', name: 'Vaisselier moderne', price: 549, currency: '€', description: 'Vaisselier 2 tiroirs + niches', subcategory: 'vitrines' }
    ]
  }
];

// Articles de blog par catégorie et sous-catégorie
const builtInBlogPosts = [
  // Articles Salons
  { id: 'tendances-salon-2024', title: 'Tendances décoration salon 2024', title_en: 'Living Room Trends 2024', excerpt: 'Découvrez les dernières tendances pour votre salon', category: 'salons', subcategory: null, author: 'Marie Dupont', date: '2024-01-10', image: 'salon', content: 'Les tendances 2024 pour les salons...' },
  { id: 'choisir-canape', title: 'Comment choisir son canapé', title_en: 'How to choose your sofa', excerpt: 'Guide complet pour bien choisir votre canapé', category: 'salons', subcategory: 'canapes', author: 'Jean Martin', date: '2024-01-15', image: 'salon', content: 'Choisir un canapé...' },
  { id: 'ambiance-salon', title: 'Créer une ambiance salon cosy', title_en: 'Create a cozy living room', excerpt: 'Astuces pour un salon chaleureux', category: 'salons', subcategory: 'fauteuils', author: 'Sophie Bernard', date: '2024-02-01', image: 'salon', content: 'Ambiance cosy...' },
  
  // Articles Bureaux
  { id: 'bureau-productif', title: '10 conseils pour un bureau productif', title_en: '10 tips for a productive office', excerpt: 'Optimisez votre espace de travail', category: 'bureaux', subcategory: null, author: 'Pierre Durant', date: '2024-03-01', image: 'bureau', content: 'Productivité au bureau...' },
  { id: 'ergonomie-bureau', title: 'L\'ergonomie au bureau', title_en: 'Office ergonomics', excerpt: 'Bien s\'asseoir pour mieux travailler', category: 'bureaux', subcategory: 'chaises', author: 'Marie Martin', date: '2024-03-10', image: 'bureau', content: 'Ergonomie...' },
  { id: 'luminaire-bureau', title: 'L\'éclairage parfait pour votre bureau', title_en: 'Perfect lighting for your office', excerpt: 'Choisir le bon luminaire', category: 'bureaux', subcategory: 'luminaires', author: 'Lucas Petit', date: '2024-03-15', image: 'bureau', content: 'Éclairage...' },
  
  // Articles Cuisines
  { id: 'cuisine-moderne', title: 'Concevoir une cuisine moderne', title_en: 'Design a modern kitchen', excerpt: 'Guide pour une cuisine contemporaine', category: 'cuisines', subcategory: null, author: 'Emma Wilson', date: '2024-04-01', image: 'cuisine', content: 'Cuisine moderne...' },
  { id: 'ilot-cuisine', title: 'L\'îlot central star de la cuisine', title_en: 'The kitchen island', excerpt: 'Pourquoi choisir un îlot central', category: 'cuisines', subcategory: 'ilot-central', author: 'Marie Dubois', date: '2024-04-10', image: 'cuisine', content: 'Îlot central...' },
  
  // Articles Jardins
  { id: 'jardin-tendances', title: 'Tendances jardin 2024', title_en: 'Garden trends 2024', excerpt: 'Les must-have pour votre extérieur', category: 'jardins', subcategory: null, author: 'Thomas Green', date: '2024-05-01', image: 'jardin', content: 'Tendances jardin...' },
  { id: 'salon-exterieur', title: 'Choisir son salon d\'extérieur', title_en: 'Choose your outdoor furniture', excerpt: 'Comparatif des salons de jardin', category: 'jardins', subcategory: 'salon-exterieur', author: 'Sophie Brown', date: '2024-05-10', image: 'jardin', content: 'Salon extérieur...' },
  
  // Articles Salle à manger
  { id: 'salle-manger-guide', title: 'Guide : Bien choisir sa salle à manger', title_en: 'Dining room guide', excerpt: 'Tout savoir sur les salles à manger', category: 'salle-a-manger', subcategory: null, author: 'Julie Adams', date: '2024-06-01', image: 'salle-manger', content: 'Salle à manger...' },
  { id: 'table-extensible', title: 'Pourquoi choisir une table extensible', title_en: 'Why choose an extensible table', excerpt: 'Les avantages des tables extensibles', category: 'salle-a-manger', subcategory: 'tables', author: 'Marc Lefebvre', date: '2024-06-10', image: 'salle-manger', content: 'Table extensible...' }
];

// Affiliés E-Décor
const builtInAffiliates = [
  { id: 'orca-decor', name: 'ORCA-Décor', description: 'Partenaire officiel - Meubles et décoration d\'intérieur', commission: '15%', logo: 'orca', website: 'https://orca-decor.com', blogPosts: ['tendances-salon-2024', 'cuisine-moderne'] },
  { id: 'maison-deco', name: 'Maison Déco', description: 'Accessoires et textiles pour la maison', commission: '12%', logo: 'maison', website: '#', blogPosts: ['ambiance-salon', 'jardin-tendances'] },
  { id: 'tech-home', name: 'TechHome', description: 'Domotique et éclairage intelligent', commission: '10%', logo: 'tech', website: '#', blogPosts: ['luminaire-bureau', 'ergonomie-bureau'] },
  { id: 'green-living', name: 'Green Living', description: 'Plantes et jardinage urbain', commission: '14%', logo: 'green', website: '#', blogPosts: ['jardin-tendances', 'salon-exterieur'] },
  { id: 'artisanat-benin', name: 'Artisanat Bénin', description: 'Produits artisanaux béninois', commission: '20%', logo: 'artisanat', website: '#', blogPosts: ['salle-manger-guide', 'choisir-canape'] }
];

// API simulée pour le web
const webAPI = {
  getCategories: async () => builtInCategories,
  getCategory: async (categoryId) => builtInCategories.find(c => c.id === categoryId),
  getSubcategories: async (categoryId) => {
    const cat = builtInCategories.find(c => c.id === categoryId);
    return cat ? cat.subcategories || [] : [];
  },
  getProducts: async (categoryId, subcategoryId = null) => {
    const cat = builtInCategories.find(c => c.id === categoryId);
    if (!cat) return [];
    if (subcategoryId) {
      return cat.products.filter(p => p.subcategory === subcategoryId);
    }
    return cat.products;
  },
  getProduct: async (categoryId, productId) => {
    const cat = builtInCategories.find(c => c.id === categoryId);
    return cat ? cat.products.find(p => p.id === productId) : null;
  },
  getGlobalBlog: async () => builtInBlogPosts,
  getBlogArticles: async (categoryId, subcategoryId = null) => {
    if (!categoryId) return builtInBlogPosts;
    let posts = builtInBlogPosts.filter(p => p.category === categoryId);
    if (subcategoryId) {
      posts = posts.filter(p => p.subcategory === subcategoryId);
    }
    return posts;
  },
  getBlogPost: async (postId) => builtInBlogPosts.find(p => p.id === postId),
  getAffiliates: async () => builtInAffiliates,
  getAffiliate: async (affiliateId) => builtInAffiliates.find(a => a.id === affiliateId),
  getAffiliateBlogPosts: async (affiliateId) => {
    const affiliate = builtInAffiliates.find(a => a.id === affiliateId);
    if (!affiliate) return [];
    return builtInBlogPosts.filter(p => affiliate.blogPosts.includes(p.id));
  },
  searchProducts: async (query) => {
    const results = [];
    const lowerQuery = query.toLowerCase();
    builtInCategories.forEach(cat => {
      cat.products.forEach(p => {
        if (p.name.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery)) {
          results.push({ ...p, categoryId: cat.id, categoryName: cat.name });
        }
      });
    });
    return results;
  },
  onNavigate: (callback) => {},
  onShowAbout: (callback) => {},
  ai: {
    checkStatus: async () => ({ available: false }),
    chat: async () => ({ error: 'AI non disponible' }),
    recommendations: async () => ({ error: 'AI non disponible' }),
    listModels: async () => ({ models: [] })
  }
};

// API - Utiliser webAPI par défaut, ou window.api si disponible (Electron)
var api = webAPI;
if (typeof window !== 'undefined' && typeof window.api !== 'undefined') {
  console.log('[E-Décor] Utilisation window.api (Electron)');
  api = window.api;
} else {
  console.log('[E-Décor] Utilisation webAPI (intégré)');
}

// Vérifier le statut AI au chargement
async function checkAIStatus() {
  if (api && api.ai) {
    try {
      aiStatus = await api.ai.checkStatus();
      console.log('[AI] Statut:', aiStatus);
      return aiStatus.available;
    } catch (e) {
      console.log('[AI] Erreur:', e);
      return false;
    }
  }
  return false;
}

// Envoyer un message au chat AI
async function sendAIMessage(message, context = {}) {
  if (!aiStatus.available) {
    return { error: 'AI non disponible. Démarrez Ollama localement.' };
  }
  try {
    return await api.ai.chat(message, context);
  } catch (e) {
    return { error: e.message };
  }
}

// Obtenir des recommandations AI
async function getAIRecommendations(preferences) {
  if (!aiStatus.available) {
    return { error: 'AI non disponible' };
  }
  try {
    return await api.ai.recommendations(preferences);
  } catch (e) {
    return { error: e.message };
  }
}

// Lister les modèles disponibles
async function listAIModels() {
  if (!api || !api.ai) return { models: [] };
  try {
    return await api.ai.listModels();
  } catch (e) {
    return { models: [], error: e.message };
  }
}

// Translations
const translations = {
  fr: {
    home_title: 'Bienvenue chez E-Décor',
    home_subtitle: 'Votre partenaire ORCA-Décor pour l\'aménagement intérieur',
    home_cta: 'Découvrir le catalogue',
    catalog_title: 'Notre Catalogue',
    catalog_subtitle: 'Parcourez toutes nos catégories de produits',
    blog_title: 'Blog Deco',
    blog_subtitle: 'Conseils et inspirations pour votre intérieur',
    about_title: 'À propos d\'E-Décor',
    about_subtitle: 'En partenariat avec ORCA-Décor',
    contact_title: 'Contactez-nous',
    contact_subtitle: 'Nous sommes à votre écoute',
    search_placeholder: 'Rechercher un produit...',
    cart_title: 'Mon Panier',
    panier: 'Panier',
    checkout: 'Paiement',
    categories_title: 'Nos Catégories',
    productos_title: 'Nos Produits',
    voir_details: 'Voir les détails',
    ajouter_panier: 'Ajouter au panier',
    lire_suite: 'Lire la suite',
    retour_accueil: 'Retour à l\'accueil',
    no_results: 'Aucun résultat trouvé',
    search_results: 'Résultats de recherche pour',
    by: 'par'
  },
  en: {
    home_title: 'Welcome to E-Décor',
    home_subtitle: 'Your ORCA-Décor partner for interior design',
    home_cta: 'Discover the catalog',
    catalog_title: 'Our Catalog',
    catalog_subtitle: 'Browse all our product categories',
    blog_title: 'Decoration Blog',
    blog_subtitle: 'Tips and inspirations for your home',
    about_title: 'About E-Décor',
    about_subtitle: 'In partnership with ORCA-Décor',
    contact_title: 'Contact Us',
    contact_subtitle: 'We are here to listen',
    search_placeholder: 'Search for a product...',
    categories_title: 'Our Categories',
    productos_title: 'Our Products',
    voir_details: 'View details',
    ajouter_panier: 'Add to cart',
    lire_suite: 'Read more',
    retour_accueil: 'Back to home',
    no_results: 'No results found',
    search_results: 'Search results for',
    by: 'by'
  }
};

const categoryIcons = {
  salons: '🛋️',
  bureaux: '💼',
  cuisines: '🍳',
  jardins: '🌳',
  'salle-a-manger': '🍽️'
};

// Initialize the app
async function init() {
  console.log('[E-Décor] Initialisation...');
  
  // ALWAYS use built-in categories as primary source
  categoriesData = builtInCategories;
  console.log('[E-Décor] Catégories intégrées:', categoriesData.length);
  
  // Verify main-content exists
  var mainContent = document.getElementById('main-content');
  console.log('[E-Décor] main-content:', mainContent);
  
  if (mainContent) {
    // Directly inject categories
    var catHtml = '<section class="categories-section"><h2 class="page-title">Nos Catégories</h2><div class="categories-grid">';
    categoriesData.forEach(function(cat) {
      catHtml += '<div class="category-card" onclick="loadCategory(\'' + cat.id + '\')">' +
        '<div class="category-image">' + (categoryIcons[cat.id] || '🪑') + '</div>' +
        '<div class="category-info"><h3>' + cat.name + '</h3>' +
        '<p>' + cat.description + '</p>' +
        '<p class="product-count">' + cat.products.length + ' produits</p></div></div>';
    });
    catHtml += '</div></section>';
    
    mainContent.innerHTML = catHtml;
    console.log('[E-Décor] Catégories injectées!');
  } else {
    console.error('[E-Décor] ERREUR: main-content est null!');
  }
  
  populateCategoriesMenu();
  setupEventListeners();
  setupIPCListeners();
  initCart();
  initFavorites();
  loadOrdersFromStorage();
  initAIChat(); // Initialize AI Chat Assistant
}

function t(key) {
  return translations[currentLanguage][key] || key;
}

function formatPrice(price, currency = '€') {
  return price + ' ' + currency;
}

// Add to favorites from catalog
function addToFavoritesFromCatalog(categoryId, productId) {
  const category = categoriesData.find(c => c.id === categoryId);
  if (category) {
    const product = category.products.find(p => p.id === productId);
    if (product) {
      addToFavorites(product, categoryId, currentLanguage === 'fr' ? category.name : category.name_en);
    }
  }
}

// Populate categories in navigation dropdown
function populateCategoriesMenu() {
  const menu = document.getElementById('categories-menu');
  menu.innerHTML = categoriesData.map(cat => `
    <li><a href="#" data-page="category" data-param="${cat.id}">${currentLanguage === 'fr' ? cat.name : cat.name_en}</a></li>
  `).join('');
}

// Setup event listeners
function setupEventListeners() {
  // Language selector
  document.getElementById('language-selector').addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    refreshCurrentPage();
  });

  // Search
  document.getElementById('search-btn').addEventListener('click', handleSearch);
  document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  // Navigation links
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
      e.preventDefault();
      const page = e.target.dataset.page;
      loadPage(page);
    } else if (e.target.dataset.page) {
      const page = e.target.dataset.page;
      const param = e.target.dataset.param;
      if (page === 'category' && param) {
        loadCategory(param);
      } else {
        loadPage(page);
      }
    }
  });

  // Modal close
  document.querySelector('.modal-close').addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  });
}

// Setup IPC listeners for menu navigation
function setupIPCListeners() {
  api.onNavigate((page, param) => {
    if (page === 'category' && param) {
      loadCategory(param);
    } else if (page === 'blog-category' && param) {
      loadBlogCategory(param);
    } else {
      loadPage(page);
    }
  });

  api.onShowAbout(() => {
    loadPage('about');
  });
}

// Handle search
async function handleSearch() {
  const query = document.getElementById('search-input').value.trim();
  if (!query) return;

  const results = await api.searchProducts(query);
  displaySearchResults(query, results);
}

// Display search results
function displaySearchResults(query, results) {
  const mainContent = document.getElementById('main-content');
  
  mainContent.innerHTML = `
    <div class="page-title">
      <h1>${t('search_results')} "${query}"</h1>
      <p>${results.length} ${results.length === 1 ? 'résultat' : 'résultats'}</p>
    </div>
  `;

  if (results.length === 0) {
    mainContent.innerHTML += `
      <div class="no-results">
        <p>${t('no_results')}</p>
        <a href="#" class="cta-button" onclick="loadPage('catalog'); return false;">${t('catalog_title')}</a>
      </div>
    `;
    return;
  }

  mainContent.innerHTML += `
    <div class="products-grid">
      ${results.map(product => `
        <div class="product-card">
          <div class="product-image">${categoryIcons[product.categoryId] || '📦'}</div>
          <div class="product-info">
            <h4>${product.name}</h4>
            <p class="category-tag">${product.categoryName}</p>
            <p class="price">${formatPrice(product.price, product.currency)}</p>
            <p class="description">${product.description}</p>
            <button class="product-button" onclick="showProductDetails('${product.categoryId}', '${product.id}')">${t('voir_details')}</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  currentPage = 'search';
}

// Load a page
async function loadPage(page) {
  currentPage = page;
  updateActiveNavLink(page);

  const mainContent = document.getElementById('main-content');

  switch (page) {
    case 'home':
      await loadHomePage(mainContent);
      break;
    case 'catalog':
      await loadCatalogPage(mainContent);
      break;
    case 'blog':
      await loadBlogPage(mainContent);
      break;
    case 'affiliates':
      await loadAffiliatesPage(mainContent);
      break;
    case 'about':
      await loadAboutPage(mainContent);
      break;
    case 'faq':
      await loadFAQPage(mainContent);
      break;
    case 'legal':
      await loadLegalPage(mainContent);
      break;
    case 'contact':
      await loadContactPage(mainContent);
      break;
    case 'favorites':
      await loadFavoritesPage(mainContent);
      break;
    case 'orders':
      await loadOrdersPage(mainContent);
      break;
    case 'admin':
      await loadAdminPage(mainContent);
      break;
    case 'cart':
      await loadCartPage(mainContent);
      break;
    default:
      mainContent.innerHTML = '<p>Page not found</p>';
  }
}

// Update navigation active state
function updateActiveNavLink(page) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === page) {
      link.classList.add('active');
    }
  });
}

// Refresh current page (after language change)
function refreshCurrentPage() {
  if (currentPage === 'search') {
    const searchInput = document.getElementById('search-input');
    if (searchInput.value) {
      handleSearch();
    } else {
      loadPage('home');
    }
  } else {
    loadPage(currentPage);
  }
  populateCategoriesMenu();
}

// Load Home Page
async function loadHomePage(container) {
  const isFR = currentLanguage === 'fr';
  
  container.innerHTML = `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h2>${isFR ? 'Transformez Votre Intérieur' : 'Transform Your Interior'}</h2>
        <p>${isFR ? 'Meubles & Décoration de qualité' : 'Quality Furniture & Decor'}</p>
        <p class="hero-partner">${isFR ? 'Partenaire Officiel ORCA-Décor' : 'Official ORCA-Décor Partner'}</p>
        <div class="hero-actions">
          <a href="#" class="cta-button primary" onclick="loadPage('catalog'); return false;">
            ${isFR ? 'Découvrir le Catalogue' : 'Discover Catalog'}
          </a>
          <a href="#" class="cta-button secondary" onclick="loadPage('contact'); return false;">
            ${isFR ? 'Contactez-nous' : 'Contact Us'}
          </a>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-number">500+</span>
          <span class="stat-label">${isFR ? 'Produits' : 'Products'}</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">5</span>
          <span class="stat-label">${isFR ? 'Catégories' : 'Categories'}</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">12+</span>
          <span class="stat-label">${isFR ? 'Articles Blog' : 'Blog Articles'}</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">24/7</span>
          <span class="stat-label">${isFR ? 'Support' : 'Support'}</span>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section">
      <h2 class="section-heading">
        <span class="heading-icon">🏠</span>
        ${isFR ? 'Nos Catégories' : 'Our Categories'}
      </h2>
      <div class="categories-grid">
        ${categoriesData.map(cat => `
          <div class="category-card" onclick="loadCategory('${cat.id}')">
            <div class="category-icon">${cat.icon || '🪑'}</div>
            <div class="category-info">
              <h3>${isFR ? cat.name : cat.name_en}</h3>
              <p>${cat.description}</p>
              <span class="category-count">${cat.products.length} ${isFR ? 'produits' : 'products'}</span>
            </div>
            <div class="category-arrow">→</div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-section">
      <h2 class="section-heading">
        <span class="heading-icon">⭐</span>
        ${isFR ? 'Produits Vedettes' : 'Featured Products'}
      </h2>
      <div class="products-grid">
        ${getFeaturedProducts().map(product => `
          <div class="product-card" onclick="showProductDetails('${product.categoryId}', '${product.id}')">
            <div class="product-image">${product.icon || '🛋️'}</div>
            <div class="product-info">
              <h4>${product.name}</h4>
              <p class="price">${formatPrice(product.price, product.currency)}</p>
              <p class="description">${product.description}</p>
              <button class="product-button">${isFR ? 'Voir détails' : 'View Details'}</button>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="why-us-section">
      <h2 class="section-heading">
        <span class="heading-icon">💎</span>
        ${isFR ? 'Pourquoi Choisir E-Décor' : 'Why Choose E-Décor'}
      </h2>
      <div class="why-us-grid">
        <div class="why-us-card">
          <span class="why-us-icon">🚚</span>
          <h3>${isFR ? 'Livraison Rapide' : 'Fast Delivery'}</h3>
          <p>${isFR ? 'Livraison partout à Cotonou et environs' : 'Delivery throughout Cotonou and surroundings'}</p>
        </div>
        <div class="why-us-card">
          <span class="why-us-icon">🛡️</span>
          <h3>${isFR ? 'Garantie Qualité' : 'Quality Warranty'}</h3>
          <p>${isFR ? 'Tous nos produits sont garantis 2 ans' : 'All our products are guaranteed 2 years'}</p>
        </div>
        <div class="why-us-card">
          <span class="why-us-icon">💬</span>
          <h3>${isFR ? 'Support 24/7' : 'Support 24/7'}</h3>
          <p>${isFR ? 'Notre équipe est disponible à tout moment' : 'Our team is available at all times'}</p>
        </div>
        <div class="why-us-card">
          <span class="why-us-icon">🤝</span>
          <h3>${isFR ? 'Partenaire ORCA' : 'ORCA Partner'}</h3>
          <p>${isFR ? 'Collaboration avec ORCA-Décor leader' : 'Partnership with ORCA-Décor leader'}</p>
        </div>
      </div>
    </section>

    <!-- Blog Section -->
    <section class="blog-section">
      <h2 class="section-heading">
        <span class="heading-icon">📰</span>
        ${isFR ? 'Derniers Articles' : 'Latest Articles'}
      </h2>
      <div class="blog-grid">
        ${await getRecentBlogPosts(4)}
      </div>
      <div class="blog-cta">
        <button class="cta-button" onclick="loadPage('blog')">${isFR ? 'Voir Tous les Articles' : 'View All Articles'}</button>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>${isFR ? 'Prêt à Transformer Votre Intérieur?' : 'Ready to Transform Your Interior?'}</h2>
        <p>${isFR ? 'Contactez-nous pour un devis personnalisé' : 'Contact us for a personalized quote'}</p>
        <div class="cta-buttons">
          <button class="cta-button primary" onclick="loadPage('contact')">${isFR ? 'Contactez-nous' : 'Contact Us'}</button>
          <button class="cta-button secondary" onclick="loadPage('catalog')">${isFR ? 'Voir le Catalogue' : 'View Catalog'}</button>
        </div>
      </div>
    </section>
  `;
}

// Get featured products
function getFeaturedProducts() {
  const products = [];
  categoriesData.forEach(cat => {
    cat.products.slice(0, 2).forEach(p => {
      products.push({ ...p, categoryId: cat.id, categoryName: cat.name, icon: cat.icon });
    });
  });
  return products.slice(0, 4);
}

// Get recent blog posts
async function getRecentBlogPosts(count) {
  const posts = await api.getGlobalBlog();
  return posts.slice(0, count).map(post => `
    <div class="blog-card" onclick="loadBlogPost('${post.id}')">
      <div class="blog-image">📝</div>
      <div class="blog-content">
        <h3>${currentLanguage === 'fr' ? post.title : post.title_en}</h3>
        <p class="excerpt">${post.excerpt}</p>
        <p class="blog-meta">${t('by')} ${post.author} | ${post.date}</p>
      </div>
    </div>
  `).join('');
}

// Load Catalog Page
async function loadCatalogPage(container) {
  const isFR = currentLanguage === 'fr';
  
  // Calculate total products
  const totalProducts = categoriesData.reduce((sum, cat) => sum + cat.products.length, 0);
  
  container.innerHTML = `
    <!-- Catalog Header -->
    <div class="catalog-header">
      <div class="catalog-header-content">
        <h1>${isFR ? 'Notre Catalogue Complet' : 'Our Complete Catalog'}</h1>
        <p>${isFR ? 'Découvrez tous nos produits de qualité' : 'Discover all our quality products'}</p>
        <div class="catalog-stats">
          <span class="catalog-stat">
            <strong>${categoriesData.length}</strong> ${isFR ? 'Catégories' : 'Categories'}
          </span>
          <span class="catalog-stat">
            <strong>${totalProducts}</strong> ${isFR ? 'Produits' : 'Products'}
          </span>
        </div>
      </div>
    </div>

    <!-- Categories Grid -->
    <section class="catalog-section">
      <div class="categories-grid">
        ${categoriesData.map(cat => `
          <div class="category-card-large" onclick="loadCategory('${cat.id}')">
            <div class="category-card-icon">${cat.icon || '🪑'}</div>
            <div class="category-card-content">
              <h3>${isFR ? cat.name : cat.name_en}</h3>
              <p>${cat.description}</p>
              <div class="category-card-meta">
                <span class="product-count-badge">${cat.products.length} ${isFR ? 'produits' : 'products'}</span>
                <span class="view-more">${isFR ? 'Voir produits' : 'View products'} →</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

// Load Category with subcategories
async function loadCategory(categoryId) {
  const category = categoriesData.find(c => c.id === categoryId);
  if (!category) return;

  const products = await api.getProducts(categoryId);
  const subcategories = category.subcategories || [];
  const container = document.getElementById('main-content');

  // Get blog posts for this category
  const categoryPosts = await api.getBlogArticles(categoryId);

  container.innerHTML = `
    <div class="page-title category-header">
      <div class="category-header-content">
        <span class="category-icon-large">${category.icon || '🪑'}</span>
        <div>
          <h1>${currentLanguage === 'fr' ? category.name : category.name_en}</h1>
          <p>${category.description}</p>
        </div>
      </div>
    </div>

    <!-- Sous-catégories -->
    ${subcategories.length > 0 ? `
    <div class="subcategories-section">
      <h2 class="section-title">${currentLanguage === 'fr' ? 'Nos sous-catégories' : 'Our Subcategories'}</h2>
      <div class="subcategories-grid">
        ${subcategories.map(sub => `
          <div class="subcategory-card" onclick="loadSubcategory('${categoryId}', '${sub.id}')">
            <span class="subcategory-icon">${getSubcategoryIcon(sub.id)}</span>
            <h3>${currentLanguage === 'fr' ? sub.name : sub.name_en}</h3>
            <p>${sub.description}</p>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}

    <!-- Produits -->
    <div class="products-section">
      <h2 class="section-title">${currentLanguage === 'fr' ? 'Nos produits' : 'Our Products'}</h2>
      <div class="products-grid">
        ${products.map(product => {
          const productEmoji = getEmojiForProduct(product.id);
          return `
          <div class="product-card" onclick="showProductDetails('${categoryId}', '${product.id}')">
            <div class="product-image">
              <span class="product-emoji">${productEmoji}</span>
            </div>
            <div class="product-info">
              <h4>${product.name}</h4>
              <p class="price">${formatPrice(product.price, product.currency)}</p>
              <p class="description">${product.description}</p>
              <div class="product-actions" onclick="event.stopPropagation()">
                <button class="product-button" onclick="showProductDetails('${categoryId}', '${product.id}')">${t('voir_details')}</button>
                <button class="product-button favorite-btn" onclick="addToFavoritesFromCatalog('${categoryId}', '${product.id}')">❤️</button>
              </div>
            </div>
          </div>
        `}).join('')}
      </div>
    </div>

    <!-- Articles Blog liés -->
    ${categoryPosts.length > 0 ? `
    <div class="blog-related-section">
      <h2 class="section-title">${currentLanguage === 'fr' ? 'Articles blog liés' : 'Related Blog Articles'}</h2>
      <div class="blog-mini-grid">
        ${categoryPosts.slice(0, 3).map(post => `
          <div class="blog-mini-card" onclick="loadBlogPost('${post.id}')">
            <span class="blog-mini-icon">📄</span>
            <h4>${currentLanguage === 'fr' ? post.title : post.title_en}</h4>
            <p>${post.excerpt}</p>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
  `;

  currentPage = 'category';
  updateActiveNavLink(null);
}

// Load Subcategory
async function loadSubcategory(categoryId, subcategoryId) {
  const category = categoriesData.find(c => c.id === categoryId);
  const subcategory = category?.subcategories.find(s => s.id === subcategoryId);
  if (!subcategory) return;

  const products = await api.getProducts(categoryId, subcategoryId);
  const subcategoryPosts = await api.getBlogArticles(categoryId, subcategoryId);
  const container = document.getElementById('main-content');

  container.innerHTML = `
    <div class="page-title category-header">
      <button class="back-button" onclick="loadCategory('${categoryId}')">← ${currentLanguage === 'fr' ? 'Retour' : 'Back'}</button>
      <div class="category-header-content">
        <span class="category-icon-large">${getSubcategoryIcon(subcategoryId)}</span>
        <div>
          <h1>${currentLanguage === 'fr' ? subcategory.name : subcategory.name_en}</h1>
          <p>${subcategory.description}</p>
        </div>
      </div>
    </div>

    <!-- Produits de la sous-catégorie -->
    <div class="products-section">
      <h2 class="section-title">${currentLanguage === 'fr' ? 'Produits' : 'Products'}</h2>
      <div class="products-grid">
        ${products.map(product => {
          const productEmoji = getEmojiForProduct(product.id);
          return `
          <div class="product-card" onclick="showProductDetails('${categoryId}', '${product.id}')">
            <div class="product-image">
              <span class="product-emoji">${productEmoji}</span>
            </div>
            <div class="product-info">
              <h4>${product.name}</h4>
              <p class="price">${formatPrice(product.price, product.currency)}</p>
              <p class="description">${product.description}</p>
              <div class="product-actions" onclick="event.stopPropagation()">
                <button class="product-button" onclick="showProductDetails('${categoryId}', '${product.id}')">${t('voir_details')}</button>
                <button class="product-button favorite-btn" onclick="addToFavoritesFromCatalog('${categoryId}', '${product.id}')">❤️</button>
              </div>
            </div>
          </div>
        `}).join('')}
      </div>
    </div>

    <!-- Articles Blog liés -->
    ${subcategoryPosts.length > 0 ? `
    <div class="blog-related-section">
      <h2 class="section-title">${currentLanguage === 'fr' ? 'Articles blog' : 'Blog Articles'}</h2>
      <div class="blog-mini-grid">
        ${subcategoryPosts.map(post => `
          <div class="blog-mini-card" onclick="loadBlogPost('${post.id}')">
            <span class="blog-mini-icon">📄</span>
            <h4>${currentLanguage === 'fr' ? post.title : post.title_en}</h4>
            <p>${post.excerpt}</p>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
  `;
}

// Helper function to get subcategory icon
function getSubcategoryIcon(subcategoryId) {
  const icons = {
    'canapes': '🛋️',
    'fauteuils': '🪑',
    'tables-basses': '🪵',
    'meubles-tv': '📺',
    'bibliotheques': '📚',
    'bureaux': '💼',
    'chaises': '🪑',
    'rangements': '🗄️',
    'luminaires': '💡',
    'ilot-central': '🍳',
    'idables': '🍽️',
    'etagere-murale': '🪜',
    'tables-chaises': '🪑',
    'salon-exterieur': '🌳',
    'transats': '🏖️',
    'parasols': '☂️',
    'barbecue': '🍖',
    'tables': '🪵',
    'buffets': '🗄️',
    'vitrines': '🖼️'
  };
  return icons[subcategoryId] || '📦';
}

// Show product details in modal
// Get product image URL - use emoji as fallback
function getProductImageUrl(imageName, productId) {
  // For now, use emoji icons since local images have path issues
  // This can be updated when images are properly configured
  const emoji = getEmojiForProduct(productId);
  return emoji; // Return emoji directly, not as image
}

// Get emoji based on product
function getEmojiForProduct(productId) {
  const emojis = {
    's1': '🛋️', 's2': '🪑', 's3': '🪵', 's4': '📺', 's5': '📚',
    'b1': '💼', 'b2': '🪑', 'b3': '🗄️', 'b4': '📈',
    'c1': '🍳', 'c2': '� cabinets', 'c3': '🪜',
    'j1': '🌳', 'j2': '🏖️', 'j3': '☂️', 'j4': '🍖',
    'sd1': '🪵', 'sd2': '🪑', 'sd3': '🗄️', 'sd4': '🖼️'
  };
  return emojis[productId] || '🪑';
}

// Show product details in modal
async function showProductDetails(categoryId, productId) {
  const product = await api.getProduct(categoryId, productId);
  if (!product) return;

  const category = categoriesData.find(c => c.id === categoryId);
  const categoryName = currentLanguage === 'fr' ? category.name : category.name_en;
  const modalBody = document.getElementById('modal-body');
  const favBtnText = isFavorite(productId) ? (currentLanguage === 'fr' ? '💔 Retirer' : '💔 Remove') : '❤️ Favoris';
  const favAction = isFavorite(productId) ? `removeFromFavorites('${productId}')` : `addToFavoritesFromCatalog('${categoryId}', '${productId}')`;
  
  const productEmoji = getEmojiForProduct(productId);
  
  modalBody.innerHTML = `
    <div class="product-detail-modal">
      <div class="product-gallery">
        <div class="product-image-large">
          <span class="product-emoji-large">${productEmoji}</span>
        </div>
      </div>
      <div class="product-info-detail">
        <span class="category-tag">${categoryName}</span>
        <h2>${product.name}</h2>
        <p class="price-large">${formatPrice(product.price, product.currency)}</p>
        <p class="description-detail">${product.description}</p>
        <div class="product-specs">
          <h4>${currentLanguage === 'fr' ? 'Caractéristiques' : 'Specifications'}</h4>
          <ul>
            <li>✅ ${currentLanguage === 'fr' ? 'Qualité premium' : 'Premium quality'}</li>
            <li>🛡️ ${currentLanguage === 'fr' ? 'Garantie 2 ans' : '2 year warranty'}</li>
            <li>🚚 ${currentLanguage === 'fr' ? 'Livraison internationale' : 'International delivery'}</li>
            <li>💬 ${currentLanguage === 'fr' ? 'Support 24/7' : 'Support 24/7'}</li>
          </ul>
        </div>
        <div class="product-quantity">
          <label>${currentLanguage === 'fr' ? 'Quantité' : 'Quantity'}:</label>
          <div class="quantity-selector">
            <button onclick="updateModalQuantity(-1)">-</button>
            <input type="number" id="modal-product-qty" value="1" min="1" max="99">
            <button onclick="updateModalQuantity(1)">+</button>
          </div>
        </div>
        <div class="product-actions-detail">
          <button class="cta-button" onclick="addToCartFromModal('${categoryId}', '${product.id}')">${t('ajouter_panier')}</button>
          <button class="product-button" onclick="${favAction}; closeModal();">${favBtnText}</button>
        </div>
      </div>
    </div>
  `;

  openModal();
}

// Update quantity in modal
function updateModalQuantity(change) {
  const input = document.getElementById('modal-product-qty');
  if (input) {
    const newValue = Math.max(1, Math.min(99, parseInt(input.value) + change));
    input.value = newValue;
  }
}

// Add to cart from modal
function addToCartFromModal(categoryId, productId) {
  const product = categoriesData.find(c => c.id === categoryId)?.products.find(p => p.id === productId);
  if (product) {
    addToCart(product, categoryId, categoriesData.find(c => c.id === categoryId).name);
    closeModal();
  }
}

// Load Blog Page
async function loadBlogPage(container) {
  const globalPosts = await api.getGlobalBlog();
  
  container.innerHTML = `
    <div class="blog-hero">
      <h1>${t('blog_title')}</h1>
      <p>${t('blog_subtitle')}</p>
    </div>

    <h2 class="page-title">${currentLanguage === 'fr' ? 'Articles récents' : 'Recent Articles'}</h2>
    <div class="blog-grid">
      ${globalPosts.map(post => `
        <div class="blog-card" onclick="loadBlogPost('${post.id}')">
          <div class="blog-image">📝</div>
          <div class="blog-content">
            <h3>${currentLanguage === 'fr' ? post.title : post.title_en}</h3>
            <p class="excerpt">${post.excerpt}</p>
            <p class="blog-meta">${t('by')} ${post.author} | ${post.date}</p>
          </div>
        </div>
      `).join('')}
    </div>

    <h2 class="page-title" style="margin-top: 60px;">${currentLanguage === 'fr' ? 'Articles par catégorie' : 'Articles by Category'}</h2>
    <div class="categories-grid">
      ${categoriesData.map(cat => `
        <div class="category-card" onclick="loadBlogCategory('${cat.id}')">
          <div class="category-image">${categoryIcons[cat.id] || '🪑'}</div>
          <div class="category-info">
            <h3>${currentLanguage === 'fr' ? cat.name : cat.name_en}</h3>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Load Affiliates Page
async function loadAffiliatesPage(container) {
  const affiliates = await api.getAffiliates();
  
  container.innerHTML = `
    <div class="affiliates-hero">
      <h1>${currentLanguage === 'fr' ? 'Nos Partenaires Affiliés' : 'Our Affiliated Partners'}</h1>
      <p>${currentLanguage === 'fr' ? 'Découvrez nos partenaires de confiance pour la décoration et l\'ameublement' : 'Discover our trusted partners for decoration and furniture'}</p>
    </div>

    <div class="affiliates-grid">
      ${affiliates.map(affiliate => `
        <div class="affiliate-card">
          <div class="affiliate-logo">${getAffiliateLogo(affiliate.logo)}</div>
          <div class="affiliate-info">
            <h3>${affiliate.name}</h3>
            <p class="affiliate-desc">${affiliate.description}</p>
            <div class="affiliate-stats">
              <span class="commission-badge">💰 Commission: ${affiliate.commission}</span>
            </div>
            <div class="affiliate-posts">
              <h4>${currentLanguage === 'fr' ? 'Articles liés' : 'Related Articles'}</h4>
              ${affiliate.blogPosts.slice(0, 2).map(postId => {
                const post = builtInBlogPosts.find(p => p.id === postId);
                return post ? `<span class="post-tag" onclick="loadBlogPost('${post.id}')">📄 ${currentLanguage === 'fr' ? post.title : post.title_en}</span>` : '';
              }).join('')}
            </div>
            <a href="${affiliate.website}" class="affiliate-btn" target="_blank">
              ${currentLanguage === 'fr' ? 'Visiter le site' : 'Visit Website'} →
            </a>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="affiliates-cta">
      <h2>${currentLanguage === 'fr' ? 'Devenir partenaire' : 'Become a Partner'}</h2>
      <p>${currentLanguage === 'fr' ? 'Rejoignez notre programme d\'affiliation et gagnez des commissions sur chaque vente' : 'Join our affiliate program and earn commissions on every sale'}</p>
      <button class="cta-button" onclick="loadPage('contact')">${currentLanguage === 'fr' ? 'Contactez-nous' : 'Contact Us'}</button>
    </div>
  `;
}

// Helper function to get affiliate logo
function getAffiliateLogo(type) {
  const logos = {
    'orca': '<span class="logo-orca">🏠<br><small>ORCA</small></span>',
    'maison': '<span class="logo-maison">🛋️<br><small>Maison</small></span>',
    'tech': '<span class="logo-tech">💡<br><small>TechHome</small></span>',
    'green': '<span class="logo-green">🌿<br><small>Green</small></span>',
    'artisanat': '<span class="logo-artisanat">🎨<br><small>Artisanat</small></span>'
  };
  return logos[type] || '<span class="logo-default">🤝<br><small>Partner</small></span>';
}

// Load blog posts by category
async function loadBlogCategory(categoryId) {
  const posts = await api.getBlogArticles(categoryId);
  const category = categoriesData.find(c => c.id === categoryId);
  const container = document.getElementById('main-content');

  container.innerHTML = `
    <div class="blog-hero" style="background: linear-gradient(135deg, #11998e, #38ef7d);">
      <h1>${currentLanguage === 'fr' ? 'Blog ' + category.name : category.name_en + ' Blog'}</h1>
    </div>

    <div class="blog-grid">
      ${posts.map(post => `
        <div class="blog-card" onclick="loadBlogPost('${post.id}')">
          <div class="blog-image">📝</div>
          <div class="blog-content">
            <h3>${currentLanguage === 'fr' ? post.title : post.title_en}</h3>
            <p class="excerpt">${post.excerpt}</p>
            <p class="blog-meta">${t('by')} ${post.author} | ${post.date}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  currentPage = 'blog-category';
  updateActiveNavLink('blog');
}

// Load single blog post
async function loadBlogPost(postId) {
  const post = await api.getBlogPost(postId);
  if (!post) return;

  const container = document.getElementById('main-content');

  container.innerHTML = `
    <a href="#" class="nav-link" onclick="loadPage('blog'); return false;" style="display: inline-block; margin-bottom: 20px;">← ${t('retour_accueil')}</a>
    <div class="blog-full-content">
      <h1>${currentLanguage === 'fr' ? post.title : post.title_en}</h1>
      <p class="meta">${t('by')} ${post.author} | ${post.date}</p>
      <div class="content">
        ${formatBlogContent(currentLanguage === 'fr' ? post.content : (post.content_en || post.content))}
      </div>
    </div>
  `;
}

// Format blog content (convert markdown-like to HTML)
function formatBlogContent(content) {
  return content
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/• (.*)/g, '<li>$1</li>')
    .replace(/(\d+\.) (.*)/g, '<li>$2</li>')
    .split('\n').map(line => {
      if (line.startsWith('<h2>') || line.startsWith('<h3>') || line.startsWith('<li>')) return line;
      return line;
    }).join('\n')
    .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
}

// Load About Page
async function loadAboutPage(container) {
  const isFR = currentLanguage === 'fr';
  
  container.innerHTML = `
    <!-- About Header -->
    <div class="about-header">
      <div class="about-header-content">
        <h1>${isFR ? 'À Propos de E-Décor' : 'About E-Décor'}</h1>
        <p>${isFR ? 'Votre partenaire de confiance pour l\'ameublement et la décoration' : 'Your trusted partner for furniture and decor'}</p>
      </div>
    </div>

    <!-- Story Section -->
    <section class="about-section">
      <div class="about-card">
        <div class="about-icon">🏠</div>
        <h2>${isFR ? 'Notre Histoire' : 'Our Story'}</h2>
        <p>E-Décor est une entreprise e-commerce dropshipping spécialisée dans la décoration d'intérieur, l'ameublement et les articles de maison. En partenariat avec <strong>ORCA-Décor</strong>, nous proposons une large gamme de meubles pour tout type d'aménagement.</p>
        <p>${isFR ? 'Basés à Cotonou, au Bénin, nous servons des clients partout en Afrique de l\'Ouest et au-delà.' : 'Based in Cotonou, Benin, we serve customers across West Africa and beyond.'}</p>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="about-categories">
      <h2 class="section-heading">
        <span class="heading-icon">📦</span>
        ${isFR ? 'Nos Catégories' : 'Our Categories'}
      </h2>
      <div class="about-categories-grid">
        ${categoriesData.map(cat => `
          <div class="about-category-item">
            <span class="about-cat-icon">${cat.icon || '🪑'}</span>
            <div>
              <h3>${isFR ? cat.name : cat.name_en}</h3>
              <p>${isFR ? cat.description : cat.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="mission-vision">
      <div class="mission-card">
        <div class="mission-icon">🎯</div>
        <h2>${isFR ? 'Notre Mission' : 'Our Mission'}</h2>
        <p>${isFR ? 'Proposer des mobilier de qualité à des prix compétitifs, avec un service client irréprochable. Nous expédions nos produits dans le monde entier.' : 'Provide quality furniture at competitive prices, with impeccable customer service. We ship our products worldwide.'}</p>
      </div>
      <div class="vision-card">
        <div class="vision-icon">🔭</div>
        <h2>${isFR ? 'Notre Vision' : 'Our Vision'}</h2>
        <p>${isFR ? 'Devenir le leader de l\'e-commerce mobilier en Afrique de l\'Ouest, en offrant des produits de qualité et un service exceptionnel.' : 'Become the leader in furniture e-commerce in West Africa, offering quality products and exceptional service.'}</p>
      </div>
    </section>

    <!-- Values -->
    <section class="values-section">
      <h2 class="section-heading">
        <span class="heading-icon">💎</span>
        ${isFR ? 'Nos Valeurs' : 'Our Values'}
      </h2>
      <div class="values-grid">
        <div class="value-item">
          <span class="value-icon">✅</span>
          <h3>${isFR ? 'Qualité' : 'Quality'}</h3>
          <p>${isFR ? 'Produits rigoureuxelectionnés' : 'Carefully selected products'}</p>
        </div>
        <div class="value-item">
          <span class="value-icon">🤝</span>
          <h3>${isFR ? 'Confiance' : 'Trust'}</h3>
          <p>${isFR ? 'Relation client durable' : 'Long-term customer relationship'}</p>
        </div>
        <div class="value-item">
          <span class="value-icon">⚡</span>
          <h3>${isFR ? 'Rapidité' : 'Speed'}</h3>
          <p>${isFR ? 'Livraison rapide' : 'Fast delivery'}</p>
        </div>
        <div class="value-item">
          <span class="value-icon">💬</span>
          <h3>${isFR ? 'Écoute' : 'Listening'}</h3>
          <p>${isFR ? 'Support réactif 24/7' : 'Responsive support 24/7'}</p>
        </div>
      </div>
    </section>

    <!-- Partners -->
    <section class="partners-section">
      <h2 class="section-heading">
        <span class="heading-icon">🤝</span>
        ${isFR ? 'Nos Partenaires' : 'Our Partners'}
      </h2>
      <div class="partners-grid">
        <div class="partner-card">
          <span class="partner-logo">🏠</span>
          <h3>ORCA-Décor</h3>
          <p>${isFR ? 'Partenaire exclusif pour la decoration et l\'ameublement' : 'Exclusive partner for decoration and furniture'}</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="about-cta">
      <h2>${isFR ? 'Contactez-nous' : 'Contact Us'}</h2>
      <p>${isFR ? 'Vous avez des questions? Notre équipe est là pour vous aider!' : 'Have questions? Our team is here to help!'}</p>
      <button class="cta-button" onclick="loadPage('contact')">${isFR ? 'Envoyer un message' : 'Send a Message'}</button>
    </section>
  `;
}

// FAQ Data
const faqData = [
  {
    question: 'Quels sont les délais de livraison?',
    question_en: 'What are the delivery times?',
    answer: 'Nos délais de livraison varient entre 5 et 15 jours ouvrés selon votre localisation. La livraison est gratuite pour toute commande supérieure à 500€.',
    answer_en: 'Our delivery times vary between 5 and 15 working days depending on your location. Delivery is free for orders over 500€.'
  },
  {
    question: 'Quelle est la politique de retour?',
    question_en: 'What is the return policy?',
    answer: 'Vous disposez de 30 jours pour retourner un produit non utilisé dans son embalagem d\'origine. Les frais de retour sont à votre charge sauf en cas de produit défectueux.',
    answer_en: 'You have 30 days to return an unused product in its original packaging. Return costs are at your expense unless the product is defective.'
  },
  {
    question: 'Proposez-vous l\'installation des meubles?',
    question_en: 'Do you offer furniture installation?',
    answer: 'Oui, nous proposons un service d\'installation premium pour les meubles complexes. Ce service est disponible moyennant un supplément indiqué lors de la commande.',
    answer_en: 'Yes, we offer a premium installation service for complex furniture. This service is available for an additional fee indicated during order.'
  },
  {
    question: 'Comment suivre ma commande?',
    question_en: 'How do I track my order?',
    answer: 'Vous recevrez un email de confirmation avec un numéro de suivi. Vous pouvez également suivre votre commande depuis votre espace client sur notre site.',
    answer_en: 'You will receive a confirmation email with a tracking number. You can also track your order from your customer account on our site.'
  },
  {
    question: 'Quelles garanties proposent vos meubles?',
    question_en: 'What guarantees do your furniture offer?',
    answer: 'Tous nos meubles bénéficient d\'une garantie minimale de 2 ans. Certains produits premium proposent une garantie étendue jusqu\'à 5 ans.',
    answer_en: 'All our furniture comes with a minimum 2-year warranty. Some premium products offer an extended warranty up to 5 years.'
  },
  {
    question: 'Comment contacter le service client?',
    question_en: 'How to contact customer service?',
    answer: 'Vous pouvez nous contacter par email à support@e-decor.com, par téléphone au +229 01 23 45 67 89, ou via le formulaire de contact sur le site.',
    answer_en: 'You can contact us by email at support@e-decor.com, by phone at +229 01 23 45 67 89, or via the contact form on the site.'
  },
  {
    question: 'Proposez-vous des paiement en plusieurs fois?',
    question_en: 'Do you offer installment payments?',
    answer: 'Oui! Nous proposons le paiement en 3x sans frais via notre partenaire Floa Bank. Cette option est disponible dès 100€ d\'achat.',
    answer_en: 'Yes! We offer 3x interest-free payment via our partner Floa Bank. This option is available from 100€ purchase.'
  },
  {
    question: 'Livrez-vous à l\'international?',
    question_en: 'Do you deliver internationally?',
    answer: 'Oui, nous livrons dans plus de 23 pays à travers l\'Afrique, l\'Europe et les Amériques. Les frais de livraison varient selon la destination.',
    answer_en: 'Yes, we deliver to over 23 countries across Africa, Europe, and the Americas. Delivery costs vary depending on the destination.'
  }
];

// Load FAQ Page
async function loadFAQPage(container) {
  console.log('[E-Décor] Loading FAQ page...');
  container.innerHTML = `
    <div class="faq-hero">
      <h1>${t('faq_title') || 'Questions Fréquentes'}</h1>
      <p>${t('faq_subtitle') || 'Trouvez rapidement les réponses à vos questions'}</p>
    </div>
    
    <div class="faq-container">
      ${faqData.map((faq, index) => `
        <div class="faq-item" onclick="toggleFAQ(${index})">
          <div class="faq-question">
            <span>${currentLanguage === 'fr' ? faq.question : faq.question_en}</span>
            <span class="faq-icon">+</span>
          </div>
          <div class="faq-answer" id="faq-answer-${index}">
            <p>${currentLanguage === 'fr' ? faq.answer : faq.answer_en}</p>
          </div>
        </div>
      `).join('')}
    </div>
    
    <div class="faq-cta">
      <h3>${currentLanguage === 'fr' ? 'Vous ne trouvez pas votre réponse?' : 'Didn\'t find your answer?'}</h3>
      <p>${currentLanguage === 'fr' ? 'Notre équipe est disponible pour vous aider.' : 'Our team is available to help you.'}</p>
      <button class="cta-button" onclick="loadPage('contact')">${currentLanguage === 'fr' ? 'Contactez-nous' : 'Contact Us'}</button>
    </div>
  `;
  currentPage = 'faq';
  updateActiveNavLink('faq');
}

// Load Legal/Mentions légales Page
async function loadLegalPage(container) {
  container.innerHTML = `
    <div class="legal-container">
      <h1>${currentLanguage === 'fr' ? 'Mentions Légales' : 'Legal Notice'}</h1>
      
      <section class="legal-section">
        <h2>${currentLanguage === 'fr' ? '1. Éditeur du site' : '1. Website Publisher'}</h2>
        <p><strong>E-Décor</strong></p>
        <p>${currentLanguage === 'fr' ? 
          'SAS au capital de 10.000.000 FCF<br>Siège social: Cotonou, Benin<br>Email: contact@e-decor.com<br>Téléphone: +229 01 23 45 67 89' : 
          'SAS with capital of 10,000,000 FCF<br>Headquarters: Cotonou, Benin<br>Email: contact@e-decor.com<br>Phone: +229 01 23 45 67 89'}</p>
      </section>
      
      <section class="legal-section">
        <h2>${currentLanguage === 'fr' ? '2. Hébergement' : '2. Hosting'}</h2>
        <p>${currentLanguage === 'fr' ? 
          'Hébergé par Vercel Inc.<br>440 Barranco Street<br>Palo Alto, CA 94301, USA' : 
          'Hosted by Vercel Inc.<br>440 Barranco Street<br>Palo Alto, CA 94301, USA'}</p>
      </section>
      
      <section class="legal-section">
        <h2>${currentLanguage === 'fr' ? '3. Propriété intellectuelle' : '3. Intellectual Property'}</h2>
        <p>${currentLanguage === 'fr' ? 
          'L\'ensemble du contenu de ce site (textes, images, logos, graphismes) est protégé par les droits de propriété intellectuelle. Toute reproduction est interdite sans autorisation préalable.' : 
          'All content on this site (texts, images, logos, graphics) is protected by intellectual property rights. Any reproduction is prohibited without prior authorization.'}</p>
      </section>
      
      <section class="legal-section">
        <h2>${currentLanguage === 'fr' ? '4. Protection des données personnelles' : '4. Personal Data Protection'}</h2>
        <p>${currentLanguage === 'fr' ? 
          'Vos données personnelles sont collectées et traitées conformément à la loi sur la protection des données. Vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données.' : 
          'Your personal data is collected and processed in accordance with data protection laws. You have the right to access, rectify and delete your data.'}</p>
      </section>
      
      <section class="legal-section">
        <h2>${currentLanguage === 'fr' ? '5. Conditions générales de vente' : '5. General Terms of Sale'}</h2>
        <p>${currentLanguage === 'fr' ? 
          'Les CGV sont disponibles sur demande auprès de notre service client. La commande implique l\'acceptation pleine et entière des conditions générales de vente.' : 
          'The GTC are available upon request from our customer service. The order implies full acceptance of the general terms of sale.'}</p>
      </section>
      
      <section class="legal-section">
        <h2>${currentLanguage === 'fr' ? '6. Responsabilité' : '6. Liability'}</h2>
        <p>${currentLanguage === 'fr' ? 
          'E-Décor s\'efforce de fournir des informations exactes mais ne peut être tenu responsable des erreurs ou omissions. Les photos des produits sont non contractuelles.' : 
          'E-Décor strives to provide accurate information but cannot be held responsible for errors or omissions. Product photos are non-contractual.'}</p>
      </section>
      
      <div class="legal-footer">
        <p>© 2024 E-Décor - ${currentLanguage === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}</p>
      </div>
    </div>
  `;
  currentPage = 'legal';
  updateActiveNavLink('legal');
}

// Toggle FAQ accordion
function toggleFAQ(index) {
  const answer = document.getElementById(`faq-answer-${index}`);
  const item = answer.parentElement;
  const icon = item.querySelector('.faq-icon');
  
  // Close all other answers
  document.querySelectorAll('.faq-answer').forEach((el, i) => {
    if (i !== index) {
      el.style.maxHeight = null;
      el.style.padding = '0 20px';
    }
  });
  document.querySelectorAll('.faq-icon').forEach((el, i) => {
    if (i !== index) el.textContent = '+';
  });
  
  // Toggle current
  if (answer.style.maxHeight) {
    answer.style.maxHeight = null;
    answer.style.padding = '0 20px';
    icon.textContent = '+';
  } else {
    answer.style.maxHeight = answer.scrollHeight + 'px';
    answer.style.padding = '15px 20px';
    icon.textContent = '−';
  }
}

// Load Contact Page
async function loadContactPage(container) {
  container.innerHTML = `
    <div class="page-title">
      <h1>${t('contact_title')}</h1>
      <p>${t('contact_subtitle')}</p>
    </div>

    <div class="contact-form">
      <form onsubmit="submitContactForm(event)">
        <div class="form-group">
          <label for="name">Nom complet</label>
          <input type="text" id="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" required>
        </div>
        <div class="form-group">
          <label for="subject">Sujet</label>
          <input type="text" id="subject" required>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" required></textarea>
        </div>
        <button type="submit" class="submit-button">Envoyer</button>
      </form>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--border-color);">
        <h3>Autres moyens de nous contacter</h3>
        <p><strong>Email:</strong> electronbusiness07@gmail.com</p>
        <p><strong>Tél:</strong> +229 01 977 003 47 / 01 411 663 14</p>
        <p><strong>Adresse:</strong> Cotonou, Benin</p>
      </div>
    </div>
  `;
}

// ============= PAYMENT SYSTEM =============

// Cart state with localStorage persistence
let cart = {
  items: [],
  total: 0,
  currency: '€'
};

// Cart localStorage keys
const CART_STORAGE_KEY = 'e-decor-cart';
const FAVORITES_STORAGE_KEY = 'e-decor-favorites';
const ORDERS_STORAGE_KEY = 'e-decor-orders';

// Favorites state
let favorites = [];

// Load favorites from localStorage
function loadFavoritesFromStorage() {
  try {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (saved) {
      favorites = JSON.parse(saved) || [];
    }
  } catch (e) {
    console.warn('Could not load favorites:', e);
  }
}

// Save favorites to localStorage
function saveFavoritesToStorage() {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.warn('Could not save favorites:', e);
  }
}

// Initialize favorites on load
function initFavorites() {
  loadFavoritesFromStorage();
}

// Add to favorites
function addToFavorites(product, categoryId, categoryName) {
  const existing = favorites.find(f => f.id === product.id);
  if (!existing) {
    favorites.push({
      ...product,
      categoryId,
      categoryName,
      addedAt: new Date().toISOString()
    });
    saveFavoritesToStorage();
    updateFavoritesBadge();
    showNotification(currentLanguage === 'fr' ? 'Produit ajouté aux favoris!' : 'Product added to favorites!');
  }
}

// Remove from favorites
function removeFromFavorites(productId) {
  favorites = favorites.filter(f => f.id !== productId);
  saveFavoritesToStorage();
  updateFavoritesBadge();
  loadFavoritesPage();
}

// Check if product is favorite
function isFavorite(productId) {
  return favorites.some(f => f.id === productId);
}

// Update favorites badge
function updateFavoritesBadge() {
  const badge = document.getElementById('favorites-badge');
  if (badge) {
    badge.textContent = favorites.length;
    badge.style.display = favorites.length > 0 ? 'block' : 'none';
  }
}

// Load cart from localStorage
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      cart.items = parsed.items || [];
      cart.total = parsed.total || 0;
      cart.currency = parsed.currency || '€';
    }
  } catch (e) {
    console.warn('Could not load cart from storage:', e);
  }
}

// Save cart to localStorage
function saveCartToStorage() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (e) {
    console.warn('Could not save cart to storage:', e);
  }
}

// Initialize cart on load
function initCart() {
  loadCartFromStorage();
  updateCartBadge();
}

// Add to cart
function addToCart(product, categoryId, categoryName) {
  const existing = cart.items.find(i => i.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.items.push({
      ...product,
      categoryId,
      categoryName,
      quantity: 1
    });
  }
  updateCartTotal();
  saveCartToStorage();
  updateCartBadge();
  showNotification(currentLanguage === 'fr' ? 'Produit ajouté au panier!' : 'Product added to cart!');
}

// Update cart item quantity
function updateCartItemQuantity(productId, delta) {
  const item = cart.items.find(i => i.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartTotal();
      saveCartToStorage();
      loadCartPage();
    }
  }
}

// Remove from cart  
function removeFromCart(productId) {
  cart.items = cart.items.filter(i => i.id !== productId);
  updateCartTotal();
  saveCartToStorage();
  updateCartBadge();
  loadCartPage();
}

// Update cart total
function updateCartTotal() {
  cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Update cart badge in navigation
function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  if (badge) {
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'block' : 'none';
  }
}

// Show cart page
async function loadCartPage() {
  const container = document.getElementById('main-content');
  const t = currentLanguage === 'fr';
  
  if (cart.items.length === 0) {
    container.innerHTML = `
      <div class="page-title">
        <h1>${t ? 'Panier vide' : 'Empty Cart'}</h1>
        <p>${t ? 'Ajoutez des produits pour commander' : 'Add products to order'}</p>
        <a href="#" class="cta-button" onclick="loadPage('catalog'); return false;">${t ? 'Voir le catalogue' : 'View Catalog'}</a>
      </div>
    `;
    return;
  }
  
  container.innerHTML = `
    <div class="page-title">
      <h1>${t ? 'Mon Panier' : 'My Cart'}</h1>
    </div>
    <div class="cart-container">
      <div class="cart-items">
        ${cart.items.map(item => `
          <div class="cart-item">
            <div class="cart-item-info">
              <h4>${item.name}</h4>
              <p class="cart-item-category">${item.categoryName}</p>
              <p class="cart-item-price">${item.price} ${item.currency}</p>
            </div>
            <div class="cart-item-quantity">
              <button class="qty-btn" onclick="updateCartItemQuantity('${item.id}', -1)">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartItemQuantity('${item.id}', 1)">+</button>
            </div>
            <div class="cart-item-actions">
              <button class="btn-remove" onclick="removeFromCart('${item.id}')">${t ? 'Supprimer' : 'Remove'}</button>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="cart-summary">
        <h3>${t ? 'Résumé de commande' : 'Order Summary'}</h3>
        <div class="cart-total">
          <span>${t ? 'Total' : 'Total'}:</span>
          <span class="total-amount">${cart.total} ${cart.currency}</span>
        </div>
        <button class="checkout-button" onclick="loadCheckoutPage()">${t ? 'Passer la commande' : 'Checkout'}</button>
      </div>
    </div>
  `;
}

// Load favorites page
async function loadFavoritesPage() {
  const container = document.getElementById('main-content');
  const t = currentLanguage === 'fr';
  
  if (favorites.length === 0) {
    container.innerHTML = `
      <div class="page-title">
        <h1>${t ? 'Aucun favori' : 'No Favorites'}</h1>
        <p>${t ? 'Ajoutez des produits à vos favoris' : 'Add products to your favorites'}</p>
        <a href="#" class="cta-button" onclick="loadPage('catalog'); return false;">${t ? 'Voir le catalogue' : 'View Catalog'}</a>
      </div>
    `;
    return;
  }
  
  container.innerHTML = `
    <div class="page-title">
      <h1>${t ? 'Mes Favoris' : 'My Favorites'}</h1>
    </div>
    <div class="products-grid">
      ${favorites.map(item => `
        <div class="product-card">
          <div class="product-image">${categoryIcons[item.categoryId] || '📦'}</div>
          <div class="product-info">
            <h4>${item.name}</h4>
            <p class="category-tag">${item.categoryName}</p>
            <p class="price">${item.price} ${item.currency}</p>
            <p class="description">${item.description}</p>
            <div class="product-actions">
              <button class="product-button" onclick="addToCartFromFavorites('${item.categoryId}', '${item.id}')">${t ? 'Ajouter au panier' : 'Add to Cart'}</button>
              <button class="product-button favorite-btn" onclick="removeFromFavorites('${item.id}')">${t ? 'Retirer' : 'Remove'}</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Add to cart from favorites
function addToCartFromFavorites(categoryId, productId) {
  const item = favorites.find(f => f.id === productId);
  if (item) {
    addToCart({ id: item.id, name: item.name, price: item.price, currency: item.currency, description: item.description }, categoryId, item.categoryName);
  }
}

// Load orders page
async function loadOrdersPage() {
  const container = document.getElementById('main-content');
  const t = currentLanguage === 'fr';
  
  if (orders.length === 0) {
    container.innerHTML = `
      <div class="page-title">
        <h1>${t ? 'Aucune commande' : 'No Orders'}</h1>
        <p>${t ? 'Vos commandes apparaîtront ici' : 'Your orders will appear here'}</p>
        <a href="#" class="cta-button" onclick="loadPage('catalog'); return false;">${t ? 'Voir le catalogue' : 'View Catalog'}</a>
      </div>
    `;
    return;
  }
  
  container.innerHTML = `
    <div class="page-title">
      <h1>${t ? 'Mes Commandes' : 'My Orders'}</h1>
    </div>
    <div class="orders-list">
      ${orders.map(order => `
        <div class="order-card">
          <div class="order-header">
            <span class="order-id">${order.id}</span>
            <span class="order-status ${order.status}">${t ? order.status === 'pending' ? 'En attente' : 'Livré' : order.status}</span>
          </div>
          <div class="order-date">${new Date(order.date).toLocaleDateString()}</div>
          <div class="order-items">
            ${order.items.map(item => `
              <p>${item.name} × ${item.quantity}</p>
            `).join('')}
          </div>
          <div class="order-total">
            <strong>${order.total} ${order.currency}</strong>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Admin Page
async function loadAdminPage() {
  const container = document.getElementById('main-content');
  const t = currentLanguage === 'fr';
  
  // Calculate stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalItems = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
  
  // Calculate average order value
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  
  // Top products
  const productCounts = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      productCounts[item.name] = (productCounts[item.name] || 0) + item.quantity;
    });
  });
  const topProducts = Object.entries(productCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  
  // Orders by status
  const ordersByStatus = {
    pending: orders.filter(o => o.status === 'pending').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };
  
  container.innerHTML = `
    <!-- Admin Header -->
    <div class="admin-header">
      <div class="admin-header-content">
        <h1>📊 ${t ? 'Tableau de Bord' : 'Dashboard'}</h1>
        <p>${t ? 'Gestion complète de votre entreprise E-Décor' : 'Complete management of your E-Décor business'}</p>
        <div class="admin-actions-header">
          <button class="admin-btn primary" onclick="window.open('ai-agents/admin-panel.html', '_blank')">
            🤖 ${t ? 'Panel AI Agents' : 'AI Agents Panel'}
          </button>
          <button class="admin-btn" onclick="exportData()">
            📥 ${t ? 'Exporter données' : 'Export Data'}
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="admin-stats-grid">
      <div class="stat-card-large">
        <div class="stat-card-header">
          <span class="stat-icon">📦</span>
          <span class="stat-trend positive">+12%</span>
        </div>
        <div class="stat-value">${totalOrders}</div>
        <div class="stat-label">${t ? 'Total Commandes' : 'Total Orders'}</div>
        <div class="stat-bar">
          <div class="stat-bar-fill" style="width: ${totalOrders > 0 ? (deliveredOrders / totalOrders * 100) : 0}%"></div>
        </div>
      </div>
      
      <div class="stat-card-large">
        <div class="stat-card-header">
          <span class="stat-icon">💰</span>
          <span class="stat-trend positive">+8%</span>
        </div>
        <div class="stat-value">${totalRevenue} €</div>
        <div class="stat-label">${t ? 'Revenu Total' : 'Total Revenue'}</div>
      </div>
      
      <div class="stat-card-large">
        <div class="stat-card-header">
          <span class="stat-icon">⏳</span>
          <span class="stat-trend warning">${pendingOrders}</span>
        </div>
        <div class="stat-value">${pendingOrders}</div>
        <div class="stat-label">${t ? 'Commandes en Attente' : 'Pending Orders'}</div>
      </div>
      
      <div class="stat-card-large">
        <div class="stat-card-header">
          <span class="stat-icon">📈</span>
        </div>
        <div class="stat-value">${avgOrderValue} €</div>
        <div class="stat-label">${t ? 'Panier Moyen' : 'Average Order'}</div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="admin-charts-grid">
      <!-- Orders by Status -->
      <div class="admin-chart-card">
        <h3>📊 ${t ? 'Statut des Commandes' : 'Order Status'}</h3>
        <div class="chart-pie">
          <div class="pie-segment pending" style="--p: ${totalOrders > 0 ? (ordersByStatus.pending / totalOrders * 100) : 0}">
            <span class="pie-label">${t ? 'En attente' : 'Pending'}</span>
            <span class="pie-value">${ordersByStatus.pending}</span>
          </div>
          <div class="pie-segment delivered" style="--p: ${totalOrders > 0 ? (ordersByStatus.delivered / totalOrders * 100) : 0}">
            <span class="pie-label">${t ? 'Livrées' : 'Delivered'}</span>
            <span class="pie-value">${ordersByStatus.delivered}</span>
          </div>
        </div>
      </div>

      <!-- Top Products -->
      <div class="admin-chart-card">
        <h3>🏆 ${t ? 'Produits les Vendus' : 'Top Products'}</h3>
        <div class="top-products-list">
          ${topProducts.length > 0 ? topProducts.map((product, index) => `
            <div class="top-product-item">
              <span class="top-rank">#${index + 1}</span>
              <span class="top-name">${product[0]}</span>
              <span class="top-qty">${product[1]} ${t ? 'ventes' : 'sold'}</span>
            </div>
          `).join('') : `<p class="no-data">${t ? 'Aucune vente encore' : 'No sales yet'}</p>`}
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="admin-quick-actions">
      <h3>⚡ ${t ? 'Actions Rapides' : 'Quick Actions'}</h3>
      <div class="quick-actions-grid">
        <button class="quick-action-btn" onclick="loadPage('catalog')">
          <span>📦</span>
          ${t ? 'Gérer Produits' : 'Manage Products'}
        </button>
        <button class="quick-action-btn" onclick="loadPage('orders')">
          <span>📋</span>
          ${t ? 'Voir Commandes' : 'View Orders'}
        </button>
        <button class="quick-action-btn" onclick="loadPage('blog')">
          <span>📝</span>
          ${t ? 'Gérer Blog' : 'Manage Blog'}
        </button>
        <button class="quick-action-btn" onclick="loadPage('affiliates')">
          <span>🤝</span>
          ${t ? 'Gérer Affiliés' : 'Manage Affiliates'}
        </button>
      </div>
    </div>

    <!-- Recent Orders -->
    <div class="admin-orders-section">
      <h3>📦 ${t ? 'Dernières Commandes' : 'Recent Orders'}</h3>
      <div class="orders-table">
        <div class="table-header">
          <span>ID</span>
          <span>${t ? 'Client' : 'Customer'}</span>
          <span>${t ? 'Articles' : 'Items'}</span>
          <span>${t ? 'Total' : 'Total'}</span>
          <span>${t ? 'Statut' : 'Status'}</span>
          <span>${t ? 'Actions' : 'Actions'}</span>
        </div>
        ${orders.length > 0 ? orders.slice(0, 10).map(order => `
          <div class="table-row">
            <span class="order-id-cell">${order.id}</span>
            <span>${order.delivery?.name || 'N/A'}</span>
            <span>${order.items.reduce((s, i) => s + i.quantity, 0)}</span>
            <span class="price-cell">${order.total} €</span>
            <span class="status-badge ${order.status}">${t ? (order.status === 'pending' ? 'En attente' : order.status === 'delivered' ? 'Livré' : 'Annulé') : order.status}</span>
            <span class="actions-cell">
              <button class="action-btn view" onclick="viewOrder('${order.id}')" title="${t ? 'Voir' : 'View'}">👁️</button>
              ${order.status === 'pending' ? `<button class="action-btn deliver" onclick="updateOrderStatus('${order.id}', 'delivered')" title="${t ? 'Livrer' : 'Deliver'}">✅</button>` : ''}
              <button class="action-btn delete" onclick="cancelOrder('${order.id}')" title="${t ? 'Annuler' : 'Cancel'}">❌</button>
            </span>
          </div>
        `).join('') : `<div class="no-orders">${t ? 'Aucune commande pour le moment' : 'No orders yet'}</div>`}
      </div>
    </div>

    <!-- Products Overview -->
    <div class="admin-products-section">
      <h3>🛋️ ${t ? 'Aperçu des Produits' : 'Products Overview'}</h3>
      <div class="products-overview-grid">
        ${categoriesData.map(cat => `
          <div class="product-category-card">
            <div class="cat-icon">${cat.icon || '🪑'}</div>
            <div class="cat-info">
              <h4>${currentLanguage === 'fr' ? cat.name : cat.name_en}</h4>
              <p>${cat.products.length} ${t ? 'produits' : 'products'}</p>
            </div>
            <button class="cat-btn" onclick="loadCategory('${cat.id}')">→</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// View order details
function viewOrder(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;
  
  const t = currentLanguage === 'fr';
  alert(`${t ? 'Détails de la commande' : 'Order Details'}\n\nID: ${order.id}\n${t ? 'Client' : 'Customer'}: ${order.delivery?.name || 'N/A'}\n${t ? 'Email' : 'Email'}: ${order.delivery?.email || 'N/A'}\n${t ? 'Téléphone' : 'Phone'}: ${order.delivery?.phone || 'N/A'}\n${t ? 'Adresse' : 'Address'}: ${order.delivery?.address || 'N/A'}\n${t ? 'Mode paiement' : 'Payment'}: ${order.paymentMethod}\n${t ? 'Total' : 'Total'}: ${order.total} €`);
}

// Cancel order
function cancelOrder(orderId) {
  if (confirm(currentLanguage === 'fr' ? 'Êtes-vous sûr de vouloir annuler cette commande?' : 'Are you sure you want to cancel this order?')) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = 'cancelled';
      saveOrdersToStorage();
      loadAdminPage();
      showNotification(currentLanguage === 'fr' ? 'Commande annulée!' : 'Order cancelled!');
    }
  }
}

// Export data
function exportData() {
  const data = {
    orders: orders,
    exportDate: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `e-decor-orders-${Date.now()}.json`;
  a.click();
}

// Update order status
function updateOrderStatus(orderId, status) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    saveOrdersToStorage();
    loadAdminPage();
    showNotification(currentLanguage === 'fr' ? 'Statut mis à jour!' : 'Status updated!');
  }
}

// Payment methods by region/country
const paymentMethodsByRegion = {
  // West Africa
  'BJ': [  // Benin
    { id: 'mtn', name: 'MTN Mobile Money', icon: '📱', desc: 'Paiement mobile' },
    { id: 'moov', name: 'Moov Money', icon: '📱', desc: 'Paiement mobile' },
    { id: 'card', name: 'Carte Bancaire', icon: '💳', desc: 'Visa, Mastercard' },
    { id: 'bank', name: 'Virement Bancaire', icon: '🏦', desc: 'Direct' },
    { id: 'cash', name: 'Paiement à la livraison', icon: '💵', desc: 'Espèces' }
  ],
  'TG': [  // Togo
    { id: 'mtn', name: 'MTN Mobile Money', icon: '📱', desc: 'Paiement mobile' },
    { id: 'moov', name: 'Moov Money', icon: '📱', desc: 'Paiement mobile' },
    { id: 'card', name: 'Carte Bancaire', icon: '💳', desc: 'Visa, Mastercard' },
    { id: 'bank', name: 'Virement Bancaire', icon: '🏦', desc: 'Direct' }
  ],
  'SN': [  // Senegal
    { id: 'orange', name: 'Orange Money', icon: '🟠', desc: 'Paiement mobile' },
    { id: 'wave', name: 'Wave', icon: '🌊', desc: 'Sans frais' },
    { id: 'card', name: 'Carte Bancaire', icon: '💳', desc: 'Visa, Mastercard' },
    { id: 'bank', name: 'Virement Bancaire', icon: '🏦', desc: 'Direct' }
  ],
  'CI': [  // Côte d'Ivoire
    { id: 'mtn', name: 'MTN Mobile Money', icon: '📱', desc: 'Paiement mobile' },
    { id: 'moov', name: 'Moov Money', icon: '📱', desc: 'Paiement mobile' },
    { id: 'orange', name: 'Orange Money', icon: '🟠', desc: 'Paiement mobile' },
    { id: 'card', name: 'Carte Bancaire', icon: '💳', desc: 'Visa, Mastercard' }
  ],
  'NG': [  // Nigeria
    { id: 'flutterwave', name: 'Flutterwave', icon: '💙', desc: 'Leader Nigeria' },
    { id: 'paystack', name: 'Paystack', icon: '💜', desc: 'Stripe partner' },
    { id: 'card', name: 'Carte Bancaire', icon: '💳', desc: 'Visa, Mastercard' },
    { id: 'bank', name: 'Virement Bancaire', icon: '🏦', desc: 'Direct' }
  ],
  // Europe
  'FR': [  // France
    { id: 'card', name: 'Carte Bancaire', icon: '💳', desc: 'CB, Visa, Mastercard' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️', desc: 'Compte PayPal' },
    { id: 'bank', name: 'Virement SEPA', icon: '🏦', desc: 'Gratuit EU' },
    { id: 'apple', name: 'Apple Pay', icon: '🍎', desc: 'iPhone, Mac' },
    { id: 'google', name: 'Google Pay', icon: '🔴', desc: 'Android' }
  ],
  'DE': [  // Germany
    { id: 'card', name: 'Kreditkarte', icon: '💳', desc: 'Visa, Mastercard' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️', desc: 'PayPal Konto' },
    { id: 'klarna', name: 'Klarna', icon: '🛒', desc: 'Payer en 3x' },
    { id: 'bank', name: 'Überweisung', icon: '🏦', desc: 'SEPA' },
    { id: 'giropay', name: 'Giropay', icon: '🔵', desc: 'Direct banking' }
  ],
  'GB': [  // United Kingdom
    { id: 'card', name: 'Debit/Credit Card', icon: '💳', desc: 'Visa, Mastercard' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️', desc: 'PayPal Account' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦', desc: 'BACS' },
    { id: 'apple', name: 'Apple Pay', icon: '🍎', desc: 'iPhone, Mac' }
  ],
  // Americas
  'US': [  // United States
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', desc: 'Visa, Mastercard, Amex' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️', desc: 'PayPal' },
    { id: 'apple', name: 'Apple Pay', icon: '🍎', desc: 'Apple Pay' },
    { id: 'google', name: 'Google Pay', icon: '🔴', desc: 'Google Pay' },
    { id: 'cashapp', name: 'Cash App', icon: '💵', desc: 'Cash App Pay' }
  ],
  'CA': [  // Canada
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', desc: 'Visa, Mastercard' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️', desc: 'PayPal' },
    { id: 'interac', name: 'Interac', icon: '🔴', desc: 'Canada only' },
    { id: 'apple', name: 'Apple Pay', icon: '🍎', desc: 'Apple Pay' }
  ],
  // Default (all other countries)
  'OTHER': [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳', desc: 'Visa, Mastercard' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️', desc: 'PayPal' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦', desc: 'SWIFT/IBAN' },
    { id: 'western', name: 'Western Union', icon: '🌍', desc: 'Cash pickup' }
  ]
};

// All countries list
const countriesList = [
  { code: 'BJ', name: 'Bénin', name_en: 'Benin', region: 'AF' },
  { code: 'TG', name: 'Togo', name_en: 'Togo', region: 'AF' },
  { code: 'SN', name: 'Sénégal', name_en: 'Senegal', region: 'AF' },
  { code: 'CI', name: 'Côte d\'Ivoire', name_en: 'Ivory Coast', region: 'AF' },
  { code: 'NG', name: 'Nigéria', name_en: 'Nigeria', region: 'AF' },
  { code: 'GH', name: 'Ghana', name_en: 'Ghana', region: 'AF' },
  { code: 'CM', name: 'Cameroun', name_en: 'Cameroon', region: 'AF' },
  { code: 'FR', name: 'France', name_en: 'France', region: 'EU' },
  { code: 'DE', name: 'Allemagne', name_en: 'Germany', region: 'EU' },
  { code: 'GB', name: 'Royaume-Uni', name_en: 'United Kingdom', region: 'EU' },
  { code: 'ES', name: 'Espagne', name_en: 'Spain', region: 'EU' },
  { code: 'IT', name: 'Italie', name_en: 'Italy', region: 'EU' },
  { code: 'BE', name: 'Belgique', name_en: 'Belgium', region: 'EU' },
  { code: 'NL', name: 'Pays-Bas', name_en: 'Netherlands', region: 'EU' },
  { code: 'US', name: 'États-Unis', name_en: 'United States', region: 'AM' },
  { code: 'CA', name: 'Canada', name_en: 'Canada', region: 'AM' },
  { code: 'BR', name: 'Brésil', name_en: 'Brazil', region: 'AM' },
  { code: 'MX', name: 'Mexique', name_en: 'Mexico', region: 'AM' },
  { code: 'CN', name: 'Chine', name_en: 'China', region: 'AS' },
  { code: 'JP', name: 'Japon', name_en: 'Japan', region: 'AS' },
  { code: 'KR', name: 'Corée du Sud', name_en: 'South Korea', region: 'AS' },
  { code: 'AE', name: 'Émirats Arabes Unis', name_en: 'UAE', region: 'AS' },
  { code: 'OTHER', name: 'Autre pays', name_en: 'Other country', region: 'OT' }
];

// Checkout page with payment methods
async function loadCheckoutPage() {
  const container = document.getElementById('main-content');
  const t = currentLanguage === 'fr';
  
  // Default payment methods for Benin
  const defaultPayments = paymentMethodsByRegion['BJ'];
  
  container.innerHTML = `
    <div class="checkout-page">
      <div class="checkout-header">
        <h1>🛒 ${t ? 'Finaliser votre commande' : 'Complete Your Order'}</h1>
        <p>${t ? 'Choisissez votre pays et mode de paiement' : 'Choose your country and payment method'}</p>
      </div>
      
      <div class="checkout-grid">
        <!-- Payment Methods -->
        <div class="checkout-section payment-section">
          <h3>💳 ${t ? 'Mode de paiement' : 'Payment Method'}</h3>
          <p class="section-hint">${t ? 'Sélectionnez votre pays pour voir les méthodes disponibles' : 'Select your country to see available methods'}</p>
          
          <div class="country-selector">
            <label>🌍 ${t ? 'Votre pays' : 'Your Country'}</label>
            <select id="checkout-country" onchange="updatePaymentMethods()">
              ${countriesList.map(c => `<option value="${c.code}">${t ? c.name : c.name_en}</option>`).join('')}
            </select>
          </div>
          
          <div id="payment-methods-list" class="payment-methods-grid">
            ${defaultPayments.map(pm => `
              <label class="payment-option">
                <input type="radio" name="payment" value="${pm.id}" ${pm.id === 'card' ? 'checked' : ''}>
                <div class="payment-card">
                  <span class="pm-icon">${pm.icon}</span>
                  <span class="pm-name">${pm.name}</span>
                  <span class="pm-desc">${pm.desc}</span>
                </div>
              </label>
            `).join('')}
          </div>
        </div>
        
        <!-- Delivery Info -->
        <div class="checkout-section delivery-section">
          <h3>🚚 ${t ? 'Informations de livraison' : 'Delivery Information'}</h3>
          <form onsubmit="processPayment(event)">
            <div class="form-row">
              <div class="form-group">
                <label>${t ? 'Nom complet' : 'Full Name'} *</label>
                <input type="text" id="delivery-name" required>
              </div>
              <div class="form-group">
                <label>${t ? 'Email' : 'Email'} *</label>
                <input type="email" id="delivery-email" required>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>${t ? 'Téléphone' : 'Phone'} *</label>
                <input type="tel" id="delivery-phone" required placeholder="+229 XX XXX XX">
              </div>
              <div class="form-group">
                <label>${t ? 'WhatsApp' : 'WhatsApp'}</label>
                <input type="tel" id="delivery-whatsapp" placeholder="+229 XX XXX XX">
              </div>
            </div>
            
            <div class="form-group">
              <label>${t ? 'Adresse de livraison' : 'Delivery Address'} *</label>
              <textarea id="delivery-address" rows="2" required></textarea>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>${t ? 'Ville' : 'City'} *</label>
                <input type="text" id="delivery-city" required>
              </div>
              <div class="form-group">
                <label>${t ? 'Code postal' : 'Postal Code'}</label>
                <input type="text" id="delivery-postal">
              </div>
            </div>
            
            <div class="form-group">
              <label>${t ? 'Instructions spéciales' : 'Special Instructions'}</label>
              <textarea id="delivery-instructions" rows="2" placeholder="${t ? 'Instructions pour la livraison...' : 'Delivery instructions...'}"></textarea>
            </div>
          </form>
        </div>
      </div>
      
      <!-- Order Summary -->
      <div class="order-summary-section">
        <h3>📋 ${t ? 'Récapitulatif de commande' : 'Order Summary'}</h3>
        <div class="order-items">
          ${cart.items.map(item => `
            <div class="order-item">
              <span class="item-name">${item.name}</span>
              <span class="item-qty">×${item.quantity}</span>
              <span class="item-price">${item.price * item.quantity} €</span>
            </div>
          `).join('')}
        </div>
        <div class="order-totals">
          <div class="total-row">
            <span>${t ? 'Sous-total' : 'Subtotal'}:</span>
            <span>${cart.total} €</span>
          </div>
          <div class="total-row">
            <span>${t ? 'Livraison' : 'Delivery'}:</span>
            <span>${t ? 'Calculée après' : 'Calculated after'}</span>
          </div>
          <div class="total-row final">
            <span>${t ? 'Total' : 'Total'}:</span>
            <strong>${cart.total} €</strong>
          </div>
        </div>
        <button type="submit" form="checkout-form" class="submit-button" onclick="document.querySelector('#checkout-form').dispatchEvent(new Event('submit'))">
          ✅ ${t ? 'Confirmer la commande' : 'Confirm Order'}
        </button>
        <p class="secure-notice">🔒 ${t ? 'Paiement sécurisé - SSL 256-bit' : 'Secure payment - SSL 256-bit'}</p>
      </div>
    </div>
  `;
}

// Update payment methods based on country
function updatePaymentMethods() {
  const country = document.getElementById('checkout-country')?.value || 'BJ';
  const methods = paymentMethodsByRegion[country] || paymentMethodsByRegion['OTHER'];
  const t = currentLanguage === 'fr';
  
  const container = document.getElementById('payment-methods-list');
  if (container) {
    container.innerHTML = methods.map(pm => `
      <label class="payment-option">
        <input type="radio" name="payment" value="${pm.id}" ${pm.id === methods[0].id ? 'checked' : ''}>
        <div class="payment-card">
          <span class="pm-icon">${pm.icon}</span>
          <span class="pm-name">${pm.name}</span>
          <span class="pm-desc">${pm.desc}</span>
        </div>
      </label>
    `).join('');
  }
}

// Process payment (demo - requires real integration)
function processPayment(event) {
  event.preventDefault();
  
  const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || 'card';
  const name = document.getElementById('delivery-name')?.value;
  const email = document.getElementById('delivery-email')?.value;
  const phone = document.getElementById('delivery-phone')?.value;
  const address = document.getElementById('delivery-address')?.value;
  const city = document.getElementById('delivery-city')?.value;
  const country = document.getElementById('checkout-country')?.value || 'BJ';
  
  // Validation
  if (!name || !email || !phone || !address || !city) {
    showNotification(currentLanguage === 'fr' ? 'Veuillez remplir tous les champs obligatoires!' : 'Please fill all required fields!');
    return;
  }
  
  // Generate order ID
  const orderId = 'ED-' + Date.now();
  
  // In production, integrate with real payment processor:
  // - Stripe (cards, PayPal, Apple Pay, Google Pay)
  // - MTN/Moov API (mobile money Benin)
  // - Flutterwave/Paystack (Nigeria)
  // - Wave (Senegal)
  // - Klarna/Giropay (Germany)
  // - Bank transfer (SEPA/SWIFT)
  
  // Create order
  const order = {
    id: orderId,
    date: new Date().toISOString(),
    items: [...cart.items],
    total: cart.total,
    currency: cart.currency,
    status: 'pending',
    paymentMethod: paymentMethod,
    delivery: { name, email, phone, address, city, country },
    notes: document.getElementById('delivery-instructions')?.value || ''
  };
  
  // Save order
  orders.unshift(order);
  saveOrdersToStorage();
  
  // Show confirmation
  showPaymentConfirmation(orderId, paymentMethod, { name, email, phone, address, city, country });
}

// Orders state
let orders = [];

// Load orders from localStorage
function loadOrdersFromStorage() {
  try {
    const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (saved) {
      orders = JSON.parse(saved) || [];
    }
  } catch (e) {
    console.warn('Could not load orders:', e);
  }
}

// Save orders to localStorage
function saveOrdersToStorage() {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.warn('Could not save orders:', e);
  }
}

// Show payment confirmation
function showPaymentConfirmation(orderId, paymentMethod, delivery) {
  const t = currentLanguage === 'fr';
  const methodNames = {
    card: t ? 'Carte bancaire' : 'Credit Card',
    mtn: 'MTN Mobile Money',
    moov: 'Moov Money',
    paypal: 'PayPal',
    bank: t ? 'Virement bancaire' : 'Bank Transfer'
  };
  
  // Save order to history
  const newOrder = {
    id: orderId,
    date: new Date().toISOString(),
    items: [...cart.items],
    total: cart.total,
    currency: cart.currency,
    paymentMethod: paymentMethod,
    delivery: delivery,
    status: 'pending'
  };
  orders.unshift(newOrder);
  saveOrdersToStorage();
  
  const container = document.getElementById('main-content');
  container.innerHTML = `
    <div class="confirmation-page">
      <div class="confirmation-icon">✅</div>
      <h1>${t ? 'Commande confirmée!' : 'Order Confirmed!'}</h1>
      <p class="order-id">${t ? 'Numéro de commande' : 'Order ID'}: <strong>${orderId}</strong></p>
      
      <div class="confirmation-details">
        <h3>${t ? 'Détails' : 'Details'}</h3>
        <p><strong>${t ? 'Mode de paiement' : 'Payment Method'}:</strong> ${methodNames[paymentMethod]}</p>
        <p><strong>${t ? 'Total' : 'Total'}:</strong> ${cart.total} ${cart.currency}</p>
        <p><strong>${t ? 'Client' : 'Customer'}:</strong> ${delivery.name}</p>
        <p><strong>${t ? 'Livraison' : 'Delivery'}:</strong> ${delivery.city}, ${delivery.country}</p>
      </div>
      
      <div class="payment-instructions">
        <h3>${t ? 'Instructions de paiement' : 'Payment Instructions'}</h3>
        ${getPaymentInstructions(paymentMethod, delivery)}
      </div>
      
      <a href="#" class="cta-button" onclick="clearCart(); loadPage('home'); return false;">${t ? 'Retour à l\'accueil' : 'Back to Home'}</a>
    </div>
  `;
}

// Get payment instructions by method
function getPaymentInstructions(method, delivery) {
  const t = currentLanguage === 'fr';
  
  const instructions = {
    card: `
      <p>${t ? 'Vous allez être redirigé vers notre partenaire de paiement sécurisé.' : 'You will be redirected to our secure payment partner.'}</p>
      <p class="note"><strong>${t ? 'Note:' : 'Note:'} Stripe ${t ? 'intégration requise.' : 'integration required.'}</p>`,
    mtn: `
      <p>${t ? 'Envoyez' : 'Send'} ${cart.total} XOF ${t ? 'au' : 'to'} <strong>+229 97 00 00 00</strong></p>
      <p>${t ? 'Numéro de transaction:' : 'Transaction ID'}: ${delivery.phone}</p>`,
    moov: `
      <p>${t ? 'Envoyez' : 'Send'} ${cart.total} XOF ${t ? 'au' : 'to'} <strong>+229 97 00 00 00</strong></p>
      <p>${t ? 'Numéro de transaction:' : 'Transaction ID'}: ${delivery.phone}</p>`,
    paypal: `
      <p>${t ? 'Vous allez être redirigé vers PayPal pour le paiement.' : 'You will be redirected to PayPal for payment.'}</p>
      <p class="note"><strong>${t ? 'Note:' : 'Note:'} PayPal ${t ? 'intégration requise.' : 'integration required.'}</p>`,
    bank: `
      <p><strong>${t ? 'Virement bancaire' : 'Bank Transfer'}:</strong></p>
      <p>Banque: ${t ? 'À configurer' : 'To be configured'}</p>
      <p>IBAN: ${t ? 'À configurer' : 'To be configured'}</p>
      <p>SWIFT: ${t ? 'À configurer' : 'To be configured'}</p>`
  };
  
  return instructions[method] || '';
}

// Clear cart
function clearCart() {
  cart = { items: [], total: 0, currency: '€' };
  saveCartToStorage();
  updateCartBadge();
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// ============= AI ASSISTANT CHAT =============

// AI Chat State
let aiChatOpen = false;
let aiChatMessages = [];

// Initialize AI Chat
function initAIChat() {
  // Create chat button and container if not exists
  if (!document.getElementById('ai-chat-container')) {
    const chatHTML = `
      <div id="ai-chat-container" class="ai-chat-container">
        <button id="ai-chat-toggle" class="ai-chat-toggle" onclick="toggleAIChat()">
          <span class="chat-icon">💬</span>
          <span class="chat-text">AI Assistant</span>
        </button>
        <div id="ai-chat-window" class="ai-chat-window">
          <div class="chat-header">
            <span>🤖 Assistant E-Décor</span>
            <button class="chat-close" onclick="toggleAIChat()">×</button>
          </div>
          <div id="ai-chat-messages" class="chat-messages"></div>
          <div class="chat-input-area">
            <input type="text" id="ai-chat-input" placeholder="Posez votre question..." onkeypress="handleAIChatKeypress(event)">
            <button onclick="sendAIChatMessage()">Envoyer</button>
          </div>
          <div class="chat-quick-actions">
            <button onclick="sendQuickMessage('Conseils décoration')">🎨 Conseils</button>
            <button onclick="sendQuickMessage('Produits salon')">🛋️ Salons</button>
            <button onclick="sendQuickMessage('Prix livraison')">🚚 Livraison</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatHTML);
  }
}

// Toggle AI Chat
function toggleAIChat() {
  aiChatOpen = !aiChatOpen;
  const window = document.getElementById('ai-chat-window');
  const toggle = document.getElementById('ai-chat-toggle');
  
  if (aiChatOpen) {
    window.classList.add('open');
    toggle.classList.add('hidden');
    // Focus input
    setTimeout(() => document.getElementById('ai-chat-input').focus(), 100);
    // Show welcome message if empty
    if (aiChatMessages.length === 0) {
      addAIChatMessage('assistant', currentLanguage === 'fr' 
        ? 'Bonjour! Je suis votre assistant E-Décor. Comment puis-je vous aider aujourd\'hui?' 
        : 'Hello! I\'m your E-Décor assistant. How can I help you today?');
    }
  } else {
    window.classList.remove('open');
    toggle.classList.remove('hidden');
  }
}

// Handle Enter key
function handleAIChatKeypress(event) {
  if (event.key === 'Enter') {
    sendAIChatMessage();
  }
}

// Send quick message
function sendQuickMessage(message) {
  if (!aiChatOpen) toggleAIChat();
  document.getElementById('ai-chat-input').value = message;
  sendAIChatMessage();
}

// Send AI Chat Message
async function sendAIChatMessage() {
  const input = document.getElementById('ai-chat-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  // Add user message
  addAIChatMessage('user', message);
  input.value = '';
  
  // Show typing indicator
  showTypingIndicator();
  
  // Get AI response
  try {
    const response = await sendAIMessage(message, { context: 'chat' });
    hideTypingIndicator();
    
    if (response.error) {
      // Show helpful response even without AI
      const helpfulResponses = getHelpfulResponse(message);
      addAIChatMessage('assistant', helpfulResponses);
    } else {
      addAIChatMessage('assistant', response.message || response.response || JSON.stringify(response));
    }
  } catch (e) {
    hideTypingIndicator();
    const helpfulResponses = getHelpfulResponse(message);
    addAIChatMessage('assistant', helpfulResponses);
  }
}

// Get helpful responses without AI
function getHelpfulResponse(message) {
  const msg = message.toLowerCase();
  const t = currentLanguage === 'fr';
  
  // Prix et produits
  if (msg.includes('prix') || msg.includes('price') || msg.includes('cost')) {
    return t 
      ? 'Nos prix varient selon les produits:\n• Canapés: 649€ - 1299€\n• Bureaux: 799€ - 999€\n• Tables: 299€ - 899€\n\nContactez-nous pour un devis personnalisé!'
      : 'Our prices vary by product:\n• Sofas: €649 - €1299\n• Desks: €799 - €999\n• Tables: €299 - €899\n\nContact us for a personalized quote!';
  }
  
  // Livraison
  if (msg.includes('livraison') || msg.includes('delivery') || msg.includes('shipping')) {
    return t
      ? '🚚 Modes de livraison disponibles:\n• Standard: 5-10 jours ouvrés\n• Express: 2-5 jours\n• Retrait en magasin: Gratuit\n\nZone: Cotonou et environs.'
      : '🚚 Delivery options:\n• Standard: 5-10 business days\n• Express: 2-5 days\n• In-store pickup: Free\n\nArea: Cotonou and surroundings.';
  }
  
  // Catégorie
  if (msg.includes('salon') || msg.includes('living')) {
    return t
      ? '🛋️ Catégorie Salons:\n• Canapés: LINO, modulables\n• Fauteuils: relax, électriques\n• Tables basses: chêne, carrées\n• Meubles TV: suspendus\n\nPrix: 299€ - 1299€'
      : '🛋️ Living Room Category:\n• Sofas: LINO, modular\n• Armchairs: electric, relax\n• Coffee tables: oak, square\n• TV units: wall-mounted\n\nPrice: €299 - €1299';
  }
  
  if (msg.includes('bureau') || msg.includes('office')) {
    return t
      ? '💼 Catégorie Bureaux:\n• Bureaux: exécutifs, debout\n• Chaines: ergonomiques, mesh\n• Rangements: caissons, tiroirs\n\nPrix: 189€ - 999€'
      : '💼 Office Category:\n• Desks: executive, standing\n• Chairs: ergonomic, mesh\n• Storage: drawers, cabinets\n\nPrice: €189 - €999';
  }
  
  // Contact
  if (msg.includes('contact') || msg.includes('téléphone') || msg.includes('phone')) {
    return t
      ? '📞 Coordonnées:\n• Email: electronbusiness07@gmail.com\n• Tél: +229 01 977 003 47\n• Tél: +229 01 411 663 14\n• Adresse: Cotonou, Benin'
      : '📞 Contact:\n• Email: electronbusiness07@gmail.com\n• Phone: +229 01 977 003 47\n• Phone: +229 01 411 663 14\n• Address: Cotonou, Benin';
  }
  
  // Commande
  if (msg.includes('commande') || msg.includes('order') || msg.includes('achat')) {
    return t
      ? '🛒 Pour passer une commande:\n1. Parcourez nos catégories\n2. Ajoutez vos produits au panier\n3. Validez votre panier\n4. Choisissez le mode de livraison\n\nOu contactez-nous directement!'
      : '🛒 To place an order:\n1. Browse our categories\n2. Add products to cart\n3. Validate your cart\n4. Choose delivery method\n\nOr contact us directly!';
  }
  
  // Conseil décoration
  if (msg.includes('conseil') || msg.includes('tip') || msg.includes('advice') || msg.includes('décoration')) {
    return t
      ? '🎨 Conseils-decoration:\n• Jouez avec les couleurs neutres\n• Mixez les textures (bois, tissu)\n• Ajoutez des plantes vertes\n• Optez pour un éclairage tamisé\n\nDécouvrez nos articles blog pour plus d\'astuces!'
      : '🎨 Decorating tips:\n• Play with neutral colors\n• Mix textures (wood, fabric)\n• Add green plants\n• Opt for soft lighting\n\nCheck our blog articles for more tips!';
  }
  
  // Default response
  return t
    ? 'Merci pour votre message! Je peux vous aider avec:\n• Nos produits et prix\n• La livraison\n• Les commandes\n• Les conseils-decoration\n\nQue souhaitez-vous savoir?'
    : 'Thank you for your message! I can help you with:\n• Our products and prices\n• Delivery\n• Orders\n• Decorating tips\n\nWhat would you like to know?';
}

// Add message to chat
function addAIChatMessage(role, content) {
  const messagesContainer = document.getElementById('ai-chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${role}`;
  messageDiv.innerHTML = `<div class="message-content">${content.replace(/\n/g, '<br>')}</div>`;
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Store in history
  aiChatMessages.push({ role, content });
}

// Show typing indicator
function showTypingIndicator() {
  const messagesContainer = document.getElementById('ai-chat-messages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-message assistant typing';
  typingDiv.id = 'ai-typing';
  typingDiv.innerHTML = '<div class="message-content">...</div>';
  messagesContainer.appendChild(typingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
  const typing = document.getElementById('ai-typing');
  if (typing) typing.remove();
}

// ============= END AI ASSISTANT =============

// ============= END PAYMENT SYSTEM =============

// Submit contact form
function submitContactForm(event) {
  event.preventDefault();
  alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
  event.target.reset();
}

// Modal functions
function openModal() {
  document.getElementById('modal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// ALSO try immediately in case DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(init, 100);
}

// And try even more directly
init();