import React from "react";
import search from "../../assets/images/search.png";
import Bell from "../../assets/images/bell.png";
import user from "../../assets/images/user.png";
// import search from "../../assets/images/search";
import "./home.css";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  return (
    <>
      {/* Job Site Header */}
      <header className="job-header">
        {/* Logo on the left */}
        <div className="header-left">
          <h1 className="site-logo">'Think-Jobs'</h1>
        </div>

        {/* Navigation in the center */}
        <nav className="header-nav">
      <NavLink
        to="/home"
        className={`nav-link ${location.pathname === "/home" ? "active" : ""}`}
      >
        Home
      </NavLink>
      <NavLink
        to="/jobs"
        className={`nav-link ${location.pathname === "/jobs" ? "active" : ""}`}
      >
        Jobs
      </NavLink>
      <NavLink
        to="/companies"
        className={`nav-link ${location.pathname === "/companies" ? "active" : ""}`}
      >
        Companies
      </NavLink>
      <NavLink
        to="/dash"
        className={`nav-link ${location.pathname === "/dash" ? "active" : ""}`}
      >
        Dashboard
      </NavLink>
    </nav>

        {/* Icons and Logout on the right */}
        <div className="header-right">
          <img src={search} alt="Search Icon" className="icon" />
          <img src={Bell} alt="Notifications" className="icon" />
          <img src={user} alt="User Profile" className="icon" />
          <a href="/logout" className="logout">
            Logout
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
