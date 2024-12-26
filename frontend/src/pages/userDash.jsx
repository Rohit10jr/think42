import React, { useState } from "react";
import Header from "../components/Home/header";
// import "./userDash.css";
import user from "../assets/images/user.png";
import Dashboard from "../components/SideNavbar/dashboard";
import Profile from "../components/SideNavbar/profile";
import Resume from "../components/SideNavbar/resume";
import Applied from "../components/SideNavbar/applied";
import Alerts from "../components/SideNavbar/alert";

// Import images for pages
import ProfileIcon from "../assets/images/user_profile.png";
import userIcon from "../assets/images/user-avatar.png";
import ReportIcon from "../assets/images/report.png";
import ApplyIcon from "../assets/images/apply.png";
import AlertIcon from "../assets/images/alerts.png";
import CvIcon from "../assets/images/cv.png";
import BookmarkIcon from "../assets/images/bookmark.png";
import MessageIcon from "../assets/images/chat.png";
import MeetingIcon from "../assets/images/focus-group.png";
import styles from "./userDash.module.css";

const UserDash = () => {
  const [activePage, setActivePage] = useState("Dashboard");

  // Map of page names to images
  const pageImages = {
    "User Dashboard": ReportIcon,
    // "My Profile": ProfileIcon,
    "My Profile": userIcon,
    "My Resume": CvIcon,
    "Applied Jobs": ApplyIcon,
    "Saved Jobs": BookmarkIcon,
    "Job Alerts": AlertIcon,
    Messages: MessageIcon,
    Meetings: MeetingIcon,
  };

  const renderContent = () => {
    switch (activePage) {
      case "User Dashboard":
        return <Dashboard />;
      case "My Profile":
        return <Profile />;
      case "My Resume":
        return <Resume />;
      case "Applied Jobs":
        return <Applied />;
      case "Saved Jobs":
        return <Applied />;
      case "Job Alerts":
        return <Alerts />;
      case "Messages":
        return <Alerts />;
      case "Meetings":
        return <Alerts />;
      default:
        return <Profile />;
    }
  };

  return (
    <>
      <Header />

      <div className={styles.mainWrapper}>
        {/* Sidebar */}
        <div className={styles.sideBar}>
          {/* <div className="user-profile">
            <img src={user} className="profile" alt="User Picture" />
            <h3>Rohit JR</h3>
          </div> */}

          <div className={styles.profileContainer}>
            <img src={ProfileIcon} alt="" className={styles.profileImg} />
            <div className={styles.profileInfo}>
              <div className={styles.profileName}>Rohit</div>
              <a href="#" className={styles.profileButton}>
                View Profile
              </a>
            </div>
          </div>

            {[
              "User Dashboard",
              "My Profile",
              "My Resume",
              "Applied Jobs",
              "Saved Jobs",
              "Job Alerts",
              "Messages",
              "Meetings",
            ].map((page) => (
              
              <div
                key={page}
                className={styles.navItem}
                onClick={() => setActivePage(page)}
              >
                <img
                  src={pageImages[page]}
                  alt={`${page} Icon`}
                  // className="nav-icon"
                />
                {page}
              </div>
            ))}
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>{renderContent()}</div>
      </div>
    </>
  );
};

export default UserDash;
