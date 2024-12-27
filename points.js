// Punktestand im LocalStorage initialisieren
const users = ['Sebastian', 'Valentina'];

// Punkte initialisieren
const points = {
    Sebastian: parseInt(localStorage.getItem('Sebastian')) || 0,
    Valentina: parseInt(localStorage.getItem('Valentina')) || 0
};

// Helper: Speichern und Synchronisieren von Punkten
function saveAndSyncPoints() {
    users.forEach(user => {
        localStorage.setItem(user, points[user]);
    });
    updateBars();
}

// Punkte hinzufügen
function addPoints(user, value) {
    if (!points[user]) return; // Sicherstellen, dass der Nutzer existiert
    points[user] += value;
    saveAndSyncPoints();
}

// Punkte subtrahieren
function subtractPoints(user, value) {
    if (!points[user]) return; // Sicherstellen, dass der Nutzer existiert
    points[user] = Math.max(0, points[user] - value); // Negative Punkte verhindern
    saveAndSyncPoints();
}

// Balken aktualisieren
function updateBars() {
    const maxBarHeight = 300; // Maximale Höhe der Balken in Pixeln

    users.forEach(user => {
        const bar = document.getElementById(`${user}Points`);
        const score = document.getElementById(`${user}Score`);
        if (bar && score) {
            const height = Math.min(points[user], maxBarHeight);
            bar.style.height = height + 'px';
            score.innerText = `${points[user]} Punkte`;
        }
    });
}

// Beim Laden der Seite die Balken aktualisieren
document.addEventListener('DOMContentLoaded', updateBars);

// Debug- und Synchronisation-Button (optional für Tests)
function resetPoints() {
    users.forEach(user => {
        points[user] = 0;
        localStorage.removeItem(user);
    });
    updateBars();
}
