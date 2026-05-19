const MessageBubble = ({ msg, currentUser }) => {

  const isMine = msg.user === currentUser;

  return (
    <div
      className={`flex ${
        isMine ? "justify-end" : "justify-start"
      }`}
    >

      <div
        className={`max-w-xs px-4 py-2 rounded-2xl text-white ${
          isMine
            ? "bg-blue-600"
            : "bg-gray-600"
        }`}
      >
        <p className="text-sm font-semibold">
          {msg.user}
        </p>

        <p>{msg.message}</p>
      </div>

    </div>
  );
};

export default MessageBubble;