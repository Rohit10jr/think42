import React, { useState, useCallback, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
// Assuming you have a CSS module for styles
import styles from "./profile.module.css"; // Replace with the correct path
import debounce from "lodash/debounce";
import api from "../../services/api.jsx";

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

};

const validationSchema = Yup.object({
  personal_information: Yup.object({
    full_name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile must be a 10-digit number")
      .required("Mobile number is required"),
  }),
  address_information: Yup.object({
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip_code: Yup.string()
      // .matches(/^\d{5}$/, "Zip code must be a 5-digit number")
      .required("Zip code is required"),
    country: Yup.string().required("Country is required"),
  }),
});

const ProfileForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);


  // useEffect(() => {
  //   let isMounted = true; // Track if component is mounted

  //   const fetchUserDetails = async (setValues) => {
  //     try {
  //       const response = await api.get(
  //         "http://127.0.0.1:8000/api/user/details/",
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       if (isMounted) {
  //         const data = response.data;
  //         console.log(response)

  //         // Map the response to the formData structure
  //         setValues({
  //           personal_information: {
  //             full_name: data.personal_information.full_name || "",
  //             email: data.personal_information.email || "",
  //             mobile: data.personal_information.mobile || "",
  //           },
  //           address_information: {
  //             address: data.address_information.address || "",
  //             city: data.address_information.city || "",
  //             state: data.address_information.state || "",
  //             zip_code: data.address_information.zip_code || "",
  //             country: data.address_information.country || "",
  //           },
  //           educational_background: data.educational_background.map((edu) => ({
  //             degree: edu.degree || "",
  //             institution: edu.institution || "",
  //             field_of_study: edu.field_of_study || "",
  //             graduation_year: edu.graduation_year || "",
  //             gpa: edu.gpa || "",
  //           })),
  //           work_experience: data.work_experience.map((work) => ({
  //             job_title: work.job_title || "",
  //             company_name: work.company_name || "",
  //             start_date: work.start_date || "",
  //             end_date: work.end_date || "",
  //             responsibilities: work.responsibilities || "",
  //           })),
  //           skill_set: {
  //             skills: data.skill_set.skills || [],
  //           },
  //           portfolio: {
  //             linkedin_url: data.portfolio.linkedin_url || "",
  //             github_url: data.portfolio.github_url || "",
  //             other_url: data.portfolio.other_url || "",
  //           },
  //         });

  //         setLoading(false); // Set loading to false after data is fetched
  //       }
  //     } catch (err) {
  //       if (isMounted) {
  //         setError("Failed to fetch user details. Please try again.");
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchUserDetails();

  //   return () => {
  //     isMounted = false; // Cleanup to prevent setting state after unmount
  //   };
  // }, []);

  const fetchUserDetails = async (setValues) => {
    setLoading(true);
    try {
      const response = await api.get(
        "http://127.0.0.1:8000/api/user/details/",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(data);

      // Map the response to the formData structure
      setValues({
        personal_information: {
          full_name: data.personal_information.full_name || "",
          email: data.personal_information.email || "",
          mobile: data.personal_information.mobile || "",
        },
        address_information: {
          address: data.address_information.address || "",
          city: data.address_information.city || "",
          state: data.address_information.state || "",
          zip_code: data.address_information.zip_code || "",
          country: data.address_information.country || "",
        },
        educational_background: data.educational_background.map((edu) => ({
          degree: edu.degree || "",
          institution: edu.institution || "",
          field_of_study: edu.field_of_study || "",
          graduation_year: edu.graduation_year || "",
          gpa: edu.gpa || "",
        })),
        work_experience: data.work_experience.map((work) => ({
          job_title: work.job_title || "",
          company_name: work.company_name || "",
          start_date: work.start_date || "",
          end_date: work.end_date || "",
          responsibilities: work.responsibilities || "",
        })),
        skill_set: {
          skills: data.skill_set.skills || [],
        },
        portfolio: {
          linkedin_url: data.portfolio.linkedin_url || "",
          github_url: data.portfolio.github_url || "",
          other_url: data.portfolio.other_url || "",
        },
      });



      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      setError("Failed to fetch user details. Please try again.");
      setLoading(false);
    }
  };

  // Debounced email check
  const checkEmailAvailability = debounce(async (email, setFieldValue) => {
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
        console.log("Email is available")
        // setEmailStatus({ available: true, message: "Email is available" });
      } else {
        setEmailStatus({
          available: false,
          message: "Email is already in use",
        });
        setFieldValue("personal_information.email", "");
        // setFieldValue("personal_information.email", null);
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
    setLoading(true);
    try {
      // const accessToken = localStorage.getItem("access_token");
      const response = await api.put("user/details/",
        values,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response);


      if (response.status === 201) {
        setLoading(false);
        alert("Data submitted successfully!");
      } else {
        setLoading(false);
        alert("Failed to submit data.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting data:", error);
      alert("An error occurred while submitting data.");
    }
  };

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;


  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {/* {({ values, setFieldValue, handleBlur, isValid, dirty }) => ( */}

        {({ values, setFieldValue, handleBlur, isValid, dirty, setValues }) => {
          useEffect(() => {
            fetchUserDetails(setValues); // Pass Formik's setValues to fetchUserDetails
          }, [setValues]);

          return (
            <Form className={styles.formContainer}>
              <div className={styles.formSection}>
                <h2>Personal Information</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="full_name">Full Name</label>
                  <Field
                    type="text"
                    name="personal_information.full_name"
                    id="full_name"
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="personal_information.full_name"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
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
                        checkEmailAvailability(value, setFieldValue);// Run the email check
                      }}
                      onBlur={handleBlur}
                      value={values.personal_information.email}
                    />
                    {/* Suppress Formik error if email is not available */}
                    {!emailStatus || emailStatus.available ? (
                      <ErrorMessage
                        name="personal_information.email"
                        component="div"
                        className={styles.error}
                      />
                    ) : null}
                    {/* Display email availability message */}
                    {emailStatus && emailStatus.message && (
                      <div
                        style={{
                          color: emailStatus.available ? "green" : "red",
                          marginTop: "5px",
                          fontSize: "14px",
                        }}
                      >
                        {emailStatus.message}
                      </div>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="mobile">Mobile</label>
                    <Field type="text" name="personal_information.mobile" id="mobile" />
                    <ErrorMessage
                      name="personal_information.mobile"
                      component="div"
                      className={styles.error}
                    />
                  </div>
                </div>
              </div>


              {/* address information */}
              <div className={styles.formSection}>
                <h2>Address Information</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="address">Address</label>
                  <Field type="text" name="address_information.address" id="address" />
                  <ErrorMessage
                    name="address_information.address"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="city">City</label>
                    <Field type="text" name="address_information.city" id="city" />
                    <ErrorMessage
                      name="address_information.city"
                      component="div"
                      className={styles.error}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="state">State</label>
                    <Field type="text" name="address_information.state" id="state" />
                    <ErrorMessage
                      name="address_information.state"
                      component="div"
                      className={styles.error}
                    />
                  </div>

                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="zip_code">Zip Code</label>
                    <Field type="text" name="address_information.zip_code" id="zip_code" />
                    <ErrorMessage
                      name="address_information.zip_code"
                      component="div"
                      className={styles.error}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="country">Country</label>
                    <Field type="text" name="address_information.country" id="country" />
                    <ErrorMessage
                      name="address_information.country"
                      component="div"
                      className={styles.error}
                    />
                  </div>
                </div>
              </div>




              {/* Work Experience */}
              <div className={styles.formSection}>
                <h2>Work Experience</h2>
                <FieldArray
                  name="work_experience"
                  render={(arrayHelpers) => (
                    <>
                      {arrayHelpers.form.values.work_experience.map((_, index) => (
                        <div key={index}>
                          <h5> work experience {index + 1}</h5>
                          <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                              <label htmlFor="job_title">Job title</label>
                              <Field type="text" name={`work_experience[${index}].job_title`} id="job_title" />
                              <ErrorMessage
                                name={`work_experience.${index}.job_title`}
                                component="div"
                                className={styles.error}
                              />
                            </div>

                            <div className={styles.formGroup}>
                              <label htmlFor="job_title">Company</label>
                              <Field type="text" name={`work_experience.${index}.company_name`} id="job_title" />
                              <ErrorMessage
                                name={`work_experience.${index}.company_name`}
                                component="div"
                                className={styles.error}
                              />
                            </div>
                          </div>

                          <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                              <label htmlFor="job_title">Start date</label>
                              <Field type="text" name={`work_experience.${index}.start_date`} id="job_title"
                                placeholder="yyyy-mm-dd" />
                              <ErrorMessage
                                name={`work_experience.${index}.start_date`}
                                component="div"
                                className={styles.error}
                              />
                            </div>

                            <div className={styles.formGroup}>
                              <label htmlFor="job_title">End date</label>
                              <Field type="text" name={`work_experience.${index}.end_date`}
                                placeholder="yyyy-mm-dd"
                                id="job_title" />
                              <ErrorMessage
                                name={`work_experience.${index}.end_date`}
                                component="div"
                                className={styles.error}
                              />
                            </div>
                          </div>

                          <div className={styles.formGroup}>
                            <label htmlFor="job_title">Responsibilities</label>
                            <Field type="text" name={`work_experience.${index}.responsibilities`}
                              id="job_title" />
                            <ErrorMessage
                              name={`work_experience.${index}.responsibilities`}

                              component="div"
                              className={styles.error}
                            />
                          </div>

                          {/* Show Remove Button only for the last entry */}
                          {arrayHelpers.form.values.work_experience.length > 1 &&
                            index === arrayHelpers.form.values.work_experience.length - 1 && (
                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)} // Remove work experience section
                                className={styles.formikRemoveButton}
                              >
                                Remove Work Experience
                              </button>
                            )}

                          {/* Add New Work Experience Button, only show at the bottom */}
                          {index === arrayHelpers.form.values.work_experience.length - 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                arrayHelpers.push({
                                  job_title: "",
                                  company_name: "",
                                  start_date: "",
                                  end_date: "",
                                  responsibilities: "",
                                }) // Add new empty work experience entry
                              }
                              className={styles.formikAddButton}
                            >
                              Add Work Experience
                            </button>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                />
              </div>

              {/* <Field name={`work_experience[${index}].job_title`} placeholder="Job Title" />
              <Field name={`work_experience[${index}].company_name`} placeholder="Company Name" />
              <Field name={`work_experience[${index}].start_date`} type="date" placeholder="Start Date" />
              <Field name={`work_experience[${index}].end_date`} type="date" placeholder="End Date" />
              <Field name={`work_experience[${index}].responsibilities`} placeholder="Responsibilities" /> */}


              {/* education background */}
              <div className={styles.formSection}>
                <h2>Educational Background</h2>
                <FieldArray
                  name="educational_background"
                  render={(arrayHelpers) => (
                    <>
                      {arrayHelpers.form.values.educational_background.map((_, index) => (
                        <div key={index}>
                          <h5 > Educational background {index + 1}</h5>

                          <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                              <label htmlFor="degree">Degree</label>
                              <Field type="text" name={`educational_background[${index}].degree`} id="degree" />
                              <ErrorMessage
                                name={`educational_background.${index}.degree`}
                                component="div"
                                className={styles.error}
                              />
                            </div>

                            <div className={styles.formGroup}>
                              <label htmlFor="institution">Institution</label>
                              <Field type="text" name={`educational_background.${index}.institution`} id="institution" />
                              <ErrorMessage
                                name={`educational_background.${index}.institution`}
                                component="div"
                                className={styles.error}
                              />
                            </div>
                          </div>

                          <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                              <label htmlFor="field_of_study">Field of study</label>
                              <Field type="text" name={`educational_background.${index}.field_of_study`} id="field_of_study" />
                              <ErrorMessage
                                name={`educational_background.${index}.field_of_study`}
                                component="div"
                                className={styles.error}
                              />
                            </div>

                            <div className={styles.formGroup}>
                              <label htmlFor="graduation_year">Graduation year</label>
                              <Field type="text" name={`educational_background.${index}.graduation_year`} id="graduation_year" />
                              <ErrorMessage
                                name={`educational_background.${index}.graduation_year`}
                                component="div"
                                className={styles.error}
                              />
                            </div>
                          </div>

                          <div className={styles.formGroup}>
                            <label htmlFor="gpa">Gpa</label>
                            <Field type="text" name={`educational_background.${index}.gpa`}
                              id="gpa" />
                            <ErrorMessage
                              name={`educational_background.${index}.gpa`}

                              component="div"
                              className={styles.error}
                            />
                          </div>

                          {/* Show Remove Button only for the last entry */}
                          {arrayHelpers.form.values.educational_background.length > 1 &&
                            index === arrayHelpers.form.values.educational_background.length - 1 && (
                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)} // Remove educational_background section
                                className={styles.formikRemoveButton}
                              >
                                Remove Education
                              </button>
                            )}

                          {/* Add New Educational background Button, only show at the bottom */}
                          {index === arrayHelpers.form.values.educational_background.length - 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                arrayHelpers.push({
                                  degree: "",
                                  institution: "",
                                  field_of_study: "",
                                  graduation_year: "",
                                  gpa: "",
                                }) // Add new empty educational_background entry
                              }
                              className={styles.formikAddButton}
                            >
                              Add Education
                            </button>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                />
              </div>

              {/* skill information */}
              <div className={styles.formSection}>
                <h2>Skill Set</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="address">Skills</label>
                  <Field
                    as="textarea"
                    name="skill_set.skills"
                    rows="7"
                    id="skills"
                    className={styles.textarea}
                    placeholder="Enter your skills, ex: Python, React"
                  />
                  <ErrorMessage
                    name="skill_set.skills"
                    component="div"
                    className={styles.error}
                  />
                </div>
              </div>




              {/* portfolio information */}
              <div className={styles.formSection}>
                <h2>Portfolio</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="address">Linkedin url</label>
                  <Field type="text" name="portfolio.linkedin_url" id="address" />
                  <ErrorMessage
                    name="portfolio.linkedin_url"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="state">Github url</label>
                  <Field type="text" name="portfolio.github_url" id="state" />
                  <ErrorMessage
                    name="portfolio.github_url"
                    component="div"
                    className={styles.error}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="city">Other url</label>
                  <Field type="text" name="portfolio.other_url" id="city" />
                  <ErrorMessage
                    name="portfolio.other_url"
                    component="div"
                    className={styles.error}
                  />
                </div>
              </div>


              <div className={styles.formActions}>
                <button className={styles.submitButton} type="submit" disabled={loading || !isValid || !dirty}>
                  {loading ? "Submitting..." : "Submit"}
                </button>
                {message && <div className={styles.message}>{message}</div>}
              </div>
            </Form>
          )
        }}
      </Formik>
    </>
  );
};

export default ProfileForm;
