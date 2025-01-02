const pointsDisplay = document.getElementById('points');
const form = document.getElementById('give-points-form');

async function fetchPoints() {
    try {
        const response = await fetch('/points');
        const data = await response.json();
        pointsDisplay.textContent = data.Sebastian;
    } catch (error) {
        console.error('Fehler beim Abrufen der Punkte:', error);
    }
}

async function givePoints(event) {
    event.preventDefault();

    const receiver = document.getElementById('receiver').value;
    const amount = parseInt(document.getElementById('amount').value, 10);

    try {
        const response = await fetch('/points', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ giver: 'Sebastian', receiver, amount }),
        });

        if (response.ok) {
            alert('Punkte erfolgreich vergeben!');
            fetchPoints(); // Aktualisiere Punktestand
        } else {
            const errorData = await response.json();
            alert(`Fehler: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Fehler beim Vergabe von Punkten:', error);
    }
}

// Event-Listener für das Formular
form.addEventListener('submit', givePoints);

// Punkte regelmäßig abrufen
fetchPoints();
setInterval(fetchPoints, 5000); // Alle 5 Sekunden
