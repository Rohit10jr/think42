import React, { useState, useEffect } from "react";
import search from "../../assets/images/search.png";
import bell from "../../assets/images/bell.png";
import user from "../../assets/images/user.png";
import jobLogo from "../../assets/images/JOB-NXT.png";
import styles from "./header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [userType, setUserType] = useState(null);
  // const navigate  = useNavigate();

  useEffect(() => {
    const userTypeFromStorage = localStorage.getItem("user_type");
    setUserType(userTypeFromStorage);
  }, []);

  const toggleMenu = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  // const ahndleAddJob = () =>{
  //   navigate("/create-jobs");
  // }  

  return (
    <header className={styles.jobHeader}>
      <div className={styles.container}>
        {/* Logo on the left */}
        <div className={styles.headerLeft}>
          <Link to="/">
            <img src={jobLogo} alt="JobNext Logo" />
          </Link>

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

          {userType === "Employer" && (
            <a className={styles.addJobButton} href="/create-jobs">
              Add Job
            </a>
          )}
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
            className={`${styles.dropdownMenu} ${isDropdownVisible ? styles.show : ""
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
