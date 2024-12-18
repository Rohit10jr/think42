import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Yup Validation Schema
const portfolioSchema = Yup.object().shape({
  portfolio: Yup.object().shape({
    linkedin_url: Yup.string()
      .url("Invalid LinkedIn URL format")
      .matches(
        /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/,
        "Enter a valid LinkedIn URL"
      ),
    github_url: Yup.string()
      .url("Invalid GitHub URL format")
      .matches(
        /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/,
        "Enter a valid GitHub URL"
      ),
    other_url: Yup.string().url("Invalid URL format").nullable(),
  }),
});

const PortfolioSection = ({ formData, handleChange, onSubmit }) => {
  return (
    <div className="section">
      <h2 className="user-info-h2">Portfolio</h2>
      <Formik
        initialValues={{
          portfolio: {
            linkedin_url: formData.portfolio.linkedin_url || "",
            github_url: formData.portfolio.github_url || "",
            other_url: formData.portfolio.other_url || "",
          },
        }}
        validationSchema={portfolioSchema}
        enableReinitialize={true} // Ensures the initialValues are updated if the parent state changes
        onSubmit={(values) => {
          console.log("Form Data Submitted:", values);
          if (typeof onSubmit === "function") {
            onSubmit(values); // Send the form values to the backend
          }
        }}
      >
        {({ values, setFieldValue, handleChange, errors, touched }) => {
          // Sync changes from Formik back to the parent state
          useEffect(() => {
            handleChange({
              target: {
                name: "portfolio.linkedin_url",
                value: values.portfolio.linkedin_url,
              },
            });
            handleChange({
              target: {
                name: "portfolio.github_url",
                value: values.portfolio.github_url,
              },
            });
            handleChange({
              target: {
                name: "portfolio.other_url",
                value: values.portfolio.other_url,
              },
            });
          }, [values, handleChange]);

          return (
            <Form>
              {/* LinkedIn Link */}
              <div className="input-container">
                <label htmlFor="linkedin_url">LinkedIn Link</label>
                <Field
                  type="text"
                  id="linkedin_url"
                  name="portfolio.linkedin_url"
                  className={`input-field ${
                    errors.linkedin_url && touched.linkedin_url ? "input-error" : ""
                  }`}
                />
                <ErrorMessage name="portfolio.linkedin_url">
                  {(msg) => <div className="error">{msg}</div>}
                </ErrorMessage>
              </div>

              {/* GitHub Link */}
              <div className="input-container">
                <label htmlFor="github_url">GitHub Link</label>
                <Field
                  type="text"
                  id="github_url"
                  name="portfolio.github_url"
                  className={`input-field ${
                    errors.github_url && touched.github_url ? "input-error" : ""
                  }`}
                />
                <ErrorMessage name="portfolio.github_url">
                  {(msg) => <div className="error">{msg}</div>}
                </ErrorMessage>
              </div>

              {/* Other Link */}
              <div className="input-container">
                <label htmlFor="other_url">Other Link</label>
                <Field
                  type="text"
                  id="other_url"
                  name="portfolio.other_url"
                  className={`input-field ${
                    errors.other_url && touched.other_url ? "input-error" : ""
                  }`}
                />
                <ErrorMessage name="portfolio.other_url">
                  {(msg) => <div className="error">{msg}</div>}
                </ErrorMessage>
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PortfolioSection;
