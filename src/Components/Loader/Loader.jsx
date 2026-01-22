import styles from './Loader.module.css';

function ToursLoader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>Loading tours...</p>
    </div>
  );
}

export default ToursLoader;