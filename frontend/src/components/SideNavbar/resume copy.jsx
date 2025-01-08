import React, { useState, useEffect } from "react";
import api from "../../services/api";
// import "./resume.css"
import styles from './resume.module.css';

function Resume() {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [resumeFile, setResumeFile] = useState(null); // For new file uploads
  const [coverLetterFile, setCoverLetterFile] = useState(null); // For new file uploads
  const [message, setMessage] = useState("");

  // Fetch resume and cover letter when the component is shown
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get("/user-documents/");
        setResume(response.data.resume);
        setCoverLetter(response.data.cover_letter);
      } catch (error) {
        console.error("Error fetching documents:", error);
        setMessage("Failed to load documents.");
      }
    };

    fetchDocuments();
  }, []);

  // Handle file input changes
  const handleResumeChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const handleCoverLetterChange = (event) => {
    setCoverLetterFile(event.target.files[0]);
  };

  // Handle form submission to upload new files
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (resumeFile) formData.append("resume", resumeFile);
    if (coverLetterFile) formData.append("cover_letter", coverLetterFile);

    try {
      const response = await api.put("/user-documents/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message || "Files updated successfully!");

      // Refresh document data
      if (resumeFile) setResume(URL.createObjectURL(resumeFile));
      if (coverLetterFile) setCoverLetter(URL.createObjectURL(coverLetterFile));
      setResumeFile(null);
      setCoverLetterFile(null);
    } catch (error) {
      console.error("Error updating documents:", error);
      setMessage("Failed to update files.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Resume and Cover Letter</h2>

      {/* Display current resume and cover letter */}
      <div className={styles.currentFilesContainer}>
        <p>
          Resume:{" "}
          {resume ? (
            <a href={resume} target="_blank" rel="noopener noreferrer">
              View Resume
            </a>
          ) : (
            <span>Not uploaded</span>
          )}
        </p>
        <p>
          Cover Letter:{" "}
          {coverLetter ? (
            <a href={coverLetter} target="_blank" rel="noopener noreferrer">
              View Cover Letter
            </a>
          ) : (
            <span>Not uploaded</span>
          )}
        </p>
      </div>

       {/* File upload form */}
       <form onSubmit={handleSubmit}>
        {/* Resume and CV upload sections */}
        <div className={styles.resumeContainer}>
          <label>Upload Resume</label>
          <div>
            <label htmlFor="resume-upload" className={styles.browseButton}>
              Browse
            </label>
            <input
              type="file"
              id="resume-upload"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
            />
          </div>
          <p className={styles.fileInfo}>Upload file .pdf, .doc, .docx</p>
        </div>
        <div className={styles.resumeContainer}>
          <label>Upload CV</label>
          <div>
            <label htmlFor="cv-upload" className={styles.browseButton}>
              Browse
            </label>
            <input
              type="file"
              id="cv-upload"
              accept=".pdf,.doc,.docx"
              onChange={handleCoverLetterChange}
            />
          </div>
          <p className={styles.fileInfo}>Upload file .pdf, .doc, .docx</p>
        </div>
        <button className={styles.button} type="submit">
          Update Files
        </button>
      </form>

      {/* Display status messages */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Resume;