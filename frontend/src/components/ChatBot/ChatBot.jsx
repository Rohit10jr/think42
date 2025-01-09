import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import options from '../../assets/images/option.png'
import close from '../../assets/images/close.png'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // To toggle chat window
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // Simulate bot typing
  const [showDropdown, setShowDropdown] = useState(false); // For three dots dropdown

  const chatBodyRef = useRef(null);

  // Function to send a message
  const sendMessage = async () => {
    if (input.trim()) {
      // Add user message
      setMessages([...messages, { sender: "user", text: input }]);
      const userMessage = input;
      setInput("");

      // Simulate bot typing
      setIsTyping(true);

      try {
        // Send the user message to Rasa
        const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sender: "user_123", message: userMessage }), // 'sender' can be a unique user ID
        });

        const botReplies = await response.json(); // Array of bot responses
        const botMessages = botReplies.map((reply) => ({ sender: "bot", text: reply.text }));

        // Update messages with bot replies
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

  // Function to clear the chat
  const clearChat = () => {
    setMessages([]);
    setShowDropdown(false); // Close the dropdown
  };
  
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

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
                  Options
                </button>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <button onClick={clearChat}>Clear Chat</button>
                  </div>
                )}
              </div>
              <button className="close-btn" onClick={() => setIsOpen(false)} title="Close Chat">
                Close
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="chatbot-body"  ref={chatBodyRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {/* {isTyping && <div className="typing-indicator">Bot is typing...</div>} */}
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
      )}
    </div>
  );
};

export default Chatbot;
