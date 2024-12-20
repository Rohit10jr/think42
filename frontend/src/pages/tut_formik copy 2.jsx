import React, { useState } from 'react';

// Our main App component
function App() {
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  
  // A simple validation function
  const validate = (name) => {
    const errors = {};
    if (!name) {
      errors.name = 'Name is required';
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(name);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log({ name });
    }
  };

  return (
    <div className="App">
      <h1>Simple Form with React</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
