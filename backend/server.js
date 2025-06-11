require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const authRoutes = require('./routes/auth');
const tournamentRoutes = require('./routes/tournaments');
const matchesRoutes = require('./routes/matches');
const { init } = require('./db');
const app = express();
const PORT = process.env.PORT || 3001;

// initialize sqlite database
init();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'cricketify-secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Basic routes
app.get('/', (req, res) => {
  res.send({ message: 'Cricketify API' });
});

app.use('/auth', authRoutes);
app.use('/tournaments', tournamentRoutes);

app.use('/matches', matchesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
