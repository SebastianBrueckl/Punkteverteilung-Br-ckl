const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// In-Memory-Datenstruktur für Punkte
const points = {
  Sebastian: 0,
  Valentina: 0,
  Nelly: 0,
  Hans: 0,
};

// API-Endpunkte
app.get("/points", (req, res) => {
  res.json(points);
});

app.post("/points", (req, res) => {
  const { from, to, pointsGiven } = req.body;
  if (!points[to]) {
    return res.status(400).json({ error: "Benutzer nicht gefunden" });
  }
  points[to] += pointsGiven;

  // Informiere alle Clients über die Punkteänderung
  io.emit("pointsUpdated", points);

  res.json({ message: "Punkte aktualisiert", points });
});

// WebSocket-Logik
io.on("connection", (socket) => {
  console.log("Ein Benutzer hat sich verbunden");
  socket.emit("pointsUpdated", points);

  socket.on("disconnect", () => {
    console.log("Ein Benutzer hat die Verbindung getrennt");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
