import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import api from "../services/api.jsx";

// Validation Schema for Formik
const validationSchema = Yup.object({
  portfolio_links: Yup.object({
    linkedin_url: Yup.string()
      .url("Invalid URL format")
      .required("LinkedIn URL is required"),
  }),
  resume: Yup.mixed().required("Resume file is required"),
});

// Initial Values
const initialValues = {
  portfolio_links: {
    linkedin_url: "",
  },
  resume: null, // File input
};

const UserTestForm = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {

    const formData = new FormData();

    formData.append("portfolio_links", JSON.stringify(values.portfolio_links));

    // formData.append("portfolio_links", JSON.stringify(values.portfolio_links)); // Stringify nested JSON

    if (values.resume) {
      formData.append("resume", values.resume);
    }


    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
  
      if (pair[0] === "portfolio_links") {
        console.log("Parsed JSON:", JSON.parse(pair[1]));
      }
      if (pair[1] instanceof File) {
        console.log(`File name: ${pair[1].name}`);
        console.log(`File type: ${pair[1].type}`);
        console.log(`File size: ${pair[1].size} bytes`);
      }
    }
    // if (values.resume) {
    //   formData.append("resume", values.resume); // File upload
    // }

    try {
        const response = await api.post(
            "http://127.0.0.1:8000/api/user/test-json/",
             formData ,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
    
      console.log(response.data);
      alert("User details saved successfully!");
      resetForm();
    } catch (error) {
      console.error("Error saving user details:", error.response);
      alert("Error saving user details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="portfolio_links.linkedin_url">
              LinkedIn URL:
            </label>
            <Field
              type="url"
              id="portfolio_links.linkedin_url"
              name="portfolio_links.linkedin_url"
              placeholder="Enter your LinkedIn profile URL"
            />
            <ErrorMessage
              name="portfolio_links.linkedin_url"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label htmlFor="resume">Resume (PDF):</label>
            <input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(event) =>{
                setFieldValue("resume", event.currentTarget.files[0])
              }}
            />
            <ErrorMessage name="resume" component="div" className="error" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UserTestForm;
