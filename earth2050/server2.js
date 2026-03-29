import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = http.createServer(app);

// Attach WebSocket to same HTTP server
const wss = new WebSocketServer({ server });

const clients = new Map(); // userId -> socket

// Middleware (optional)
app.use(express.json());

// Basic route (test)
app.get("/", (req, res) => {
  res.sendFile(new URL("./index.html", import.meta.url).pathname);
});

// WebSocket logic
wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    // Register user
    if (data.type === "register") {
      clients.set(data.id, ws);
      console.log(`User registered: ${data.id}`);
      return;
    }

    // Forward message to target user
    const target = clients.get(data.to);
    if (target) {
      target.send(JSON.stringify(data));
    }
  });

  ws.on("close", () => {
    for (let [id, socket] of clients.entries()) {
      if (socket === ws) {
        clients.delete(id);
        console.log(`User disconnected: ${id}`);
      }
    }
  });
});

// Start server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`HTTP + WS server running on http://localhost:${PORT}`);
});