// Punktestand für Benutzer
const points = {
    Sebastian: 0,
    Valentina: 0
};

// Punkte hinzufügen
function addPoints(user, value) {
    points[user] += value;
    updateBars();
}

// Punkte subtrahieren
function subtractPoints(user, value) {
    points[user] -= value;
    updateBars();
}

// Balken aktualisieren
function updateBars() {
    document.getElementById('SebastianPoints').style.height = points.Sebastian + 'px';
    document.getElementById('ValentinaPoints').style.height = points.Valentina + 'px';

    document.getElementById('SebastianScore').innerText = points.Sebastian + ' Punkte';
    document.getElementById('ValentinaScore').innerText = points.Valentina + ' Punkte';
}