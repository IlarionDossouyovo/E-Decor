// E-Décor Affiliate System
// Programme d'affiliation professionnel

const affiliateConfig = {
  // Commission levels by product category
  commissions: {
    default: 10, // 10% default
    furniture: 12,
    lighting: 15,
    decoration: 10,
    sale: 5
  },
  
  // Multi-level commission (MLM-style)
  multiLevel: {
    level1: 10, // Direct affiliate
    level2: 3,  // Sub-affiliate
    level3: 1   // Sub-sub-affiliate
  },
  
  // Payment thresholds
  minPayout: 50, // Minimum 50€ to request payout
  payoutFrequency: 'monthly',
  
  // Cookie duration (days)
  cookieDuration: 30,
  
  // Bonus rates
  bonuses: {
    firstSale: 10, // Bonus for first sale
    volume: [ // Volume-based bonuses
      { sales: 10, bonus: 50 },
      { sales: 50, bonus: 200 },
      { sales: 100, bonus: 500 },
      { sales: 500, bonus: 2000 }
    ]
  }
};

// Sample affiliate data
const affiliates = [
  {
    id: 'aff1',
    userId: 'user1',
    name: 'Marie Dubois',
    email: 'marie@example.com',
    level: 'gold',
    joinDate: '2025-06-15',
    stats: {
      totalSales: 156,
      totalRevenue: 15600,
      totalCommission: 1560,
      pendingPayout: 340,
      clicks: 4520,
      conversionRate: 3.45,
      refCode: 'MARIE2025',
      qrCode: 'marie-qr.png'
    },
    badges: ['top-seller', 'first-sale', 'mentor'],
    parentAffiliate: null
  },
  {
    id: 'aff2',
    userId: 'user2',
    name: 'Jean-Pierre Kouassi',
    email: 'jean@example.com',
    level: 'silver',
    joinDate: '2025-08-20',
    stats: {
      totalSales: 78,
      totalRevenue: 7800,
      totalCommission: 780,
      pendingPayout: 180,
      clicks: 2150,
      conversionRate: 3.63,
      refCode: 'JEAN2025',
      qrCode: 'jean-qr.png'
    },
    badges: ['active'],
    parentAffiliate: 'aff1'
  },
  {
    id: 'aff3',
    userId: 'user3',
    name: 'Sophie Martin',
    email: 'sophie@example.com',
    level: 'bronze',
    joinDate: '2025-10-10',
    stats: {
      totalSales: 23,
      totalRevenue: 2300,
      totalCommission: 230,
      pendingPayout: 80,
      clicks: 890,
      conversionRate: 2.58,
      refCode: 'SOPHIE2025',
      qrCode: 'sophie-qr.png'
    },
    badges: ['new'],
    parentAffiliate: 'aff1'
  }
];

// Affiliate products with commission rates
const affiliateProducts = [
  { id: 's1', name: 'Canapé modulable LINO', commission: 12, price: 1299 },
  { id: 's2', name: 'Fauteuil relax électrique', commission: 12, price: 649 },
  { id: 's3', name: 'Table basse carrée', commission: 10, price: 299 },
  { id: 's4', name: 'Meuble TV suspendu', commission: 10, price: 449 },
  { id: 's5', name: 'Bibliothèque modulable', commission: 10, price: 549 }
];

// Commission history
const commissionHistory = [
  { id: 'com1', affiliateId: 'aff1', orderId: 'ED-1705234000', productId: 's1', amount: 155.88, date: '2026-01-15', status: 'paid' },
  { id: 'com2', affiliateId: 'aff1', orderId: 'ED-1705235000', productId: 's2', amount: 77.88, date: '2026-01-16', status: 'paid' },
  { id: 'com3', affiliateId: 'aff2', orderId: 'ED-1705236000', productId: 's3', amount: 29.90, date: '2026-01-17', status: 'pending' },
  { id: 'com4', affiliateId: 'aff1', orderId: 'ED-1705237000', productId: 's5', amount: 54.90, date: '2026-01-18', status: 'pending' }
];

// Payout history
const payoutHistory = [
  { id: 'pay1', affiliateId: 'aff1', amount: 500, date: '2025-12-15', method: 'bank', status: 'completed', reference: 'TXN-20251215' },
  { id: 'pay2', affiliateId: 'aff1', amount: 720, date: '2026-01-15', method: 'bank', status: 'completed', reference: 'TXN-20260115' },
  { id: 'pay3', affiliateId: 'aff2', amount: 200, date: '2026-01-15', method: 'mobile', status: 'completed', reference: 'TXN-20260115B' }
];

// Marketing materials
const marketingMaterials = {
  banners: [
    { id: 'b1', name: 'Banner 728x90', url: '/assets/affiliates/banner-728x90.jpg', size: '728x90', clicks: 1250 },
    { id: 'b2', name: 'Banner 300x250', url: '/assets/affiliates/banner-300x250.jpg', size: '300x250', clicks: 890 },
    { id: 'b3', name: 'Banner 160x600', url: '/assets/affiliates/banner-160x600.jpg', size: '160x600', clicks: 456 }
  ],
  logos: [
    { id: 'l1', name: 'Logo E-Décor', url: '/assets/affiliates/logo-edecor.png', format: 'PNG' },
    { id: 'l2', name: 'Logo E-Décor Blanc', url: '/assets/affiliates/logo-edecor-white.png', format: 'PNG' }
  ],
  social: [
    { id: 's1', name: 'Instagram Story', url: '/assets/affiliates/story-9x16.jpg', format: 'JPG' },
    { id: 's2', name: 'Facebook Post', url: '/assets/affiliates/post-1x1.jpg', format: 'JPG' }
  ]
};

// Leaderboard
const leaderboard = [
  { rank: 1, affiliateId: 'aff1', name: 'Marie Dubois', sales: 156, revenue: 15600, avatar: 'aff1.jpg' },
  { rank: 2, affiliateId: 'aff2', name: 'Jean-Pierre Kouassi', sales: 78, revenue: 7800, avatar: 'aff2.jpg' },
  { rank: 3, affiliateId: 'aff3', name: 'Sophie Martin', sales: 23, revenue: 2300, avatar: 'aff3.jpg' }
];

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    affiliateConfig, 
    affiliates, 
    affiliateProducts, 
    commissionHistory, 
    payoutHistory,
    marketingMaterials,
    leaderboard
  };
}
