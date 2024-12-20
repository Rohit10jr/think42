import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import api from "../services/api.jsx";
import { debounce, values } from "lodash";
import { useState } from "react";
import ResumeUpload from "../components/Home/upload.jsx";
import { useRef } from "react";


const initialValues = {
  personal_information: {
    full_name: "",
    email: "",
    mobile: "",
  }
 
};

const validationSchema = Yup.object({
  personal_information: Yup.object({
    full_name: Yup.string()
      .required("Full Name is required")
      .min(3, "Full Name must be at least 3 characters long"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  }),

});

const MyForm = () => {
    const [fileName, setFileName] = useState(null); 
    const [isUploading, setIsUploading] = useState(false); 
    const fileInputRef = useRef(null);
    const [emailStatus, setEmailStatus] = useState(null);

    const handleUploadClick = () => {
      fileInputRef.current.click(); 
    };
  
    const handleFileChange = async (event, setValues) => {
      const file = event.target.files[0];
      if (file) {
        setFileName(file.name);
        setIsUploading(true); // Set uploading status to true
  
        const formData = new FormData();
        formData.append("resume_file", file);
  
        try {
          const response = await fetch("http://127.0.0.1:8000/api/resume-parse/", {
            method: "POST",
            body: formData,
          });
  
          if (response.ok) {
            const parsedData = await response.json();
            setIsUploading(false);
            console.log("inside handleFileChange")
            console.log(parsedData.parsed_data)
            // console.log("inside handleFileChange")
            handleParsedData(parsedData.parsed_data, setValues); // Pass parsed data to the parent
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
  // Handle parsed data and update Formik form
  const handleParsedData = (parsedData,  setValues) => {
    try {
      console.log("++++ inside handleParsedData +++++");
      console.log("Parsed Data:", parsedData);
  
      // Update Formik values dynamically using setValues
      setValues((prevValues) => {
        const updatedValues = { ...prevValues };
  
        // Merge parsed personal information
        if (parsedData.personal_information) {
          updatedValues.personal_information = {
            ...prevValues.personal_information,
            ...parsedData.personal_information,
          };
        }

        // Log the updated values before returning them
        console.log("Updated Formik values:", updatedValues);
  
        return updatedValues;
      });
    } catch (error) {
      console.error("Error parsing the resume data:", error);
      alert("Failed to process the parsed resume data.");
    }
  };

  const handleSubmit = async (values) => {
    // e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access_token");
      console.log(accessToken);
      console.log(JSON.stringify(values));
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred while submitting data.");
    }
  };

  return (
    <>

<div className="section resume-upload">
      <div className="resume-header">
        <h2>Autofill Application</h2>
        <p className="upload-description">
          Upload your resume/CV in seconds with the autofill option.
        </p>
      </div>
      <div className="upload-box" onClick={handleUploadClick}>
        <p className="upload-text">
          <span className="upload-link">Upload your resume</span> or drag and drop it here
        </p>
        {fileName ? (
          <p className="uploaded-file">Uploaded File: {fileName}</p>
        ) : (
          <>
            <p className="upload-filetypes">Only .doc, .docx, .pdf, .odt, .rtf</p>
            <p className="upload-optional">(Optional)</p>
          </>
        )}
      </div>
      {isUploading && <p className="upload-status">Uploading...</p>}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".doc,.docx,.pdf,.odt,.rtf"
        onChange={handleFileChange}
      />
    </div>

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, handleBlur, isValid, dirty }) => (
        <Form>
          {/* Personal Information Section */}
          <div className="personal-info-section">
            <h2 className="user-info-h2">Personal Information</h2>

            <div className="input-container">
              <label
                className="input-label"
                htmlFor="personal_information.full_name"
              >
                Full Name
              </label>
              <Field
                type="text"
                id="personal_information.full_name"
                name="personal_information.full_name"
                className="input-field"
                onBlur={handleBlur}
                // placeholder="Full Name"
              />
              <ErrorMessage
                name="personal_information.full_name"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input-container">
              <label
                className="input-label"
                htmlFor="personal_information.email"
              >
                Email
              </label>
              <Field
                type="email"
                id="personal_information.email"
                name="personal_information.email"
                className="input-field"
                // placeholder="Email/"
                onChange={async (e) => {
                  const { value } = e.target;
                  setFieldValue("personal_information.email", value); // Update Formik state for email
                }}
                onBlur={handleBlur}
                value={values.personal_information.email}
              />
              <ErrorMessage
                name="personal_information.email"
                component="div"
                className="error-message"
              />
              {emailStatus && !emailStatus.available && emailStatus.message && (
                <div
                  style={{
                    color: "red",
                    marginTop: "5px",
                    fontSize: "14px",
                  }}
                >
                  {emailStatus.message}
                </div>
              )}
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
    </>
  );
};
export default MyForm;
