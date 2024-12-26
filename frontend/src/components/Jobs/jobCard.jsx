import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="job-card" onClick={() => navigate(`/jobs/${job.id}`)}>
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>Salary: {job.salary || "Not Disclosed"}</p>
    </div>
  );
};

export default JobCard;
