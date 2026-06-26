// E-Décor - Renderer JavaScript
let currentLanguage = 'fr';
let currentPage = 'home';
let categoriesData = [];

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
  try {
    categoriesData = await window.api.getCategories();
    populateCategoriesMenu();
    setupEventListeners();
    setupIPCListeners();
    loadPage('home');
  } catch (error) {
    console.error('Initialization error:', error);
    document.getElementById('main-content').innerHTML = '<p>Error loading application. Please restart.</p>';
  }
}

function t(key) {
  return translations[currentLanguage][key] || key;
}

function formatPrice(price, currency = '€') {
  return price + ' ' + currency;
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
  window.api.onNavigate((page, param) => {
    if (page === 'category' && param) {
      loadCategory(param);
    } else if (page === 'blog-category' && param) {
      loadBlogCategory(param);
    } else {
      loadPage(page);
    }
  });

  window.api.onShowAbout(() => {
    loadPage('about');
  });
}

// Handle search
async function handleSearch() {
  const query = document.getElementById('search-input').value.trim();
  if (!query) return;

  const results = await window.api.searchProducts(query);
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
    case 'about':
      await loadAboutPage(mainContent);
      break;
    case 'contact':
      await loadContactPage(mainContent);
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
  const posts = await window.api.getGlobalBlog();
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

// Load Category
async function loadCategory(categoryId) {
  const category = categoriesData.find(c => c.id === categoryId);
  if (!category) return;

  const products = await window.api.getProducts(categoryId);
  const container = document.getElementById('main-content');

  container.innerHTML = `
    <div class="page-title">
      <h1>${currentLanguage === 'fr' ? category.name : category.name_en}</h1>
      <p>${category.description}</p>
    </div>
    <div class="products-grid">
      ${products.map(product => `
        <div class="product-card">
          <div class="product-image">${categoryIcons[categoryId] || '🪑'}</div>
          <div class="product-info">
            <h4>${product.name}</h4>
            <p class="price">${formatPrice(product.price, product.currency)}</p>
            <p class="description">${product.description}</p>
            <button class="product-button" onclick="showProductDetails('${categoryId}', '${product.id}')">${t('voir_details')}</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  currentPage = 'category';
  updateActiveNavLink(null);
}

// Show product details in modal
async function showProductDetails(categoryId, productId) {
  const product = await window.api.getProduct(categoryId, productId);
  if (!product) return;

  const category = categoriesData.find(c => c.id === categoryId);
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <div class="product-detail">
      <div class="product-image" style="height: 300px; font-size: 6rem;">${categoryIcons[categoryId] || '🪑'}</div>
      <h2 style="color: var(--primary-color); margin: 20px 0;">${product.name}</h2>
      <p class="price" style="font-size: 2rem; color: var(--secondary-color); font-weight: bold;">${formatPrice(product.price, product.currency)}</p>
      <p style="margin: 20px 0; line-height: 1.8;">${product.description}</p>
      <button class="product-button" style="max-width: 300px; padding: 15px; font-size: 1.1rem;" onclick="addToCartFromModal('${categoryId}', '${product.id}')">${t('ajouter_panier')}</button>
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
  const globalPosts = await window.api.getGlobalBlog();
  
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

// Load blog posts by category
async function loadBlogCategory(categoryId) {
  const posts = await window.api.getBlogArticles(categoryId);
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
  const post = await window.api.getBlogPost(postId);
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

// Cart state
let cart = {
  items: [],
  total: 0,
  currency: '€'
};

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
  showNotification(currentLanguage === 'fr' ? 'Produit ajouté au panier!' : 'Product added to cart!');
}

// Remove from cart  
function removeFromCart(productId) {
  cart.items = cart.items.filter(i => i.id !== productId);
  updateCartTotal();
  loadCartPage();
}

// Update cart total
function updateCartTotal() {
  cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
              <p class="cart-item-price">${item.price} ${item.currency} × ${item.quantity}</p>
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
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

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