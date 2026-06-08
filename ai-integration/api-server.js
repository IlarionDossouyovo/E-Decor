/**
 * E-Décor - API Server pour AI Integration
 * Endpoints pour le workflow n8n et l'automation 360°
 */

const http = require('http');
const url = require('url');
const { generateResponse, checkOllamaStatus, generateSupportResponse, generateRecommendations } = require('./ollama-client');

// Configuration serveur
const PORT = process.env.PORT || 3000;
const OLLAMA_AVAILABLE = process.env.OLLAMA_HOST || 'localhost';

// Stockage en mémoire (à remplacer par DB en production)
const tasks = new Map();
const conversations = new Map();

/**
 * Parse le body JSON d'une requête
 */
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
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
 * Route: GET /api/health - Health check
 */
async function handleHealth(req, res) {
  const ollamaStatus = await checkOllamaStatus();
  sendJson(res, 200, {
    status: 'ok',
    timestamp: new Date().toISOString(),
    ollama: ollamaStatus ? 'available' : 'unavailable',
    version: '1.0.0'
  });
}

/**
 * Route: GET /api/pending-tasks - Liste les tâches en attente
 */
async function handlePendingTasks(req, res) {
  const pending = Array.from(tasks.values()).filter(t => t.status === 'pending');
  sendJson(res, 200, { tasks: pending, count: pending.length });
}

/**
 * Route: POST /api/tasks - Crée une nouvelle tâche
 */
async function handleCreateTask(req, res) {
  const body = await parseBody(req);
  
  const task = {
    id: `task_${Date.now()}`,
    type: body.type || 'support',
    clientEmail: body.clientEmail,
    clientMessage: body.message,
    context: body.context || {},
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  tasks.set(task.id, task);
  
  // Si Ollama est disponible, traiter immédiatement
  const ollamaUp = await checkOllamaStatus();
  if (ollamaUp) {
    processTask(task.id);
  }
  
  sendJson(res, 201, { taskId: task.id, status: 'pending' });
}

/**
 * Route: POST /api/tasks/:id/respond - Sauvegarde la réponse AI
 */
async function handleRespondTask(req, res) {
  const taskId = url.parse(req.url, true).pathname.split('/')[3];
  const body = await parseBody(req);
  
  const task = tasks.get(taskId);
  if (!task) {
    return sendJson(res, 404, { error: 'Tâche non trouvée' });
  }
  
  task.response = body.response;
  task.aiGenerated = body.aiGenerated || false;
  task.model = body.model || 'llama3.2';
  task.respondedAt = new Date().toISOString();
  task.status = 'completed';
  
  tasks.set(taskId, task);
  sendJson(res, 200, { taskId, status: 'completed' });
}

/**
 * Traite une tâche avec Ollama
 */
async function processTask(taskId) {
  const task = tasks.get(taskId);
  if (!task) return;
  
  try {
    const response = await generateSupportResponse(task.clientMessage, task.context);
    
    task.response = response;
    task.aiGenerated = true;
    task.model = 'llama3.2';
    task.respondedAt = new Date().toISOString();
    task.status = 'completed';
    
    tasks.set(taskId, task);
    console.log(`[AI] Tâche ${taskId} traitée avec succès`);
  } catch (e) {
    console.error(`[AI] Erreur traitement tâche ${taskId}:`, e.message);
    task.status = 'error';
    task.error = e.message;
    tasks.set(taskId, task);
  }
}

/**
 * Route: POST /api/chat - Chat avec l'AI
 */
async function handleChat(req, res) {
  const body = await parseBody(req);
  
  if (!body.message) {
    return sendJson(res, 400, { error: 'Message requis' });
  }
  
  const conversationId = body.conversationId || `conv_${Date.now()}`;
  
  // Ajouter le message à la conversation
  if (!conversations.has(conversationId)) {
    conversations.set(conversationId, []);
  }
  const conv = conversations.get(conversationId);
  conv.push({ role: 'user', content: body.message });
  
  try {
    // Générer réponse avec Ollama
    const response = await generateResponse(
      `Tu es un assistant expert E-Décor pour la decoration et meubles. 
Conversation:
${conv.map(m => `${m.role}: ${m.content}`).join('\n')}

Utilisateur: ${body.message}

Assistant:`,
      { temperature: 0.7 }
    );
    
    conv.push({ role: 'assistant', content: response });
    conversations.set(conversationId, conv);
    
    sendJson(res, 200, {
      conversationId,
      response,
      model: 'llama3.2'
    });
  } catch (e) {
    sendJson(res, 500, { error: e.message });
  }
}

/**
 * Route: POST /api/recommendations - Recommandations AI
 */
async function handleRecommendations(req, res) {
  const body = await parseBody(req);
  
  try {
    const recommendations = await generateRecommendations({
      budget: body.budget || 2000,
      style: body.style || 'moderne',
      room: body.room || 'salon',
      colors: body.colors || 'neutres',
      category: body.category || 'salons',
      productsList: body.productsList
    });
    
    sendJson(res, 200, { recommendations });
  } catch (e) {
    sendJson(res, 500, { error: e.message });
  }
}

/**
 * Route: POST /api/webhook/ai-support - Webhook pour n8n
 */
async function handleWebhook(req, res) {
  const body = await parseBody(req);
  console.log('[Webhook] Event reçu:', body.event);
  sendJson(res, 200, { received: true });
}

/**
 * Route: GET /api/models - Liste les modèles Ollama
 */
async function handleModels(req, res) {
  const { listModels } = require('./ollama-client');
  try {
    const models = await listModels();
    sendJson(res, 200, { models });
  } catch (e) {
    sendJson(res, 503, { error: 'Ollama non disponible' });
  }
}

/**
 * Router principal
 */
async function router(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.writeHead(204), res.end();
  }
  
  try {
    // Routes API
    if (pathname === '/api/health' && req.method === 'GET') {
      return handleHealth(req, res);
    }
    if (pathname === '/api/pending-tasks' && req.method === 'GET') {
      return handlePendingTasks(req, res);
    }
    if (pathname === '/api/tasks' && req.method === 'POST') {
      return handleCreateTask(req, res);
    }
    if (pathname === '/api/chat' && req.method === 'POST') {
      return handleChat(req, res);
    }
    if (pathname === '/api/recommendations' && req.method === 'POST') {
      return handleRecommendations(req, res);
    }
    if (pathname === '/api/models' && req.method === 'GET') {
      return handleModels(req, res);
    }
    if (pathname === '/api/webhook/ai-support' && req.method === 'POST') {
      return handleWebhook(req, res);
    }
    if (pathname.startsWith('/api/tasks/') && pathname.endsWith('/respond') && req.method === 'POST') {
      return handleRespondTask(req, res);
    }
    
    // 404
    sendJson(res, 404, { error: 'Route non trouvée' });
  } catch (e) {
    console.error('[Erreur]', e);
    sendJson(res, 500, { error: e.message });
  }
}

// Démarrer le serveur
const server = http.createServer(router);

server.listen(PORT, () => {
  console.log(`
🤖 E-Décor AI Server démarré sur http://localhost:${PORT}
📡 Endpoints disponibles:
  GET  /api/health            - Health check
  GET  /api/pending-tasks    - Tâches en attente
  POST /api/tasks            - Créer une tâche
  POST /api/chat            - Chat avec AI
  POST /api/recommendations   - Recommandations produits
  GET  /api/models           - Modèles Ollama
  POST /api/webhook/ai-support - Webhook n8n
  ");
});

module.exports = { server, tasks, conversations };