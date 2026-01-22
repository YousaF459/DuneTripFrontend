import { useState, useEffect } from "react";
import { FaWhatsapp, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../Context/CartContext";
import { Link } from "react-router-dom";
import styles from "./FloatingCartAndWhatsApp.module.css";
import ReactPixel from "react-facebook-pixel";
import { v4 as uuidv4 } from "uuid";
import {sendConversionEvent} from '../../ConversionEvents'


const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

export default function FloatingCartAndWhatsApp() {
  const { cart } = useCart();
  const [showPulse, setShowPulse] = useState(false);
  const totalItems = cart?.length || 0;

  // Show pulse animation when cart is updated
  useEffect(() => {
    if (totalItems > 0) {
      setShowPulse(true);
      const timer = setTimeout(() => setShowPulse(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  const handleWhatsAppClick = () => {
    sendConversionEvent({
  event: "ClickToWhatsApp",
  content_name: "Contact via WhatsApp",
  value: 0,
  currency: "AED",
  email: localStorage.getItem("user_email") || "guest@example.com",
});
    
    const message =
      "Hi!\nI visited your website and I'm interested in booking a tour. Could you please share more details regarding available tours, prices, and timings?\nLooking forward to your response. Thank you!";

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className={styles.floatingWrapper}>
      {/* WhatsApp Button */}
      <button 
        className={styles.whatsappBtn} 
        onClick={handleWhatsAppClick}
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp size={22} />
        <span className={styles.btnText}>WhatsApp</span>
      </button>

      {/* Cart Button */}
      {totalItems > 0 && (
  <Link 
        to="/cart"
        className={`${styles.cartBtn} ${showPulse ? styles.pulse : ''}`}
        aria-label="View cart"
      >
        <FaShoppingCart size={22} />
        <span className={styles.btnText}>Cart</span>
        {totalItems > 0 && (
          <span className={styles.cartCount}>{totalItems}</span>
        )}
      </Link>
)}
      
    </div>
  );
}