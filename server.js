const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let points = {
    Sebastian: 0,
    Valentina: 0
};

app.get('/api/points', (req, res) => {
    res.json(points);
});

app.post('/api/points', (req, res) => {
    const { name, points: newPoints } = req.body;
    if (points[name] !== undefined) {
        points[name] += newPoints;
        res.status(200).json({ message: 'Punkte erfolgreich aktualisiert!' });
    } else {
        res.status(400).json({ error: 'Ungültiger Benutzername' });
    }
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
