// Punktestand für Benutzer wird im localStorage gespeichert
const points = {
    Sebastian: parseInt(localStorage.getItem('Sebastian')) || 0,
    Valentina: parseInt(localStorage.getItem('Valentina')) || 0
};

// Punkte hinzufügen
function addPoints(user, value) {
    points[user] += value;
    localStorage.setItem(user, points[user]); // Speichern im localStorage
    updateBars();
}

// Punkte subtrahieren
function subtractPoints(user, value) {
    points[user] -= value;
    localStorage.setItem(user, points[user]); // Speichern im localStorage
    updateBars();
}

// Balken aktualisieren
function updateBars() {
    const maxBarHeight = 300; // Maximale Höhe der Balken in Pixeln

    // Sebastian aktualisieren (falls vorhanden)
    const sebastianBar = document.getElementById('SebastianPoints');
    const sebastianScore = document.getElementById('SebastianScore');
    if (sebastianBar && sebastianScore) {
        const sebastianHeight = Math.min(points.Sebastian, maxBarHeight);
        sebastianBar.style.height = sebastianHeight + 'px';
        sebastianScore.innerText = points.Sebastian + ' Punkte';
    }

    // Valentina aktualisieren (falls vorhanden)
    const valentinaBar = document.getElementById('ValentinaPoints');
    const valentinaScore = document.getElementById('ValentinaScore');
    if (valentinaBar && valentinaScore) {
        const valentinaHeight = Math.min(points.Valentina, maxBarHeight);
        valentinaBar.style.height = valentinaHeight + 'px';
        valentinaScore.innerText = points.Valentina + ' Punkte';
    }
}

// Beim Laden der Seite die Balken aktualisieren
document.addEventListener('DOMContentLoaded', updateBars);
