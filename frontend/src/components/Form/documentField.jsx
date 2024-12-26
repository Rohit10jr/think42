import React from "react";

const FileInput = ({ label, fieldName, setFieldValue }) => {
  const handleFileChange = (event) => {
    setFieldValue(fieldName, event.currentTarget.files[0]);
  };

  return (
    <div className="input-container">
      <label className="input-label" htmlFor={fieldName}>
        {label}
      </label>
      <input
        type="file"
        id={fieldName}
        name={fieldName}
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        // className="input-field"
      />
    </div>
  );
};

export default FileInput;
