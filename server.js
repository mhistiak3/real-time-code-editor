import express from "express";
import http from "http";
import { Server } from "socket.io";
import { ACTIONS } from "./Actions.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};
const getALlConnectedClients = (roomId) => {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
};
// initialize socket.io

io.on("connection", (socket) => {
  console.log("socket connected: " + socket.id);

  // Make Join Event
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getALlConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      // Emit Joined
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  // disconnecting event
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    })

    delete userSocketMap[socket.id];
    socket.leave();
    
  });
});

// listen for incoming connections
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT}`);
});
