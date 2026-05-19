
import { io } from "socket.io-client";

const SOCKET_URL = "https://studysync-backend-rjic.onrender.com";

const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["polling"],
  upgrade: false,
});

export default socket
