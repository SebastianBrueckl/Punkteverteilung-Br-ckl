// Sebastian.js
window.addEventListener('DOMContentLoaded', (event) => {
    // GET-Anfrage, um Sebastians Punkte anzuzeigen
    fetch('/api/user/Sebastian')
      .then(response => response.json())
      .then(data => {
        document.getElementById('points').innerText = `Sebastians Punkte: ${data.points}`;
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Punkte:', error);
      });
  });
  