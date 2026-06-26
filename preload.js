const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getCategories: () => ipcRenderer.invoke('get-categories'),
  getProducts: (categoryId) => ipcRenderer.invoke('get-products', categoryId),
  getProduct: (categoryId, productId) => ipcRenderer.invoke('get-product', categoryId, productId),
  getBlogArticles: (categoryId) => ipcRenderer.invoke('get-blog-articles', categoryId),
  getGlobalBlog: () => ipcRenderer.invoke('get-global-blog'),
  getBlogPost: (postId) => ipcRenderer.invoke('get-blog-post', postId),
  getAllCategories: () => ipcRenderer.invoke('get-all-categories'),
  searchProducts: (query) => ipcRenderer.invoke('search-products', query),
  onNavigate: (callback) => ipcRenderer.on('navigate', (event, page, param) => callback(page, param)),
  onShowAbout: (callback) => ipcRenderer.on('show-about', () => callback())
});