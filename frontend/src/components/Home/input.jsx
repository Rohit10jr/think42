import React from "react";

const InputField = ({ id, label, type, value, onChange, required = false }) => {
  return (
    <div className="input-container">
      <label className="input-label" htmlFor={id}>
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        id={id}
        className="input-field"
        value={value}
        onChange={onChange}
        // required={required}
      />
    </div>
  );
};

export default InputField;
