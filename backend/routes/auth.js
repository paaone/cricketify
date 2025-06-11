const express = require('express');
const passport = require('passport');
const { db } = require('../db');
const router = express.Router();

// Redirect user to Google for authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth2 callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  const profile = req.user;
  const email = profile.emails && profile.emails[0] ? profile.emails[0].value : '';
  db.run(
    `INSERT OR IGNORE INTO users (name, email, role, profile_picture, provider, provider_id) VALUES (?, ?, 'Player', ?, 'google', ?)`,
    [profile.displayName, email, profile.photos && profile.photos[0] ? profile.photos[0].value : null, profile.id],
    function(err) {
      if (err) return res.status(500).send({ error: err.message });
      db.get('SELECT * FROM users WHERE provider = ? AND provider_id = ?', ['google', profile.id], (err, row) => {
        if (err) return res.status(500).send({ error: err.message });
        res.json(row);
      });
    }
  );
});

// Redirect user to Facebook for authentication
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Facebook OAuth callback
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
  const profile = req.user;
  const email = profile.emails && profile.emails[0] ? profile.emails[0].value : '';
  db.run(
    `INSERT OR IGNORE INTO users (name, email, role, profile_picture, provider, provider_id) VALUES (?, ?, 'Player', ?, 'facebook', ?)`,
    [profile.displayName, email, profile.photos && profile.photos[0] ? profile.photos[0].value : null, profile.id],
    function(err) {
      if (err) return res.status(500).send({ error: err.message });
      db.get('SELECT * FROM users WHERE provider = ? AND provider_id = ?', ['facebook', profile.id], (err, row) => {
        if (err) return res.status(500).send({ error: err.message });
        res.json(row);
      });
    }
  );
});

module.exports = router;
