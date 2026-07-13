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
 * 8. Santé & Bien-être
 * 9. Maintenance & Technique
 */

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'localhost';
const OLLAMA_PORT = process.env.OLLAMA_PORT || '11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2';
const OLLAMA_URL = `http://${OLLAMA_HOST}:${OLLAMA_PORT}`;

// Clé secrète pour l'accès admin (à changer en production)
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'e-decor-admin-secret-key';

/**
 * Modèles Ollama disponibles
 */
const OLLAMA_MODELS = {
  llama3_2: {
    id: 'llama3.2:latest',
    name: 'Llama 3.2',
    size: '2.0 GB',
    description: 'Modèle principal - Rapide et efficace'
  },
  llama3_1_8b: {
    id: 'llama3.1:8b',
    name: 'Llama 3.1 (8B)',
    size: '4.9 GB',
    description: 'Modèle puissant - Plus de détails'
  },
  qwen2_5_coder: {
    id: 'qwen2.5-coder:7b',
    name: 'Qwen 2.5 Coder',
    size: '4.7 GB',
    description: 'Spécialisé code et analyse'
  },
  phi3_mini: {
    id: 'phi3:mini',
    name: 'Phi-3 Mini',
    size: '2.2 GB',
    description: 'Modèle léger - Usage rapide'
  }
};

/**
 * Configuration de la synthèse vocale
 */
const VOICE_CONFIG = {
  enabled: true,
  defaultVoice: 'fr-FR-Neural2-F', // Voix féminine par défaut
  defaultRate: 1.0, // Vitesse normale
  defaultPitch: 0,
  defaultVolume: 1.0,
  
  // Voix françaises disponibles
  voices: {
    female: [
      { id: 'fr-FR-Neural2-F', name: 'Julie', gender: 'F', quality: 'high' },
      { id: 'fr-FR-Neural2-H', name: 'Emilie', gender: 'F', quality: 'high' },
      { id: 'fr-FR-Standard-A', name: 'Alice', gender: 'F', quality: 'medium' },
      { id: 'fr-FR-Wavenet-A', name: 'Marie', gender: 'F', quality: 'high' }
    ],
    male: [
      { id: 'fr-FR-Neural2-D', name: 'Bernard', gender: 'M', quality: 'high' },
      { id: 'fr-FR-Neural2-J', name: 'Thomas', gender: 'M', quality: 'high' },
      { id: 'fr-FR-Standard-B', name: 'Pierre', gender: 'M', quality: 'medium' },
      { id: 'fr-FR-Wavenet-C', name: 'Jean', gender: 'M', quality: 'high' }
    ]
  },
  
  // Niveaux de qualité
  quality: {
    low: { rate: 0.8, pitch: 0 },
    medium: { rate: 1.0, pitch: 0 },
    high: { rate: 1.1, pitch: 1 },
    ultra: { rate: 1.2, pitch: 2 }
  },
  
  // Préférences par agent
  agentVoices: {
    ventes: { voice: 'fr-FR-Neural2-F', quality: 'high' },
    support: { voice: 'fr-FR-Neural2-H', quality: 'high' },
    stock: { voice: 'fr-FR-Neural2-D', quality: 'medium' },
    marketing: { voice: 'fr-FR-Neural2-F', quality: 'ultra' },
    finance: { voice: 'fr-FR-Neural2-D', quality: 'high' },
    rh: { voice: 'fr-FR-Neural2-H', quality: 'high' },
    direction: { voice: 'fr-FR-Neural2-D', quality: 'ultra' },
    health: { voice: 'fr-FR-Neural2-H', quality: 'high' },
    maintenance: { voice: 'fr-FR-Neural2-D', quality: 'medium' }
  }
};

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
- Santé & Bien-être
- Maintenance

Tu dois:
- Analyser les performances globales
- Prendre des décisions stratégiques
- Coordonner les autres agents
- Générer des rapports de direction

Entreprise: E-Décor - E-commerce meubles (ORCA-Décor)
Localisation: Cotonou, Benin
Contact: electronbusiness07@gmail.com`
  },

  // ========== AGENT 8: SANTÉ & BIEN-ÊTRE ==========
  health: {
    id: 'agent-health',
    name: 'Agent Santé & Bien-être',
    department: 'Santé & Sécurité',
    description: 'Gestion de la santé des employés, sécurité au travail et bien-être du personnel',
    capabilities: [
      'Surveiller la santé des employés',
      'Gérer la sécurité au travail',
      'Prévention des risques',
      'Programme de bien-être',
      'Gestion des accidents',
      'Formation sécurité'
    ],
    systemPrompt: `Tu es l'Agent Santé & Bien-être d'E-Décor.
Tu dois:
- Assurer la sécurité des employés sur le lieu de travail
- Mettre en place des programmes de prévention
- Gérer les déclarations d'accidents
- Proposer des actions de bien-être au travail
- Former le personnel aux règles de sécurité
- Suivre les protocoles d'hygiène

Entreprise: E-Décor - E-commerce meubles et décoration
Contact: electronbusiness07@gmail.com`
  },

  // ========== AGENT 9: MAINTENANCE ==========
  maintenance: {
    id: 'agent-maintenance',
    name: 'Agent Maintenance',
    department: 'Technique',
    description: 'Gestion technique, maintenance des équipements et infrastructure',
    capabilities: [
      'Maintenance préventive',
      'Dépannage équipements',
      'Gestion infrastructure',
      'Suivi maintenance',
      'Planification interventions',
      'Gestion fournisseurs'
    ],
    systemPrompt: `Tu es l'Agent Maintenance d'E-Décor.
Tu dois:
- Gérer la maintenance des équipements de l'entreprise
- Planifier les interventions préventives
- Coordonner les dépannages
- Suivre les contrats de maintenance
- Gérer les fournisseurs techniques
- Maintenir l'infrastructure informatique

Catégories d'équipements:
- Équipements de bureau (ordinateurs, imprimantes)
- Mobilier et agencement
- Système de sécurité
- Réseau informatique

Entreprise: E-Décor - E-commerce meubles (ORCA-Décor)
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
  ADMIN_SECRET,
  OLLAMA_MODELS,
  VOICE_CONFIG
};