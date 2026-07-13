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
  container.innerHTML = `
    <section class="hero-section">
      <h2>${t('home_title')}</h2>
      <p>${t('home_subtitle')}</p>
      <a href="#" class="cta-button" onclick="loadPage('catalog'); return false;">${t('home_cta')}</a>
    </section>

    <section class="categories-section">
      <h2 class="page-title">${t('categories_title')}</h2>
      <div class="categories-grid">
        ${categoriesData.map(cat => `
          <div class="category-card" onclick="loadCategory('${cat.id}')">
            <div class="category-image">${categoryIcons[cat.id] || '🪑'}</div>
            <div class="category-info">
              <h3>${currentLanguage === 'fr' ? cat.name : cat.name_en}</h3>
              <p>${cat.description}</p>
              <p class="product-count">${cat.products.length} ${cat.products.length === 1 ? 'produit' : 'produits'}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <section class="blog-section">
      <h2 class="page-title">${t('blog_title')}</h2>
      <div class="blog-grid">
        ${await getRecentBlogPosts(4)}
      </div>
    </section>
  `;
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
  container.innerHTML = `
    <div class="page-title">
      <h1>${t('catalog_title')}</h1>
      <p>${t('catalog_subtitle')}</p>
    </div>
    <div class="categories-grid">
      ${categoriesData.map(cat => `
        <div class="category-card" onclick="loadCategory('${cat.id}')">
          <div class="category-image">${categoryIcons[cat.id] || '🪑'}</div>
          <div class="category-info">
            <h3>${currentLanguage === 'fr' ? cat.name : cat.name_en}</h3>
            <p>${cat.description}</p>
            <p class="product-count">${cat.products.length} ${cat.products.length === 1 ? 'produit' : 'produits'}</p>
          </div>
        </div>
      `).join('')}
    </div>
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
        ${products.map(product => `
          <div class="product-card">
            <div class="product-image">${categoryIcons[categoryId] || '🪑'}</div>
            <div class="product-info">
              <h4>${product.name}</h4>
              <p class="price">${formatPrice(product.price, product.currency)}</p>
              <p class="description">${product.description}</p>
              <div class="product-actions">
                <button class="product-button" onclick="showProductDetails('${categoryId}', '${product.id}')">${t('voir_details')}</button>
                <button class="product-button favorite-btn" onclick="addToFavoritesFromCatalog('${categoryId}', '${product.id}')">❤️</button>
              </div>
            </div>
          </div>
        `).join('')}
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
        ${products.map(product => `
          <div class="product-card">
            <div class="product-image">${categoryIcons[categoryId] || '🪑'}</div>
            <div class="product-info">
              <h4>${product.name}</h4>
              <p class="price">${formatPrice(product.price, product.currency)}</p>
              <p class="description">${product.description}</p>
              <div class="product-actions">
                <button class="product-button" onclick="showProductDetails('${categoryId}', '${product.id}')">${t('voir_details')}</button>
                <button class="product-button favorite-btn" onclick="addToFavoritesFromCatalog('${categoryId}', '${product.id}')">❤️</button>
              </div>
            </div>
          </div>
        `).join('')}
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
async function showProductDetails(categoryId, productId) {
  const product = await api.getProduct(categoryId, productId);
  if (!product) return;

  const category = categoriesData.find(c => c.id === categoryId);
  const categoryName = currentLanguage === 'fr' ? category.name : category.name_en;
  const modalBody = document.getElementById('modal-body');
  const favBtnText = isFavorite(productId) ? (currentLanguage === 'fr' ? '💔 Retirer' : '💔 Remove') : '❤️ Favoris';
  const favAction = isFavorite(productId) ? `removeFromFavorites('${productId}')` : `addToFavoritesFromCatalog('${categoryId}', '${productId}')`;
  
  modalBody.innerHTML = `
    <div class="product-detail-modal">
      <div class="product-gallery">
        <div class="product-image-large">${categoryIcons[categoryId] || '🪑'}</div>
      </div>
      <div class="product-info-detail">
        <span class="category-tag">${categoryName}</span>
        <h2>${product.name}</h2>
        <p class="price-large">${formatPrice(product.price, product.currency)}</p>
        <p class="description-detail">${product.description}</p>
        <div class="product-specs">
          <h4>${currentLanguage === 'fr' ? 'Caractéristiques' : 'Specifications'}</h4>
          <ul>
            <li>${currentLanguage === 'fr' ? 'Qualité premium' : 'Premium quality'}</li>
            <li>${currentLanguage === 'fr' ? 'Garantie 2 ans' : '2 year warranty'}</li>
            <li>${currentLanguage === 'fr' ? 'Livraison internationale' : 'International delivery'}</li>
          </ul>
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
    'orca': '🏠',
    'maison': '🛋️',
    'tech': '💡',
    'green': '🌿',
    'artisanat': '🎨'
  };
  return logos[type] || '🤝';
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
  container.innerHTML = `
    <div class="page-title">
      <h1>${t('about_title')}</h1>
      <p>${t('about_subtitle')}</p>
    </div>

    <section class="about-section">
      <h2>Notre Histoire</h2>
      <p>E-Décor est une entreprise e-commerce dropshipping spécialisée dans la décoration d'intérieur, l'ameublement et les articles de maison. En partenariat avec ORCA-Décor, nous proposons une large gamme de meubles pour tout type d'aménagement.</p>
      <br>
      <h2>Nos Catégories</h2>
      <ul>
        <li><strong>Salons</strong> : Canapés, fauteuils, tables basses, meubles TV</li>
        <li><strong>Bureaux</strong> : Bureaux exécutifs, fauteuils de direction, rangements</li>
        <li><strong>Cuisines</strong> : Îlots centraux, meubles bas, étageres</li>
        <li><strong>Jardins</strong> : Salons d'extérieur, transats, barbecues</li>
        <li><strong>Salles à manger</strong> : Tables, chaises, buffets, vaisseliers</li>
      </ul>
      <br>
      <h2>Notre Mission</h2>
      <p>Proposer des mobilier de qualité à des prix compétitifs,avec un service client irréprochable. Nous expédions nos produits dans le monde entier.</p>
    </section>

    <section class="partners-section">
      <h2>Nos Partenaires</h2>
      <p><strong>ORCA-Décor</strong> : Notre partenaire exclusif pour la decoration et l'ameublement.</p>
    </section>
  `;
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
  
  container.innerHTML = `
    <div class="page-title">
      <h1>${t ? 'Administration' : 'Admin Dashboard'}</h1>
      <button class="product-button" onclick="window.open('ai-agents/admin-panel.html', '_blank')" style="margin-left: 20px;">
        🤖 ${t ? 'Panel AI Agents' : 'AI Agents Panel'}
      </button>
    </div>
    <div class="admin-stats">
      <div class="stat-card">
        <div class="stat-icon">📦</div>
        <div class="stat-value">${totalOrders}</div>
        <div class="stat-label">${t ? 'Total commandes' : 'Total Orders'}</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">⏳</div>
        <div class="stat-value">${pendingOrders}</div>
        <div class="stat-label">${t ? 'En attente' : 'Pending'}</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">🛍️</div>
        <div class="stat-value">${totalItems}</div>
        <div class="stat-label">${t ? 'Articles vendus' : 'Items Sold'}</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">💰</div>
        <div class="stat-value">${totalRevenue} €</div>
        <div class="stat-label">${t ? 'Revenu total' : 'Total Revenue'}</div>
      </div>
    </div>
    
    <h2 class="page-title" style="margin-top: 40px;">${t ? 'Gestion des commandes' : 'Order Management'}</h2>
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
          <div class="admin-actions">
            <button class="product-button" onclick="updateOrderStatus('${order.id}', 'delivered')">${t ? 'Marquer livré' : 'Mark Delivered'}</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
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

// Checkout page with payment methods
async function loadCheckoutPage() {
  const container = document.getElementById('main-content');
  const t = currentLanguage === 'fr';
  
  container.innerHTML = `
    <div class="page-title">
      <h1>${t ? 'Paiement' : 'Payment'}</h1>
    </div>
    <div class="checkout-container">
      <div class="payment-methods">
        <h3>${t ? 'Mode de paiement' : 'Payment Method'}</h3>
        
        <label class="payment-option">
          <input type="radio" name="payment" value="card" checked>
          <div class="payment-card">
            <span class="pm-icon">💳</span>
            <span class="pm-name">${t ? 'Carte bancaire' : 'Credit/Debit Card'}</span>
            <span class="pm-desc">Visa, Mastercard, Verve</span>
          </div>
        </label>
        
        <label class="payment-option">
          <input type="radio" name="payment" value="mtn">
          <div class="payment-card">
            <span class="pm-icon">📱</span>
            <span class="pm-name">MTN Mobile Money</span>
            <span class="pm-desc">${t ? 'Paiement mobile Benin' : 'Benin mobile payment'}</span>
          </div>
        </label>
        
        <label class="payment-option">
          <input type="radio" name="payment" value="moov">
          <div class="payment-card">
            <span class="pm-icon">📱</span>
            <span class="pm-name">Moov Money</span>
            <span class="pm-desc">${t ? 'Paiement mobile Benin' : 'Benin mobile payment'}</span>
          </div>
        </label>
        
        <label class="payment-option">
          <input type="radio" name="payment" value="paypal">
          <div class="payment-card">
            <span class="pm-icon">🅿️</span>
            <span class="pm-name">PayPal</span>
            <span class="pm-desc">${t ? 'International' : 'International'}</span>
          </div>
        </label>
        
        <label class="payment-option">
          <input type="radio" name="payment" value="bank">
          <div class="payment-card">
            <span class="pm-icon">🏦</span>
            <span class="pm-name">${t ? 'Virement bancaire' : 'Bank Transfer'}</span>
            <span class="pm-desc">${t ? 'Europe/International' : 'Europe/International'}</span>
          </div>
        </label>
      </div>
      
      <div class="checkout-form">
        <h3>${t ? 'Informations de livraison' : 'Delivery Information'}</h3>
        <form onsubmit="processPayment(event)">
          <div class="form-group">
            <label>${t ? 'Nom complet' : 'Full Name'}</label>
            <input type="text" id="delivery-name" required>
          </div>
          <div class="form-group">
            <label>${t ? 'Email' : 'Email'}</label>
            <input type="email" id="delivery-email" required>
          </div>
          <div class="form-group">
            <label>${t ? 'Téléphone' : 'Phone'}</label>
            <input type="tel" id="delivery-phone" required>
          </div>
          <div class="form-group">
            <label>${t ? 'Adresse de livraison' : 'Delivery Address'}</label>
            <textarea id="delivery-address" required></textarea>
          </div>
          <div class="form-group">
            <label>${t ? 'Ville' : 'City'}</label>
            <input type="text" id="delivery-city" required>
          </div>
          <div class="form-group">
            <label>${t ? 'Pays' : 'Country'}</label>
            <select id="delivery-country" required>
              <option value="BJ">Benin</option>
              <option value="FR">France</option>
              <option value="US">United States</option>
              <option value="DE">Germany</option>
              <option value="GB">United Kingdom</option>
              <option value="CA">Canada</option>
              <option value="SN">Senegal</option>
              <option value="CI">Cote d'Ivoire</option>
              <option value="TG">Togo</option>
              <option value="NG">Nigeria</option>
              <option value="OTHER">${t ? 'Autre' : 'Other'}</option>
            </select>
          </div>
          
          <div class="order-summary">
            <h4>${t ? 'Commande' : 'Order'}</h4>
            <p>${cart.items.length} ${t ? 'articles' : 'items'}</p>
            <p class="order-total">${t ? 'Total' : 'Total'}: <strong>${cart.total} ${cart.currency}</strong></p>
          </div>
          
          <button type="submit" class="submit-button">${t ? 'Confirmer le paiement' : 'Confirm Payment'}</button>
        </form>
      </div>
    </div>
  `;
}

// Process payment (demo - requires real integration)
function processPayment(event) {
  event.preventDefault();
  
  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  const name = document.getElementById('delivery-name').value;
  const email = document.getElementById('delivery-email').value;
  const phone = document.getElementById('delivery-phone').value;
  const address = document.getElementById('delivery-address').value;
  const city = document.getElementById('delivery-city').value;
  const country = document.getElementById('delivery-country').value;
  
  // Generate order ID
  const orderId = 'ED-' + Date.now();
  
  // In production, integrate with real payment processor:
  // - Stripe (cards, PayPal)
  // - MTN/Moov API (mobile money Benin)
  // - Bank transfer (SEPA/SWIFT)
  
  showPaymentConfirmation(orderId, paymentMethod, {
    name, email, phone, address, city, country
  });
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