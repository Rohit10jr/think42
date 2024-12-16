import React from "react";
import search from "../../assets/images/search.png";
import Bell from "../../assets/images/bell.png";
import user from "../../assets/images/user.png";
// import search from "../../assets/images/search";
import "./home.css";

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
          <a href="#" className="nav-link active">
            Home
          </a>
          <a href="#" className="nav-link">
            Jobs
          </a>
          <a href="#" className="nav-link">
            Companies
          </a>
          <a href="#" className="nav-link">
            Salaries
          </a>
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
