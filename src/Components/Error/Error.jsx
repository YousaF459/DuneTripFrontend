import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import styles from './Error.module.css';

function ToursError({ onRetry }) {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER || whatsappNumber;

  const handleWhatsAppClick = () => {
    const message = "Hi! I'm experiencing issues loading tours on your website. Can you please assist?";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

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

      <div className={styles.divider}>
        <span>OR</span>
      </div>

      <p className={styles.contactText}>
        If the issue persists, please reach out to us:
      </p>

      <div className={styles.contactButtons}>
        <button className={styles.whatsappBtn} onClick={handleWhatsAppClick}>
          <FaWhatsapp size={20} />
          <span>WhatsApp Us</span>
        </button>
        <button className={styles.phoneBtn} onClick={handlePhoneClick}>
          <FaPhone size={18} />
          <span>Call Us</span>
        </button>
      </div>
    </div>
  );
}

export default ToursError;