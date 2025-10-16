// server.js
import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 8765; // Render nos dará un puerto, si no usamos 8765 por defecto

const wss = new WebSocketServer({ port: PORT });
console.log(`Servidor WebSocket corriendo en puerto ${PORT}`);

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    // Reenvía el mensaje a todos los clientes conectados
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(msg.toString());
      }
    });
  });
});
