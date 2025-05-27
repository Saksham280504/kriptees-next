'use client'; // Required if used in app router

import styles from './CricketBallLoader.module.css';

const CricketBallLoader = () => (
  <div className={styles['parent-container']}>
    <div className={styles.loader}></div>
  </div>
);

export default CricketBallLoader;
