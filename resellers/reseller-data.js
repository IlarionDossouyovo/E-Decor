// E-Décor Reseller Portal Data
// Portail revendeur professionnel

const resellerTiers = [
  {
    id: 'bronze',
    name: 'Revendeur Bronze',
    name_en: 'Bronze Reseller',
    discount: 15,
    minOrder: 500,
    benefits: [
      'Prix revendeur réduit de 15%',
      'Support par email',
      'Catalogue en ligne',
      'Livraison standard'
    ]
  },
  {
    id: 'silver',
    name: 'Revendeur Argent',
    name_en: 'Silver Reseller',
    discount: 25,
    minOrder: 2000,
    benefits: [
      'Prix revendeur réduit de 25%',
      'Support prioritaire',
      'Catalogue exclusif',
      'Livraison gratuite',
      'Accès提前新产品'
    ]
  },
  {
    id: 'gold',
    name: 'Revendeur Or',
    name_en: 'Gold Reseller',
    discount: 35,
    minOrder: 5000,
    benefits: [
      'Prix revendeur réduit de 35%',
      'Support dédié',
      'Catalogue VIP',
      'Livraison gratuite express',
      'Accès anticipé nouveaux produits',
      'Formation gratuite',
      'Marketing personnalisé'
    ]
  },
  {
    id: 'platinum',
    name: 'Revendeur Platine',
    name_en: 'Platinum Reseller',
    discount: 45,
    minOrder: 15000,
    benefits: [
      'Prix revendeur réduit de 45%',
      'Manager de compte dédié',
      'Catalogue confidentiel',
      'Livraison gratuite express',
      'Accès exclusif aux nouveautés',
      'Formation avancées gratuite',
      'Support marketing personnalisé',
      'Événements exclusifs',
      'Remises supplémentaires sur volume'
    ]
  }
];

const resellers = [
  {
    id: 'res1',
    companyName: 'Déco Style Cotonou',
    contactName: 'Alain Amoussou',
    email: 'alain@decostyle.bj',
    phone: '+229 01 234 567',
    address: 'Rue de la Chance, Cotonou, Benin',
    tier: 'gold',
    joinDate: '2024-03-15',
    stats: {
      totalOrders: 45,
      totalRevenue: 28500,
      averageOrder: 633,
      lastOrderDate: '2026-01-18'
    },
    paymentInfo: {
      method: 'virement',
      bank: 'Bancaire Populaire',
      account: '****5678'
    },
    active: true
  },
  {
    id: 'res2',
    companyName: 'Maison Elegance',
    contactName: 'Patricia Boko',
    email: 'patricia@maisonelegance.bj',
    phone: '+229 01 987 654',
    address: 'Avenue de la République, Porto-Novo, Benin',
    tier: 'silver',
    joinDate: '2024-08-20',
    stats: {
      totalOrders: 23,
      totalRevenue: 11500,
      averageOrder: 500,
      lastOrderDate: '2026-01-10'
    },
    paymentInfo: {
      method: 'virement',
      bank: 'Ecobank',
      account: '****9012'
    },
    active: true
  },
  {
    id: 'res3',
    companyName: 'Interior Design Co',
    contactName: 'Bruno Hounsinou',
    email: 'bruno@interiordesign.bj',
    phone: '+229 01 456 789',
    address: 'Quartier Ganhi, Cotonou, Benin',
    tier: 'bronze',
    joinDate: '2025-01-10',
    stats: {
      totalOrders: 8,
      totalRevenue: 3200,
      averageOrder: 400,
      lastOrderDate: '2025-12-20'
    },
    paymentInfo: {
      method: 'mobile',
      provider: 'MTN',
      phone: '+229 01 456 789'
    },
    active: true
  }
];

const resellerProducts = [
  { id: 's1', name: 'Canapé modulable LINO', retailPrice: 1299, wholesalePrice: 844, stock: 25 },
  { id: 's2', name: 'Fauteuil relax électrique', retailPrice: 649, wholesalePrice: 422, stock: 18 },
  { id: 's3', name: 'Table basse carrée', retailPrice: 299, wholesalePrice: 194, stock: 45 },
  { id: 's4', name: 'Meuble TV suspendu', retailPrice: 449, wholesalePrice: 292, stock: 32 },
  { id: 's5', name: 'Bibliothèque modulable', retailPrice: 549, wholesalePrice: 357, stock: 20 }
];

const resellerOrders = [
  {
    id: 'RES-2026-001',
    resellerId: 'res1',
    date: '2026-01-18',
    items: [
      { productId: 's1', quantity: 5, unitPrice: 844, total: 4220 },
      { productId: 's3', quantity: 10, unitPrice: 194, total: 1940 }
    ],
    subtotal: 6160,
    shipping: 0,
    total: 6160,
    status: 'processing',
    paymentStatus: 'paid'
  },
  {
    id: 'RES-2026-002',
    resellerId: 'res2',
    date: '2026-01-10',
    items: [
      { productId: 's2', quantity: 3, unitPrice: 422, total: 1266 },
      { productId: 's4', quantity: 5, unitPrice: 292, total: 1460 }
    ],
    subtotal: 2726,
    shipping: 50,
    total: 2776,
    status: 'shipped',
    trackingNumber: 'MTN123456789',
    paymentStatus: 'paid'
  },
  {
    id: 'RES-2025-045',
    resellerId: 'res1',
    date: '2025-12-15',
    items: [
      { productId: 's1', quantity: 3, unitPrice: 844, total: 2532 },
      { productId: 's5', quantity: 2, unitPrice: 357, total: 714 }
    ],
    subtotal: 3246,
    shipping: 0,
    total: 3246,
    status: 'delivered',
    paymentStatus: 'paid'
  }
];

const invoices = [
  {
    id: 'INV-2026-001',
    resellerId: 'res1',
    orderId: 'RES-2026-001',
    date: '2026-01-18',
    dueDate: '2026-02-18',
    items: [
      { description: 'Canapé modulable LINO x5', amount: 4220 },
      { description: 'Table basse carrée x10', amount: 1940 }
    ],
    subtotal: 6160,
    tax: 0,
    total: 6160,
    status: 'pending',
    paidDate: null
  },
  {
    id: 'INV-2026-002',
    resellerId: 'res2',
    orderId: 'RES-2026-002',
    date: '2026-01-10',
    dueDate: '2026-02-10',
    items: [
      { description: 'Fauteuil relax électrique x3', amount: 1266 },
      { description: 'Meuble TV suspendu x5', amount: 1460 },
      { description: 'Frais de livraison', amount: 50 }
    ],
    subtotal: 2776,
    tax: 0,
    total: 2776,
    status: 'paid',
    paidDate: '2026-01-12'
  }
];

// Marketing kit for resellers
const marketingKit = {
  catalogs: [
    { id: 'cat1', name: 'Catalogue général 2026', url: '/assets/resellers/catalogue-2026.pdf', pages: 48, fileSize: '15MB' },
    { id: 'cat2', name: 'Catalogue salons', url: '/assets/resellers/catalogue-salons.pdf', pages: 24, fileSize: '8MB' },
    { id: 'cat3', name: 'Catalogue éclairage', url: '/assets/resellers/catalogue-eclairage.pdf', pages: 20, fileSize: '6MB' }
  ],
  images: [
    { id: 'img1', category: 'products', name: 'Photos produits HD', url: '/assets/resellers/images-products.zip', count: 150 },
    { id: 'img2', category: 'lifestyle', name: 'Photos lifestyle', url: '/assets/resellers/images-lifestyle.zip', count: 75 },
    { id: 'img3', category: 'showroom', name: 'Photos showroom', url: '/assets/resellers/images-showroom.zip', count: 30 }
  ],
  videos: [
    { id: 'vid1', name: 'Vidéo présentation', url: '/assets/resellers/video-presentation.mp4', duration: '3:30' },
    { id: 'vid2', name: 'Tutoriels montage', url: '/assets/resellers/video-tutos.zip', count: 12 }
  ],
  templates: [
    { id: 'tpl1', name: 'Flyer A4', url: '/assets/resellers/flyer-a4.ai', format: 'AI' },
    { id: 'tpl2', name: 'Affiche A3', url: '/assets/resellers/affiche-a3.ai', format: 'AI' },
    { id: 'tpl3', name: 'Logo pack', url: '/assets/resellers/logo-pack.zip', formats: ['PNG', 'SVG', 'AI'] }
  ]
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    resellerTiers, 
    resellers, 
    resellerProducts,
    resellerOrders,
    invoices,
    marketingKit
  };
}
