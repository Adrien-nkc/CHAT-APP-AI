type MessagesProps = {
  messages: { role: string; content: string }[];
};

export default function Messages({ messages }: MessagesProps) {
  return (
    <div className="messages-area">
      {messages.map((message, index) => {
        return (
          <div
            className={
              message.role === "user" ? "message-bubble" : "message-bubble-ai"
            }
            key={index}
          >
            {message.content}
          </div>
        );
      })}
    </div>
  );
}
