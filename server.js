const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// CORS-Konfiguration für den Zugriff von verschiedenen Geräten
app.use(cors());
app.use(express.json());

// Benutzer und Punkte in-memory speichern
let users = {
  "Nelly": { points: 0 },
  "Johann": { points: 0 },
  "Sebastian": { points: 0 },
  "Valentina": { points: 0 }
};

// Endpunkt: Alle Benutzer anzeigen (optional, zum Testen)
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Endpunkt: Punkte eines Benutzers abrufen
app.get('/api/user/:name', (req, res) => {
  const userName = req.params.name;
  if (users[userName]) {
    res.json({ name: userName, points: users[userName].points });
  } else {
    res.status(404).send('Benutzer nicht gefunden');
  }
});

// Endpunkt: Punkte vergeben (Nelly und Johann können Punkte vergeben)
app.post('/api/user/:name/points', (req, res) => {
  const userName = req.params.name;
  const { points } = req.body;

  if (!users[userName]) {
    return res.status(404).send('Benutzer nicht gefunden');
  }

  // Nur Nelly und Johann können Punkte vergeben
  if (userName !== "Nelly" && userName !== "Johann") {
    return res.status(403).send('Dieser Benutzer kann keine Punkte vergeben');
  }

  if (isNaN(points) || points <= 0) {
    return res.status(400).send('Ungültige Punktzahl');
  }

  // Die Punkte zum entsprechenden Benutzer hinzufügen
  if (users[userName]) {
    // Ziel-Benutzer
    const targetUser = req.body.target;
    if (users[targetUser]) {
      users[targetUser].points += points;
      res.json({ message: `${points} Punkte an ${targetUser} vergeben`, points: users[targetUser].points });
    } else {
      res.status(404).send('Zielbenutzer nicht gefunden');
    }
  } else {
    res.status(404).send('Benutzer nicht gefunden');
  }
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});

const express = require('express');
const app = express();
const path = require('path');

// Damit Express statische Dateien (wie HTML, CSS, JS) im "public"-Ordner servieren kann
app.use(express.static(path.join(__dirname, 'public')));

// Route für die Startseite
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server starten
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
