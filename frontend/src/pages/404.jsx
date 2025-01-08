// import React from 'react';
import styles from './404.module.css';

const NotFoundPage= () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Page Not Found</p>
      <a href="/" className={styles.homeLink}>Go to Home</a>
    </div>
  );
};

export default NotFoundPage;