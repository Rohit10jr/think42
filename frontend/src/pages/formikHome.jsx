import { React, useState, useRef, isValidElement } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import api from "../services/api.jsx";
import { debounce } from "lodash";
import "./Home.css";
// import ResumeUpload from "../components/Home/upload.jsx";

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
    linkedin_url: "",
    github_url: "",
    other_url: "",
  },

  documents: { resume: null, cover_letter: null },
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
    linkedin_url: Yup.string()
      // .url("Invalid URL format")
      // .matches(/^https:\/\/(www\.)?linkedin_url\.com\/.*$/, "Invalid linkedin_url URL")
      .required("linkedin_url URL is required"),
    github_url: Yup.string()
      // .url("Invalid URL format")
      // .matches(/^https:\/\/github_url\.com\/.*$/, "Invalid github_url URL")
      .required("github_url URL is required"),
  }),

  documents: Yup.object({
    resume: Yup.mixed().required("resume is required"),
    //   .test('fileType', 'The file must be a PDF or DOCX', (value) => {
    //     // Check if the file is not empty and is of the correct type
    //     if (value) {
    //       return ['application.pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type);
    //     }
    //     return true; // No file, no validation error
    //   })
    //   .test('fileSize', 'The file is too large. Max size is 5MB', (value) => {
    //     if (value) {
    //       return value.size <= 5 * 1024 * 1024; // 5MB limit
    //     }
    //     return true; // No file, no validation error
    //   }),

    cover_letter: Yup.mixed().nullable(),
    // .test('fileType', 'The file must be a PDF or DOCX', (value) => {
    //   if (value) {
    //     return ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type);
    //   }
    //   return true; // No file, no validation error
    // })
    // .test('fileSize', 'The file is too large. Max size is 5MB', (value) => {
    //   if (value) {
    //     return value.size <= 5 * 1024 * 1024; // 5MB limit
    //   }
    //   return true; // No file, no validation error
    // }),
  }),
});

const MyForm = () => {
  const [fileName, setFileName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const fileInputRef = useRef(null);

  const handleResumeParse = async (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setIsUploading(true);
      // setFieldValue("file", file);
      // console.log("Parsing resume:", file.name);

      const formData = new FormData();
      formData.append("resume_file", file);

      try {
        // Make the API request to parse the resume
        const response = await fetch(
          "http://127.0.0.1:8000/api/resume-parse/",
          {
            method: "POST",
            body: formData,
          }
        );

        // Check if the response is successful
        if (response.ok) {
          setIsUploading(false);
          const parsedData = await response.json();
          // console.log("Parsed Resume Data:", parsedData);

          let parsedDataStr = parsedData.parsed_data;
          // console.log("Raw parsed_data:", parsedDataStr);

          parsedDataStr = parsedDataStr
            .replace(/^```json\n/, "")
            .replace(/'/g, '"')
            .trim();

          parsedDataStr = parsedDataStr.replace(/```$/, "");

          // console.log("Cleaned parsed_data:", parsedDataStr);
          const parsedJson = JSON.parse(parsedDataStr);
          console.log("Parsed JSON:", parsedJson);

          handleUpdateValues(setFieldValue, parsedJson);
        } else {
          setIsUploading(false);
          console.error("Failed to parse resume:", response.statusText);
        }
      } catch (error) {
        console.error("Error parsing resume:", error);
      }
    }
  };

  const handleUpdateValues = async (setFieldValue, userData) => {
    console.log("updating from values with user data: ", userData);

    if (userData && userData.personal_information) {
      setFieldValue(
        "personal_information.full_name",
        userData.personal_information.full_name
      );
      setFieldValue(
        "personal_information.email",
        userData.personal_information.email
      );
      setFieldValue(
        "personal_information.mobile",
        userData.personal_information.mobile
      );
    } else {
      alert("Failed to fetch data");
    }

    if (userData && userData.address_information) {
      setFieldValue(
        "address_information.address",
        userData.address_information.address
      );
      setFieldValue(
        "address_information.city",
        userData.address_information.city
      );
      setFieldValue(
        "address_information.state",
        userData.address_information.state
      );
      setFieldValue(
        "address_information.zip_code",
        userData.address_information.zip_code
      );
      setFieldValue(
        "address_information.country",
        userData.address_information.country
      );
    } else {
      alert("Failed to fetch data");
    }

    if (userData && userData.work_experience) {
      // Iterate over the educational_background array
      userData.work_experience.forEach((work, index) => {
        setFieldValue(`work_experience[${index}].job_title`, work.job_title);
        setFieldValue(
          `work_experience[${index}].company_name`,
          work.company_name
        );
        setFieldValue(`work_experience[${index}].start_date`, work.start_date);
        setFieldValue(`work_experience[${index}].end_date`, work.end_date);
        setFieldValue(
          `work_experience[${index}].responsibilities`,
          work.responsibilities
        );
      });
    } else {
      alert("Failed to fetch educational background data");
    }

    if (userData && userData.educational_background) {
      // Iterate over the educational_background array
      userData.educational_background.forEach((education, index) => {
        setFieldValue(
          `educational_background[${index}].degree`,
          education.degree
        );
        setFieldValue(
          `educational_background[${index}].institution`,
          education.institution
        );
        setFieldValue(
          `educational_background[${index}].field_of_study`,
          education.field_of_study
        );
        setFieldValue(
          `educational_background[${index}].graduation_year`,
          education.graduation_year
        );
        setFieldValue(`educational_background[${index}].gpa`, education.gpa);
      });
    } else {
      alert("Failed to fetch educational background data");
    }

    if (
      userData &&
      userData.skill_set &&
      Array.isArray(userData.skill_set.skills)
    ) {
      // Directly set the 'skills' array with the fetched values
      setFieldValue("skill_set.skills", userData.skill_set.skills);
    } else {
      alert("Failed to fetch skill set data");
    }

    if (userData && userData.portfolio) {
      setFieldValue("portfolio.linkedin_url", userData.portfolio.linkedin_url);
      setFieldValue("portfolio.github_url", userData.portfolio.github_url);
      setFieldValue("portfolio.other_url", userData.portfolio.other_url);
    } else {
      alert("Failed to fetch data");
    }
  };

  const checkEmailAvailability = debounce(async (email) => {
    try {
      const response = await api.post(
        "http://127.0.0.1:8000/api/check-email/",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
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
      // const accessToken = localStorage.getItem("access_token");
      // console.log(accessToken);
      // console.log(JSON.stringify(values));

      const formData = new FormData();

      formData.append(
        "personal_information",
        JSON.stringify(values.personal_information)
      );
      formData.append(
        "address_information",
        JSON.stringify(values.address_information)
      );
      formData.append(
        "work_experience",
        JSON.stringify(values.work_experience)
      );
      formData.append(
        "educational_background",
        JSON.stringify(values.educational_background)
      );
      formData.append("skill_set", JSON.stringify(values.skill_set));
      formData.append("portfolio", JSON.stringify(values.portfolio));

      // formData.append("documents[resume]", resumeFileInput.files[0]);
      // formData.append("documents[certificate]", certificateFileInput.files[0]);

      if (values.documents.resume) {
        formData.append("resume", values.documents.resume);
      }
      if (values.documents.cover_letter) {
        formData.append(
          "cover_letter",
          values.documents.cover_letter
        );
      }

      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await api.post(
        "http://127.0.0.1:8000/api/user/details/",
        // JSON.stringify(values),
        formData,
        {
          headers: {
            // "Content-Type": "application/json",
            // "Content-Type": "multipart/form-data",
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

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        className="form-container"
      >
        {({ values, setFieldValue, handleBlur, isValid, dirty }) => (
          <Form>
            <div className="form-container">
              {/* <div>
                <label htmlFor="file">Resume (PDF, DOCX, etc.)</label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept=".pdf,.docx,.txt" // Restrict accepted file types
                  ref={fileInputRef}
                  onChange={(e) => handleResumeParse(e, setFieldValue)}
                />
                <ErrorMessage name="file" component="div" />
              </div> */}

              <div className="section resume-upload">
                <div className="resume-header">
                  <h2>Autofill Application</h2>
                  <p className="upload-description">
                    Upload your resume/CV in seconds with the autofill option.
                  </p>
                </div>
                <div className="upload-box" onClick={handleUploadClick}>
                  <p className="upload-text">
                    <span className="upload-link">Upload your resume</span> or
                    drag and drop it here
                  </p>
                  {fileName ? (
                    <p className="uploaded-file">Uploaded File: {fileName}</p>
                  ) : (
                    <>
                      <p className="upload-filetypes">
                        Only .doc, .docx, .pdf, .odt, .rtf
                      </p>
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
                  onChange={(e) => handleResumeParse(e, setFieldValue)}
                />
              </div>

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
                  {emailStatus &&
                    !emailStatus.available &&
                    emailStatus.message && (
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
                  <label
                    className="input-label"
                    htmlFor="address_information.city"
                  >
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
                              className="formik-remove-button"
                            >
                              Remove Work Experience
                            </button>
                          )}

                        {/* Add New Work Experience Button, only show at the bottom */}
                        {index === values.work_experience.length - 1 && (
                          <button
                            type="button"
                            onClick={
                              () =>
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
                          index ===
                            values.educational_background.length - 1 && (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} // Remove work experience section
                              className="formik-remove-button"
                            >
                              Remove education
                            </button>
                          )}

                        {/* Add New Work Experience Button, only show at the bottom */}
                        {index === values.educational_background.length - 1 && (
                          <button
                            type="button"
                            onClick={
                              () =>
                                arrayHelpers.push({
                                  degree: "",
                                  gpa: "",
                                }) // Add new empty work experience entry
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
                  <label
                    className="input-label"
                    htmlFor="portfolio.linkedin_url"
                  >
                    Likedin
                  </label>
                  <Field
                    type="text"
                    id="portfolio.linkedin_url"
                    name="portfolio.linkedin_url"
                    className="input-field"
                    // placeholder="State"
                  />
                  <ErrorMessage
                    name="portfolio.linkedin_url"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="input-container">
                  <label className="input-label" htmlFor="portfolio.github_url">
                    github_url
                  </label>
                  <Field
                    type="text"
                    id="portfolio.github_url"
                    name="portfolio.github_url"
                    className="input-field"
                    // placeholder="Zip Code"
                  />
                  <ErrorMessage
                    name="portfolio.github_url"
                    component="div"
                    className="error-message"
                  />
                </div>

                <div className="input-container">
                  <label className="input-label" htmlFor="portfolio.other_url">
                    other_url Link
                  </label>
                  <Field
                    type="text"
                    id="portfolio.other_url"
                    name="portfolio.other_url"
                    className="input-field"
                    // placeholder="Country"
                  />
                  <ErrorMessage
                    name="portfolio.other_url"
                    component="div"
                    className="error-message"
                  />
                </div>
              </div>

              {/* portfolio Section */}
              <div className="documents">
                <h2 className="user-info-h2">Documents</h2>

                {/* Resume File Input */}
                {/* <div className="input-container"> */}
                <label className="input-label" htmlFor="documents.resume">
                  Resume
                </label>
                <input
                  type="file"
                  id="documents.resume"
                  name="documents.resume"
                  onChange={(event) => {
                    setFieldValue(
                      "documents.resume",
                      event.currentTarget.files[0]
                    );
                  }}
                  className="input-field"
                />
                <ErrorMessage
                  name="documents.resume"
                  component="div"
                  className="error-message"
                />
                {/* </div> */}

                {/* Cover Letter File Input */}
                <div className="input-container">
                  <label
                    className="input-label"
                    htmlFor="documents.cover_letter"
                  >
                    Cover Letter
                  </label>
                  <input
                    type="file"
                    id="documents.cover_letter"
                    name="documents.cover_letter"
                    onChange={(event) => {
                      setFieldValue(
                        "documents.cover_letter",
                        event.currentTarget.files[0]
                      );
                    }}
                    className="input-field"
                  />
                  <ErrorMessage
                    name="documents.cover_letter"
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
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default MyForm;
