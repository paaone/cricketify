const express = require('express');
const { db } = require('../db');

const router = express.Router();

// GET /matches
router.get('/', (req, res) => {
  db.all('SELECT * FROM matches', [], (err, rows) => {
    if (err) return res.status(500).send({ error: err.message });
    res.send(rows);
  });
});

// POST /matches
router.post('/', (req, res) => {
  const { season_id, team1_id, team2_id, date, location, status } = req.body;
  const stmt = db.prepare('INSERT INTO matches (season_id, team1_id, team2_id, date, location, status) VALUES (?, ?, ?, ?, ?, ?)');
  stmt.run(season_id, team1_id, team2_id, date, location, status, function(err) {
    if (err) return res.status(500).send({ error: err.message });
    res.status(201).send({ id: this.lastID });
  });
});

module.exports = router;

