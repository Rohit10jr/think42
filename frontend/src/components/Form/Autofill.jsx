import React, { useState } from "react";
import "./Autofill.css";

const AutofillApplication = () => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  return (
    <div className="autofill-container">
      {/* <h2>Autofill Application</h2> */}
      <p>Upload your resume/cv in seconds with the autofill option.</p>
      <label htmlFor="resume-upload" className="upload-box">
        {uploadedFile ? (
          <span>{uploadedFile.name}</span>
        ) : (
          <>
            <span className="upload-text">
              <strong>Upload your resume</strong> or drag and drop it here
            </span>
            {/* <span className="upload-format">
              Only .doc, .docx, .pdf, .odt, .rtf <br />
              (Optional)
            </span> */}
          </>
        )}
      </label>
      <input
        id="resume-upload"
        type="file"
        accept=".doc,.docx,.pdf,.odt,.rtf"
        onChange={handleFileUpload}
        className="hidden-input"
      />
    </div>
  );
};

export default AutofillApplication;
