import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AutoFillForm = () => {
  const [loading, setLoading] = useState(false); // To show loading state

  // Initial form values
  const initialValues = {
    fullName: '',
    email: '',
    mobile: '',
  };

  // Validation schema
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    mobile: Yup.string()
      .matches(/^\+?\d{1,4}[-\s]?\(?\d{1,3}\)?[-\s]?\d{1,3}[-\s]?\d{1,4}$/, 'Mobile number must be a valid format')
      .required('Mobile number is required'),
  });

  // Simulated function for fetching user data from the backend
  const fetchUserData = async () => {
    setLoading(true);
    try {
      // Simulating a response from your backend
      const response = {
        personal_information: {
          full_name: 'Rohit J',
          email: 'rohitjworkspace@gmail.com',
          mobile: '+916374851119',
        },
      };

      // Return the personal information object
      return response.personal_information;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to update Formik form values with the fetched data
  const updateFormikValues = (setFieldValue, userData) => {
    if (userData) {
      setFieldValue('fullName', userData.full_name);
      setFieldValue('email', userData.email);
      setFieldValue('mobile', userData.mobile);
    } else {
      alert('Failed to fetch data');
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form submitted with values:', values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div>
              <label htmlFor="fullName">Full Name</label>
              <Field
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
              />
              <ErrorMessage name="fullName" component="div" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <label htmlFor="mobile">Mobile</label>
              <Field
                type="text"
                id="mobile"
                name="mobile"
                placeholder="Enter your mobile number"
              />
              <ErrorMessage name="mobile" component="div" />
            </div>

            <div>
              <button
                type="button"
                onClick={async () => {
                  const userData = await fetchUserData(); // Fetch data
                  updateFormikValues(setFieldValue, userData); // Update formik values
                }}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Auto Fill Fields'}
              </button>
            </div>

            <div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AutoFillForm;
