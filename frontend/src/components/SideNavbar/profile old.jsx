import React from 'react';
import { useState } from 'react';
import { debounce } from "lodash";
import { useEffect } from 'react';

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

  useEffect(() => {
    let isMounted = true; // Track if component is mounted

    const fetchUserDetails = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/user/details", {
          email: "rohitjworkspace@gmail.com",
        });

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       const response = await axios.post("http://127.0.0.1:8000/api/user/details", {
  //         email: "rohitjworkspace@gmail.com",
  //       });

  //       const data = response.data;

  //       // Map the response to the formData structure
  //       setFormData({
  //         personal_information: {
  //           full_name: data.personal_information.full_name || "",
  //           email: data.personal_information.email || "",
  //           mobile: data.personal_information.mobile || "",
  //         },
  //         address_information: {
  //           address: data.address_information.address || "",
  //           city: data.address_information.city || "",
  //           state: data.address_information.state || "",
  //           zip_code: data.address_information.zip_code || "",
  //           country: data.address_information.country || "",
  //         },
  //         educational_background: data.educational_background.map((edu) => ({
  //           degree: edu.degree || "",
  //           institution: edu.institution || "",
  //           field_of_study: edu.field_of_study || "",
  //           graduation_year: edu.graduation_year || "",
  //           gpa: edu.gpa || "",
  //         })),
  //         work_experience: data.work_experience.map((work) => ({
  //           job_title: work.job_title || "",
  //           company_name: work.company_name || "",
  //           start_date: work.start_date || "",
  //           end_date: work.end_date || "",
  //           responsibilities: work.responsibilities || "",
  //         })),
  //         skill_set: {
  //           skills: data.skill_set.skills || [],
  //         },
  //         portfolio: {
  //           linkedin_url: data.portfolio.linkedin_url || "",
  //           github_url: data.portfolio.github_url || "",
  //           other_url: data.portfolio.other_url || "",
  //         },
  //       });
  //     } catch (error) {
  //       console.error("Error fetching user details:", error);
  //     }
  //   };

    fetchUserDetails();
  }, []);

  

  return <>

  {/* user fields */}
  <div className="form-container">
    {/* Personal Information Section */}
    <h3 class>User details</h3>
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
          placeholder="Full Name"
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
          placeholder="Email"
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
          placeholder="Mobile"
        />
      </div>
    </div>
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
          placeholder="Address"
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
          placeholder="City"
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
          placeholder="State"
        />
      </div>
      <div className="input-container">
        <label className="input-label" htmlFor="zip-code">
          Zip Code
        </label>
        <input
          type="text"
          id="zip-code"
          className="input-field"
          placeholder="Zip Code"
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
          placeholder="Country"
        />
      </div>
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
          placeholder="Degree"
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
          placeholder="Institution"
        />
      </div>
      <div className="input-container">
        <label className="input-label" htmlFor="field-study-1">
          Field of Study
        </label>
        <input
          type="text"
          id="field-study-1"
          className="input-field"
          placeholder="Field of Study"
        />
      </div>
      <div className="input-container">
        <label className="input-label" htmlFor="graduation-year-1">
          Graduation Year
        </label>
        <input
          type="text"
          id="graduation-year-1"
          className="input-field"
          placeholder="Graduation Year"
        />
      </div>
    </div>
    {/* Work Experience Section */}
    <div className="section">
      <h2 className="user-info-h2">Work Experience</h2>
      <div className="input-container">
        <label className="input-label" htmlFor="company-1">
          Company Name
        </label>
        <input
          type="text"
          id="company-1"
          className="input-field"
          placeholder="Company Name"
        />
      </div>
      <div className="input-container">
        <label className="input-label" htmlFor="job-title-1">
          Job Title
        </label>
        <input
          type="text"
          id="job-title-1"
          className="input-field"
          placeholder="Job Title"
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
          placeholder="Responsibilities"
        />
      </div>
    </div>
    {/* Portfolio Section */}
    <div className="section">
      <h2 className="user-info-h2">Portfolio</h2>
      <div className="input-container">
        <label className="input-label" htmlFor="company-1">
          Linkedin Link
        </label>
        <input
          type="text"
          id="company-1"
          className="input-field"
          placeholder="Linkedin Link"
        />
      </div>
      <div className="input-container">
        <label className="input-label" htmlFor="job-title-1">
          Github Link
        </label>
        <input
          type="text"
          id="job-title-1"
          className="input-field"
          placeholder="Github Link"
        />
      </div>
    </div>
  </div>
</>
}

export default Profile;
