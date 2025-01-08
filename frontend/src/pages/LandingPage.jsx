import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Header from "../components/Home/header.jsx";
import Footer from "../components/Home/footer.jsx";
import bg from "../assets/images/bg-slider4.jpg"
import styles from "./landing.module.css"
// search bar images
import location from "../assets/images/location.png"
import search from "../assets/images/search.png"
import categories from "../assets/images/categories.png"


import Auto from '../assets/images/car.png'
import Audit from '../assets/images/audit.png'
import Bank from '../assets/images/bank.png'
import Civil from '../assets/images/civil.png'
import Electronics from '../assets/images/circuit.png'
// import Ites from '../assets/ITES.jpeg'
import Marketing from '../assets/images/marketing.png'
import semiconductor from '../assets/images/cpu.png'
import Telecom from '../assets/images/telecommunication.png'
import Manufacturing from '../assets/images/factory.png'
import Hospitality from '../assets/images/building.png'
// carousel images



const LandingPage = () => {
  const settings = {
    dots: true, // Show indicators
    infinite: true, // Infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: 6, // Number of slides visible at once
    slidesToScroll: 1, // Slides to scroll at a time
    autoplay: true, // Autoplay enabled
    autoplaySpeed: 1000, // Autoplay interval
    arrows: true, // Enable navigation arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const industries = [
    { src: Audit, title: "Audit" },
    { src: Auto, title: "Auto" },
    { src: Bank, title: "Bank" },
    { src: Civil, title: "Civil" },
    { src: Marketing, title: "Marketing" },
    // { src: Ites, title: "ITES" },
    { src: Manufacturing, title: "Manufacturing" },
    { src: Electronics, title: "Electronics" },
    { src: semiconductor, title: "semiconductor" },
    { src: Telecom, title: "Telecom" },
    { src: Hospitality, title: "Hospitality" },
  ];


  return (
    <>
      <Header />
      <main>
        {/* First Section */}
        <section className={`${styles.section} ${styles.section1}`}>
          {/* <div className={styles.content}>
            <h2>Welcome to the First Section</h2>
            <p>This section has a full-screen background image.</p>
          </div> */}

          <div className={styles.Section1title}>Your career journey begins Here</div>

          <div className={styles.searchBar}>
            <div className={styles.searchBarItem}>
              <img src={search} alt="Search Icon" />
              <input
                type="text"
                placeholder="Job title, keywords..."
                className={styles.input}
              />
            </div>
            <div className={styles.divider}></div>
            <div className={styles.searchBarItem}>
              <img src={location} alt="Location Icon" />
              <input
                type="text"
                placeholder="City or postcode"
                className={styles.input}
              />
              <i className={`${styles.icon} ${styles.dropdownIcon}`}></i>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.searchBarItem}>
              <img src={categories} alt="Categories Icon" />
              <input
                type="text"
                placeholder="All categories"
                className={styles.input}
              />
              <i className={`${styles.icon} ${styles.dropdownIcon}`}></i>
            </div>
            <button className={styles.searchButton}>Find Jobs</button>
          </div>
          <div className={styles.Section1text}>Popular Searches : Designer, Developer, Web, IOS, PHP, Senior Engineer</div>
        </section>

        {/* Second Section */}
        <section className={`${styles.section} ${styles.section2}`}>
          {/* <div className={styles.content}>
            <h2>Second Section</h2>
            <p>This is the second section with 70vh height.</p>
          </div> */}

          <div className={styles.howItWorksContainer}>
            <h2>How It Works?</h2>
            <p>Job for anyone, anywhere</p>
            <div className={styles.steps}>
              <div className={styles.step}>
                <img
                  src="https://jobnxt.co.in/wp-content/uploads/2021/03/f4.jpg"
                  alt="Register an account"
                  className={styles.stepImage}
                />
                <p className={styles.stepTitle}>Register an account to start</p>
              </div>
              <div className={styles.step}>
                <img
                  src="https://jobnxt.co.in/wp-content/uploads/2021/03/f5.jpg"
                  alt="Explore resumes"
                  className={styles.stepImage}
                />
                <p className={styles.stepTitle}>Explore over thousands of resumes</p>
              </div>
              <div className={styles.step}>
                <img
                  src="https://jobnxt.co.in/wp-content/uploads/2021/03/f6.jpg"
                  alt="Find a candidate"
                  className={styles.stepImage}
                />
                <p className={styles.stepTitle}>Find the most suitable candidate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Third Section */}
        {/* <section className={`${styles.section} ${styles.section3}`}> */}
        <section className={styles.section3}>
          {/* <div className={styles.content}>
            <h2>Third Section</h2>
            <p>This is the third section with 70vh height.</p>
          </div> */}
          <div className={styles.sliderContainer}>
            {/* Header Section */}
            <div className={styles.sliderHeader}>
              <span className={styles.sliderSpan}>
                <h2>Industries Registered</h2>
                <p>
                  Some of the companies we’ve helped recruit excellent applicants over
                  the years.
                </p>
              </span>
              <a href="#" className={styles.browseLink}>Browse All</a>
            </div>

            {/* Carousel Section */}
            <div className={styles.slider}>
              <Slider {...settings}>
                {industries.map((industry, index) => (
                  <div key={index} className={styles.sliderItem}>
                    <img
                      src={industry.src}
                      alt={industry.title}
                      className={styles.sliderImage}
                    />
                    <p className={styles.sliderTitle}>{industry.title}</p>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>
      </main>

      <Footer/>
    </>
  );
};

export default LandingPage;