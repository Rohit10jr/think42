import React, { useState, useRef } from "react";

const ResumeUpload = () => {
  const [fileName, setFileName] = useState(null); // State to store the uploaded file name
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    // Trigger the hidden file input's click event
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Update state with the file name
    }
  };

  return (
    <div className="section resume-upload" >
      <div className="resume-header">
        <h2>Autofill Application</h2>
        <p className="upload-description">
          Upload your resume/cv in seconds with the autofill option.
        </p>
      </div>
      <div className="upload-box" onClick={handleUploadClick}>
        <p className="upload-text">
          <span className="upload-link">Upload your resume</span> or drag and
          drop it here
        </p>
        {fileName ? (
          <p className="uploaded-file">Uploaded File: {fileName}</p> // Show file name after upload
        ) : (
          <>
          <p className="upload-filetypes">Only .doc, .docx, .pdf, .odt, .rtf</p> 
          <p className="upload-optional">(Optional)</p>
          </>
        )}
      </div>

      {/* Hidden file input */}
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
