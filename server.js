const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Für JSON-Daten im Body

// Punktestände speichern
let points = {
    Sebastian: 0,
    Valentina: 0,
};

// Punktestände abrufen
app.get('/points', (req, res) => {
    res.json(points);
});

// Punkte aktualisieren (nur Nelly und Hans)
app.post('/update-points', (req, res) => {
    const { user, value } = req.body;

    if (points[user] !== undefined) {
        points[user] += value;
        if (points[user] < 0) points[user] = 0; // Negative Punkte verhindern
        res.json({ success: true, points });
    } else {
        res.status(400).json({ success: false, message: 'Ungültiger Nutzer' });
    }
});

// Server starten
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
