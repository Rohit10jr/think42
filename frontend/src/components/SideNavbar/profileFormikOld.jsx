import React, { useState, useEffect, useCallback  } from "react";
import styles from './profile.module.css';
import { useFormik, FieldArray } from "formik";
import debounce from "lodash/debounce";
import api from "../../services/api.jsx";

function UserProfileForm() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emailStatus, setEmailStatus] = useState(null);

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
    educational_background: [
      {
        degree: "",
        institution: "",
        field_of_study: "",
        graduation_year: "",
        gpa: "",
      },
    ],
    work_experience: [
      {
        job_title: "",
        company_name: "",
        start_date: "",
        end_date: "",
        responsibilities: "",
      },
    ],
    skill_set: {
      skills: [],
    },
    portfolio: {
      linkedin_url: "",
      github_url: "",
      other_url: "",
    },
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await api.put(
          "http://127.0.0.1:8000/api/user/details/",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 201) {
          alert("Data submitted successfully!");
        } else {
          alert("Failed to submit data.");
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        alert("An error occurred while submitting data.");
      }
    },
  });

  // Fetch user details and populate Formik's initial values
  useEffect(() => {
    let isMounted = true;

    const fetchUserDetails = async () => {
      try {
        const response = await api.get("http://127.0.0.1:8000/api/user/details/", {
          headers: { "Content-Type": "application/json" },
        });

        if (isMounted) {
          const data = response.data;
          formik.setValues({
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
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          // setError("Failed to fetch user details. Please try again.");
          setLoading(false);
        }
      }
    };

    fetchUserDetails();

    return () => {
      isMounted = false;
    };
  }, []);

  // Debounced email check
  const checkEmailAvailability = useCallback(
    debounce(async (email) => {
      try {
        const response = await api.post(
          "http://127.0.0.1:8000/api/check-email/",
          { email },
          {
            headers: { "Content-Type": "application/json" },
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
          formik.setFieldValue("personal_information.email", "");
        }
      } catch (error) {
        console.error("Error validating email:", error);
        setEmailStatus({
          available: false,
          message: "Unable to validate email. Please try again later.",
        });
      }
    }, 1500),
    []
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  return (
    <>

    <div className={styles.formContainer}>
      <form onSubmit={formik.handleSubmit}>
        {/* Personal Information */}
        <div className={styles.formSection}>
          <h2>Personal Information</h2>
          <div className={styles.formGroup}>
            <label>Full Name</label>
            <input
              type="text"
              name="personal_information.full_name"
              placeholder="Enter full name"
              onChange={formik.handleChange}
              value={formik.values.personal_information.full_name}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="personal_information.email"
              placeholder="Enter email"
              onChange={formik.handleChange}
              value={formik.values.personal_information.email}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Mobile</label>
            <input
              type="text"
              name="personal_information.mobile"
              placeholder="Enter mobile number"
              onChange={formik.handleChange}
              value={formik.values.personal_information.mobile}
            />
          </div>
        </div>

        {/* Address Information */}
        <div className={styles.formSection}>
          <h2>Address Information</h2>
          <div className={styles.formGroup}>
            <label>Address</label>
            <input
              type="text"
              name="address_information.address"
              placeholder="Enter address"
              onChange={formik.handleChange}
              value={formik.values.address_information.address}
            />
          </div>
          <div className={styles.formGroup}>
            <label>City</label>
            <input
              type="text"
              name="address_information.city"
              placeholder="Enter city"
              onChange={formik.handleChange}
              value={formik.values.address_information.city}
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>State</label>
              <input
                type="text"
                name="address_information.state"
                placeholder="Enter state"
                onChange={formik.handleChange}
                value={formik.values.address_information.state}
              />
            </div>
            <div className={styles.formGroup}>
              <label>ZIP Code</label>
              <input
                type="text"
                name="address_information.zip_code"
                placeholder="Enter ZIP code"
                onChange={formik.handleChange}
                value={formik.values.address_information.zip_code}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Country</label>
            <input
              type="text"
              name="address_information.country"
              placeholder="Enter country"
              onChange={formik.handleChange}
              value={formik.values.address_information.country}
            />
          </div>
        </div>

        <div className={styles.formSection}>
  <h2>Educational Background</h2>
  <FieldArray
    name="educational_background"
    render={(arrayHelpers) => (
      <>
        {formik.values.educational_background.map((education, index) => (
          <div key={index} className={styles.educationGroup}>
            <div className={styles.formGroup}>
              <label>Degree</label>
              <input
                type="text"
                name={`educational_background[${index}].degree`}
                placeholder="Enter degree"
                onChange={formik.handleChange}
                value={formik.values.educational_background[index].degree}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Institution</label>
              <input
                type="text"
                name={`educational_background[${index}].institution`}
                placeholder="Enter institution"
                onChange={formik.handleChange}
                value={formik.values.educational_background[index].institution}
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Field of Study</label>
                <input
                  type="text"
                  name={`educational_background[${index}].field_of_study`}
                  placeholder="Enter field of study"
                  onChange={formik.handleChange}
                  value={
                    formik.values.educational_background[index].field_of_study
                  }
                />
              </div>
              <div className={styles.formGroup}>
                <label>Graduation Year</label>
                <input
                  type="text"
                  name={`educational_background[${index}].graduation_year`}
                  placeholder="Enter graduation year"
                  onChange={formik.handleChange}
                  value={
                    formik.values.educational_background[index].graduation_year
                  }
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>GPA</label>
              <input
                type="text"
                name={`educational_background[${index}].gpa`}
                placeholder="Enter GPA"
                onChange={formik.handleChange}
                value={formik.values.educational_background[index].gpa}
              />
            </div>

            <div className={styles.buttonGroup}>
              {/* Show Remove Button if there are more than one education sections */}
              {formik.values.educational_background.length > 1 && (
                <button
                  type="button"
                  onClick={() => arrayHelpers.remove(index)}
                  className={styles.removeButton}
                >
                  Remove Education
                </button>
              )}

              {/* Add New Education Button, shown only for the last entry */}
              {index === formik.values.educational_background.length - 1 && (
                <button
                  type="button"
                  onClick={() =>
                    arrayHelpers.push({
                      degree: "",
                      institution: "",
                      field_of_study: "",
                      graduation_year: "",
                      gpa: "",
                    })
                  }
                  className={styles.addButton}
                >
                  Add Education
                </button>
              )}
            </div>
          </div>
        ))}
      </>
    )}
  />
</div>;
        {/* Work Experience */}
        <div className={styles.formSection}>
          <h2>Work Experience</h2>
          {formik.values.work_experience.map((experience, index) => (
            <div key={index} className={styles.experienceGroup}>
              <div className={styles.formGroup}>
                <label>Job Title</label>
                <input
                  type="text"
                  name={`work_experience[${index}].job_title`}
                  placeholder="Enter job title"
                  onChange={formik.handleChange}
                  value={experience.job_title}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Company Name</label>
                <input
                  type="text"
                  name={`work_experience[${index}].company_name`}
                  placeholder="Enter company name"
                  onChange={formik.handleChange}
                  value={experience.company_name}
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Start Date</label>
                  <input
                    type="date"
                    name={`work_experience[${index}].start_date`}
                    onChange={formik.handleChange}
                    value={experience.start_date}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>End Date</label>
                  <input
                    type="date"
                    name={`work_experience[${index}].end_date`}
                    onChange={formik.handleChange}
                    value={experience.end_date}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Responsibilities</label>
                <textarea
                  name={`work_experience[${index}].responsibilities`}
                  rows="3"
                  placeholder="Enter responsibilities"
                  onChange={formik.handleChange}
                  value={experience.responsibilities}
                ></textarea>
              </div>
            </div>
          ))}
        </div>

        {/* Skill Set */}
        <div className={styles.formSection}>
          <h2>Skill Set</h2>
          <div className={styles.formGroup}>
            <label>Skills</label>
            <textarea
              name="skill_set.skills"
              rows="3"
              placeholder="Enter skills (comma-separated)"
              onChange={formik.handleChange}
              value={formik.values.skill_set.skills}
            ></textarea>
          </div>
        </div>

        {/* Portfolio */}
        <div className={styles.formSection}>
          <h2>Portfolio</h2>
          <div className={styles.formGroup}>
            <label>LinkedIn URL</label>
            <input
              type="text"
              name="portfolio.linkedin_url"
              placeholder="Enter LinkedIn URL"
              onChange={formik.handleChange}
              value={formik.values.portfolio.linkedin_url}
            />
          </div>
          <div className={styles.formGroup}>
            <label>GitHub URL</label>
            <input
              type="text"
              name="portfolio.github_url"
              placeholder="Enter GitHub URL"
              onChange={formik.handleChange}
              value={formik.values.portfolio.github_url}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Other URL</label>
            <input
              type="text"
              name="portfolio.other_url"
              placeholder="Enter other URL"
              onChange={formik.handleChange}
              value={formik.values.portfolio.other_url}
            />
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
    </>
  );
};

export default UserProfileForm;
