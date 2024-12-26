import React from "react";
import Header from "../components/Home/header";
import JobCard from "../components/Jobs/jobCard";
import { useState, useEffect } from "react";
import api from "../services/api.jsx";


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
      <div className="job-list">
        {jobs.length === 0 ? (
          <div>No jobs available.</div>
        ) : (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </>
  );
};

export default JobList;
