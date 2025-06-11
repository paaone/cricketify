const express = require('express');
const router = express.Router();

// POST /auth/login
router.post('/login', (req, res) => {
  // TODO: implement login logic
  res.send({ token: 'fake-jwt-token' });
});

module.exports = router;
