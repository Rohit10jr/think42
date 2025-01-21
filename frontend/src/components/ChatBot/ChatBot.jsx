import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import options from '../../assets/images/option.png'
import close from '../../assets/images/close.png'

const Chatbot = () => {
  // const [isOpen, setIsOpen] = useState(false); 

  const openChatInNewTab = () => {
    const chatbotUrl = `${window.location.origin}/chatbot`; // URL for the chat window
    window.open(chatbotUrl, "chatbotTab"); // Open in a new tab
  };


  return (
    <div className="chatbot-container">
      {/* Chat Icon Button */}
      {/* {!isOpen && ( */}
        <button className="chat-icon"onClick={openChatInNewTab}  title="Open Chat">
          💬
        </button>
      {/* )} */}

      {/* Chat Window */}
     
    </div>
  );
};

export default Chatbot;
