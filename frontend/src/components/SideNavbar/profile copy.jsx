import React from "react";
import { useState } from "react";
import { debounce } from "lodash";
import { useEffect } from "react";

// import PersonalInformationForm from "../components/Home/PersonalInformationForm";
import PersonalInformationSection from "../Home/personalsection.jsx";
import AddressInformationSection from "../Home/addresssection.jsx";
import SkillSetSection from "../Home/skill.jsx";
import WorkSection from "../Home/work.jsx";
import PortfolioSection from "../Home/portfolio.jsx";
import EducationSection from "../Home/education.jsx";
import api from "../../services/api.jsx";
import { useCallback } from "react"
function Profile() {
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
      skills: [],
    },
    portfolio: {
      linkedin_url: "",
      github_url: "",
      other_url: "",
    },
  });

  useEffect(() => {
    let isMounted = true; // Track if component is mounted

    const fetchUserDetails = async () => {
      try {
        const response = await api.get(
          "http://127.0.0.1:8000/api/user/details/",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (isMounted) {
          const data = response.data;

          // Map the response to the formData structure
          setFormData({
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
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to fetch user details. Please try again.");
          setLoading(false);
        }
      }
    };

    fetchUserDetails();

    return () => {
      isMounted = false; // Cleanup to prevent setting state after unmount
    };
  }, []);

  const handleFetch = async () => {
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
  const [emailStatus, setEmailStatus] = useState(null);
  
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


  const checkEmailAvailability = useCallback(debounce(async (email) => {
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

        // Clear email if unavailable
        setFormData((prev) => {
          const newData = { ...prev };
          newData.personal_information.email = "";
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
  }, 1500),
  [] // Empty dependency array ensures this function is memoized
);

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

    if (key === "email") {
      if (!value.trim()) {
        setEmailStatus(null);
        return;
      }
      checkEmailAvailability(value);
    }
  };

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access_token");
      console.log(accessToken); // Include the Bearer token// Retrieve the token from localStorage

      console.log(JSON.stringify(formData));

      const response = await api.put(
        "http://127.0.0.1:8000/api/user/details/",
        formData,
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

  const handlePrint = () => {
    // const accessToken = localStorage.getItem("access_token");
    // console.log(accessToken);
    console.log(formData);
  };

  return (
    <>
      <h3>User details</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-container-dash">
          <PersonalInformationSection
            formData={formData}
            handleChange={handleChange}
            emailStatus={emailStatus}
          />
          <AddressInformationSection
            formData={formData}
            handleChange={handleChange}
          />

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
      {/* <button onClick={handlePrint}>print state</button>
      <button onClick={handleFetch}>print data from backend</button> */}
    </>
  );
}

export default Profile;
