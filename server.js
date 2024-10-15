import express from "express";
import http from "http";
import { Server } from "socket.io";
import { ACTIONS } from "./Actions.js";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __dirname = path.resolve();

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
    });

    delete userSocketMap[socket.id];
    socket.leave();
  });

  // code change event
  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  // sync code event
  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.SYNC_CODE, { code });
  });

  // message event
  socket.on(ACTIONS.NEW_CHAT_MESSAGE, ({ roomId, messageObj }) => {
    io.to(roomId).emit(ACTIONS.NEW_CHAT_MESSAGE, { messageObj });
  });
});


 app.use(express.static(path.join(__dirname, "/dist")));
 app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "dist", "index.html"));
 });

// listen for incoming connections
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
