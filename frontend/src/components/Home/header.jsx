import React, { useState } from "react";
import search from "../../assets/images/search.png";
import bell from "../../assets/images/bell.png";
import user from "../../assets/images/user.png";
import jobLogo from "../../assets/images/JOB-NXT.png";
import styles from "./header.module.css";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleMenu = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <header className={styles.jobHeader}>
      <div className={styles.container}>
        {/* Logo on the left */}
        <div className={styles.headerLeft}>
          <img src={jobLogo} alt="JobNext Logo" />
        </div>

        {/* Navigation in the center */}
        <nav className={styles.headerNav}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Jobs
          </NavLink>
          <NavLink
            to="/companies"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Companies
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Dashboard
          </NavLink>
        </nav>

        {/* Icons and Logout on the right */}
        <div className={styles.headerRight}>
          <img src={search} alt="Search Icon" className={styles.icon} />
          <img src={bell} alt="Notifications Icon" className={styles.icon} />
          <img src={user} alt="User Profile Icon" className={styles.icon} />
          <a href="/logout" className={styles.logout}>
            Logout
          </a>

          <div className={styles.hamburger} onClick={toggleMenu}>
            <div className={styles.big}></div>
            <div className={styles.small}></div>
            <div className={styles.big}></div>
            <div className={styles.small}></div>
          </div>

          <div
            className={`${styles.dropdownMenu} ${
              isDropdownVisible ? styles.show : ""
            }`}
          >
            <a href="/dashboard">User Dashboard</a>
            <a href="/profile">My Profile</a>
            <a href="/resume">My Resume</a>
            <a href="/applications">Applications</a>
            <a href="/saved-jobs">Saved Jobs</a>
            <a href="/alerts">Alerts</a>
            <a href="/help">Help</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
