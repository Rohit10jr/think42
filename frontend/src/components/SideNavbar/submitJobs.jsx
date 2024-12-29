import React, { useState } from "react";
import { useFormik } from 'formik';
// import axios from 'axios';
import styles from './submitJobs.module.css';
import api from "../../services/api.jsx";

const JobPostForm = () => {
    const [message, setMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            title: '',
            company: '',
            experience: '',
            salary: '',
            location: '',
            job_description: '',
            education: '',
            skills: '',
            role: '',
            industry: '',
            department: '',
            employment_type: '',
            // employer: ''
        },
        onSubmit: async (values, { resetForm })=> {
          setMessage(""); // Clear previous message
          console.log("subit button clicked")
          try {
    
            const payload = {
              title: values.title,
              company: values.company,
              experience: values.experience,
              salary: values.salary,
              location: values.location,
              job_description: values.job_description,
              education: values.education,
              skills: values.skills,
              role: values.role,
              industry: values.industry,
              department: values.department,
              employment_type: values.employment_type,
            };

            console.log("inside the try block")
            console.log(payload)
            const response = await api.post("jobs/", payload);
    
            if (response.status === 201) {
              setMessage("Job post has been created successfully!");
              resetForm();
            } else {
              setMessage("Something went wrong. Please try again.");
            }

            alert(message)
          } catch (error) {
            console.error("Error while creating job post:", error);
            setMessage("Error: Unable to create job post. Please try again.");
          }
        },
      });
    
    return (
        <div className={styles.formContainer}>
            <form onSubmit={formik.handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title">Job Title <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter job title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="company">Company <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Enter company name"
                        onChange={formik.handleChange}
                        value={formik.values.company}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="experience">Experience <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="text"
                        id="experience"
                        name="experience"
                        placeholder="Enter experience (e.g., 2-5 years)"
                        onChange={formik.handleChange}
                        value={formik.values.experience}
                        required
                    />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="salary">Salary</label>
                        <input
                            type="text"
                            id="salary"
                            name="salary"
                            placeholder="Enter salary"
                            onChange={formik.handleChange}
                            value={formik.values.salary}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Enter location"
                            onChange={formik.handleChange}
                            value={formik.values.location}
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="job_description">Job Description <span style={{ color: 'red' }}>*</span></label>
                    <textarea
                        id="job_description"
                        name="job_description"
                        rows="5"
                        placeholder="Enter job description"
                        onChange={formik.handleChange}
                        value={formik.values.job_description}
                        required
                    ></textarea>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="education">Education </label>
                    <input
                        type="text"
                        id="education"
                        name="education"
                        placeholder="Enter education requirements"
                        onChange={formik.handleChange}
                        value={formik.values.education}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="skills">Skills <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="text"
                        id="skills"
                        name="skills"
                        placeholder="Enter required skills"
                        onChange={formik.handleChange}
                        value={formik.values.skills}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="role">Role </label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        placeholder="Enter job role"
                        onChange={formik.handleChange}
                        value={formik.values.role}
                        required
                    />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="industry">Industry</label>
                        <input
                            type="text"
                            id="industry"
                            name="industry"
                            placeholder="Enter industry"
                            onChange={formik.handleChange}
                            value={formik.values.industry}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="department">Department</label>
                        <input
                            type="text"
                            id="department"
                            name="department"
                            placeholder="Enter department"
                            onChange={formik.handleChange}
                            value={formik.values.department}
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="employment_type">Employment Type</label>
                    <select
                        id="employment_type"
                        name="employment_type"
                        onChange={formik.handleChange}
                        value={formik.values.employment_type}
                    >
                        <option value="">Select employment type</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>
{/* 
                <div className={styles.formGroup}>
                    <label htmlFor="employer">Employer</label>
                    <input
                        type="text"
                        id="employer"
                        name="employer"
                        placeholder="Enter employer name"
                        onChange={formik.handleChange}
                        value={formik.values.employer}
                    />
                </div> */}

                <button type="submit">Create Job Post</button>
            </form>
        </div>
    );
};

export default JobPostForm;
