// Nelly.js
document.getElementById('submit').addEventListener('click', function() {
    const target = document.getElementById('target').value; // Ziel (Sebastian oder Valentina)
    const points = parseInt(document.getElementById('points').value); // Punkte
  
    // Validierung der Eingaben
    if (!target || !points || isNaN(points) || points <= 0) {
      alert('Bitte gültige Zielperson und Punktzahl eingeben!');
      return;
    }
  
    // POST-Anfrage an den Server, um Punkte zu vergeben
    fetch(`/api/user/Nelly/points`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ target: target, points: points }),
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message); // Bestätigung der Punktvergabe
    })
    .catch(error => {
      console.error('Fehler:', error);
    });
  });
  