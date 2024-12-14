import React from "react";
import "./signup.css";

const InputField = ({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input-field ${className}`}
    />
  );
};

export default InputField;
