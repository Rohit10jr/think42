import React, { useState, useRef, useEffect } from "react";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // Simulate bot typing
  const chatBodyRef = useRef(null);

  // Function to send a message
  const sendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      const userMessage = input;
      setInput("");

      setIsTyping(true);

      try {
        const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sender: "user_123", message: userMessage }),
        });

        const botReplies = await response.json();
        const botMessages = botReplies.map((reply) => ({ sender: "bot", text: reply.text }));
        setMessages((prevMessages) => [...prevMessages, ...botMessages]);
      } catch (error) {
        console.error("Error communicating with Rasa:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "Oops! Something went wrong." },
        ]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot">
      {/* Header */}
      <div className="chatbot-header">
        <h2>Chat Bot</h2>
      </div>

      {/* Body */}
      <div className="chatbot-body" ref={chatBodyRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="typing-indicator">Generating answer...</div>}
      </div>

      {/* Footer */}
      <div className="chatbot-footer">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;