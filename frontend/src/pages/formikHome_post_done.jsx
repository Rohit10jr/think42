import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import api from "../services/api.jsx";
import { debounce } from "lodash";
import { useState } from "react";
import ResumeUpload from "../components/Home/upload.jsx";
import { useRef } from "react";


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
    skills: [""],
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
      // .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
  }),

  address_information: Yup.object({
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip_code: Yup.string()
      // .matches(/^[0-9]{6}$/, "Zip code must be digits")
      .required("Zip code is required"),
    country: Yup.string().required("Country is required"),
  }),

  work_experience: Yup.array().of(
    Yup.object({
      job_title: Yup.string().required("Job title is required"),
      company_name: Yup.string().required("Company name is required"),
      start_date: Yup.date()
        // .required("Start date is required")
        // .max(new Date(), "Start date cannot be in the future")
        .typeError("Invalid start date format (use YYYY-MM-DD)"),
      end_date: Yup.date()
        // .nullable()
        // .max(new Date(), "End date cannot be in the future")
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
        // .min(1900, "Graduation year must be after 1900")
        // .max(qd
        //   new Date().getFullYear(),
        //   "Graduation year cannot be in the future"
        // )
        .required("Graduation year is required"),
      gpa: Yup.number()
        // .min(0, "GPA must be greater than or equal to 0")
        // .max(4, "GPA cannot be greater than 4")
        .required("GPA is required"),
    })
  ),

  skill_set: Yup.object({
    skills: Yup.array()
      .min(1, "At least one skill is required")
      .required("Skills is required"),
  }),

  portfolio: Yup.object({
    linkedin: Yup.string()
      // .url("Invalid URL format")
      // .matches(/^https:\/\/(www\.)?linkedin\.com\/.*$/, "Invalid LinkedIn URL")
      .required("LinkedIn URL is required"),
    github: Yup.string()
      // .url("Invalid URL format")
      // .matches(/^https:\/\/github\.com\/.*$/, "Invalid GitHub URL")
      .required("GitHub URL is required"),
  }),
});

const MyForm = () => {
    const [fileName, setFileName] = useState(null); // State to store the uploaded file name
    const [isUploading, setIsUploading] = useState(false); // State for upload status
    const fileInputRef = useRef(null);
  
    const [emailStatus, setEmailStatus] = useState(null);

    const handleUploadClick = () => {
      fileInputRef.current.click(); // Trigger file input
    };
  
    const handleFileChange = async (event) => {
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
            handleParsedData(parsedData.parsed_data); // Pass parsed data to the parent
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




  const handleParsedData = (parsedDataString, setValues) => {
    try {
      // Parse the stringified JSON (removing backticks)
      console.log("+++++++++ parsed data ++++++++")
      const parsedData = JSON.parse(
        parsedDataString.replace(/```json|```/g, "").trim()
      );


      console.log(parsedData)

      console.log("prevValues")
      // console.log(values)
  
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
  
        // Merge parsed address information
        if (parsedData.address_information) {
          updatedValues.address_information = {
            ...prevValues.address_information,
            ...parsedData.address_information,
          };
        }
  
        // Merge parsed educational background
        if (parsedData.educational_background) {
          updatedValues.educational_background = parsedData.educational_background.map((education, index) => ({
            ...prevValues.educational_background[index],
            ...education,
          }));
        }
  
        // Merge parsed work experience
        if (parsedData.work_experience) {
          updatedValues.work_experience = parsedData.work_experience.map((experience, index) => ({
            ...prevValues.work_experience[index],
            ...experience,
          }));
        }
  
        // Merge parsed skill set
        if (parsedData.skill_set) {
          updatedValues.skill_set = {
            ...prevValues.skill_set,
            skills: Array.isArray(parsedData.skill_set.skills)
              ? parsedData.skill_set.skills
              : prevValues.skill_set.skills,
          };
        }
  
        // Merge parsed portfolio
        if (parsedData.portfolio) {
          updatedValues.portfolio = {
            ...prevValues.portfolio,
            ...parsedData.portfolio,
          };
        }
  
        console.log("resume parse update", updatedValues);
        return updatedValues;
      });
    } catch (error) {
      console.log("+++++++++++++++        Error      ++++++++++++++")
      console.error("Error parsing the resume data:", error);
      alert("Failed to process the parsed resume data.");
    }
  };
  

  const checkEmailAvailability = debounce(async (email) => {
    // try {
      // const response = await axios.post(
      //   "http://127.0.0.1:8000/api/check-email/",
      //   { email },
      //   { headers: { "Content-Type": "application/json" } }
      // );
      // const data = response.data;

      try {
        const response = await api.post(
          "http://127.0.0.1:8000/api/check-email/", 
          { email }, 
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
    
        const data = response.data;

      if (data.available) {
        setEmailStatus({ available: true, message: "Email is available" });
      } else {
        setEmailStatus({
          available: false,
          message: "Email is already in use",
        });
      }
    } catch (error) {
      console.error("Error validating email:", error);
      setEmailStatus({
        available: false,
        message: "Unable to validate email. Please try again later.",
      });
    }
  }, 1500);

  const handleSubmit = async (values) => {
    // e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access_token");
      console.log(accessToken);

      // console.log(JSON.stringify(values));
      console.log(JSON.stringify(values));

      const response = await api.post(
        "http://127.0.0.1:8000/api/user/details/",
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.status === 201) {
        alert("Data submitted successfully!");
      } else {
        alert("Failed to submit data.");
      }
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
                  if (!value.trim()) {
                    setEmailStatus(null); // Reset status if email is empty
                    return;
                  }
                  checkEmailAvailability(value); // Run the email check
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

            {/* 
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
              
            </div> */}

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
              <label className="input-label" htmlFor="portfolio.other">
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
    </>
  );
};
export default MyForm;
