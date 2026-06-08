/**
 * E-Décor - Ollama AI Integration
 * Connecte l'application Electron à Ollama en local pour les fonctionnalités AI
 */

const http = require('http');

// Configuration Ollama locale
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'localhost';
const OLLAMA_PORT = process.env.OLLAMA_PORT || '11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'codellama:7b';

// URL de l'API Ollama
const OLLAMA_URL = `http://${OLLAMA_HOST}:${OLLAMA_PORT}`;

/**
 * Appelle l'API Ollama pour générer une réponse
 * @param {string} prompt - Le prompt à envoyer
 * @param {object} options - Options supplémentaires
 * @returns {Promise<string>} Réponse générée
 */
async function generateResponse(prompt, options = {}) {
  const model = options.model || OLLAMA_MODEL;
  const temperature = options.temperature || 0.7;
  const max_tokens = options.max_tokens || 500;

  const requestBody = {
    model,
    prompt,
    temperature,
    max_tokens,
    stream: false
  };

  return new Promise((resolve, reject) => {
    const req = http.request(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.response) {
            resolve(json.response);
          } else if (json.error) {
            reject(new Error(json.error));
          } else {
            reject(new Error('Réponse invalide d\'Ollama'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify(requestBody));
    req.end();
  });
}

/**
 * Liste les modèles disponibles sur Ollama
 * @returns {Promise<Array>} Liste des modèles
 */
async function listModels() {
  return new Promise((resolve, reject) => {
    const req = http.request(`${OLLAMA_URL}/api/tags`, {
      method: 'GET'
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.models || []);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Vérifie si Ollama est disponible
 * @returns {Promise<boolean>}
 */
async function checkOllamaStatus() {
  return new Promise((resolve) => {
    const req = http.request(`${OLLAMA_URL}/api/tags`, {
      method: 'GET',
      timeout: 3000
    }, (res) => {
      resolve(res.statusCode === 200);
    });

    req.on('error', () => resolve(false));
    req.on('timeout', () => resolve(false));
    req.end();
  });
}

/**
 * Génère une réponse pour le support client
 * @param {string} question - Question du client
 * @param {object} context - Contexte (produits, commande, etc.)
 * @returns {Promise<string>} Réponse générée
 */
async function generateSupportResponse(question, context = {}) {
  const productsList = context.products 
    ? `\nProduits disponibles:\n${context.products.map(p => `- ${p.name}: ${p.price}€`).join('\n')}`
    : '';
  
  const prompt = `Tu es un assistant client pour E-Décor, une entreprise de meubles et décoration. 
Réponds de manière helpful et professionnelle à la question du client.

Contexte:
- Entreprise: E-Décor, partenaire ORCA-Décor
- Contact: electronbusiness07@gmail.com
- Produits: ${productsList}

Question du client: ${question}

Réponse:`;

  return generateResponse(prompt, { temperature: 0.8 });
}

/**
 * Génère des recommandations de produits basées sur les préférences
 * @param {object} preferences - Préférences du client
 * @returns {Promise<Array>} Recommandations
 */
async function generateRecommendations(preferences) {
  const prompt = `En tant qu'expert en aménagement intérieur E-Décor, recommande 3 produits parmi cette liste qui correspondent aux préférences suivantes:

Préférences du client:
- Budget: ${preferences.budget}€
- Style: ${preferences.style}
- Pièce: ${preferences.room}
- Couleurs préférées: ${preferences.colors}

Produits disponibles (categorie: ${preferences.category || 'salons'}):
${preferences.productsList || 'Canapé LINO (1299€), Fauteuil relax (649€), Table basse (299€), Meuble TV (449€), Bibliothèque (549€), Bureau exécutif (799€), Fauteuil direction (449€), Îlot cuisine (1499€)'}

Réponds en JSON format:
[
  {"id": "produit_id", "raison": "courte explication de pourquoi ce produit convient"}
]`;

  try {
    const response = await generateResponse(prompt, { temperature: 0.5, max_tokens: 300 });
    return JSON.parse(response);
  } catch (e) {
    console.error('Erreur génération recommandations:', e);
    return [];
  }
}

// Export des fonctions
module.exports = {
  generateResponse,
  listModels,
  checkOllamaStatus,
  generateSupportResponse,
  generateRecommendations,
  OLLAMA_URL,
  OLLAMA_MODEL
};