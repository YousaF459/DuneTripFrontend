import styles from "./LegalPages.module.css";

function PrivacyPolicy() {
  return (
    <div className={styles.outerContainer}>
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.text}>
        Your privacy is important to us. This page explains how we collect, use,
        and protect your personal information when you use our services.
      </p>

      <section className={styles.section}>
        <h2>Information We Collect</h2>
        <p>We may collect your name, email, phone number, and booking details.</p>
      </section>

      <section className={styles.section}>
        <h2>How We Use Your Information</h2>
        <p>
          Your information is used to process bookings, improve services, and
          contact you regarding your reservations.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Security</h2>
        <p>
          We implement appropriate security measures to protect your personal
          data.
        </p>
      </section>
    </div>
    </div>
  );
}

export default PrivacyPolicy;
