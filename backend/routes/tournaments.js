const express = require('express');
const router = express.Router();

// GET /tournaments
router.get('/', (req, res) => {
  // TODO: fetch tournaments from DB
  res.send([]);
});

// POST /tournament
router.post('/', (req, res) => {
  // TODO: create tournament
  res.status(201).send({ id: 1 });
});

module.exports = router;
