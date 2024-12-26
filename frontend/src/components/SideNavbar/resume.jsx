import React, { useState, useEffect } from "react";
import api from "../../services/api";

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
    <div>
      <h2>Resume and Cover Letter</h2>

      {/* Display current resume and cover letter */}
      <div>
        <p>
          Resume:{" "}
          {resume ? (
            <a href={resume} target="_blank" rel="noopener noreferrer">
              View Resume
            </a>
          ) : (
            "Not uploaded"
          )}
        </p>
        <p>
          Cover Letter:{" "}
          {coverLetter ? (
            <a href={coverLetter} target="_blank" rel="noopener noreferrer">
              View Cover Letter
            </a>
          ) : (
            "Not uploaded"
          )}
        </p>
      </div>

      {/* File upload form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Upload Resume:
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeChange} />
          </label>
        </div>
        <div>
          <label>
            Upload Cover Letter:
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleCoverLetterChange}
            />
          </label>
        </div>
        <button type="submit">Update Files</button>
      </form>

      {/* Display status messages */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default Resume;
