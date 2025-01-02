const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

let points = {
    Sebastian: 0,
    Valentina: 0,
    Nelly: 0,
    Hans: 0
};

// API: Punkte abfragen
app.get('/points', (req, res) => {
    res.json(points);
});

// API: Punkte vergeben
app.post('/points', (req, res) => {
    const { giver, receiver, amount } = req.body;

    if (!points.hasOwnProperty(receiver)) {
        return res.status(400).json({ error: 'Invalid receiver' });
    }

    if (!points.hasOwnProperty(giver)) {
        return res.status(400).json({ error: 'Invalid giver' });
    }

    // Punkte hinzufügen
    points[receiver] += amount;
    res.json({ success: true, points });
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
