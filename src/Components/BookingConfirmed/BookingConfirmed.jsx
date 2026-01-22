import SectionHeader from "../SectionHeader/SectionHeader";
import { useNavigate } from "react-router-dom";
import styles from './BookingConfirmed.module.css';
import ReactPixel from "react-facebook-pixel";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "../Context/CartContext";
import { useEffect } from "react";
import axiosApi from "../Axios/Axios";
import {sendConversionEvent} from '../../ConversionEvents'


function BookingConfirmed() {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  useEffect(() => {
  sendConversionEvent({
    event: "ViewContent",
    content_name: "Booking Confirmed Page",
    value: 0,
    currency: "AED",
    email: localStorage.getItem("user_email") || "guest@example.com",
  });
}, []);

 
 










  const handleViewBookings = () => navigate("/my-bookings");
  const handleExplore = () => navigate("/");

  return (
    <div className={styles.outerContainer}>
      <SectionHeader title="Booking Confirmation" />

      <div className={styles.container}>
        {/* Animated Checkmark */}
        <div className={styles.checkmarkContainer}>
          <svg className={styles.checkmark} viewBox="0 0 52 52">
            <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none" />
            <path className={styles.checkmarkCheck} fill="none" d="M14 27l7 7 16-16" />
          </svg>
        </div>

        {/* Success Message */}
        <div className={styles.message}>
          <h2 className={styles.title}>🎉 Your Booking is Confirmed!</h2>
          <p className={styles.text}>
            Thank you for your reservation. We look forward to serving you.
          </p>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.buttonPrimary} onClick={handleViewBookings}>
            My Bookings
          </button>
          <button className={styles.buttonSecondary} onClick={handleExplore}>
            Explore More Tours
          </button>
        </div>

        {/* Trust Badges */}
        <div className={styles.trustBadges}>
          <span>🔒 Secure Payment</span>
          <span>🛡️ Official Partner</span>
          <span>📞 24/7 Support</span>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmed;
