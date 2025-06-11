const express = require('express');
const passport = require('passport');
const router = express.Router();

// Redirect user to Google for authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth2 callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  const user = {
    id: req.user.id,
    displayName: req.user.displayName,
    emails: req.user.emails,
  };
  res.json(user);
});

module.exports = router;
