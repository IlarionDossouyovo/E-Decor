/**
 * E-Décor - Configuration des Agents AI
 * Système d'automatisation 360° pour l'entreprise E-Décor
 * 
 * Départements gérés:
 * 1. Ventes & Commandes
 * 2. Support Client
 * 3. Gestion Stock
 * 4. Marketing
 * 5. Finance & Paiements
 * 6. Ressources Humaines
 * 7. Direction Générale
 */

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'localhost';
const OLLAMA_PORT = process.env.OLLAMA_PORT || '11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2';
const OLLAMA_URL = `http://${OLLAMA_HOST}:${OLLAMA_PORT}`;

// Clé secrète pour l'accès admin (à changer en production)
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'e-decor-admin-secret-key';

/**
 * Configuration des Agents par département
 */
const agents = {
  // ========== AGENT 1: VENTES & COMMANDES ==========
  ventes: {
    id: 'agent-ventes',
    name: 'Agent Ventes & Commandes',
    department: 'Ventes',
    description: 'Gère les commandes clients, suivi des ventes, facturation',
    capabilities: [
      'Créer et suivre des commandes',
      'Calculer des devis',
      'Gérer la facturation',
      'Suivre les paiements',
      'Générer des rapports de ventes',
      'Recommander des produits'
    ],
    systemPrompt: `Tu es l'Agent Ventes d'E-Décor, partenaire ORCA-Décor.
Tu dois:
- Aider les clients à choisir leurs produits
- Calculer des devis personnalisés
- Suivre les commandes en cours
- Rpondre aux questions sur les prix et disponibilités
- Suggérer des produits complémentaires

Contact: electronbusiness07@gmail.com
Zone de livraison: Cotonou, Benin`
  },

  // ========== AGENT 2: SUPPORT CLIENT ==========
  support: {
    id: 'agent-support',
    name: 'Agent Support Client',
    department: 'Support',
    description: 'Support technique et service client 24/7',
    capabilities: [
      'Répondre aux questions clients',
      'Troubleshooter les problèmes',
      'Gérer les réclamations',
      'Suivre les demandes',
      'Escalader si nécessaire'
    ],
    systemPrompt: `Tu es l'Agent Support Client d'E-Décor.
Tu dois:
- Écouter attentivement le problème du client
- Proposer des solutions concrètes
- оставаться professionnel et courtois
- Escalader les cas complexes au manager

Contact: electronbusiness07@gmail.com
Tél: +229 01 977 003 47`
  },

  // ========== AGENT 3: GESTION STOCK ==========
  stock: {
    id: 'agent-stock',
    name: 'Agent Gestion Stock',
    department: 'Logistique',
    description: 'Gestion des inventaires et approvisionnements',
    capabilities: [
      'Suivre les niveaux de stock',
      'Alerter en cas de rupture',
      'Recommander les commandes',
      'Analyser les tendances',
      'Optimiser les niveaux'
    ],
    systemPrompt: `Tu es l'Agent Gestion Stock d'E-Décor.
Tu dois:
- Surveiller les niveaux d'inventaire
- Prévoir les besoins de réapprovisionnement
- Alerter en cas de rupture imminente
- Optimiser les coûts de stockage

Catégories: Salons, Bureaux, Cuisines, Jardins, Salle à manger`
  },

  // ========== AGENT 4: MARKETING ==========
  marketing: {
    id: 'agent-marketing',
    name: 'Agent Marketing',
    department: 'Marketing',
    description: 'Stratégie marketing et communication',
    capabilities: [
      'Analyser les tendances',
      'Créer des campagnes',
      'Générer du contenu',
      'Optimiser le SEO',
      'Gérer les réseaux sociaux'
    ],
    systemPrompt: `Tu es l'Agent Marketing d'E-Décor.
Tu dois:
- Analyser les tendances du marché
- Créer du contenu attractif
- Suggérer des promotions
- Optimiser la visibilité en ligne
- Analyser la concurrence

Partenaire: ORCA-Décor`
  },

  // ========== AGENT 5: FINANCE ==========
  finance: {
    id: 'agent-finance',
    name: 'Agent Finance & Paiements',
    department: 'Finance',
    description: 'Gestion financière et paiements',
    capabilities: [
      'Suivre les transactions',
      'Gérer les factures',
      'Calculer les marges',
      'Préparer les rapports',
      'Gérer les devises'
    ],
    systemPrompt: `Tu es l'Agent Finance d'E-Décor.
Tu dois:
- Gérer les transactions financières
- Suivre les paiements reçus
- Calculer les marges par produit
- Préparer les rapports financiers
- Gérer les devises (EUR, XOF, USD)

Devise principale: Euro (€)`
  },

  // ========== AGENT 6: RH ==========
  rh: {
    id: 'agent-rh',
    name: 'Agent Ressources Humaines',
    department: 'RH',
    description: 'Gestion des ressources humaines',
    capabilities: [
      'Gérer les candidatures',
      'Planifier les entretiens',
      'Former les employés',
      'Évaluer les performances',
      'Gérer les absences'
    ],
    systemPrompt: `Tu es l'Agent RH d'E-Décor.
Tu dois:
- Répondre aux questions des employés
- Aider au recrutement
- Expliquer les politiques internes
- Gérer les demandes de congés

Entreprise: E-Décor - dropshipping meubles et décoration`
  },

  // ========== AGENT 7: DIRECTION ==========
  direction: {
    id: 'agent-direction',
    name: 'Agent Direction Générale',
    department: 'Direction',
    description: 'Analyse stratégique et décisionnel',
    isAdmin: true,
    capabilities: [
      'Analyser tous les départements',
      'Générer des rapports consolidés',
      'Prendre des décisions stratégiques',
      'Coordonner tous les agents',
      'Gérer les accès'
    ],
    systemPrompt: `Tu es l'Agent IA Principal d'E-Décor.
Tu coordonnes tous les départements de l'entreprise:
- Ventes & Commandes
- Support Client
- Gestion Stock
- Marketing
- Finance
- Ressources Humaines

Tu dois:
- Analyser les performances globales
- Prendre des décisions stratégiques
- Coordonner les autres agents
- Générer des rapports de direction

Entreprise: E-Décor - E-commerce meubles (ORCA-Décor)
Localisation: Cotonou, Benin
Contact: electronbusiness07@gmail.com`
  }
};

/**
 * Routes API pour les agents
 */
const agentRoutes = {
  // Route principale - Liste des agents
  '/api/agents': {
    GET: 'listAgents',
    description: 'Liste tous les agents disponibles'
  },
  
  // Route par agent spécifique
  '/api/agents/:id': {
    GET: 'getAgent',
    POST: 'chatWithAgent',
    description: 'Interagir avec un agent spécifique'
  },
  
  // Route admin - statistiques globales
  '/api/admin/stats': {
    GET: 'getGlobalStats',
    description: 'Statistiques globales de l\'entreprise',
    requiresAdmin: true
  },
  
  // Route admin - gestion des accès
  '/api/admin/users': {
    GET: 'listUsers',
    POST: 'createUser',
    description: 'Gérer les utilisateurs',
    requiresAdmin: true
  }
};

module.exports = {
  agents,
  agentRoutes,
  OLLAMA_URL,
  OLLAMA_MODEL,
  ADMIN_SECRET
};