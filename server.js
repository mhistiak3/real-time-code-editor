import express from "express"
import http from "http"
import { Server } from "socket.io"

const app = express();
const server = http.createServer(app);

// initialize socket.io
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("socket connected: " + socket.id);
    
});

// listen for incoming connections
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT}`);
});
