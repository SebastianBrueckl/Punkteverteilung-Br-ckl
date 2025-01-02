const pointsDisplay = document.getElementById("pointsDisplay");
const socket = io();

// Punkte in Echtzeit aktualisieren
socket.on("pointsUpdated", (points) => {
  pointsDisplay.textContent = `Sebastian: ${points.Sebastian}, Valentina: ${points.Valentina}, Nelly: ${points.Nelly}, Hans: ${points.Hans}`;
});

// Punkte vergeben
function givePoints() {
  const to = document.getElementById("to").value;
  const points = parseInt(document.getElementById("points").value, 10);

  fetch("/points", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Nelly",
      to,
      pointsGiven: points,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Punkte erfolgreich vergeben:", data);
    })
    .catch((error) => {
      console.error("Fehler beim Punkte vergeben:", error);
    });
}
