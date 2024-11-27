// Die Punktzahlen der Benutzer werden hier gespeichert
let points = {
    sebastian: 0,
    valentina: 0
};

// Funktion, um Punkte hinzuzufügen
function addPoints(user, pointsToAdd) {
    points[user] += pointsToAdd;
    updatePointsDisplay(user);
}

// Funktion, um Punkte zu subtrahieren (Minuspunkte)
function subtractPoints(user, pointsToSubtract) {
    points[user] += pointsToSubtract;  // Punkte werden negativ hinzugefügt (Minuspunkte)
    updatePointsDisplay(user);
}

// Funktion, um den Punktestand anzuzeigen
function updatePointsDisplay(user) {
    document.getElementById(user + 'Points').innerText = points[user];
}
