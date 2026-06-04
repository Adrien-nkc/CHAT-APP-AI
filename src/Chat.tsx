import { useState, useRef, useEffect } from "react";
import Input from "./components/Input.tsx";
import Messages from "./components/Messages.tsx";

function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    console.log("DEBUG, MESSAGES UPDATE: ", messages);
  }, [messages]);

  function handleChange(e: any) {
    setInput(e.target.value);
  }

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsLoading(true);

    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();

    setMessages((prev) => [...prev, { role: "assistant", content: data }]);
    setIsLoading(false);
  }

  function handleEnter(e: any) {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  }

  return (
    <>
      <h1 className="chat-title">Chat</h1>

      <Messages messages={messages} />

      <div ref={ref}></div>

      <div className="input-row">
        <Input
          input={input}
          handleChange={handleChange}
          handleSend={handleSend}
          handleEnter={handleEnter}
          isLoading={isLoading}
        ></Input>
      </div>
    </>
  );
}

export default Chat;
