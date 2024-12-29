import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./JobDetail.module.css";
import api from "../services/api.jsx";
import Header from "../components/Home/header";
import Footer from "../components/Home/footer";
import Money from "../assets/images/money.png";
import Suitcase from "../assets/images/suitcase.png";
import Location from "../assets/images/location.png";
import Calendar from "../assets/images/calendar.png";
import BookMark from "../assets/images/bookmark.png";
import JobLogo from "../assets/images/job.png";
const JobDetail = () => {
  const { id } = useParams(); // Extract job ID from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch job details
    const fetchJob = async () => {
      try {
        const response = await  api.get(`/jobs/${id}/`);
        setJob(response.data);
      } catch (err) {
        setError("Failed to load job details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <div>Loading job details...</div>;
  if (error) return <div>{error}</div>;
  if (!job) return <div>Job not found.</div>;

  return (
    <>
    <Header />
      <div>
        <div className={styles.jobCard}>
          <div className={styles.jobInnerCard}>
            <div className={styles.logo}>
              <img src={JobLogo} alt="Logo" />
            </div>
            <div className={styles.jobDetails}>
              <h3>{job.title}</h3>
              <p>
                <div className={styles.jobInfoRow}>
                  <span className={styles.jobDetailsSpan}>
                    <img className={styles.jobDetailsSpanImg} src={Suitcase} alt="" />
                    {job.department}, {job.industry}
                  </span>
                  <span className={styles.jobDetailsSpan}>
                    <img className={styles.jobDetailsSpanImg} src={Location} alt="" />
                    {job.location}
                  </span>
                  <span className={styles.jobDetailsSpan}>
                    <img className={styles.jobDetailsSpanImg}  src={Calendar} alt="" />
                    {new Date(job.posted_date).toLocaleDateString()}
                  </span>
                </div>
                <div className={styles.salaryInfo}>
                  <span className={styles.jobDetailsSpan}>
                    <img className={styles.jobDetailsSpanImg} src={Money} alt="" />
                    {job.salary || "Not Disclosed"}
                  </span>
                </div>
              </p>
              <div className={styles.jobTags}>
                <span className={styles.jobTagFullTime}>
                  {job.employment_type}
                </span>
                <span className={styles.jobTagUrgent}>Urgent</span>
                {/* {job.is_urgent && <span className={styles.jobTagUrgent}>Urgent</span>} */}
              </div>

            </div>
            <div className={styles.applicationInfo}>
              <span className={styles.applicationEnd}>
                Application ends:{" "}
                <span className={styles.timing}>
                  {new Date(job.application_end_date).toLocaleDateString()}
                </span>
              </span>
              <div className={styles.applySave}>
                <button className={styles.applyNow}>Apply Now</button>
                <div className={styles.saveSpan}>
                  <img className={styles.save} src={BookMark} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description, Experience, and Skills Section */}
        <div className={styles.jobAdditionalDetails}>
          <section className={styles.jobDescription}>
            <h4>Job Description</h4>
            <p>{job.job_description}</p>
          </section>

          {/* <section className={styles.jobExperience}>
            <h4>Experience</h4>
            <p>{job.experience}</p>
          </section>

          <section className={styles.jobSkills}>
            <h4>Skills</h4>
            <ul>
              {job.skills.split(",").map((skill, index) => (
                <li key={index}>{skill.trim()}</li>
              ))}
            </ul>
          </section> */}
        </div>
      </div >

    </>
  );
};

export default JobDetail;
