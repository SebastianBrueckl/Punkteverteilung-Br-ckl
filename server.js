const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Punktestand im Speicher
let points = {
    Sebastian: 0,
    Valentina: 0
};

// Middleware
app.use(cors());
app.use(express.json());

// Punktestand abrufen
app.get('/points', (req, res) => {
    res.json(points);
});

// Punktestand aktualisieren
app.post('/update-points', (req, res) => {
    const { user, value } = req.body;

    if (points[user] !== undefined) {
        points[user] += value;
        res.json({ success: true, points });
    } else {
        res.status(400).json({ success: false, message: 'Ungültiger Benutzer' });
    }
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
