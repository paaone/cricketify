const express = require('express');
const router = express.Router();

const { db } = require('../db');

// GET /tournaments
router.get('/', (req, res) => {
  db.all('SELECT * FROM tournaments', [], (err, rows) => {
    if (err) return res.status(500).send({ error: err.message });
    res.send(rows);
  });
});

// POST /tournament
router.post('/', (req, res) => {
  const { name, slug, organizer_id, format, overs_per_match, max_players, year } = req.body;
  const stmt = db.prepare('INSERT INTO tournaments (name, slug, organizer_id, format, overs_per_match, max_players, year) VALUES (?, ?, ?, ?, ?, ?, ?)');
  stmt.run(name, slug, organizer_id, format, overs_per_match, max_players, year, function(err) {
    if (err) return res.status(500).send({ error: err.message });
    res.status(201).send({ id: this.lastID });
  });
});

module.exports = router;
