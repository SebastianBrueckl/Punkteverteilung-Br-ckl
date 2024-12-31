const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Daten für Punkte
let punkte = {
    Sebastian: 0,
    Valentina: 0,
};

// API-Endpunkte
// Punkte abfragen
app.get('/api/punkte', (req, res) => {
    res.json(punkte);
});

// Punkte vergeben
app.post('/api/punkte/:name', (req, res) => {
    const { name } = req.params;
    const { punkteWert } = req.body;

    if (!punkte[name]) {
        return res.status(404).json({ error: 'Name nicht gefunden' });
    }

    if (typeof punkteWert !== 'number') {
        return res.status(400).json({ error: 'Ungültiger Punktewert' });
    }

    punkte[name] += punkteWert;
    res.json({ name, neuePunkte: punkte[name] });
});

// Startseite (optional)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
