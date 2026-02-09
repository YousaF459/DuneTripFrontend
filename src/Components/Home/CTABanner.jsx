import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import styles from './CTABanner.module.css';

function CTABanner() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER || whatsappNumber;

  const handleWhatsAppClick = () => {
    const message =
      "Hi!\nI visited your website and I'm interested in booking a tour. Could you please share more details regarding available tours, prices, and timings?\nLooking forward to your response. Thank you!";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <h2 className={styles.ctaTitle}>Ready for Your Next Adventure?</h2>
        <p className={styles.ctaSubtitle}>
          Contact us now and let's plan your perfect Dubai experience
        </p>
        <div className={styles.ctaButtons}>
          <button className={styles.whatsappBtn} onClick={handleWhatsAppClick}>
            <FaWhatsapp size={22} />
            <span>Chat on WhatsApp</span>
          </button>
          <button className={styles.phoneBtn} onClick={handlePhoneClick}>
            <FaPhone size={20} />
            <span>Call Us Now</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTABanner;