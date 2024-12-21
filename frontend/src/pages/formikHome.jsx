import React, { useState, useRef } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const AutoFillForm = () => {
  const [fileName, setFileName] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Initial form values
  const initialValues = {
    personal_information: {
      full_name: "",
      email: "",
      mobile: "",
    }
  };

  // Validation schema
  const validationSchema = Yup.object({
    full_name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    mobile: Yup.string()
      .matches(
        /^\d{3}-\d{3}-\d{4}$/,
        "Mobile number must be in the format XXX-XXX-XXXX"
      )
      .required("Mobile number is required"),
    file: Yup.mixed().required("File is required"), // File validation
  });

  // First function: Simulates a GET request to fetch data
  const fetchUserData = async () => {
    setLoading(true);
    try {
      // Simulate an API call
      const response = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              personal_information: {
                full_name: "John Doe",  
                email: "johndoe@example.com",
                mobile: "123-456-7890",
              },
            }),
          1000
        )
      );

      // Once data is fetched, call the second function
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Second function: Updates the form values
  const updateFormikValues = (setFieldValue, userData) => {
    if (userData && userData.personal_information) {
      // Use the proper nested structure to update Formik values
      setFieldValue("personal_information.full_name", userData.personal_information.full_name);
      setFieldValue("personal_information.email", userData.personal_information.email);
      setFieldValue("personal_information.mobile", userData.personal_information.mobile);
    } else {
      alert("Failed to fetch data");
    }
  };

  const handleResumeParse = async (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      // setFileName(file.name);
      // setFieldValue("file", file);
      // console.log("Parsing resume:", file.name);

      const formData = new FormData();
      formData.append("resume_file", file);

      try {
        // Make the API request to parse the resume
        const response = await fetch(
          "http://127.0.0.1:8000/api/resume-parse/",
          {
            method: "POST",
            body: formData,
          }
        );

        // Check if the response is successful
        if (response.ok) {
          const parsedData = await response.json();
          console.log("Parsed Resume Data:", parsedData);

          // const parsedDataOG = JSON.parse(
          //   parsedData.replace(/```json|```/g, "").trim()
          // );

          // console.log("cleared parsed json using old logic", parsedDataOG);


    
          // const parsedJson = JSON.parse(parsedData.parsed_data.trim());
          //   const personalInformation = parsedJson.personal_information;
          // console.log("Extracted Personal Information:", personalInformation);
          // setFieldValue("personalInformation", personalInformation);

          // let parsedDataStr = parsedData.parsed_data;
          // parsedDataStr = parsedDataStr.replace(/'/g, '"').trim();

          let parsedDataStr = parsedData.parsed_data;
          console.log("Raw parsed_data:", parsedDataStr);
          parsedDataStr = parsedDataStr
          .replace(/^```json\n/, "")
          .replace(/'/g, '"')        
          .trim();   
          
          parsedDataStr =parsedDataStr.replace(/```$/, "")      
          // parsedDataStr = parsedDataStr.replace(/```json|```/g, "").trim()


          console.log("Cleaned parsed_data:", parsedDataStr);
          const parsedJson = JSON.parse(parsedDataStr);
          console.log("Parsed JSON:", parsedJson);

          handleUpdateValues(setFieldValue, parsedJson);

        } else {
          // Handle error case
          console.error("Failed to parse resume:", response.statusText);
        }
      } catch (error) {
        // Handle network or other errors
        console.error("Error parsing resume:", error);
      }

      // Pass this data to handleUpdateValues
      
    }
  };

  const handleUpdateValues = async (setFieldValue, userData) => {
    console.log("Updating form values with user data:", userData);

    if (userData && userData.personal_information) {
      // Use the proper nested structure to update Formik values
      setFieldValue("personal_information.full_name", userData.personal_information.full_name);
      setFieldValue("personal_information.email", userData.personal_information.email);
      setFieldValue("personal_information.mobile", userData.personal_information.mobile);
    } else {
      alert("Failed to fetch data");
    }
  };

  // Function to handle form submission (including the file upload)
  const handleFormSubmit = async (values) => {
    console.log("File upload:", values.file);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <label htmlFor="fullName">Full Name</label>
              <Field
                type="text"
                id="fullName"
                name="personal_information.full_name"
                placeholder="Enter your full name"
              />
              <ErrorMessage name="fullName" component="div" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="personal_information.email"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label htmlFor="mobile">Mobile</label>
              <Field
                type="text"
                id="mobile"
                name="personal_information.mobile"
                placeholder="Enter your mobile number"
              />
              <ErrorMessage name="mobile" component="div" />
            </div>

            <div>
              <label htmlFor="file">Resume (PDF, DOCX, etc.)</label>
              <input
                type="file"
                id="file"
                name="file"
                accept=".pdf,.docx,.txt" // Restrict accepted file types
                ref={fileInputRef}
                onChange={(e) => handleResumeParse(e, setFieldValue)}

                // onClick={async () => {
                //   const userData = await handleResumeParse(); // Fetch data
                //   handleUpdateValues(setFieldValue, userData); // Update formik values
                // }}

                // Trigger on file selection
              />
              {fileName && <div>File selected: {fileName}</div>}{" "}
              {/* Show file name */}
              <ErrorMessage name="file" component="div" />
            </div>

            <div>
              <button
                type="button"
                onClick={async () => {
                  const userData = await fetchUserData();
                  updateFormikValues(setFieldValue, userData);
                }}
                disabled={loading}
              >
                {loading ? "Loading..." : "Auto Fill Fields"}
              </button>
            </div>

            <div>
              <button type="submit" disabled={loading || isUploading}>
                {loading || isUploading ? "Uploading..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AutoFillForm;
