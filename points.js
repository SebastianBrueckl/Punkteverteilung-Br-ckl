const API_URL = 'http://localhost:3000';
const ENDPOINT_POINTS = `${API_URL}/points`;
const ENDPOINT_UPDATE = `${API_URL}/update-points`;

const points = { Sebastian: 0, Valentina: 0 };

async function fetchPoints() {
    try {
        const response = await fetch(ENDPOINT_POINTS);
        const data = await response.json();
        Object.assign(points, data);
        updateBars();
    } catch (error) {
        console.error('Fehler beim Abrufen der Punktestände:', error);
    }
}

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

function updateBars() {
    const maxBarHeight = 300;
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

function addPoints(user, value) {
    updatePoints(user, value);
}

function subtractPoints(user, value) {
    updatePoints(user, -value);
}

document.addEventListener('DOMContentLoaded', fetchPoints);
setInterval(fetchPoints, 5000);
