import React from "react";
import styles from "./upload.module.css";
const ResumeUpload = ({
  handleUploadClick,
  handleResumeParse,
  fileInputRef,
  fileName,
  isUploading,
  setFieldValue,
}) => {
  return (
    <div className={styles.resumeUploadSection}>
      <div className={styles.resumeHeader}>
        <h2 className={styles.resumeTitle}>Autofill Application</h2>
        <p className={styles.uploadDescription}>
          Upload your resume/CV in seconds with the autofill option.
        </p>
      </div>
      <div className={styles.uploadBox} onClick={handleUploadClick}>
        <p className={styles.uploadText}>
          <span className={styles.uploadLink}>Upload your resume</span> or drag
          and drop it here
        </p>
        {fileName ? (
          <p className={styles.uploadedFile}>Uploaded File: {fileName}</p>
        ) : (
          <>
            <p className={styles.uploadFileTypes}>
              Only .doc, .docx, .pdf, .odt, .rtf
            </p>
            <p className={styles.uploadOptional}>(Optional)</p>
          </>
        )}
      </div>
      {isUploading && <p className={styles.uploadStatus}>Uploading...</p>}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".pdf,.doc,.docx"
        onChange={(e) => handleResumeParse(e, setFieldValue)}
      />
    </div>
  );
};

export default ResumeUpload;