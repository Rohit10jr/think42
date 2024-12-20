import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';

// Simulated response from your backend
const parsedData = {
  personal_information: {
    full_name: 'Rohit J',
    email: 'rohitjworkspace@gmail.com',
    mobile: '+916374851119',
  },
  address_information: {
    address: null,
    city: 'Chennai',
    state: 'TamilNadu',
    zip_code: null,
    country: null,
  },
  educational_background: [
    {
      degree: 'Bachelor Of Engineering',
      institution: 'KCG College of Technology',
      field_of_study: null,
      graduation_year: '2022',
      gpa: null,
    },
    {
      degree: 'Higher Secondary',
      institution: 'Kendriya Vidyalaya Minambakkam',
      field_of_study: null,
      graduation_year: '2018',
      gpa: null,
    },
  ],
  work_experience: [
    {
      job_title: 'Intern',
      company_name: 'BigZiel Technologies',
      start_date: 'Apr 2024',
      end_date: 'Sep 2024',
      responsibilities:
        'Gained hands-on experience in React and frontend technologies while developing dynamic web app.',
    },
    {
      job_title: 'Intern',
      company_name: 'Venzo Technologies',
      start_date: 'May 2023',
      end_date: 'Oct 2024',
      responsibilities:
        'Developed real-world application projects and integrated RESTful APIs for web applications.',
    },
  ],
  skill_set: {
    skills: [
      'Python',
      'JavaScript',
      'CSS',
      'SASS',
      'Html',
      'React',
      'Django',
      'DjangoRestFramework',
      'Flask',
      'Bootstrap',
      'PostgreSQL',
      'MySql',
      'MongoDB',
      'Deployment',
      'Version Control(GIT)',
    ],
  },
  portfolio: {
    linkedin_url: 'https://www.linkedin.com/in/rohit-j/',
    github_url: 'https://github.com/Rohit10jr',
    other_url: 'https://leetcode.com/u/Rohit10jr/',
  },
};

const AutoFillForm = () => {
  const [loading, setLoading] = useState(false); // To show loading state

  // Initial form values structure based on the parsedData
  const initialValues = {
    personal_information: {
      full_name: '',
      email: '',
      mobile: '',
    },
    address_information: {
      address: '',
      city: '',
      state: '',
      zip_code: '',
      country: '',
    },
    educational_background: [
      {
        degree: '',
        institution: '',
        field_of_study: '',
        graduation_year: '',
        gpa: '',
      },
    ],
    work_experience: [
      {
        job_title: '',
        company_name: '',
        start_date: '',
        end_date: '',
        responsibilities: '',
      },
    ],
    skill_set: {
      skills: [],
    },
    portfolio: {
      linkedin_url: '',
      github_url: '',
      other_url: '',
    },
  };

  // Function to simulate fetching data (GET request simulation)
  const fetchUserData = async () => {
    setLoading(true);
    try {
      // Simulating backend response (as provided)
      return parsedData; // Replace this with actual API call in real use case
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to update Formik values based on fetched data
  const updateFormikValues = (setFieldValue, data) => {
    if (data) {
      setFieldValue('personal_information.full_name', data.personal_information.full_name);
      setFieldValue('personal_information.email', data.personal_information.email);
      setFieldValue('personal_information.mobile', data.personal_information.mobile);

      setFieldValue('address_information.address', data.address_information.address || '');
      setFieldValue('address_information.city', data.address_information.city || '');
      setFieldValue('address_information.state', data.address_information.state || '');
      setFieldValue('address_information.zip_code', data.address_information.zip_code || '');
      setFieldValue('address_information.country', data.address_information.country || '');

      // Loop through educational background and update fields
      data.educational_background.forEach((edu, index) => {
        setFieldValue(`educational_background[${index}].degree`, edu.degree || '');
        setFieldValue(`educational_background[${index}].institution`, edu.institution || '');
        setFieldValue(`educational_background[${index}].field_of_study`, edu.field_of_study || '');
        setFieldValue(`educational_background[${index}].graduation_year`, edu.graduation_year || '');
        setFieldValue(`educational_background[${index}].gpa`, edu.gpa || '');
      });

      // Loop through work experience and update fields
      data.work_experience.forEach((exp, index) => {
        setFieldValue(`work_experience[${index}].job_title`, exp.job_title || '');
        setFieldValue(`work_experience[${index}].company_name`, exp.company_name || '');
        setFieldValue(`work_experience[${index}].start_date`, exp.start_date || '');
        setFieldValue(`work_experience[${index}].end_date`, exp.end_date || '');
        setFieldValue(`work_experience[${index}].responsibilities`, exp.responsibilities || '');
      });

      // Update skill set
      setFieldValue('skill_set.skills', data.skill_set.skills || []);

      // Update portfolio links
      setFieldValue('portfolio.linkedin_url', data.portfolio.linkedin_url || '');
      setFieldValue('portfolio.github_url', data.portfolio.github_url || '');
      setFieldValue('portfolio.other_url', data.portfolio.other_url || '');
    } else {
      alert('Failed to fetch data');
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log('Form submitted with values:', values);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            {/* Personal Information */}
            <div>
              <h3>Personal Information</h3>
              <label htmlFor="fullName">Full Name</label>
              <Field
                type="text"
                id="fullName"
                name="personal_information.full_name"
                placeholder="Enter your full name"
              />
              <ErrorMessage name="personal_information.full_name" component="div" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="personal_information.email"
                placeholder="Enter your email"
              />
              <ErrorMessage name="personal_information.email" component="div" />
            </div>

            <div>
              <label htmlFor="mobile">Mobile</label>
              <Field
                type="text"
                id="mobile"
                name="personal_information.mobile"
                placeholder="Enter your mobile number"
              />
              <ErrorMessage name="personal_information.mobile" component="div" />
            </div>

            {/* Address Information */}
            <div>
              <h3>Address Information</h3>
              <label htmlFor="address">Address</label>
              <Field type="text" id="address" name="address_information.address" />
              <ErrorMessage name="address_information.address" component="div" />
            </div>

            <div>
              <label htmlFor="city">City</label>
              <Field type="text" id="city" name="address_information.city" />
              <ErrorMessage name="address_information.city" component="div" />
            </div>

            <div>
              <label htmlFor="state">State</label>
              <Field type="text" id="state" name="address_information.state" />
              <ErrorMessage name="address_information.state" component="div" />
            </div>

            <div>
              <label htmlFor="zip_code">Zip Code</label>
              <Field type="text" id="zip_code" name="address_information.zip_code" />
              <ErrorMessage name="address_information.zip_code" component="div" />
            </div>

            <div>
              <label htmlFor="country">Country</label>
              <Field type="text" id="country" name="address_information.country" />
              <ErrorMessage name="address_information.country" component="div" />
            </div>

            {/* Educational Background */}
            <FieldArray name="educational_background">
              {({ insert, remove, push }) => (
                <div>
                  <h3>Educational Background</h3>
                  {values.educational_background.map((edu, index) => (
                    <div key={index}>
                      <label htmlFor={`educational_background.${index}.degree`}>Degree</label>
                      <Field
                        name={`educational_background.${index}.degree`}
                        type="text"
                      />
                      <ErrorMessage name={`educational_background.${index}.degree`} component="div" />
                      <label htmlFor={`educational_background.${index}.institution`}>Institution</label>
                      <Field
                        name={`educational_background.${index}.institution`}
                        type="text"
                      />
                      <ErrorMessage name={`educational_background.${index}.institution`} component="div" />
                      <label htmlFor={`educational_background.${index}.graduation_year`}>Graduation Year</label>
                      <Field
                        name={`educational_background.${index}.graduation_year`}
                        type="text"
                      />
                      <ErrorMessage name={`educational_background.${index}.graduation_year`} component="div" />
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>

            {/* Skill Set */}
            <div>
              <h3>Skills</h3>
              {values.skill_set.skills.map((skill, index) => (
                <div key={index}>
                  <label>Skill {index + 1}</label>
                  <Field name={`skill_set.skills[${index}]`} />
                </div>
              ))}
            </div>

            {/* Portfolio */}
            <div>
              <h3>Portfolio</h3>
              <label htmlFor="linkedin_url">LinkedIn</label>
              <Field
                name="portfolio.linkedin_url"
                type="text"
              />
              <ErrorMessage name="portfolio.linkedin_url" component="div" />
              <label htmlFor="github_url">GitHub</label>
              <Field
                name="portfolio.github_url"
                type="text"
              />
              <ErrorMessage name="portfolio.github_url" component="div" />
              <label htmlFor="other_url">Other URL</label>
              <Field
                name="portfolio.other_url"
                type="text"
              />
              <ErrorMessage name="portfolio.other_url" component="div" />
            </div>

            {/* Submit Button */}
            <div>
              <button type="button" onClick={async () => {
                const data = await fetchUserData(); 
                updateFormikValues(setFieldValue, data);
              }}>
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
