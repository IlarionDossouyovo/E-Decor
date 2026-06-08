/**
 * E-Décor - Automation 360° AI
 * Automation complète qui connecte Ollama, n8n et l'app Electron
 * 
 * Cette automation:
 * 1. Vérifie les tâches en attente
 * 2. Appelle Ollama pour générer des réponses
 * 3. Sauvegarde les réponses
 * 4. Notifie l'équipe par email
 * 5. Déclenche les webhooks n8n
 * 
 * Trigger: Cron toutes les 15 minutes
 */

const http = require('http');

// Configuration
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const API_SERVER = process.env.API_SERVER || 'http://localhost:3000';
const N8N_WEBHOOK = process.env.N8N_WEBHOOK || 'http://localhost:5678';
const EMAIL_TO = process.env.EMAIL_TO || 'electronbusiness07@gmail.com';

/**
 * Appel HTTP générique
 */
function httpRequest(url, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: method,
      headers: { 'Content-Type': 'application/json' }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });
    
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

/**
 * Vérifie si Ollama est disponible
 */
async function checkOllama() {
  try {
    const result = await httpRequest(`${OLLAMA_URL}/api/tags`);
    return result.models && result.models.length > 0;
  } catch (e) {
    console.log('[AI] Ollama non disponible:', e.message);
    return false;
  }
}

/**
 * Génère une réponse avec Ollama
 */
async function generateWithOllama(prompt) {
  const body = {
    model: 'llama3.2',
    prompt: prompt,
    stream: false,
    temperature: 0.7,
    max_tokens: 500
  };
  
  const result = await httpRequest(`${OLLAMA_URL}/api/generate`, 'POST', body);
  return result.response;
}

/**
 * Récupère les tâches en attente
 */
async function getPendingTasks() {
  try {
    const result = await httpRequest(`${API_SERVER}/api/pending-tasks`);
    return result.tasks || [];
  } catch (e) {
    console.log('[API] Erreur:', e.message);
    return [];
  }
}

/**
 * Sauvegarde une réponse de tâche
 */
async function saveTaskResponse(taskId, response, model) {
  try {
    await httpRequest(`${API_SERVER}/api/tasks/${taskId}/respond`, 'POST', {
      response,
      aiGenerated: true,
      model
    });
    return true;
  } catch (e) {
    console.log('[API] Erreur sauvegarde:', e.message);
    return false;
  }
}

/**
 * Notifie via webhook n8n
 */
async function notifyWebhook(event, data) {
  try {
    await httpRequest(`${N8N_WEBHOOK}/webhook/ai-support`, 'POST', {
      event,
      ...data,
      timestamp: new Date().toISOString()
    });
    return true;
  } catch (e) {
    console.log('[Webhook] Erreur:', e.message);
    return false;
  }
}

/**
 * Envoie une notification email (via API externe ou console)
 */
async function sendNotification(subject, body) {
  // En production, intégrer avec SendGrid, Mailgun, etc.
  console.log(`
📧 Email envoyé:
   À: ${EMAIL_TO}
   Sujet: ${subject}
   Corps: ${body}
  `);
  return true;
}

/**
 * Traite une tâche avec l'AI
 */
async function processTask(task) {
  const prompt = `Tu es un assistant expert E-Décor pour la decoration et meubles.
Entreprise: E-Décor, partenaire ORCA-Décor
Contact: electronbusiness07@gmail.com

Question du client: ${task.clientMessage}

Réponse professionnelle et helpful:`;
  
  const response = await generateWithOllama(prompt);
  
  // Sauvegarder la réponse
  await saveTaskResponse(task.id, response, 'llama3.2');
  
  // Notifier webhook
  await notifyWebhook('ai-response', {
    taskId: task.id,
    response,
    clientEmail: task.clientEmail
  });
  
  // Envoyer email de notification
  await sendNotification(
    `🤖 AI Agent - Tâche traitée: ${task.type}`,
    `Tâche ${task.id} traitée:\n- Type: ${task.type}\n- Client: ${task.clientEmail}\n- Message: ${task.clientMessage}\n- Réponse: ${response}`
  );
  
  return response;
}

/**
 * Main - Point d'entrée de l'automation
 */
async function main() {
  console.log('🤖 Début automation AI 360° -', new Date().toISOString());
  
  // 1. Vérifier Ollama
  const ollamaAvailable = await checkOllama();
  if (!ollamaAvailable) {
    await sendNotification(
      '⚠️ AI Agent - Ollama indisponible',
      'Ollama n\'est pas disponible. L\'automation ne peut pas fonctionner.'
    );
    console.log('[AI] Arrêt: Ollama non disponible');
    return;
  }
  
  // 2. Récupérer les tâches en attente
  const tasks = await getPendingTasks();
  console.log(`[API] ${tasks.length} tâches en attente`);
  
  // 3. Traiter chaque tâche
  for (const task of tasks) {
    try {
      console.log(`[Task] Traitement de ${task.id}...`);
      await processTask(task);
      console.log(`[Task] ${task.id} traité avec succès`);
    } catch (e) {
      console.error(`[Task] Erreur ${task.id}:`, e.message);
    }
  }
  
  console.log('✅ Automation terminée');
}

// Exécuter si appelé directement
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, processTask, checkOllama };