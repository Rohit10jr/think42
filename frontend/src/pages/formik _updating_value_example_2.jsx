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
      .matches(/^\d{3}-\d{3}-\d{4}$/, 'Mobile number must be in the format XXX-XXX-XXXX')
      .required('Mobile number is required'),
  });

  // First function: Simulates a GET request to fetch data
  const fetchUserData = async () => {
    setLoading(true);
    try {
      // Simulate an API call
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({
          fullName: 'John Doe',
          email: 'johndoe@example.com',
          mobile: '123-456-7890',
        }), 1000)
      );

      // Once data is fetched, call the second function
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Second function: Updates the form values
  const updateFormikValues = (setFieldValue, userData) => {
    if (userData) {
      setFieldValue('fullName', userData.fullName);
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
