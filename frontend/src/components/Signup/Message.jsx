import React from "react";
import "./signup.css";

const Message = ({ text, type }) => {
  return (
    <p
      className={`message ${
        type === "error" ? "error-message" : "success-message"
      }`}
    >
      {text}
    </p>
  );
};

export default Message;
