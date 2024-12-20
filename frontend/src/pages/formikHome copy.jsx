import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

const initialValues = {
  personal_information: {
    full_name: "",
    email: "",
    mobile: "",
  },
  address_information: {
    address: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
  },
  work_experience: [
    {
      job_title: "",
      company_name: "",
      start_date: "",
      end_date: "",
      responsibilities: "",
    },
  ],
  educational_background: [
    {
      degree: "",
      institution: "",
      field_of_study: "",
      graduation_year: "",
      gpa: "",
    },
  ],

  skill_set: {
    skills: [],
  },
  portfolio: {
    linkedin: "",
    github: "",
    other: "",
  },
};

const validationSchema = Yup.object({
  personal_information: Yup.object({
    full_name: Yup.string()
      .required("Full Name is required")
      .min(3, "Full Name must be at least 3 characters long"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
  }),

  address_information: Yup.object({
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip_code: Yup.string()
      .matches(/^[0-9]{5}$/, "Zip code must be digits")
      .required("Zip code is required"),
    country: Yup.string().required("Country is required"),
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

  work_experience: Yup.array().of(
    Yup.object({
      job_title: Yup.string().required("Job title is required"),
      company_name: Yup.string().required("Company name is required"),
      start_date: Yup.date()
        .required("Start date is required")
        .max(new Date(), "Start date cannot be in the future")
        .typeError("Invalid start date format (use YYYY-MM-DD)"),
      end_date: Yup.date()
        .nullable()
        .max(new Date(), "End date cannot be in the future")
        .typeError("Invalid end date format (use YYYY-MM-DD)"),

      responsibilities: Yup.string().required("Responsibilities are required"),
    })
  ),

  educational_background: Yup.array().of(
    Yup.object({
      degree: Yup.string().required("Degree is required"),
      institution: Yup.string().required("Institution is required"),
      field_of_study: Yup.string().required("Field of study is required"),
      graduation_year: Yup.number()
        .integer("Graduation year must be an integer")
        .min(1900, "Graduation year must be after 1900")
        .max(
          new Date().getFullYear(),
          "Graduation year cannot be in the future"
        )
        .required("Graduation year is required"),
      gpa: Yup.number()
        .min(0, "GPA must be greater than or equal to 0")
        .max(4, "GPA cannot be greater than 4")
        .required("GPA is required"),
    })
  ),

  skill_set: Yup.object({
    skills: Yup.array()
    .min(1, "At least one skill is required")
    .required("Skills is required")
  }),
  // portfolio: Yup.array().of(
  //   Yup.object({
  //     linkedin: Yup.string()
  //     .required("LinkedIn URL is required"),
  //       // .url("Invalid URL format")
  //       // .matches(
  //       //   /^https:\/\/(www\.)?linkedin\.com\/.*$/,
  //       //   "Invalid LinkedIn URL"
  //       // )
  //       github: Yup.string()
  //       .required("GitHub URL is required"),
  //       // .url("Invalid URL format")
  //       // .matches(/^https:\/\/github\.com\/.*$/, "Invalid GitHub URL")
  //   })
  // ),
});

const MyForm = () => {
  const handleSubmit = async (values) => {
    try {
      console.log("try");
    } catch (error) {
      console.log("error");
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
              />
              <ErrorMessage
                name="personal_information.email"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input-container">
              <label
                className="input-label"
                htmlFor="personal_information.mobile"
              >
                Mobile
              </label>
              <Field
                type="text"
                id="personal_information.mobile"
                name="personal_information.mobile"
                className="input-field"
                // placeholder="Mobile"
              />
              <ErrorMessage
                name="personal_information.mobile"
                component="div"
                className="error-message"
              />
            </div>
          </div>
          {/* Address Information Section */}
          <div className="address-info-section">
            <h2 className="user-info-h2">Address Information</h2>

            <div className="input-container">
              <label
                className="input-label"
                htmlFor="address_information.address"
              >
                Address
              </label>
              <Field
                type="text"
                id="address_information.address"
                name="address_information.address"
                className="input-field"
                // placeholder="Address"
              />
              <ErrorMessage
                name="address_information.address"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input-container">
              <label className="input-label" htmlFor="address_information.city">
                City
              </label>
              <Field
                type="text"
                id="address_information.city"
                name="address_information.city"
                className="input-field"
                // placeholder="City"
              />
              <ErrorMessage
                name="address_information.city"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input-container">
              <label
                className="input-label"
                htmlFor="address_information.state"
              >
                State
              </label>
              <Field
                type="text"
                id="address_information.state"
                name="address_information.state"
                className="input-field"
                // placeholder="State"
              />
              <ErrorMessage
                name="address_information.state"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input-container">
              <label
                className="input-label"
                htmlFor="address_information.zip_code"
              >
                Zip Code
              </label>
              <Field
                type="text"
                id="address_information.zip_code"
                name="address_information.zip_code"
                className="input-field"
                // placeholder="Zip Code"
              />
              <ErrorMessage
                name="address_information.zip_code"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input-container">
              <label
                className="input-label"
                htmlFor="address_information.country"
              >
                Country
              </label>
              <Field
                type="text"
                id="address_information.country"
                name="address_information.country"
                className="input-field"
                // placeholder="Country"
              />
              <ErrorMessage
                name="address_information.country"
                component="div"
                className="error-message"
              />
            </div>
          </div>

          {/* Work Experience Section */}
          <FieldArray
            name="work_experience"
            render={(arrayHelpers) => (
              <div className="work-section">
                <h2 className="user-info-h2">Work Experience</h2>

                {/* Dynamically render each work experience entry with count */}
                {values.work_experience.map((_, index) => (
                  <div key={index} className="work-entry">
                    {/* Display Work Experience Count */}
                    <h5>Experience {index + 1}</h5>

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
                        // placeholder="company name"
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
                    {values.work_experience.length > 1 &&
                      index === values.work_experience.length - 1 && (
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // Remove work experience section
                          className="remove-button"
                        >
                          Remove Work Experience
                        </button>
                      )}
                  </div>
                ))}

                {/* Add New Work Experience Button, only show at the bottom */}
                <button
                  type="button"
                  onClick={
                    () =>
                      arrayHelpers.push({ job_title: "", responsibilities: "" }) // Add new empty work experience entry
                  }
                  className="add-button"
                >
                  Add Work Experience
                </button>
              </div>
            )}
          />

          {/* Education Section */}
          <FieldArray
            name="educational_background"
            render={(arrayHelpers) => (
              <div className="educational_background">
                <h2 className="user-info-h2">Education Background</h2>

                {/* Dynamically render each work experience entry with count */}
                {values.educational_background.map((_, index) => (
                  <div key={index} className="education-entry">
                    {/* Display Work Experience Count */}
                    <h5>Experience {index + 1}</h5>

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
                        placeholder="Gpa"
                      />
                      <ErrorMessage
                        name={`educational_background.${index}.gpa`}
                        component="div"
                        className="error-message"
                      />
                    </div>

                    {/* Show Remove Button only for the last entry */}
                    {values.educational_background.length > 1 &&
                      index === values.educational_background.length - 1 && (
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // Remove work experience section
                          className="remove-button"
                        >
                          Remove education
                        </button>
                      )}
                  </div>
                ))}

                {/* Add New Work Experience Button, only show at the bottom */}
                <button
                  type="button"
                  onClick={
                    () => arrayHelpers.push({ degree: "", gpa: "" }) // Add new empty work experience entry
                  }
                  className="add-button"
                >
                  Add Education
                </button>
              </div>
            )}
          />

          {/* Skills Input */}
          <div className="skill_section">
            <h2 className="user-info-h2">Skill Set</h2>

            <div className="input-container">
              <label className="input-label" htmlFor="skill_set">
                Skills
              </label>
              <Field
                as="textarea"
                id="skill_set.skills"
                name="skill_set.skills"
                className="input-field"
                rows="4"
                placeholder="Enter skills separated by commas"
                value={values.skill_set.skills.join(", ")} // Display skills as comma-separated values
                onChange={(e) =>
                  setFieldValue(
                    "skill_set.skills",
                    e.target.value.split(",").map((item) => item.trim())
                  )
                }
              />
              {/* <ErrorMessage 
              name="skill_set.skills" className="error-message" 
              component="div"
              /> */}

              <ErrorMessage
                name="skill_set.skills" 
                component="div"
                className="error-message"
              />
              
            </div>
          </div>

          {/* portfolio Section */}
          <div className="portfolio">
            <h2 className="user-info-h2">Portfolio</h2>

            <div className="input-container">
              <label className="input-label" htmlFor="portfolio.linkedin">
                Likedin
              </label>
              <Field
                type="text"
                id="portfolio.linkedin"
                name="portfolio.linkedin"
                className="input-field"
                // placeholder="State"
              />
              <ErrorMessage
                name="portfolio.linkedin"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input-container">
              <label className="input-label" htmlFor="portfolio.github">
                Github
              </label>
              <Field
                type="text"
                id="portfolio.github"
                name="portfolio.github"
                className="input-field"
                // placeholder="Zip Code"
              />
              <ErrorMessage
                name="portfolio.github"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input-container">
                                  <label
                                    className="input-label"
                                    htmlFor="portfolio.other"
                                  >
                                    Other Link
                                  </label>
                                  <Field
                                    type="text"
                                    id="portfolio.other"
                                    name="portfolio.other"
                                    className="input-field"
                                    // placeholder="Country"
                                  />
                                  <ErrorMessage
                                    name="portfolio.other"
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
