import React from "react";
// import InputField from "./iput";

const SkillSetSection = ({ formData, handleChange }) => {
  return (
    <div className="section">
      <h2 className="user-info-h2">Skill Set</h2>
      <div className="input-container">
        <label className="input-label" htmlFor="skills">
          Skills
        </label>
        <textarea
          id="skills"
          className="input-field"
          // value={formData.skill_set.skills.join(", ")} // Assuming skills are stored as an array
          value={formData.skill_set.skills}
          onChange={(e) => handleChange(e, "skill_set", "skills")}
          rows="3"
        />
      </div>
    </div>
  );
};

export default SkillSetSection;
