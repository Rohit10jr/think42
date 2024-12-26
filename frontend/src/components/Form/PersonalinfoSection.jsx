import React from "react";
import { Field, ErrorMessage } from "formik";

const PersonalInfoSection = ({ handleBlur, setFieldValue, values, emailStatus, checkEmailAvailability }) => {
  const fields = [
    { id: "full_name", label: "Full Name", type: "text" },
    { id: "email", label: "Email", type: "email" },
    { id: "mobile", label: "Mobile", type: "text" },
  ];

  return (
    <div className="personal-info-section">
      <h2 className="user-info-h2">Personal Information</h2>

      {fields.map((field) => (
        <div className="input-container" key={field.id}>
          <label className="input-label" htmlFor={`personal_information.${field.id}`}>
            {field.label}
          </label>
          <Field
            type={field.type}
            id={`personal_information.${field.id}`}
            name={`personal_information.${field.id}`}
            className="input-field"
            onBlur={handleBlur}
            value={values.personal_information[field.id]} // Controlled value from Formik state
            onChange={field.id === "email" ? async (e) => {
              const { value } = e.target;
              setFieldValue("personal_information.email", value); // Manually set the email value in Formik state
              if (!value.trim()) {
                setEmailStatus(null); // Reset email status if input is empty
                return;
              }
              checkEmailAvailability(value); // Check email availability asynchronously
            } : undefined} // Only for email field, otherwise Formik handles it automatically
          />
          <ErrorMessage
            name={`personal_information.${field.id}`}
            component="div"
            className="error-message"
          />
          {field.id === "email" && emailStatus && !emailStatus.available && emailStatus.message && (
            <div style={{ color: "red", marginTop: "5px", fontSize: "14px" }}>
              {emailStatus.message}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PersonalInfoSection;
