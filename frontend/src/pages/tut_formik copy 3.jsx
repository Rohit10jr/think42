import React, { useState } from 'react';

// Our main App component
function App() {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  
  // A simple validation function to check for GitHub URLs
  const validate = (name) => {
    const errors = {};
    const githubUrlPattern = /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_-]+$/;

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

  return (
    <div className="App">
      <h1>GitHub URL Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">GitHub URL: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your GitHub URL"
          />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
