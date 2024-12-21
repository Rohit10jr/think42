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

  // Combined function to fetch user data and update form values
  const fetchAndUpdateUserData = async (setFieldValue) => {
    setLoading(true);
    try {
      // Simulate an API call to fetch user data
      const response = await new Promise((resolve) =>
        setTimeout(() => resolve({
          fullName: 'John Doe',
          email: 'johndoe@example.com',
          mobile: '123-456-7890',
        }), 1000)
      );

      // Once data is fetched, update the form values
      if (response) {
        setFieldValue('fullName', response.fullName);
        setFieldValue('email', response.email);
        setFieldValue('mobile', response.mobile);
      } else {
        alert('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data');
    } finally {
      setLoading(false);
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
                onClick={() => fetchAndUpdateUserData(setFieldValue)} // Call the combined function
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
