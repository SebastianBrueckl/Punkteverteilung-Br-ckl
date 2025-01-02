// Valentina.js
window.addEventListener('DOMContentLoaded', (event) => {
    // GET-Anfrage, um Valentinas Punkte anzuzeigen
    fetch('/api/user/Valentina')
      .then(response => response.json())
      .then(data => {
        document.getElementById('points').innerText = `Valentinas Punkte: ${data.points}`;
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Punkte:', error);
      });
  });
  