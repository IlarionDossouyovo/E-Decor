/**
 * E-Décor - API Server pour AI Integration
 * Endpoints pour le workflow n8n et l'automation 360°
 */

const http = require('http');
const url = require('url');

// Configuration serveur
const PORT = process.env.PORT || 3000;

// Stockage en mémoire
const tasks = new Map();
const conversations = new Map();

/**
 * Parse le body JSON
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
 * Route: GET /api/health
 */
async function handleHealth(req, res) {
  sendJson(res, 200, {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}

/**
 * Route: GET /api/pending-tasks
 */
async function handlePendingTasks(req, res) {
  const pending = Array.from(tasks.values()).filter(t => t.status === 'pending');
  sendJson(res, 200, { tasks: pending, count: pending.length });
}

/**
 * Route: POST /api/tasks
 */
async function handleCreateTask(req, res) {
  const body = await parseBody(req);
  const task = {
    id: 'task_' + Date.now(),
    type: body.type || 'support',
    clientEmail: body.clientEmail,
    clientMessage: body.message,
    context: body.context || {},
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  tasks.set(task.id, task);
  sendJson(res, 201, { taskId: task.id, status: 'pending' });
}

/**
 * Route: POST /api/tasks/:id/respond
 */
async function handleRespondTask(req, res) {
  const pathname = url.parse(req.url, true).pathname;
  const taskId = pathname.split('/')[3];
  const body = await parseBody(req);
  const task = tasks.get(taskId);
  if (!task) {
    return sendJson(res, 404, { error: 'Tâche non trouvée' });
  }
  task.response = body.response;
  task.aiGenerated = body.aiGenerated || false;
  task.respondedAt = new Date().toISOString();
  task.status = 'completed';
  tasks.set(taskId, task);
  sendJson(res, 200, { taskId, status: 'completed' });
}

/**
 * Route: POST /api/chat
 */
async function handleChat(req, res) {
  const body = await parseBody(req);
  if (!body.message) {
    return sendJson(res, 400, { error: 'Message requis' });
  }
  // Note: Ollama sera appelé ici en production
  const response = 'Message reçu: ' + body.message + ' - (Connectez Ollama pour générer une vraie réponse)';
  sendJson(res, 200, { response: response });
}

/**
 * Route: POST /api/recommendations
 */
async function handleRecommendations(req, res) {
  const body = await parseBody(req);
  const recommendations = [
    { id: 's1', name: 'Canapé LINO', price: 1299, raison: ' bestseller' },
    { id: 's2', name: 'Fauteuil relax', price: 649, raison: ' confort' }
  ];
  sendJson(res, 200, { recommendations: recommendations });
}

/**
 * Route: GET /api/models
 */
async function handleModels(req, res) {
  sendJson(res, 200, { models: [{ name: 'llama3.2' }] });
}

/**
 * Route: POST /api/webhook/ai-support
 */
async function handleWebhook(req, res) {
  const body = await parseBody(req);
  console.log('[Webhook] Event:', body.event);
  sendJson(res, 200, { received: true });
}

/**
 * Router principal
 */
async function router(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.writeHead(204), res.end();
  }
  
  try {
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
    sendJson(res, 404, { error: 'Route non trouvée' });
  } catch (e) {
    console.error('[Erreur]', e);
    sendJson(res, 500, { error: e.message });
  }
}

// Démarrer le serveur sur toutes les interfaces
const server = http.createServer(router);

server.listen(PORT, '0.0.0.0', () => {
  console.log('E-Décor AI Server démarré sur http://0.0.0.0:' + PORT);
  console.log('E-Décor AI Server démarré sur http://localhost:' + PORT);
});

module.exports = { server, tasks, conversations };