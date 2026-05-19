import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";
import http from "http";
import { Server } from "socket.io";
import initSocket from "./src/socket/socket.js";
import { ExpressPeerServer } from "peer";

const PORT = config.PORT || 5000;

connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://studysyncfrontend.onrender.com",
    credentials: true
  }
});

const peerServer =
  ExpressPeerServer(server, {
    debug: true
  });

app.use("/peerjs", peerServer);

initSocket(io);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
