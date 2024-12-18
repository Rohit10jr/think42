import React from "react";

const PersonalInformationForm = ({ formData, handleChange, emailStatus }) => {
  return (
    <div className="section">
      <h2 className="user-info-h2">Personal Information</h2>
      
      <div className="input-container">
        <label className="input-label" htmlFor="full-name">
          Full Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="full-name"
          className="input-field"
          value={formData.personal_information.full_name}
          onChange={(e) => handleChange(e, "personal_information", "full_name")}
        />
      </div>

      <div className="input-container">
        <label className="input-label" htmlFor="email">
          Email <span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          className="input-field"
          value={formData.personal_information.email}
          onChange={(e) => handleChange(e, "personal_information", "email")}
        />
        {emailStatus && (
          <div className={`email-status ${emailStatus.available ? 'available' : 'unavailable'}`}>
            {emailStatus.message}
          </div>
        )}
      </div>

      <div className="input-container">
        <label className="input-label" htmlFor="mobile">
          Mobile <span className="required">*</span>
        </label>
        <input
          type="text"
          id="mobile"
          className="input-field"
          value={formData.personal_information.mobile}
          onChange={(e) => handleChange(e, "personal_information", "mobile")}
        />
      </div>
    </div>
  );
};

export default PersonalInformationForm;
