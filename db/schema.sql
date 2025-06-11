-- SQLite database schema for Cricketify

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL,
  profile_picture TEXT
);

CREATE TABLE tournaments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  organizer_id INTEGER,
  format TEXT,
  overs_per_match INTEGER,
  max_players INTEGER,
  year INTEGER
);

CREATE TABLE teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  logo_url TEXT,
  captain_id INTEGER,
  tournament_id INTEGER
);

-- other tables omitted for brevity
