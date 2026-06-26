/**
 * E-Décor - Database Module
 */
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'e-decor.db');

function initDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) return reject(err);
      console.log('[DB] Connecte a:', DB_PATH);
      db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT, name TEXT, role TEXT DEFAULT 'user')`);
        db.run(`CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, sku TEXT UNIQUE, name TEXT, price REAL, category TEXT, stock INTEGER DEFAULT 0)`);
        console.log('[DB] Tables creees');
      });
      resolve(db);
    });
  });
}

function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH);
    db.run(sql, params, function(err) { if (err) return reject(err); resolve({ lastID: this.lastID }); });
    db.close();
  });
}

async function createFounder() {
  try { await dbRun(`INSERT OR IGNORE INTO users (email, password, name, role) VALUES (?, ?, ?, ?)`, ['electronbusiness07@gmail.com', 'E-Decor2024!', 'Virginie - Fondatrice', 'founder']); }
  catch (e) { console.log('[DB] Fondateur existe'); }
}

async function seedProducts() {
  const products = [
    { sku: 'S1', name: 'Canape LINO', price: 1299, category: 'salons', stock: 15 },
    { sku: 'S2', name: 'Fauteuil relax', price: 649, category: 'salons', stock: 8 },
    { sku: 'S3', name: 'Table basse', price: 299, category: 'salons', stock: 20 },
    { sku: 'B1', name: 'Bureau executif', price: 799, category: 'bureaux', stock: 6 }
  ];
  for (const p of products) {
    try { await dbRun(`INSERT OR IGNORE INTO products (sku, name, price, category, stock) VALUES (?, ?, ?, ?, ?)`, [p.sku, p.name, p.price, p.category, p.stock]); } catch (e) {}
  }
  console.log('[DB] Produits ajoutes');
}

module.exports = { initDatabase, dbRun, createFounder, seedProducts };