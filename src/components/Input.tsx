type InputProps = {
  input: string;
  handleChange: (e: any) => void;
  handleSend: () => void;
  handleEnter: (e: any) => void;
  isLoading: boolean;
};

export default function Input({
  input,
  handleChange,
  handleSend,
  handleEnter,
  isLoading,
}: InputProps) {
  return (
    <>
      <input
        className="chat-input"
        onKeyDown={handleEnter}
        onChange={handleChange}
        value={input}
        type="text"
        placeholder="Ask the AI..."
      />
      <button className="send-button" onClick={handleSend} disabled={isLoading}>
        Send
      </button>
    </>
  );
}
