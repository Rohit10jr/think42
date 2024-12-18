import React from "react";

const WorkSection = ({
  formData,
  handleChange,
  index,
  handleAddWorkExperience,
  handleRemoveWorkExperience,
}) => {
  const workItem = formData.work_experience[index];

  return (
    <div className="section">
      <h2 className="user-info-h2">Work Experience {index + 1}</h2>

      <div className="input-container">
        <label className="input-label" htmlFor={`job_title-${index}`}>
          Job Title
        </label>
        <input
          type="text"
          id={`job_title-${index}`}
          className="input-field"
          value={workItem.job_title}
          onChange={(e) =>
            handleChange(e, "work_experience", "job_title", index)
          }
        />
      </div>

      <div className="input-container">
        <label className="input-label" htmlFor={`company-${index}`}>
          Company Name
        </label>
        <input
          type="text"
          id={`company-${index}`}
          className="input-field"
          value={workItem.company_name}
          onChange={(e) =>
            handleChange(e, "work_experience", "company_name", index)
          }
        />
      </div>

      <div className="input-container">
        <label className="input-label" htmlFor={`start_date-${index}`}>
          Start Date
        </label>
        <input
          type="text"
          id={`start_date-${index}`}
          className="input-field"
          value={workItem.start_date}
          onChange={(e) =>
            handleChange(e, "work_experience", "start_date", index)
          }
        />
      </div>

      <div className="input-container">
        <label className="input-label" htmlFor={`end_date-${index}`}>
          End Date
        </label>
        <input
          type="text"
          id={`end_date-${index}`}
          className="input-field"
          value={workItem.end_date}
          onChange={(e) =>
            handleChange(e, "work_experience", "end_date", index)
          }
        />
      </div>

      <div className="input-container">
        <label className="input-label" htmlFor={`responsibilities-${index}`}>
          Responsibilities
        </label>
        <input
          type="text"
          id={`responsibilities-${index}`}
          className="input-field"
          value={workItem.responsibilities}
          onChange={(e) =>
            handleChange(e, "work_experience", "responsibilities", index)
          }
        />
      </div>

      {/* Button to add a new Work Experience section */}
      {index === formData.work_experience.length - 1 && ( // Only show the button on the last section
        <button
          type="button"
          className="add-work-btn"
          onClick={handleAddWorkExperience} // Trigger the function to add new work experience
        >
          Add more Work 
        </button>
      )}

      {/* Remove Section button: Only show if it's not the first section */}
      {index !== 0 && ( // Prevent removing the first section
        <button
          type="button"
          className="remove-work-btn"
          onClick={() => handleRemoveWorkExperience(index)} // Call remove handler with current index
        >
          Remove This Section
        </button>
      )}
    </div>
  );
};

export default WorkSection;
