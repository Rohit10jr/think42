import React from "react";
import InputField from "./input.jsx";

const PersonalInformationSection = ({ formData, handleChange, emailStatus  }) => {
  return (
    <div className="section">
      <h2 className="user-info-h2">Personal Information</h2>
      <InputField
        id="full-name"
        label="Full Name"
        type="text"
        value={formData.personal_information.full_name}
        onChange={(e) => handleChange(e, "personal_information", "full_name")}
        required={true}
      />
      <InputField
        id="email"
        label="Email"
        type="email"
        value={formData.personal_information.email}
        onChange={(e) => handleChange(e, "personal_information", "email")}
        required={true}
      />

      {/* Render the message below the email input */}
      {emailStatus && !emailStatus.available && emailStatus.message && (
        <div
          style={{
            color:  "red", 
            marginTop: "5px",
            fontSize: "14px",
          }}
        >
          {emailStatus.message}
        </div>
      )}


      <InputField
        id="mobile"
        label="Mobile"
        type="text"
        value={formData.personal_information.mobile}
        onChange={(e) => handleChange(e, "personal_information", "mobile")}
        required={true}
      />
    </div>
  );
};

export default PersonalInformationSection;
