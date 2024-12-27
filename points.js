// API-Endpunkte
const API_URL = 'http://localhost:3000';
const ENDPOINT_POINTS = `${API_URL}/points`;
const ENDPOINT_UPDATE = `${API_URL}/update-points`;

// Punktestand
const points = { Sebastian: 0, Valentina: 0 };

// Punkte abrufen
async function fetchPoints() {
    try {
        const response = await fetch(ENDPOINT_POINTS);
        const data = await response.json();
        Object.assign(points, data); // Punktestände aktualisieren
        updateBars();
    } catch (error) {
        console.error('Fehler beim Abrufen der Punktestände:', error);
    }
}

// Punkte aktualisieren (nur für Nelly und Hans)
async function updatePoints(user, value) {
    try {
        const response = await fetch(ENDPOINT_UPDATE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, value }),
        });
        const data = await response.json();
        if (data.success) {
            Object.assign(points, data.points);
            updateBars();
        } else {
            alert('Fehler: ' + data.message);
        }
    } catch (error) {
        console.error('Fehler beim Aktualisieren der Punkte:', error);
    }
}

// Balken aktualisieren
function updateBars() {
    const maxBarHeight = 300; // Maximale Höhe der Balken in Pixeln

    ['Sebastian', 'Valentina'].forEach(user => {
        const bar = document.getElementById(`${user}Points`);
        const score = document.getElementById(`${user}Score`);
        if (bar && score) {
            const height = Math.min(points[user], maxBarHeight);
            bar.style.height = height + 'px';
            score.innerText = `${points[user]} Punkte`;
        }
    });
}

// Ereignisse für Buttons (nur für Nelly und Hans)
function addPoints(user, value) {
    updatePoints(user, value);
}

function subtractPoints(user, value) {
    updatePoints(user, -value);
}

// Punktestände abrufen, wenn die Seite geladen wird
document.addEventListener('DOMContentLoaded', fetchPoints);

// Punkte regelmäßig aktualisieren
setInterval(fetchPoints, 5000); // Alle 5 Sekunden
