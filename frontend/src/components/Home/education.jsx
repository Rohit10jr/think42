import React from "react";

const Education = ({
  formData,
  handleChange,
  index,
  handleAddEducation,
  handleRemoveEducation,
}) => {
  const educationItem = formData.educational_background[index];

  return (
    <>
      {/* Educational Background Section */}
      <div className="section">
        <h2 className="user-info-h2">Educational Background {index + 1}</h2>

        <div className="input-container">
          <label className="input-label" htmlFor={`degree-${index}`}>
            Degree
          </label>
          <input
            type="text"
            id={`degree-${index}`}
            className="input-field"
            value={educationItem.degree}
            onChange={(e) =>
              handleChange(e, "educational_background", "degree", index)
            }
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor={`institution-${index}`}>
            Institution
          </label>
          <input
            type="text"
            id={`institution-${index}`}
            className="input-field"
            value={educationItem.institution}
            onChange={(e) =>
              handleChange(e, "educational_background", "institution", index)
            }
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor={`field_of_study-${index}`}>
            Field Of Study
          </label>
          <input
            type="text"
            id={`field_of_study-${index}`}
            className="input-field"
            value={educationItem.field_of_study}
            onChange={(e) =>
              handleChange(e, "educational_background", "field_of_study", index)
            }
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor={`graduation_year-${index}`}>
            Graduation Year
          </label>
          <input
            type="text"
            id={`graduation_year-${index}`}
            className="input-field"
            value={educationItem.graduation_year}
            onChange={(e) =>
              handleChange(
                e,
                "educational_background",
                "graduation_year",
                index
              )
            }
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor={`gpa-${index}`}>
            GPA
          </label>
          <input
            type="text"
            id={`gpa-${index}`}
            className="input-field"
            value={educationItem.gpa}
            onChange={(e) =>
              handleChange(e, "educational_background", "gpa", index)
            }
          />
        </div>

        {/* Button to add a new Education section */}
        {index === formData.educational_background.length - 1 && ( // Only show the button on the last section
          <button
            type="button"
            className="add-education-btn"
            onClick={handleAddEducation} // Trigger the function to add new education
          >
            Add Another Education
          </button>
        )}

        {/* Remove Section button: Only show if it's not the first section */}
        {formData.educational_background.length > 1 &&
          index !== 0 && ( // Prevent removing the first section if there's only one
            <button
              type="button"
              className="remove-education-btn"
              onClick={() => handleRemoveEducation(index)} // Call remove handler with current index
            >
              Remove This Education
            </button>
          )}
      </div>
    </>
  );
};

export default Education;
