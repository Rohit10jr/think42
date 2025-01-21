import React, { useState } from "react";
import "./Chatbot.css";
import options from '../../assets/images/option.png'
import close from '../../assets/images/close.png'

const predefinedReplies = [
  "Hello! How can I assist you today?",
  "I’m here to help you with your queries.",
  "Please provide more details about your request.",
  "Thank you for reaching out!",
  "Let me know if you need further assistance.",
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // To toggle chat window
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // Simulate bot typing
  const [showDropdown, setShowDropdown] = useState(false); // For three dots dropdown

  // Function to send a message
  const sendMessage = () => {
    if (input.trim()) {
      // Add user message
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");

      // Simulate bot typing
      setIsTyping(true);
      setTimeout(() => {
        const botReply = predefinedReplies[Math.floor(Math.random() * predefinedReplies.length)];
        setMessages((prevMessages) => [...prevMessages, { sender: "bot", text: botReply }]);
        setIsTyping(false);
      }, 2000); // 2-second delay for bot reply
    }
  };

  // Function to clear the chat
  const clearChat = () => {
    setMessages([]);
    setShowDropdown(false); // Close the dropdown
  };

  return (
    <div className="chatbot-container">
      {/* Chat Icon Button */}
      {!isOpen && (
        <button className="chat-icon" onClick={() => setIsOpen(true)} title="Open Chat">
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot">
          {/* Header */}
          <div className="chatbot-header">
            <h2>Chat Bot</h2>
            <div className="header-actions">
              <div className="dropdown">
                <button
                  className="start-over-btn"
                  onClick={() => setShowDropdown(!showDropdown)}
                  title="Options"
                >
                  <img src={options} alt="Image 2" className="options-icon" />
                </button>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <button onClick={clearChat}>Clear Chat</button>
                  </div>
                )}
              </div>
              <button
                className="close-btn"
                onClick={() => setIsOpen(false)}
                title="Close Chat"
              >
                <img src={close} alt="Image 1" className="header-icon" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="chatbot-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.sender === "user" ? "user" : "bot"} ${msg.sender === "bot" && isTyping && index === messages.length - 1 ? "typing" : ""
                  }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && <div className="typing-indicator"> generating...</div>}
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
      )}
    </div>
  );
};

export default Chatbot;
