import React, { useState, useRef } from "react";

const ResumeUpload = ({ onParsedDataReceived }) => {
  const [fileName, setFileName] = useState(null); // State to store the uploaded file name
  const [isUploading, setIsUploading] = useState(false); // State for upload status
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger file input
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setIsUploading(true); // Set uploading status to true

      const formData = new FormData();
      formData.append("resume_file", file);

      try {
        const response = await fetch("http://127.0.0.1:8000/api/resume-parse/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const parsedData = await response.json();
          setIsUploading(false);
          onParsedDataReceived(parsedData.parsed_data); // Pass parsed data to the parent
        } else {
          setIsUploading(false);
          alert("Failed to parse the resume. Please try again.");
        }
      } catch (error) {
        setIsUploading(false);
        console.error("Error uploading resume:", error);
        alert("An error occurred while uploading the resume.");
      }
    }
  };

  return (
    <div className="section resume-upload">
      <div className="resume-header">
        <h2>Autofill Application</h2>
        <p className="upload-description">
          Upload your resume/CV in seconds with the autofill option.
        </p>
      </div>
      <div className="upload-box" onClick={handleUploadClick}>
        <p className="upload-text">
          <span className="upload-link">Upload your resume</span> or drag and drop it here
        </p>
        {fileName ? (
          <p className="uploaded-file">Uploaded File: {fileName}</p>
        ) : (
          <>
            <p className="upload-filetypes">Only .doc, .docx, .pdf, .odt, .rtf</p>
            <p className="upload-optional">(Optional)</p>
          </>
        )}
      </div>
      {isUploading && <p className="upload-status">Uploading...</p>}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".doc,.docx,.pdf,.odt,.rtf"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ResumeUpload;