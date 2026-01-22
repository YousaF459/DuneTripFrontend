import styles from "./LegalPages.module.css";

function RefundCancellation() {
  return (
    <div className={styles.outerContainer}>
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Refund / Cancellation Policy</h1>
      <p className={styles.text}>
        We understand that plans may change. Please review our refund and
        cancellation policy:
      </p>

      <section className={styles.section}>
        <h2>Cancellation</h2>
        <p>
          You can cancel your booking up to 24 hours before the tour date for a full refund.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Refund Process</h2>
        <p>
          Refunds will be processed to the original payment method within 5–7 business days.
        </p>
      </section>

      <section className={styles.section}>
        <h2>No-Show Policy</h2>
        <p>
          No refunds are available for missed tours or late arrivals.
        </p>
      </section>
    </div>
    </div>
  );
}

export default RefundCancellation;
