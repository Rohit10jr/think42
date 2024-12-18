import React from "react";
import InputField from "./input.jsx";

const AddressInformationSection = ({ formData, handleChange }) => {
  return (
    <div className="section">
      <h2 className="user-info-h2">Address Information</h2>
      <InputField
        id="address"
        label="Address"
        type="text"
        value={formData.address_information.address}
        onChange={(e) => handleChange(e, "address_information", "address")}
      />
      <InputField
        id="city"
        label="City"
        type="text"
        value={formData.address_information.city}
        onChange={(e) => handleChange(e, "address_information", "city")}
      />
      <InputField
        id="state"
        label="State"
        type="text"
        value={formData.address_information.state}
        onChange={(e) => handleChange(e, "address_information", "state")}
      />
      <InputField
        id="zip_code"
        label="Zip Code"
        type="text"
        value={formData.address_information.zip_code}
        onChange={(e) => handleChange(e, "address_information", "zip_code")}
      />
      <InputField
        id="country"
        label="Country"
        type="text"
        value={formData.address_information.country}
        onChange={(e) => handleChange(e, "address_information", "country")}
      />
    </div>
  );
};

export default AddressInformationSection;
