import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../services/api.jsx";


const FileUploadForm = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    resume: Yup.mixed().required("Resume file is required."),
  });

  // Initial form values
  const initialValues = {
    resume: null,
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      
      formData.append("resume", values.resume);
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
        if (pair[1] instanceof File) {
          console.log(`File name: ${pair[1].name}`);
          console.log(`File type: ${pair[1].type}`);
        }
      }

      const response = await api.post("http://127.0.0.1:8000/api/user/test-upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      alert("File uploaded successfully!");
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="upload-form-container">
      <h2>Upload Your Resume</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="upload-form">
            {/* Resume File Input */}
            <div className="form-group">
              <label htmlFor="resume">Resume</label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={(event) => {
                  setFieldValue("resume", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage
                name="resume"
                component="div"
                className="error-message"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Uploading..." : "Upload"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FileUploadForm;
