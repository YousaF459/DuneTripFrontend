import styles from './Error.module.css';

function ToursError({ onRetry }) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>⚠️</div>
      <h3 className={styles.errorTitle}>Oops! Something went wrong</h3>
      <p className={styles.errorMessage}>
        We couldn't load the tours. Please check your connection and try again.
      </p>
      <button className={styles.retryButton} onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}

export default ToursError;