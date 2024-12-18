import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";



// Yup Validation Schema
const portfolioSchema = Yup.object().shape({
  github: Yup.string()
    .url("Invalid Github URL format")
    .matches(
      /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/,
      "Enter a valid GitHub profile URL (e.g., https://github.com/username)"
    )
    // .required("GitHub link is required")
    ,
  linkedin: Yup.string()
    .url("Invalid Linkedin URL format")
    .matches(
      /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/,
      "Enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)"
    )
    // .required("LinkedIn link is required"),
    
  // other: Yup.string()
  //   .url("Invalid URL format")
  //   .nullable(),
});

const PortfolioSection = ({ formData, handleChange })=> {
  return (
    <div className="section">
      <h2 className="user-info-h2">Portfolio</h2>
      <Formik
        initialValues={{ github: "", linkedin: "", other: "" }}
        validationSchema={portfolioSchema}
        onSubmit={(values) => {
          console.log("Form Data Submitted:", values);
          onSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
             {/* LinkedIn Link */}
             <div className="input-container">
              <label htmlFor="linkedin" className="input-label">LinkedIn Link</label>
              <Field
                type="text"
                id="linkedin"
                name="linkedin"
                className={`input-field ${
                  errors.linkedin && touched.linkedin ? "input-error" : ""
                }`}
                value={formData.portfolio.linkedin_url}
        onChange={(e) => handleChange(e, "portfolio", "linkedin_url")}
                // placeholder="https://linkedin.com/in/username"
              />
              <ErrorMessage name="linkedin">
                {(msg) => <div className="error">{msg}</div>}
              </ErrorMessage>
            </div>

            {/* GitHub Link */}
            <div className="input-container">
              <label htmlFor="github" className="input-label">GitHub Link</label>
              <Field
                type="text"
                id="github"
                name="github"
                className={`input-field ${
                  errors.github && touched.github ? "input-error" : ""
                }`}

                value={formData.portfolio.github_url}
        onChange={(e) => handleChange(e, "portfolio", "github_url")}
                // placeholder="https://github.com/username"
              />
              <ErrorMessage name="github">
                {(msg) => <div className="error">{msg}</div>}
              </ErrorMessage>
            </div>

           
            {/* Other Link */}
            <div className="input-container">
              <label htmlFor="other" className="input-label">Other Link</label>
              <Field
                type="text"
                id="other"
                name="other"
                className="input-field"
                // placeholder="Optional"
                value={formData.portfolio.other_url}
        onChange={(e) => handleChange(e, "portfolio", "other_url")}
              />
              <ErrorMessage name="other">
                {(msg) => <div className="error">{msg}</div>}
              </ErrorMessage>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PortfolioSection;
