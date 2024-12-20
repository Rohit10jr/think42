import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

// Define the initial values for the form
const initialValues = {
  name: ''
};

// A simple validation function
const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Name is required';
  }
  return errors;
};

// Our main App component
function App() {
  return (
    <div className="App">
      <h1>Simple Form with Formik</h1>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values) => {
          console.log(values); // Handle the form submission
        }}
      >
        {() => (
          <Form>
            <div>
              <label htmlFor="name">Name: </label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
