import { useEffect, useRef, useState } from "react";
import socket from "../services/socket";

import { FaPaperPlane } from "react-icons/fa";

import MessageBubble from "./MessageBubble";

const ChatBox = ({ groupId, currentUser }) => {
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const bottomRef = useRef(null);

  // join room
  useEffect(() => {
    if (!groupId) return;

    setMessages([]);

    socket.emit("join_group", groupId);

    const handleChatHistory = (history) => {
      setMessages(history);
    };

    const handleReceiveMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("chat_history", handleChatHistory);

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.emit("leave_group", groupId);

      socket.off("chat_history", handleChatHistory);

      socket.off("receive_message", handleReceiveMessage);
    };
  }, [groupId]);

  // auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    if (!currentUser) return;

    socket.emit("send_message", {
      groupId,
      message: message.trim(),
      user: currentUser,
    });

    setMessage("");
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            msg={msg}
            currentUser={currentUser}
          />
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
          <input
            type="text"
            placeholder={
              currentUser
                ? "Type your message..."
                : "Login to chat"
            }
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            disabled={!currentUser}
            className="flex-1 bg-transparent px-3 py-3 text-white placeholder-gray-500 outline-none"
          />

          <button
            onClick={sendMessage}
            disabled={!currentUser}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r from-purple-500 to-blue-500 text-white transition hover:scale-105 disabled:opacity-60"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;