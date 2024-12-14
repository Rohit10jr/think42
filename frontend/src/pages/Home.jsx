import React from "react";
import "./LandingPage.css";
import AutoFill from "../components/Form/Autofill";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="navbar">
        <div className="navbar-logo">ThinkJobs</div>
        <nav className="navbar-links">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#jobs">Jobs</a>
          <a href="#contact">Contact</a>
          {/* <a href="#logout" className="logout">Logout</a> */}
        </nav>
      </header>

      <main className="form-section">
        <h2 className="form-title">Create Your Profile</h2>

        <AutoFill />

        <form className="job-form">
          <fieldset className="form-group">
            <legend>Personal Information</legend>
            <label>
              {/* Full Name */}
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                required
              />
            </label>
            <label>
              {/* Email Address */}
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </label>
            <label>
              {/* Mobile Number */}
              <input
                type="tel"
                name="mobile"
                placeholder="Enter your mobile number"
                required
              />
            </label>
            <label>
              {/* Address */}
              <input
                type="text"
                name="address"
                placeholder="City, State, ZIP Code, Country"
                required
              />
            </label>
          </fieldset>

          <fieldset className="form-group">
            <legend>Educational Background</legend>
            <label>
              {/* Degree/Qualification */}
              <input
                type="text"
                name="degree"
                placeholder="Enter your degree or qualification"
                required
              />
            </label>
            <label>
              {/* Institution/University Name */}
              <input
                type="text"
                name="institution"
                placeholder="Enter your institution name"
                required
              />
            </label>
            <label>
              {/* Field of Study */}
              <input
                type="text"
                name="field"
                placeholder="Enter your field of study"
                required
              />
            </label>
            <label>
              {/* Graduation Year */}
              <input
                type="number"
                name="gradYear"
                placeholder="Enter your graduation year"
                required
              />
            </label>
            <label>
              {/* GPA/Percentage */}
              <input
                type="text"
                name="gpa"
                placeholder="Enter your GPA or percentage"
                required
              />
            </label>
          </fieldset>

          <fieldset className="form-group">
            <legend>Work Experience</legend>
            <label>
              {/* Job Title */}
              <input
                type="text"
                name="jobTitle"
                placeholder="Enter your job title"
                required
              />
            </label>
            <label>
              {/* Company Name */}
              <input
                type="text"
                name="companyName"
                placeholder="Enter your company name"
                required
              />
            </label>
            <label>
              {/* Employment Period */}
              <input
                type="text"
                name="employmentPeriod"
                placeholder="Start Date - End Date"
                required
              />
            </label>
            <label>
              {/* Responsibilities/Key Achievements */}
              <textarea
                name="responsibilities"
                placeholder="Enter your responsibilities or key achievements"
                required
              ></textarea>
            </label>
          </fieldset>

          <fieldset className="form-group">
            <legend>Skills</legend>
            <label>
              {/* Technical Skills */}
              <input
                type="text"
                name="technicalSkills"
                placeholder="Enter your technical skills"
                required
              />
            </label>
            <label>
              {/* Languages */}
              <input
                type="text"
                name="languages"
                placeholder="Enter the languages you know"
                required
              />
            </label>
          </fieldset>

          <fieldset className="form-group">
            <legend>Portfolio/Links</legend>
            <label>
              {/* LinkedIn Profile */}
              <input
                type="url"
                name="linkedin"
                placeholder="Enter your LinkedIn profile URL"
                required
              />
            </label>
            <label>
              {/* Portfolio/Projects */}
              <input
                type="url"
                name="portfolio"
                placeholder="Enter portfolio or project links"
                required
              />
            </label>
            <label>
              {/* GitHub Profile */}
              <input
                type="url"
                name="github"
                placeholder="Enter your GitHub profile URL"
                required
              />
            </label>
          </fieldset>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default LandingPage;
