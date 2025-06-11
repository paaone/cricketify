import React, { useEffect, useState } from 'react';

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/tournaments')
      .then(res => res.json())
      .then(setTournaments)
      .catch(() => setTournaments([]));
  }, []);

  return (
    <ul>
      {tournaments.map(t => (
        <li key={t.id}>{t.name}</li>
      ))}
    </ul>
  );
}

export default function App() {
  return (
    <div>
      <h1>Welcome to Cricketify</h1>
      <p>
        <a href="http://localhost:3001/auth/google">Login with Google</a>
        {' | '}
        <a href="http://localhost:3001/auth/facebook">Login with Facebook</a>
      </p>
      <Tournaments />
    </div>
  );
}
