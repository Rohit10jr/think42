import React from "react";
import styles from "./footer.module.css"; // Import the CSS Module
import facebook from "../../assets/images/facebook.png";
import instagram from "../../assets/images/instagram.png";
import linkedin from "../../assets/images/linkedin.png";
import twitter from "../../assets/images/twitter.png";
import JobNxt from "../../assets/images/JOB-NXT.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

        {/* Column 4 (Connect Section) */}
        <div className={styles.connectContainer}>
          <div className={styles.logo}>
            <img src={JobNxt} alt="JOB-NXT Logo" />
          </div>
          <div className={styles.socialIcons}>
            <div className={styles.connectTitle}>Connect with us</div>
            <div className={styles.iconsDiv}>
              <img src={facebook} alt="Facebook" />
              <img src={instagram} alt="Instagram" />
              <img src={twitter} alt="Twitter/X" />
              <img src={linkedin} alt="LinkedIn" />
            </div>
          </div>
        </div>

        {/* Column 1 */}
        <div>
          <a href="#" className={styles.footerLink}>About us</a><br />
          <a href="#" className={styles.footerLink}>Careers</a><br />
          <a href="#" className={styles.footerLink}>Employer home</a><br />
          <a href="#" className={styles.footerLink}>Sitemap</a><br />
          <a href="#" className={styles.footerLink}>Credits</a>
        </div>

        {/* Column 2 */}
        <div>
          <a href="#" className={styles.footerLink}>Help center</a><br />
          <a href="#" className={styles.footerLink}>Summons/Notices</a><br />
          <a href="#" className={styles.footerLink}>Grievances</a><br />
          <a href="#" className={styles.footerLink}>Report issue</a>
        </div>

        {/* Column 3 */}
        <div>
          <a href="#" className={styles.footerLink}>Privacy policy</a><br />
          <a href="#" className={styles.footerLink}>Terms & conditions</a><br />
          <a href="#" className={styles.footerLink}>Fraud alert</a><br />
          <a href="#" className={styles.footerLink}>Trust & safety</a>
        </div>

        {/* App Download Section */}
        <div className={styles.appContainer}>
          <div className={styles.appTitle}>Apply on the go</div>
          <div className={styles.appDescription}>Get real-time job updates on our App</div>
          <div className={styles.downloadButtons}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
