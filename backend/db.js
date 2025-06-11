const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, '..', 'db', 'cricketify.sqlite');
const SCHEMA_PATH = path.join(__dirname, '..', 'db', 'schema.sql');

const db = new sqlite3.Database(DB_PATH);

// Initialize database if tables do not exist
function init() {
  const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
  db.exec(schema);
}

module.exports = {
  db,
  init
};

