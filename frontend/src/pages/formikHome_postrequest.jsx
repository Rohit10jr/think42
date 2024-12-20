import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios"; // If you're using axios

const initialValues = {
  skill_set: {
    skills: [],
  },
  portfolio: {
    linkedin: "",
    github: "",
  },
};

const validationSchema = Yup.object({
  skill_set: Yup.object({
    skills: Yup.array().min(1, "At least one skill is required"),
  }),
  portfolio: Yup.object({
    linkedin: Yup.string()
      .url("Invalid URL format")
      .matches(/^https:\/\/(www\.)?linkedin\.com\/.*$/, "Invalid LinkedIn URL")
      .required("LinkedIn URL is required"),
    github: Yup.string()
      .url("Invalid URL format")
      .matches(/^https:\/\/github\.com\/.*$/, "Invalid GitHub URL")
      .required("GitHub URL is required"),
  }),
});

const MyForm = () => {
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/user/details",
        values
      );

      console.log("Form submitted successfully:", response.data);
      // Optionally, handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error("Error submitting form:", error.response || error);
      // Optionally, handle error (e.g., show error message)
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isValid, dirty }) => (
        <Form>
          {/* Skills Input */}
          <div>
            <label htmlFor="skill_set.skills">Skills</label>
            <Field
              as="textarea"
              name="skill_set.skills"
              placeholder="Enter your skills, separated by commas"
              rows="5"
              value={values.skill_set.skills.join(", ")} // Display skills as comma-separated values
              onChange={(e) =>
                setFieldValue(
                  "skill_set.skills",
                  e.target.value.split(",").map((item) => item.trim())
                )
              }
            />
            <ErrorMessage name="skill_set.skills" component="div" />
          </div>

          {/* LinkedIn Input */}
          <div>
            <label htmlFor="portfolio.linkedin">LinkedIn</label>
            <Field
              type="url"
              name="portfolio.linkedin"
              placeholder="https://www.linkedin.com/in/your-profile"
            />
            <ErrorMessage name="portfolio.linkedin" component="div" />
          </div>

          {/* GitHub Input */}
          <div>
            <label htmlFor="portfolio.github">GitHub</label>
            <Field
              type="url"
              name="portfolio.github"
              placeholder="https://github.com/your-username"
            />
            <ErrorMessage name="portfolio.github" component="div" />
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={!isValid || !dirty}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
