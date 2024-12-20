import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

const initialValues = {
  portfolio: [
    {
      linkedin: "",
      github: "",
    },
  ],
};

const validationSchema = Yup.object({
  portfolio: Yup.array().of(
    Yup.object({
      linkedin: Yup.string()
        .url("Invalid URL format")
        .matches(
          /^https:\/\/(www\.)?linkedin\.com\/.*$/,
          "Invalid LinkedIn URL"
        )
        .required("LinkedIn URL is required"),
      github: Yup.string()
        .url("Invalid URL format")
        .matches(/^https:\/\/github\.com\/.*$/, "Invalid GitHub URL")
        .required("GitHub URL is required"),
    })
  ),
});

const MyForm = () => {
  const handleSubmit = (values) => {
    // Log the updated nested JSON to the console when the form is submitted
    console.log(JSON.stringify(values, null, 2));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isValid, dirty }) => (
        <Form>
          <FieldArray name="portfolio">
            {({ push, remove }) => (
              <div>
                {/* Dynamically render each portfolio section */}
                {values.portfolio.map((portfolio, index) => (
                  <div key={index} style={{ marginBottom: "20px" }}>
                    {/* Portfolio section number */}
                    <h3>Portfolio {index + 1}</h3>

                    {/* LinkedIn Input */}
                    <div>
                      <label htmlFor={`portfolio.${index}.linkedin`}>LinkedIn</label>
                      <Field
                        type="url"
                        name={`portfolio.${index}.linkedin`}
                        placeholder="https://www.linkedin.com/in/your-profile"
                      />
                      <ErrorMessage name={`portfolio.${index}.linkedin`} component="div" />
                    </div>

                    {/* GitHub Input */}
                    <div>
                      <label htmlFor={`portfolio.${index}.github`}>GitHub</label>
                      <Field
                        type="url"
                        name={`portfolio.${index}.github`}
                        placeholder="https://github.com/your-username"
                      />
                      <ErrorMessage name={`portfolio.${index}.github`} component="div" />
                    </div>

                    {/* Show Remove Button only for the last section */}
                    {values.portfolio.length > 1 && index === values.portfolio.length - 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        style={{ marginTop: "10px" }}
                      >
                        Remove Section
                      </button>
                    )}
                  </div>
                ))}

                {/* Show Add Button only at the end */}
                <button
                  type="button"
                  onClick={() =>
                    push({
                      linkedin: "",
                      github: "",
                    })
                  }
                  style={{ marginTop: "20px" }}
                >
                  Add Another Portfolio Section
                </button>
              </div>
            )}
          </FieldArray>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || !dirty}
            style={{ marginTop: "20px" }}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default MyForm;
