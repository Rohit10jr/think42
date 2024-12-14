import React from "react";
import "./signup.css";

const ActionButton = ({
  onClick,
  disabled = false,
  loading = false,
  label,
  loadingLabel = "Loading...", // Optional loading text,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`register-button ${className}`}
    >
      {loading ? loadingLabel : label}
    </button>
  );
};

export default ActionButton;
