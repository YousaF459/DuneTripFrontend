import React from "react";
import styles from "./SectionHeader.module.css";

export default function SectionHeader({ title }) {
  return (
    <div className={styles.outerContainer}>
      <div className={`container ${styles.mainContainer}`}>
        <h1 className={styles.mainHeading}>{title}</h1>
      </div>
    </div>
  );
}