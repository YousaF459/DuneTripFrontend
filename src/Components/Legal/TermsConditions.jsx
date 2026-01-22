import styles from "./LegalPages.module.css";

function TermsConditions() {
  return (
    <div className={styles.outerContainer}>
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Terms & Conditions</h1>
      <p className={styles.text}>
        By using our services, you agree to comply with the following terms
        and conditions:
      </p>

      <section className={styles.section}>
        <h2>Bookings</h2>
        <p>All bookings are subject to availability and confirmation.</p>
      </section>

      <section className={styles.section}>
        <h2>Payment</h2>
        <p>Payments are accepted in AED and should be completed as per instructions.</p>
      </section>

      <section className={styles.section}>
        <h2>Liability</h2>
        <p>
          We are not liable for any personal injury or loss incurred during the tour.
        </p>
      </section>
    </div>
    </div>
  );
}

export default TermsConditions;
