import React, { useState } from "react";
import Header from "../components/Home/header";
import "./userDash.css";
import user from "../assets/images/user.png";
import Dashboard from "../components/example/dashboard";
import Profile from "../components/example/profile";
import Resume from "../components/example/resume";
import Applied from "../components/example/applied";
import Alerts from "../components/example/alert";

// Import images for pages
import ReportIcon from "../assets/images/report.png";
import ApplyIcon from "../assets/images/apply.png";
import AlertIcon from "../assets/images/alerts.png";
import ProfileIcon from "../assets/images/user_profile.png";
import CvIcon from "../assets/images/cv.png";
const UserDash = () => {
  const [activePage, setActivePage] = useState("Dashboard");

  // Map of page names to images
  const pageImages = {
    "User Dashboard": ReportIcon,
    Profile: ProfileIcon,
    "My Resume": CvIcon,
    Applied: ApplyIcon,
    "Job Alerts": AlertIcon,
  };

  const renderContent = () => {
    switch (activePage) {
      case "User Dashboard":
        return <Dashboard />;
      case "Profile":
        return <Profile />;
      case "My Resume":
        return <Resume />;
      case "Applied":
        return <Applied />;
      case "Job Alerts":
        return <Alerts />;
      default:
        return <Profile />;
    }
  };

  return (
    <>
      <Header />

      <div className="main-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="user-profile">
            <img src={user} className="profile" alt="User Picture" />
            <h3>Rohit JR</h3>
          </div>
          <ul className="nav-menu">
            {[
              "User Dashboard",
              "Profile",
              "My Resume",
              "Applied",
              "Job Alerts",
            ].map((page) => (
              <li key={page} onClick={() => setActivePage(page)}>
                <img
                  src={pageImages[page]}
                  alt={`${page} Icon`}
                  className="nav-icon"
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "10px",
                    marginLeft: "5px",
                  }}
                />
                {page}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">{renderContent()}</div>
      </div>
    </>
  );
};

export default UserDash;
