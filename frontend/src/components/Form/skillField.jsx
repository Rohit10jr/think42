import React from "react";
import { Field, ErrorMessage } from "formik";

const SkillsInput = ({ label, fieldName, values, setFieldValue }) => {
  const handleChange = (e) => {
    const skillsArray = e.target.value.split(",").map((item) => item.trim());
    setFieldValue(fieldName, skillsArray);
  };

  const skillsValue = Array.isArray(values[fieldName]) 
    ? values[fieldName].join(", ") 
    : ""; // Fallback to empty string if undefined or not an array

  return (
    <div className="input-container">
      <label className="input-label" htmlFor={fieldName}>
        {label}
      </label>
      <Field
        as="textarea"
        id={fieldName}
        name={fieldName}
        className="input-field"
        rows="4"
        placeholder="Enter skills separated by commas"
        value={skillsValue} // Use processed skillsValue
        onChange={handleChange}
      />
      <ErrorMessage
        name={fieldName}
        component="div"
        className="error-message"
      />
    </div>
  );
};

export default SkillsInput;
