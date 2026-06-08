const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Produits & Catégories
  getCategories: () => ipcRenderer.invoke('get-categories'),
  getProducts: (categoryId) => ipcRenderer.invoke('get-products', categoryId),
  getProduct: (categoryId, productId) => ipcRenderer.invoke('get-product', categoryId, productId),
  getAllCategories: () => ipcRenderer.invoke('get-all-categories'),
  searchProducts: (query) => ipcRenderer.invoke('search-products', query),
  
  // Blog
  getBlogArticles: (categoryId) => ipcRenderer.invoke('get-blog-articles', categoryId),
  getGlobalBlog: () => ipcRenderer.invoke('get-global-blog'),
  getBlogPost: (postId) => ipcRenderer.invoke('get-blog-post', postId),
  
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