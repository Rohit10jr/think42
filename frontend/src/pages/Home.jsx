// import React from "react";
import "./Home.css";
// import AutoFill from "../components/Form/Autofill";
import Header from "../components/Home/header.jsx";
import ResumeUpload from "../components/Home/upload.jsx";
import React, { useState } from "react";

const Home = () => {
  const [formData, setFormData] = useState({
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
    portfolio: [
      {
        link_type: "LinkedIn",
        url: "",
      },
      {
        link_type: "GitHub",
        url: "",
      },
    ],
  });

  // const handleChange = (e, section, key, index = null) => {
  //   const { id, value } = e.target;
  //   setFormData((prev) => {
  //     const newData = { ...prev };
  //     if (index !== null) {
  //       newData[section][index][key] = value;
  //     } else {
  //       newData[section][key] = value;
  //     }
  //     return newData;
  //   });
  // };

  const handleChange = (e, section, key, index = null) => {
    const { value } = e.target;

    setFormData((prev) => {
      const newData = { ...prev };
      if (index !== null && newData[section][index]) {
        newData[section][index][key] = value;
      } else if (index === null) {
        newData[section][key] = value;
      }
      return newData;
    });
  };

  const handleParsedData = (parsedDataString) => {
    try {
      // Parse the stringified JSON (removing backticks)
      const parsedData = JSON.parse(parsedDataString.replace(/```json|```/g, "").trim());

      // Update the formData state dynamically
      setFormData((prevFormData) => {
        const updatedFormData = { ...prevFormData };

        // Merge parsed personal information
        if (parsedData.personal_information) {
          updatedFormData.personal_information = {
            ...prevFormData.personal_information,
            ...parsedData.personal_information,
          };
        }

        // Merge parsed address information
        if (parsedData.address_information) {
          updatedFormData.address_information = {
            ...prevFormData.address_information,
            ...parsedData.address_information,
          };
        }

        // Merge parsed educational background
        if (parsedData.educational_background) {
          updatedFormData.educational_background = parsedData.educational_background.map((education, index) => ({
            ...prevFormData.educational_background[index],
            ...education,
          }));
        }

        // Merge parsed work experience
        if (parsedData.work_experience) {
          updatedFormData.work_experience = parsedData.work_experience.map((experience, index) => ({
            ...prevFormData.work_experience[index],
            ...experience,
          }));
        }

        // Merge parsed portfolio
        if (parsedData.portfolio) {
          updatedFormData.portfolio = parsedData.portfolio.map((link, index) => ({
            ...prevFormData.portfolio[index],
            ...link,
          }));
        }

        return updatedFormData;
      });
    } catch (error) {
      console.error("Error parsing the resume data:", error);
      alert("Failed to process the parsed resume data.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access_token");
      console.log(accessToken); // Include the Bearer token// Retrieve the token from localStorage

      console.log(JSON.stringify(formData))

      const response = await fetch("http://127.0.0.1:8000/api/user/details/", {
        method: 'POST',
        headers: {
          // Authorization: `Bearer ${accessToken}`,
          'Authorization': `Bearer ${accessToken}`,
          // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),

        
      });

      if (response.ok) {
        const result = await response.json();
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
      <Header />
      <ResumeUpload onParsedDataReceived={handleParsedData} />
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          {/* Personal Information Section */}
          <div className="section">
            <h2 className="user-info-h2">Personal Information</h2>
            <div className="input-container">
              <label className="input-label" htmlFor="full-name">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="full-name"
                className="input-field"
                // placeholder="Full Name"
                value={formData.personal_information.full_name}
                onChange={(e) =>
                  handleChange(e, "personal_information", "full_name")
                }
              />
            </div>
            <div className="input-container">
              <label className="input-label" htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="input-field"
                // placeholder="Email"
                value={formData.personal_information.email}
                onChange={(e) =>
                  handleChange(e, "personal_information", "email")
                }
              />
            </div>
            <div className="input-container">
              <label className="input-label" htmlFor="mobile">
                Mobile <span className="required">*</span>
              </label>
              <input
                type="text"
                id="mobile"
                className="input-field"
                // placeholder="Mobile"
                value={formData.personal_information.mobile}
                onChange={(e) =>
                  handleChange(e, "personal_information", "mobile")
                }
              />
            </div>
          </div>

          {/* Address Information Section */}
          <div className="section">
            <h2 className="user-info-h2">Address Information</h2>
            <div className="input-container">
              <label className="input-label" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="input-field"
                // placeholder="Address"
                value={formData.address_information.address}
                onChange={(e) =>
                  handleChange(e, "address_information", "address")
                }
              />
            </div>
            <div className="input-container">
              <label className="input-label" htmlFor="city">
                City
              </label>
              <input
                type="text"
                id="city"
                className="input-field"
                // placeholder="City"
                value={formData.address_information.city}
                onChange={(e) => handleChange(e, "address_information", "city")}
              />
            </div>
            <div className="input-container">
              <label className="input-label" htmlFor="state">
                State
              </label>
              <input
                type="text"
                id="state"
                className="input-field"
                // placeholder="State"
                value={formData.address_information.state}
                onChange={(e) =>
                  handleChange(e, "address_information", "state")
                }
              />
            </div>

            <div className="input-container">
              <label className="input-label" htmlFor="zip_code">
                Zip Code
              </label>
              <input
                type="text"
                id="zip_code"
                className="input-field"
                // placeholder="Zip Code"
                value={formData.address_information.zip_code}
                onChange={(e) =>
                  handleChange(e, "address_information", "zip_code")
                }
              />
            </div>

            <div className="input-container">
              <label className="input-label" htmlFor="country">
                Country
              </label>
              <input
                type="text"
                id="country"
                className="input-field"
                // placeholder="Country"
                value={formData.address_information.country}
                onChange={(e) =>
                  handleChange(e, "address_information", "country")
                }
              />
            </div>

            {/* Repeat for other address fields */}
          </div>

          {/* Educational Background Section */}
          <div className="section">
            <h2 className="user-info-h2">Educational Background</h2>
            <div className="input-container">
              <label className="input-label" htmlFor="degree-1">
                Degree
              </label>
              <input
                type="text"
                id="degree-1"
                className="input-field"
                // placeholder="Degree"
                value={formData.educational_background[0].degree}
                onChange={(e) =>
                  handleChange(e, "educational_background", "degree", 0)
                }
              />
            </div>

            <div className="input-container">
              <label className="input-label" htmlFor="institution-1">
                Institution
              </label>
              <input
                type="text"
                id="institution-1"
                className="input-field"
                // placeholder="Institution"
                value={formData.educational_background[0].institution}
                onChange={(e) =>
                  handleChange(e, "educational_background", "institution", 0)
                }
              />
            </div>

            <div className="input-container">
              <label className="input-label" htmlFor="field_of_study-1">
                Field Of Study
              </label>
              <input
                type="text"
                id="field_of_study-1"
                className="input-field"
                // placeholder="Field Of Study"
                value={formData.educational_background[0].field_of_study}
                onChange={(e) =>
                  handleChange(e, "educational_background", "field_of_study", 0)
                }
              />
            </div>

            <div className="input-container">
              <label className="input-label" htmlFor="graduation_year-1">
                Graduation Year
              </label>
              <input
                type="text"
                id="graduation_year-1"
                className="input-field"
                // placeholder="Graduation Year"
                value={formData.educational_background[0].graduation_year}
                onChange={(e) =>
                  handleChange(
                    e,
                    "educational_background",
                    "graduation_year",
                    0
                  )
                }
              />
            </div>

            <div className="input-container">
              <label className="input-label" htmlFor="gpa-1">
                Gpa
              </label>
              <input
                type="text"
                id="gpa-1"
                className="input-field"
                // placeholder="Gpa"
                value={formData.educational_background[0].gpa}
                onChange={(e) =>
                  handleChange(e, "educational_background", "gpa", 0)
                }
              />
            </div>
            {/* Repeat for other educational fields */}
          </div>

          {/* Work Experience Section */}
          <div className="section">
            <h2 className="user-info-h2">Work Experience</h2>
            <div className="input-container">
              <label className="input-label" htmlFor="job_title-1">
                Job Title
              </label>
              <input
                type="text"
                id="job_title-1"
                className="input-field"
                // placeholder="Job Title"
                value={formData.work_experience[0].job_title}
                onChange={(e) =>
                  handleChange(e, "work_experience", "job_title", 0)
                }
              />
            </div>

            <div className="input-container">
              <label className="input-label" htmlFor="company-1">
                Company Name
              </label>
              <input
                type="text"
                id="company-1"
                className="input-field"
                // placeholder="Company Name"
                value={formData.work_experience[0].company_name}
                onChange={(e) =>
                  handleChange(e, "work_experience", "company_name", 0)
                }
              />
            </div>

            <div className="input-container">
              <label className="input-label" htmlFor="start_date-1">
                Start Date
              </label>
              <input
                type="text"
                id="start_date-1"
                className="input-field"
                // placeholder="Company Name"
                value={formData.work_experience[0].start_date}
                onChange={(e) =>
                  handleChange(e, "work_experience", "start_date", 0)
                }
              />
            </div>


            <div className="input-container">
              <label className="input-label" htmlFor="end_date-1">
              End Date
              </label>
              <input
                type="text"
                id="end_date-1"
                className="input-field"
                // placeholder="Company Name"
                value={formData.work_experience[0].end_date}
                onChange={(e) =>
                  handleChange(e, "work_experience", "end_date", 0)
                }
              />
            </div>


            <div className="input-container">
              <label className="input-label" htmlFor="responsibilities-1">
                Responsibilities
              </label>
              <input
                type="text"
                id="responsibilities-1"
                className="input-field"
                // placeholder="Responsibilities"
                value={formData.work_experience[0].responsibilities}
                onChange={(e) =>
                  handleChange(e, "work_experience", "responsibilities", 0)
                }
              />
            </div>

            {/* Repeat for other work experience fields */}
          </div>

          {/* Portfolio Section */}
          <div className="section">
            <h2 className="user-info-h2">Portfolio</h2>
            <div className="input-container">
              <label className="input-label" htmlFor="linkedin-link">
                LinkedIn Link
              </label>
              <input
                type="text"
                id="linkedin-link"
                className="input-field"
                // placeholder="LinkedIn Link"
                value={formData.portfolio[0].url}
                onChange={(e) => handleChange(e, "portfolio", "url", 0)}
              />
            </div>

            <div className="input-container">
              <label className="input-label" htmlFor="GitHub-link">
                LinkedIn Link
              </label>
              <input
                type="text"
                id="GitHub-link"
                className="input-field"
                // placeholder="GitHub Link"
                value={formData.portfolio[1].url}
                onChange={(e) => handleChange(e, "portfolio", "url", 1)}
              />
            </div>
            {/* Repeat for GitHub */}
          </div>

          <button type="submit" className="submit-button">
            Send
          </button>
        </div>
      </form>
    </>
  );
};

export default Home;
