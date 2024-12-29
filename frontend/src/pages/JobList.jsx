import React from "react";
import Header from "../components/Home/header";
import JobCard from "../components/Jobs/jobCard";
import { useState, useEffect } from "react";
import api from "../services/api.jsx";
import Footer from "../components/Home/footer";
import styles from "./JobList.module.css";


const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch jobs from the backend
        const fetchJobs = async () => {
            try {
                const response = await api.get("/jobs/");
                setJobs(response.data);
                console.log("Fetching jobs...");
            } catch (err) {
                setError("Failed to fetch jobs. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) return <div>Loading jobs...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Header />
            <div className={styles.jobHeading}>
                <h1 className={styles.jobTitle}>Software Developer Jobs</h1>
                <p className={styles.jobSubtitle}>Home Jobs&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;Semiconductor Product&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;Engineering</p>
            </div>
            <div className={styles.jobPageContainer}>
                {/* Filter Section */}
                <div className={styles.filterSection}>
                    <h3>Filter Jobs</h3>
                    <ul className={styles.filterList}>
                        <li>Location</li>
                        <li>Job Type</li>
                        <li>Salary Range</li>
                        <li>Experience Level</li>
                    </ul>
                </div>
                {/* Job List Section */}
                <div className={styles.jobListContainer}>
                    {jobs.length === 0 ? (
                        <div>No jobs available.</div>
                    ) : (
                        jobs.map((job) => <JobCard key={job.id} job={job} />)
                    )}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default JobList;