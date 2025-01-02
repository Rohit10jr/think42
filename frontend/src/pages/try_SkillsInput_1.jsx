import React, { useState } from "react";
import styles from "./trySkillsInput.module.css";

const SkillsInput = () => {
  const techStacks = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "Ruby",
    "PHP",
    "Swift",
    "Kotlin",
    "Go",
    "Rust",
    "React",
    "Angular",
    "Vue.js",
    "Node.js",
    "Django",
    "Flask",
    "Spring Boot",
    "Express.js",
    "Laravel",
    "Symfony",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "SQLite",
    "Redis",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Google Cloud",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "Seaborn",
    "Hadoop",
    "Spark",
    "Git",
    "GitHub",
    "Bitbucket",
    "Jenkins",
    "CircleCI",
    "TravisCI",
    "Terraform",
    "Ansible",
    "JIRA",
    "Slack",
    "Figma",
    "Bootstrap",
    "Tailwind CSS",
    "SASS",
    "Less",
    "Material-UI",
    "Chakra UI",
    "Redux",
    "Zustand",
    "MobX",
    "GraphQL",
    "Apollo",
    "Prisma",
    "Electron",
    "React Native",
    "Flutter",
    "Ionic",
    "Xamarin",
    "Unity",
    "Unreal Engine",
    "C#",
    ".NET",
    "ASP.NET",
    "Visual Studio",
    "Eclipse",
    "IntelliJ IDEA",
    "VS Code",
    "WebStorm",
    "Android Studio",
    "Xcode",
    "TensorBoard",
    "Hugging Face",
    "OpenCV",
    "Keras",
    "FastAPI",
    "Selenium",
    "Cypress",
    "Jest",
    "Mocha",
    "Chai",
    "Postman",
    "Swagger",
    "Insomnia",
    "Nginx",
    "Apache",
    "Vagrant",
    "Chef",
    "Puppet",
    "Blender",
    "Three.js",
    "WebGL",
    "Babel",
    "Webpack",
    "Parcel",
    "Grunt",
    "Gulp",
    "WebRTC",
    "Socket.IO",
    "WebAssembly",
    "Graphite",
    "Tableau",
    "Power BI",
    "Alteryx",
    "Snowflake",
    "Airflow",
    "MLflow",
    "Jupyter",
    "Colab",
    "Dash",
    "Streamlit",
    "Metabase",
    "ClickHouse",
    "Elasticsearch",
    "Logstash",
    "Kibana",
    "Prometheus",
    "Grafana",
    "Splunk",
    "Nagios",
    "Zabbix",
    "Cassandra",
    "CouchDB",
    "Firebase",
    "Heroku",
    "DigitalOcean",
    "Linode",
    "Vercel",
    "Netlify",
    "Surge",
    "Expo",
    "Capacitor",
    "NativeScript",
    "Webpack",
    "Rollup",
    "ESLint",
    "Prettier",
    "Tailwind",
    "Storybook",
    "Cucumber",
    "JUnit",
    "TestNG",
    "RSpec",
    "Pytest",
    "Unittest",
    "JIRA",
    "Basecamp",
    "Monday",
    "Trello",
    "Notion",
    "Evernote",
    "Asana",
    "Zeplin",
    "InVision",
    "Sketch",
    "Framer",
    "Adobe XD",
    "CorelDRAW",
    "AutoCAD",
    "MATLAB",
    "Simulink",
    "LabVIEW",
    "Octave",
    "Fortran",
    "Perl",
    "COBOL",
    "ABAP",
    "Crystal Reports",
    "ERPNext",
    "SAP",
    "Oracle ERP",
    "Workday",
    "PeopleSoft",
    "HubSpot",
    "Salesforce",
    "Zoho CRM",
    "Marketo",
    "Tableau",
    "Looker",
    "BigQuery",
    "Athena",
    "Redshift",
    "DynamoDB",
    "Vault",
    "Consul",
    "OpenShift",
    "Rancher",
    "Istio",
    "Linkerd",
    "Numba",
    "JAX",
    "Horovod",
    "OpenAI Gym",
    "Rasa",
    "MLlib",
    "AutoML",
    "Optuna",
    "LightGBM",
    "CatBoost",
    "XGBoost",
    "HuggingFace",
    "LangChain",
    "Next.js",
    "Nuxt.js",
    "Svelte",
    "Sapper",
    "Solid.js",
    "Alpine.js",
    "Backbone.js",
    "Ember.js",
    "Meteor.js",
    "Knockout.js",
    "Chart.js",
    "D3.js",
    "ECharts",
    "Leaflet",
    "OpenLayers",
    "CesiumJS"
  ];
  


  const [inputValue, setInputValue] = useState("");
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Extract the last word after a space
    const skillsArray = value.split(" ");
    const currentSkill = skillsArray[skillsArray.length - 1];

    if (currentSkill) {
      const filtered = techStacks.filter((skill) =>
        skill.toLowerCase().startsWith(currentSkill.toLowerCase())
      );
      setFilteredSkills(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSkillClick = (skill) => {
    const skillsArray = inputValue.split(" ");
    // Replace the last word with the selected skill
    skillsArray[skillsArray.length - 1] = skill;

    setInputValue(skillsArray.join(" "));
    setShowDropdown(false);
  };

  return (
    <div className={styles.skillInputContainer}>
      <input
        id="skills"
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Your Skill Set"
        className={styles.input}
      />
      {showDropdown && filteredSkills.length > 0 && (
        <div className={styles.dropdown}>
          <div className={styles.tabTitle}>Relevant skills</div>
          <div className={styles.skillChips}>
            {filteredSkills.map((skill, index) => (
              <span
                key={index}
                className={styles.skillChip}
                onClick={() => handleSkillClick(skill)}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsInput;