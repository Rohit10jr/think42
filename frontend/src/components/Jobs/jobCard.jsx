import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./JobCard.module.css";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.jobCard}
      onClick={() => navigate(`/jobs/${job.id}`)}
    >
      <div className={styles.jobCardHeader}>
        <h3 className={styles.jobTitle}>{job.title}</h3>
        <span className={styles.companyName}>{job.company}</span>
      </div>
      <div className={styles.jobCardBody}>
        <p className={styles.jobLocation}>
          <img
            src="../images/location-icon.png"
            alt="Location"
            className={styles.icon}
          />
          {job.location}
        </p>
        <p className={styles.jobSalary}>
          <img
            src="../images/salary-icon.png"
            alt="Salary"
            className={styles.icon}
          />
          Salary: {job.salary || "Not Disclosed"}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
