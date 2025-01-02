import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./JobCard.module.css";
import bell from "../../assets/images/bell.png";
import bookmark from "../../assets/images/bookmark.png";
import check from "../../assets/images/check.png";
import Google from "../../assets/images/google.png";
import Location from "../../assets/images/location.png";
import Money from "../../assets/images/money.png";
const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className={styles.jobCard}
        onClick={() => navigate(`/jobs/${job.id}`)}
      >
        <div className={styles.jobInfo}>
          <div className={styles.jobIcon}>
            <img src={Google} alt="Job Icon" />
          </div>
          <div className={styles.jobCardHeader}>
            <h3 className={styles.jobTitle}>{job.title}</h3>
            <span className={styles.companyName}>{job.company}</span>

            <div className={styles.jobTags}>
                    <span className={styles.tag}>{job.location}</span>
                    <span className={styles.tag}>{job.salary || "Not Disclosed"}</span>
                    <span className={styles.tag}>{job.employment_type}</span>
                    <span className={styles.tag}>{job.experience} yr</span>
            </div>


          </div>
          {/* <div className={styles.jobCardBody}>
            <p className={styles.jobLocation}>
              <img
                src={Location}
                alt="Location"
                className={styles.icon}
              />
              {job.location}
            </p>
            <p className={styles.jobSalary}>
              <img
                src={Money}
                alt="Salary"
                className={styles.icon}
              />
              Salary: {job.salary || "Not Disclosed"}
            </p>
          </div> */}
          <div className={styles.jobActions}>
            <img src={bell} alt="Crown" />
            <img src={check} alt="Bookmark" />
            <img src={bookmark} alt="Lightning" />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobCard;
