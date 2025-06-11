const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const tournamentRoutes = require('./routes/tournaments');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Basic routes
app.get('/', (req, res) => {
  res.send({ message: 'Cricketify API' });
});

app.use('/auth', authRoutes);
app.use('/tournaments', tournamentRoutes);

// TODO: implement matches routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
