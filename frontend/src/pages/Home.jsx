import React, { useState } from "react";
import "./Home.css";
import Header from "../components/Home/header.jsx";
import ResumeUpload from "../components/Home/upload.jsx";
import { debounce } from "lodash";
import PersonalInformationForm from "../components/Home/PersonalInformationForm";
import PersonalInformationSection from "../components/Home/personalsection.jsx";
import AddressInformationSection from "../components/Home/addresssection.jsx";
import SkillSetSection from "../components/Home/skill.jsx";
import WorkSection from "../components/Home/work.jsx";
import PortfolioSection from "../components/Home/portfolio.jsx";
import EducationSection from "../components/Home/education.jsx";
import api from "../services/api.jsx"


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
    skill_set: {
      skills: "",
    },
    portfolio: 
      {
        linkedin_url: "",
        github_url: "",
        other_url: ""
      },
     
  });

  const handleAddWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      work_experience: [
        ...prev.work_experience,
        {
          job_title: "",
          company_name: "",
          start_date: "",
          end_date: "",
          responsibilities: "",
        },
      ],
    }));
  };

  const handleRemoveWorkExperience = (index) => {
    setFormData((prev) => {
      const updatedWorkExperience = [...prev.work_experience];
      updatedWorkExperience.splice(index, 1); // Remove the work experience at the specified index
      return {
        ...prev,
        work_experience: updatedWorkExperience,
      };
    });
  };

  const handleAddEducation = () => {
    setFormData((prev) => ({
      ...prev,
      educational_background: [
        ...prev.educational_background,
        {
          degree: "",
          institution: "",
          field_of_study: "",
          graduation_year: "",
          gpa: "",
        },
      ],
    }));
  };

  const handleRemoveEducation = (index) => {
    setFormData((prev) => {
      const updatedEducation = [...prev.educational_background];
      updatedEducation.splice(index, 1); // Remove the work experience at the specified index
      return {
        ...prev,
        educational_background: updatedEducation,
      };
    });
  };

  const [emailStatus, setEmailStatus] = useState(null);

  const checkEmailAvailability = debounce(async (email) => {
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
  
      const data = response.data;  // No need for response.json()
  
      if (data.available) {
        setEmailStatus({ available: true, message: "Email is available" });
      } else {
        setEmailStatus({
          available: false,
          message: "Email is already in use",
        });
  
        // Clear email if unavailable
        setFormData((prev) => {
          const newData = { ...prev };
          newData.personal_information.email = ""; // Clear the email field
          return newData;
        });
      }
    } catch (error) {
      console.error("Error validating email:", error);
      setEmailStatus({
        available: false,
        message: "Unable to validate email. Please try again later.",
      });
    }
  },1500)


  const handlePrint = () => {
    const accessToken = localStorage.getItem("access_token");
    console.log(accessToken);
    console.log(formData);
  };

  const handleChange = async (e, section, key, index = null) => {
    const { value } = e.target;

    setFormData((prev) => {
      const newData = { ...prev };
      if (section === "skill_set" && key === "skills") {
        newData.skill_set.skills = value
          .split(/\n/)
          // newData.skill_set.skills = value.split(/\n|,/)
          // .map(skill => skill.trim())
          .filter((skill) => skill !== "");
      } else if (section === "personal_information" && key === "email") {
        newData.personal_information.email = value; 
      } else if (index !== null && newData[section][index]) {
        newData[section][index][key] = value;
      } else if (index === null) {
        newData[section][key] = value;
      }
      return newData;
    });

    // if (key === "email") {
    //   if (!value.trim()) {
    //     setEmailStatus(null); 
    //     return;
    //   }
    //   checkEmailAvailability(value);
    // }
    if (key === "email" && value.trim()) {
      checkEmailAvailability(value);
    }
  };

  const handleParsedData = (parsedDataString) => {
    try {
      // Parse the stringified JSON (removing backticks)
      const parsedData = JSON.parse(
        parsedDataString.replace(/```json|```/g, "").trim()
      );

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
          updatedFormData.educational_background =
            parsedData.educational_background.map((education, index) => ({
              ...prevFormData.educational_background[index],
              ...education,
            }));
        }

        // Merge parsed work experience
        if (parsedData.work_experience) {
          updatedFormData.work_experience = parsedData.work_experience.map(
            (experience, index) => ({
              ...prevFormData.work_experience[index],
              ...experience,
            })
          );
        }

        if (parsedData.address_information) {
          updatedFormData.address_information = {
            ...prevFormData.address_information,
            ...parsedData.address_information,
          };
        }

        if (parsedData.portfolio) {
          updatedFormData.portfolio = {
            ...prevFormData.portfolio,
            ...parsedData.portfolio,
          }
        }
        console.log("resume parse update")
        console.log(updatedFormData)

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

      console.log(JSON.stringify(formData));

      const response = await api.post(
        "http://127.0.0.1:8000/api/user/details/", 
        formData,  
        {
          headers: {
            "Content-Type": "application/json" 
          }
        }
      );

      console.log(response)

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
      <Header />
      <ResumeUpload onParsedDataReceived={handleParsedData} />
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <PersonalInformationSection
            formData={formData}
            handleChange={handleChange}
            emailStatus={emailStatus} 
            
          />
          <AddressInformationSection
            formData={formData}
            handleChange={handleChange}
            
          />
          {/* <WorkSection formData={formData} handleChange={handleChange} /> */}
          {/* {formData.work_experience.map((workItem, index) => (
          <WorkSection
            key={index}
            index={index}
            formData={formData}
            handleChange={handleChange}
          />
        ))} */}

          {formData.work_experience.map((workItem, index) => (
            <WorkSection
              key={index}
              index={index}
              formData={formData}
              handleChange={handleChange}
              handleAddWorkExperience={handleAddWorkExperience} // Pass the function here
              handleRemoveWorkExperience={handleRemoveWorkExperience} // Pass the remove function here
            />
          ))}

          {formData.educational_background.map((workItem, index) => (
          <EducationSection
            key={index}
            index={index}
            formData={formData}
            handleChange={handleChange}
            handleAddEducation={handleAddEducation} // Pass the function here
            handleRemoveEducation={handleRemoveEducation} // Pass the remove function here
          />
        ))}

          <SkillSetSection formData={formData} handleChange={handleChange} />

          <PortfolioSection formData={formData} handleChange={handleChange} />

          <button type="submit" className="submit-button">
            Send
          </button>
        </div>
      </form>
      {/* <button type="submit" className="submit-button" onClick={handlePrint}>
        print json
      </button> */}
    </>
  );
};

export default Home;
