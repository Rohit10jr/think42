import React, { useState } from 'react';
import GitHubUrlField from '../components/try/form_field';


// Main App component
function App() {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  
  // Validation function to check for valid GitHub URLs
  const validate = (name) => {
    const errors = {};
    // const githubUrlPattern = /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+$/;
    const githubUrlPattern = /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+\/$/;


    if (!name) {
      errors.name = 'GitHub URL is required';
    } else if (!githubUrlPattern.test(name)) {
      errors.name = 'Please enter a valid GitHub URL';
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Validate form values
    const validationErrors = validate(name);
    setErrors(validationErrors);

    // If there are no errors, handle the submission
    if (Object.keys(validationErrors).length === 0) {
      console.log({ name });
    }
  };

  // Handle changes to the GitHub URL input field
  const handleChange = (e) => {
    setName(e.target.value);
  };

  // Handle blur event (if you want to trigger validation on field blur)
  const handleBlur = () => {
    const validationErrors = validate(name);
    setErrors(validationErrors);
  };

  return (
    <div className="App">
      <h1>GitHub URL Form</h1>
      <form onSubmit={handleSubmit}>
        <GitHubUrlField
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
