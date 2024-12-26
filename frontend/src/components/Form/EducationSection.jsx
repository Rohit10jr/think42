import React from "react";
import { Field, ErrorMessage, FieldArray } from "formik";

const EducationBackgroundSection = ({ values }) => {
  return (
    <FieldArray
      name="educational_background"
      render={(arrayHelpers) => (
        <div className="educational_background">
          <h2 className="user-info-h2">Education Background</h2>

          {/* Dynamically render each education entry */}
          {values.educational_background.map((_, index) => (
            <div key={index} className="education-entry">
              {/* Display Education Count */}
              <h5>Education {index + 1}</h5>

              <div className="input-container">
                <label
                  className="input-label"
                  htmlFor={`educational_background.${index}.degree`}
                >
                  Degree
                </label>
                <Field
                  type="text"
                  id={`educational_background.${index}.degree`}
                  name={`educational_background.${index}.degree`}
                  className="input-field"
                  placeholder="Degree"
                />
                <ErrorMessage
                  name={`educational_background.${index}.degree`}
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="input-container">
                <label
                  className="input-label"
                  htmlFor={`educational_background.${index}.institution`}
                >
                  Institution
                </label>
                <Field
                  type="text"
                  id={`educational_background.${index}.institution`}
                  name={`educational_background.${index}.institution`}
                  className="input-field"
                  placeholder="Institution"
                />
                <ErrorMessage
                  name={`educational_background.${index}.institution`}
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="input-container">
                <label
                  className="input-label"
                  htmlFor={`educational_background.${index}.field_of_study`}
                >
                  Field of Study
                </label>
                <Field
                  type="text"
                  id={`educational_background.${index}.field_of_study`}
                  name={`educational_background.${index}.field_of_study`}
                  className="input-field"
                  placeholder="Field of Study"
                />
                <ErrorMessage
                  name={`educational_background.${index}.field_of_study`}
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="input-container">
                <label
                  className="input-label"
                  htmlFor={`educational_background.${index}.graduation_year`}
                >
                  Graduation Year
                </label>
                <Field
                  type="text"
                  id={`educational_background.${index}.graduation_year`}
                  name={`educational_background.${index}.graduation_year`}
                  className="input-field"
                  placeholder="YYYY"
                />
                <ErrorMessage
                  name={`educational_background.${index}.graduation_year`}
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="input-container">
                <label
                  className="input-label"
                  htmlFor={`educational_background.${index}.gpa`}
                >
                  GPA
                </label>
                <Field
                  type="text"
                  id={`educational_background.${index}.gpa`}
                  name={`educational_background.${index}.gpa`}
                  className="input-field"
                  placeholder="GPA"
                />
                <ErrorMessage
                  name={`educational_background.${index}.gpa`}
                  component="div"
                  className="error-message"
                />
              </div>

              {/* Show Remove Button only for the last entry */}
              {values.educational_background.length > 1 && index === values.educational_background.length - 1 && (
                <button
                  type="button"
                  onClick={() => arrayHelpers.remove(index)} // Remove education section
                  className="formik-remove-button"
                >
                  Remove Education
                </button>
              )}

              {/* Add New Education Button, only show at the bottom */}
              {index === values.educational_background.length - 1 && (
                <button
                  type="button"
                  onClick={() =>
                    arrayHelpers.push({
                      degree: "",
                      gpa: "",
                    }) // Add new empty education entry
                  }
                  className="formik-add-button"
                >
                  Add Education
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    />
  );
};

export default EducationBackgroundSection;