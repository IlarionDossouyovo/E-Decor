const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Produits & Catégories
  getCategories: () => ipcRenderer.invoke('get-categories'),
  getCategory: (categoryId) => ipcRenderer.invoke('get-category', categoryId),
  getSubcategories: (categoryId) => ipcRenderer.invoke('get-subcategories', categoryId),
  getProducts: (categoryId, subcategoryId) => ipcRenderer.invoke('get-products', categoryId, subcategoryId),
  getProduct: (categoryId, productId) => ipcRenderer.invoke('get-product', categoryId, productId),
  getAllCategories: () => ipcRenderer.invoke('get-all-categories'),
  searchProducts: (query) => ipcRenderer.invoke('search-products', query),
  
  // Blog
  getBlogArticles: (categoryId, subcategoryId) => ipcRenderer.invoke('get-blog-articles', categoryId, subcategoryId),
  getGlobalBlog: () => ipcRenderer.invoke('get-global-blog'),
  getBlogPost: (postId) => ipcRenderer.invoke('get-blog-post', postId),
  
  // Affiliés
  getAffiliates: () => ipcRenderer.invoke('get-affiliates'),
  getAffiliate: (affiliateId) => ipcRenderer.invoke('get-affiliate', affiliateId),
  getAffiliateBlogPosts: (affiliateId) => ipcRenderer.invoke('get-affiliate-blog-posts', affiliateId),
  
  // Navigation Electron
  onNavigate: (callback) => ipcRenderer.on('navigate', (event, page, param) => callback(page, param)),
  onShowAbout: (callback) => ipcRenderer.on('show-about', () => callback()),
  
  // 🤖 AI - Ollama Integration
  ai: {
    checkStatus: () => ipcRenderer.invoke('ai-check-status'),
    chat: (message, context) => ipcRenderer.invoke('ai-chat', message, context),
    recommendations: (preferences) => ipcRenderer.invoke('ai-recommendations', preferences),
    listModels: () => ipcRenderer.invoke('ai-list-models')
  }
});