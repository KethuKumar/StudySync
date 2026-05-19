const videoRooms = new Map();

const getRoomPeers = (roomId) => {
  if (!videoRooms.has(roomId)) {
    videoRooms.set(roomId, new Map());
  }

  return videoRooms.get(roomId);
};

const leaveVideoRoom = (socket) => {
  const { videoRoomId, peerId } = socket.data;

  if (!videoRoomId || !peerId) return;

  const peers = videoRooms.get(videoRoomId);

  if (peers) {
    peers.delete(socket.id);

    if (peers.size === 0) {
      videoRooms.delete(videoRoomId);
    }
  }

  socket.to(videoRoomId).emit("user_disconnected", peerId);
  socket.leave(videoRoomId);

  delete socket.data.videoRoomId;
  delete socket.data.peerId;
};

const videoHandler = (io, socket) => {
  socket.on("join_video_room", ({ roomId, peerId }) => {
    if (!roomId || !peerId) return;

    leaveVideoRoom(socket);

    const peers = getRoomPeers(roomId);
    const existingPeers = [...peers.values()];

    socket.join(roomId);
    socket.data.videoRoomId = roomId;
    socket.data.peerId = peerId;
    peers.set(socket.id, peerId);

    socket.emit("video_room_users", existingPeers);
    socket.to(roomId).emit("user_connected", peerId);
  });

  socket.on("leave_video_room", () => {
    leaveVideoRoom(socket);
  });

  socket.on("disconnect", () => {
    leaveVideoRoom(socket);
  });
};

export default videoHandler;
