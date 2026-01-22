import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

function Footer() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
  const displayNumber = `+${whatsappNumber.slice(0,3)} ${whatsappNumber.slice(3,5)} ${whatsappNumber.slice(5,8)} ${whatsappNumber.slice(8)}`;

  // Social links from env
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL;
  const facebookUrl = import.meta.env.VITE_FACEBOOK_URL;

  // Legal pages from env
  const privacyPolicyUrl = import.meta.env.VITE_PRIVACY_POLICY_URL;
  const termsConditionsUrl = import.meta.env.VITE_TERMS_CONDITIONS_URL;
  const refundPolicyUrl = import.meta.env.VITE_REFUND_POLICY_URL;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        {/* Brand */}
        <div className={styles.brand}>
          <h2 className={styles.logo}>
            DuneTrip
            <span className={styles.safari}>Safari</span>
          </h2>

          <p className={styles.tagline}>
            DuneTrip Safari delivers carefully curated desert and city
            experiences across the UAE, focusing on comfort, authenticity,
            and memorable journeys.
          </p>

          {/* Social Media */}
          <div className={styles.socials}>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>

            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <p className={styles.groupTitle}>HelpLine</p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.phone}
            >
              {displayNumber}
            </a>
          </div>

          <div className={styles.linkGroup}>
            <p className={styles.groupTitle}>Legal</p>
            <Link to="/privacy-policy">Privacy policy</Link> 
            <Link to="/terms-conditions">Terms & conditions</Link> 
            <Link to="/refund-policy">Refund / cancellation</Link>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        © {new Date().getFullYear()} DuneTrip Safari. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
