const pointsDisplay = document.getElementById("pointsDisplay");
const socket = io();

// Punkte in Echtzeit aktualisieren
socket.on("pointsUpdated", (points) => {
  pointsDisplay.textContent = `Sebastian: ${points.Sebastian}, Valentina: ${points.Valentina}, Nelly: ${points.Nelly}, Hans: ${points.Hans}`;
});
