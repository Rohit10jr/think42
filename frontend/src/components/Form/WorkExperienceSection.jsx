import React from "react";
import { Field, ErrorMessage, FieldArray } from "formik";

const WorkExperienceSection = ({ values }) => {
  return (
    <FieldArray
      name="work_experience"
      render={(arrayHelpers) => (
        <div className="work-section">
          <h2 className="user-info-h2">Work Experience</h2>

          {/* Dynamically render each work experience entry */}
          {values.work_experience.map((_, index) => (
            <div key={index} className="work-entry">
              {/* Display Work Experience Count */}
              <h5 className="dynamic-section-title">
                Experience {index + 1}
              </h5>

              <div className="input-container">
                <label
                  className="input-label"
                  htmlFor={`work_experience.${index}.job_title`}
                >
                  Job Title
                </label>
                <Field
                  type="text"
                  id={`work_experience.${index}.job_title`}
                  name={`work_experience.${index}.job_title`}
                  className="input-field"
                  placeholder="Job title"
                />
                <ErrorMessage
                  name={`work_experience.${index}.job_title`}
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="input-container">
                <label
                  className="input-label"
                  htmlFor={`work_experience.${index}.company_name`}
                >
                  Company Name
                </label>
                <Field
                  type="text"
                  id={`work_experience.${index}.company_name`}
                  name={`work_experience.${index}.company_name`}
                  className="input-field"
                />
                <ErrorMessage
                  name={`work_experience.${index}.company_name`}
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="input-container">
                <label
                  className="input-label"
                  htmlFor={`work_experience.${index}.start_date`}
                >
                  Start Date
                </label>
                <Field
                  type="text"
                  id={`work_experience.${index}.start_date`}
                  name={`work_experience.${index}.start_date`}
                  className="input-field"
                  placeholder="YYYY-MM-DD"
                />
                <ErrorMessage
                  name={`work_experience.${index}.start_date`}
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="input-container">
                <label
                  className="input-label"
                  htmlFor={`work_experience.${index}.end_date`}
                >
                  End Date
                </label>
                <Field
                  type="text"
                  id={`work_experience.${index}.end_date`}
                  name={`work_experience.${index}.end_date`}
                  className="input-field"
                  placeholder="YYYY-MM-DD"
                />
                <ErrorMessage
                  name={`work_experience.${index}.end_date`}
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="input-container">
                <label
                  className="input-label"
                  htmlFor={`work_experience.${index}.responsibilities`}
                >
                  Responsibilities
                </label>
                <Field
                  type="text"
                  id={`work_experience.${index}.responsibilities`}
                  name={`work_experience.${index}.responsibilities`}
                  className="input-field"
                  placeholder="Responsibilities"
                />
                <ErrorMessage
                  name={`work_experience.${index}.responsibilities`}
                  component="div"
                  className="error-message"
                />
              </div>

              {/* Show Remove Button only for the last entry */}
              {values.work_experience.length > 1 && index === values.work_experience.length - 1 && (
                <button
                  type="button"
                  onClick={() => arrayHelpers.remove(index)} // Remove work experience section
                  className="formik-remove-button"
                >
                  Remove Work Experience
                </button>
              )}

              {/* Add New Work Experience Button, only show at the bottom */}
              {index === values.work_experience.length - 1 && (
                <button
                  type="button"
                  onClick={() =>
                    arrayHelpers.push({
                      job_title: "",
                      responsibilities: "",
                    }) // Add new empty work experience entry
                  }
                  className="formik-add-button"
                >
                  Add Work Experience
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    />
  );
};

export default WorkExperienceSection;
