const groupMessages = new Map();

const chatHandler = (io, socket) => {
  // join group room
  socket.on("join_group", (groupId) => {
    if (!groupId) return;

    socket.join(groupId);
    socket.emit("chat_history", groupMessages.get(groupId) || []);
    console.log(`User joined group : ${groupId}`);
  });

  socket.on("leave_group", (groupId) => {
    if (!groupId) return;

    socket.leave(groupId);
    console.log(`User left group : ${groupId}`);
  });

  // send message
  socket.on("send_message", ({ groupId, message, user }) => {
    if (!groupId || !message?.trim()) return;

    const msgData = {
      message: message.trim(),
      user: user || "Guest",
      time: new Date(),
    };

    const messages = groupMessages.get(groupId) || [];
    messages.push(msgData);
    groupMessages.set(groupId, messages.slice(-100));

    // broadcast to group
    io.to(groupId).emit("receive_message", msgData);
  });
};

export default chatHandler;
