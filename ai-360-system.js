const http = require('http');
const url = require('url');

const CONFIG = { port: 3001, adminApiKey: 'edecor_admin_secret_key_2024', ollamaHost: 'localhost', ollamaPort: 11434, ollamaModel: 'llama3.2' };

const DEPARTMENTS = {
  vente: { id: 'vente', name: 'Ventes', description: 'Gestion des ventes', capabilities: ['Recommandations', 'Tendances'], instructions: 'Agent IA Ventes' },
  support: { id: 'support', name: 'Support Client', description: 'Assistance technique', capabilities: ['Réponses', 'Suivi'], instructions: 'Agent IA Support' },
  stock: { id: 'stock', name: 'Gestion Stock', description: 'Suivi inventaires', capabilities: ['Niveaux', 'Alertes'], instructions: 'Agent IA Stock' },
  marketing: { id: 'marketing', name: 'Marketing', description: 'Campagnes pub', capabilities: ['Contenu', 'SEO'], instructions: 'Agent IA Marketing' },
  finance: { id: 'finance', name: 'Finance', description: 'Comptabilité', capabilities: ['Factures', 'Rapports'], instructions: 'Agent IA Finance' },
  rh: { id: 'rh', name: 'Ressources Humaines', description: 'Recrutement', capabilities: ['Formation', 'Évaluations'], instructions: 'Agent IA RH' },
  ia: { id: 'ia', name: 'Intelligence Artificielle', description: 'Chef orchestre', capabilities: ['Coordination', 'Décisions'], instructions: 'Agent IA Central' }
};

const SERVICES = {
  categories: { salons: { name: 'Salons', subcategories: ['Canapés', 'Fauteuils', 'Tables', 'Meubles TV'] }, bureaux: { name: 'Bureaux', subcategories: ['Exécutifs', 'Direction'] }, cuisines: { name: 'Cuisines', subcategories: ['Îlots', 'Bas'] }, jardins: { name: 'Jardins', subcategories: ['Salons', 'Transats'] }, 'salle-a-manger': { name: 'Salle à manger', subcategories: ['Tables', 'Chaises'] } },
  automation: ['Commandes', 'Support', 'Stock', 'Marketing', 'AI', 'Paiements', 'Notifications']
};

async function callOllama(p, sp) {
  return new Promise(r => {
    const d = JSON.stringify({ model: CONFIG.ollamaModel, prompt: sp + '\n\n' + p, stream: false });
    const q = http.request({ hostname: CONFIG.ollamaHost, port: CONFIG.ollamaPort, path: '/api/generate', method: 'POST', headers: { 'Content-Type': 'application/json' } }, (s) => { let x = ''; s.on('data', c => x += c); s.on('end', () => { try { r(JSON.parse(x).response || 'OK'); } catch { r('AI non dispo'); } }); });
    q.on('error', () => r('AI non dispo')); q.write(d); q.end();
  });
}

const ROUTES = {
  'GET /status': async () => ({ status: 'online', version: '1.0.0', departments: 7, services: 3 }),
  'GET /departments': async () => Object.values(DEPARTMENTS).map(d => ({ id: d.id, name: d.name, capabilities: d.capabilities })),
  'GET /services': async () => SERVICES,
  'POST /chat/:department': async (p, b) => { const d = DEPARTMENTS[p.department]; return d ? { department: d.id, response: await callOllama(b.message, d.instructions) } : { error: 'Non trouvé' } },
  'POST /chat': async (b) => ({ department: 'ia', response: await callOllama(b.message, DEPARTMENTS.ia.instructions) })
};

function route(req, res) {
  const pathname = url.parse(req.url).pathname;
  res.setHeader('Access-Control-Allow-Origin', '*'); res.setHeader('Content-Type', 'application/json');
  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }
  async function handle() {
    try {
      let body = {};
      if (req.method === 'POST') { const buf = []; for await (const c of req) buf.push(c); body = JSON.parse(Buffer.concat(buf).toString()); }
      
      // Chercher la route
      let handler = null;
      let params = {};
      
      for (const key of Object.keys(ROUTES)) {
        const [method, path] = key.split(' ');
        if (method !== req.method) continue;
        
        const pathParts = pathname.split('/').filter(Boolean);
        const routeParts = path.split('/').filter(Boolean);
        
        if (pathParts.length !== routeParts.length) continue;
        
        let match = true;
        for (let i = 0; i < routeParts.length; i++) {
          if (routeParts[i].startsWith(':')) {
            params[routeParts[i].slice(1)] = pathParts[i];
          } else if (routeParts[i] !== pathParts[i]) {
            match = false;
            break;
          }
        }
        if (match) { handler = ROUTES[key]; break; }
      }
      
      if (!handler) { res.writeHead(404); res.end(JSON.stringify({ error: 'Route non trouvée' })); return; }
      res.writeHead(200); res.end(JSON.stringify(await handler(params, body)));
    } catch (e) { res.writeHead(500); res.end(JSON.stringify({ error: e.message })); }
  }
  handle();
}

const server = http.createServer(route);
server.listen(CONFIG.port, () => console.log('E-Décor AI 360° - Port ' + CONFIG.port));
module.exports = { DEPARTMENTS, SERVICES, CONFIG };
