/**
 * E-Décor - API Server pour Agents AI
 * Serveur API pour gérer tous les agents AI de l'entreprise
 */

const http = require('http');
const url = require('url');
const { agents, OLLAMA_URL, OLLAMA_MODEL, ADMIN_SECRET } = require('./agents-config');

// Configuration serveur
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || 'localhost';

/**
 * Appelle Ollama pour générer une réponse
 */
function callOllama(prompt, systemPrompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: OLLAMA_MODEL,
      prompt: prompt,
      system: systemPrompt,
      stream: false,
      options: { 
        num_predict: 500,
        temperature: 0.7
      }
    });
    
    const options = {
      hostname: '127.0.0.1',
      port: 11434,
      path: '/api/generate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };
    
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.response) {
            resolve(json.response);
          } else {
            reject(new Error(json.error || 'Erreur Ollama'));
          }
        } catch (e) {
          reject(e);
        }
      });
    });
    
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

/**
 * Envoie une réponse JSON
 */
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

/**
 * Vérifie l'authentification admin
 */
function isAdmin(req) {
  const authHeader = req.headers['authorization'];
  return authHeader === `Bearer ${ADMIN_SECRET}`;
}

/**
 * Route: GET /api/agents - Liste tous les agents
 */
function listAgents(res) {
  const agentList = Object.values(agents).map(a => ({
    id: a.id,
    name: a.name,
    department: a.department,
    description: a.description,
    capabilities: a.capabilities
  }));
  
  sendJson(res, 200, {
    success: true,
    count: agentList.length,
    agents: agentList
  });
}

/**
 * Route: GET /api/agents/:id - Détails d'un agent
 */
function getAgent(res, agentId) {
  const agent = Object.values(agents).find(a => a.id === agentId || a.department.toLowerCase() === agentId.toLowerCase());
  
  if (!agent) {
    sendJson(res, 404, { success: false, error: 'Agent non trouvé' });
    return;
  }
  
  sendJson(res, 200, {
    success: true,
    agent: {
      id: agent.id,
      name: agent.name,
      department: agent.department,
      description: agent.description,
      capabilities: agent.capabilities
    }
  });
}

/**
 * Route: POST /api/agents/:id - Chat avec un agent
 */
async function chatWithAgent(res, agentId, body) {
  const agent = Object.values(agents).find(a => a.id === agentId || a.department.toLowerCase() === agentId.toLowerCase());
  
  if (!agent) {
    sendJson(res, 404, { success: false, error: 'Agent non trouvé' });
    return;
  }
  
  if (!body.message) {
    sendJson(res, 400, { success: false, error: 'Message requis' });
    return;
  }
  
  try {
    const response = await callOllama(body.message, agent.systemPrompt);
    sendJson(res, 200, {
      success: true,
      agent: agent.name,
      department: agent.department,
      message: body.message,
      response: response
    });
  } catch (e) {
    sendJson(res, 500, { 
      success: false, 
      error: 'Erreur AI: ' + e.message 
    });
  }
}

/**
 * Route: GET /api/admin/stats - Statistiques globales (admin seulement)
 */
function getGlobalStats(res) {
  if (!isAdmin(res.req)) {
    sendJson(res, 401, { success: false, error: 'Accès admin requis' });
    return;
  }
  
  sendJson(res, 200, {
    success: true,
    stats: {
      totalAgents: Object.keys(agents).length,
      departments: Object.values(agents).map(a => a.department),
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  });
}

/**
 * Route: GET /api/health - Health check
 */
function healthCheck(res) {
  sendJson(res, 200, {
    status: 'OK',
    service: 'E-Décor AI Agents',
    version: '1.0.0',
    agents: Object.keys(agents).length
  });
}

/**
 * Gestionnaire de requêtes principal
 */
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  console.log(`[${method}] ${pathname}`);
  
  try {
    // Health check
    if (pathname === '/api/health' && method === 'GET') {
      healthCheck(res);
      return;
    }
    
    // Liste des agents
    if (pathname === '/api/agents' && method === 'GET') {
      listAgents(res);
      return;
    }
    
    // Chat avec un agent spécifique
    const agentMatch = pathname.match(/^\/api\/agents\/(.+)$/);
    if (agentMatch) {
      const agentId = agentMatch[1];
      
      if (method === 'GET') {
        getAgent(res, agentId);
        return;
      }
      
      if (method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
          try {
            const data = JSON.parse(body);
            await chatWithAgent(res, agentId, data);
          } catch (e) {
            sendJson(res, 400, { success: false, error: 'Invalid JSON' });
          }
        });
        return;
      }
    }
    
    // Stats admin
    if (pathname === '/api/admin/stats' && method === 'GET') {
      getGlobalStats(res);
      return;
    }
    
    // 404
    sendJson(res, 404, { 
      success: false, 
      error: 'Route non trouvée',
      availableRoutes: [
        'GET /api/agents',
        'GET /api/agents/:id',
        'POST /api/agents/:id',
        'GET /api/admin/stats',
        'GET /api/health'
      ]
    });
    
  } catch (e) {
    console.error('Erreur:', e);
    sendJson(res, 500, { success: false, error: e.message });
  }
});

// Démarrer le serveur
server.listen(PORT, HOST, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║     E-Décor AI Agents Server                            ║
║     Serveur: http://${HOST}:${PORT}                        ║
║     Modèle: ${OLLAMA_MODEL}                               ║
║     Agents: ${Object.keys(agents).length}                                   ║
╚════════════════════════════════════════════════════════════╝

Routes disponibles:
- GET  /api/agents           → Liste des agents
- GET  /api/agents/:id       → Détails d'un agent
- POST /api/agents/:id       → Chat avec un agent
- GET  /api/admin/stats     → Stats globales (admin)
- GET  /api/health         → Health check
  `);
});

module.exports = { server, agents };