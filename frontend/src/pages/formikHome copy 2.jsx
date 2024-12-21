import React, { useState, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  personal_information: {
    full_name: "",
    email: "",
    mobile: "",
  },
};

const validationSchema = Yup.object({
  personal_information: Yup.object({
    full_name: Yup.string()
      .required("Full Name is required")
      .min(3, "Full Name must be at least 3 characters long"),
    email: Yup.string().email("Invalid email format"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^\+?\d+$/, "Mobile number is not valid"),
  }),
});

const MyForm = () => {
  const [fileName, setFileName] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setIsUploading(true); // Set uploading status to true

      const formData = new FormData();
      formData.append("resume_file", file);

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/resume-parse/",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsUploading(false);
          console.log("inside handleFileChange");

          let parsedData = {};

          try {
            let cleanedData = data.parsed_data.replace(/```json|```/g, "").trim();
            cleanedData = cleanedData.replace(/'/g, '"');
            console.log("Cleaned Parsed Data:", cleanedData);

            parsedData = JSON.parse(cleanedData);
            console.log("Parsed Data:", parsedData);

            // Call handleParsedData to update Formik values
            handleParsedData(parsedData, setFieldValue); 
          } catch (error) {
            console.error("Error parsing the parsed_data:", error);
            alert("Failed to parse the parsed resume data.");
          }
        } else {
          setIsUploading(false);
          alert("Failed to parse the resume. Please try again.");
        }
      } catch (error) {
        setIsUploading(false);
        console.error("Error uploading resume:", error);
        alert("An error occurred while uploading the resume.");
      }
    }
  };

  const handleParsedData = (parsedData, setFieldValue) => {
    try {
      console.log("++++ inside handleParsedData +++++");
      console.log("Parsed Data:", parsedData);

      // Ensure that 'personal_information' exists in parsedData
      if (parsedData && parsedData.personal_information) {
        const personalInfo = parsedData.personal_information;

        // Update personal information in Formik form
        setFieldValue("personal_information.full_name", personalInfo.full_name || "");
        setFieldValue("personal_information.email", personalInfo.email || "");
        setFieldValue("personal_information.mobile", personalInfo.mobile || "");
      } else {
        console.error("personal_information is missing in parsedData:", parsedData);
        alert("Required personal information is missing in the parsed data.");
        return;
      }

      // Log the updated Formik values
      console.log("Updated Formik values:", parsedData);

    } catch (error) {
      console.error("Error parsing the resume data:", error);
      alert("Failed to process the parsed resume data.");
    }
  };

  const handleSubmit = async (values) => {
    console.log("Submitted values:", JSON.stringify(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, handleBlur, isValid, dirty }) => (
        <Form>
          {/* Resume Upload Section */}
          <div className="section resume-upload">
            <div className="upload-box" onClick={handleUploadClick}>
              {fileName ? (
                <p className="uploaded-file">Uploaded File: {fileName}</p>
              ) : (
                <p className="upload-optional">(Optional)</p>
              )}
            </div>
            {isUploading && <p className="upload-status">Uploading...</p>}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".doc,.docx,.pdf,.odt,.rtf"
              onChange={(e) => handleFileChange(e, setFieldValue)}
            />
          </div>

          {/* Personal Information Section */}
          <div className="personal-info-section">
            <h2 className="user-info-h2">Personal Information</h2>

            <div className="input-container">
              <label className="input-label" htmlFor="personal_information.full_name">
                Full Name
              </label>
              <Field
                type="text"
                id="personal_information.full_name"
                name="personal_information.full_name"
                className="input-field"
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="personal_information.full_name"
                component="div"
                className="error-message"
              />
            </div>

            {/* Optional Email */}
            <div className="input-container">
              <label className="input-label" htmlFor="personal_information.email">
                Email
              </label>
              <Field
                type="email"
                id="personal_information.email"
                name="personal_information.email"
                className="input-field"
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="personal_information.email"
                component="div"
                className="error-message"
              />
            </div>

            {/* Optional Mobile */}
            <div className="input-container">
              <label className="input-label" htmlFor="personal_information.mobile">
                Mobile
              </label>
              <Field
                type="text"
                id="personal_information.mobile"
                name="personal_information.mobile"
                className="input-field"
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="personal_information.mobile"
                component="div"
                className="error-message"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-button"
            disabled={!isValid || !dirty}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
