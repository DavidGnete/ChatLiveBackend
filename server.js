// server.js
import express from "express";
import { WebSocketServer } from "ws";
import http from "http";

const app = express();
const server = http.createServer(app);

// Configuramos WebSocket sobre el mismo servidor HTTP
const wss = new WebSocketServer({ server });

// Cuando un cliente se conecta
wss.on("connection", (ws) => {
  console.log("Nuevo cliente conectado ✅");

  ws.on("message", (msg) => {
    console.log("Mensaje recibido:", msg.toString());

    // Reenviar mensaje a todos los clientes conectados
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(msg.toString());
      }
    });
  });

  ws.on("close", () => console.log("Cliente desconectado ❌"));
});

app.get("/", (req, res) => {
  res.send("Servidor WebSocket funcionando 🟢");
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Servidor WebSocket escuchando en puerto ${PORT}`);
});

