import React from "react";
import { Field, ErrorMessage } from "formik";

const AddressInfoSection = ({ values }) => {
  const fields = [
    { id: "address", label: "Address" },
    { id: "city", label: "City" },
    { id: "state", label: "State" },
    { id: "zip_code", label: "Zip Code" },
    { id: "country", label: "Country" },
  ];

  return (
    <div className="address-info-section">
      <h2 className="user-info-h2">Address Information</h2>

      {fields.map((field) => (
        <div className="input-container" key={field.id}>
          <label
            className="input-label"
            htmlFor={`address_information.${field.id}`}
          >
            {field.label}
          </label>
          <Field
            type="text"
            id={`address_information.${field.id}`}
            name={`address_information.${field.id}`}
            className="input-field"
          />
          <ErrorMessage
            name={`address_information.${field.id}`}
            component="div"
            className="error-message"
          />
        </div>
      ))}
    </div>
  );
};

export default AddressInfoSection;
