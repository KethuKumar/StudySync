import chatHandler from "./handlers/chantHandler.js";
import whiteboardHandler from "./handlers/whiteboardHandler.js";
import videoHandler from "./handlers/videoHandler.js";

const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    // attach handleres
    chatHandler(io, socket);
    whiteboardHandler(io, socket);
    videoHandler(io, socket);

    socket.on("disconnect", () => {
      console.log("User disconnected : ", socket.id);
    });
  });
};

export default initSocket;
