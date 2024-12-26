import React from "react";
import { Field, ErrorMessage } from "formik";

const PortfolioField = ({ label, fieldName }) => {
  return (
    <div className="input-container">
      <label className="input-label" htmlFor={fieldName}>
        {label}
      </label>
      <Field
        type="text"
        id={fieldName}
        name={fieldName}
        className="input-field"
      />
      <ErrorMessage
        name={fieldName}
        component="div"
        className="error-message"
      />
    </div>
  );
};

export default PortfolioField;
