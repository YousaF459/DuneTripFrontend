import { useState } from "react";
import axiosApi from "../Axios/Axios";
import SectionHeader from "../SectionHeader/SectionHeader";
import styles from "./MyBookings.module.css";
import {sendConversionEvent} from '../../ConversionEvents'
import { useEffect } from "react";

function MyBookings() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);



  useEffect(() => {
        sendConversionEvent({
          event: "ViewContent",
          content_name: "MyBookings Page",
          value: 0,
          currency: "AED",
          email: localStorage.getItem("user_email") || "guest@example.com",
        });
      }, []);
     

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter a valid email address");
      return;
    }
    setHasSearched(true);
    fetchBookings(email.trim());
  };

  const fetchBookings = async (searchEmail) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosApi.get(
        `view-bookings/?email=${encodeURIComponent(searchEmail)}`
      );

      const data = response.data;
      
      
      const bookingList = Array.isArray(data) ? data : data.bookings || [];

      setBookings(bookingList);

      if (bookingList.length === 0) {
        setError(`No bookings found for ${searchEmail}`);
      }
    } catch (err) {
      console.error("Failed to load bookings:", err);
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Could not load bookings. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.container}>
        <SectionHeader title="My Bookings" />

        {/* Email Form */}
        <div className={styles.emailFormContainer}>
          <p className={styles.subtitle}>Enter your email to view your booking history</p>
          <form onSubmit={handleSubmit} className={styles.emailForm}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              className={styles.emailInput}
            />
            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "View Bookings"}
            </button>
          </form>
        </div>

        {/* Bookings */}
        {hasSearched && (
          <div className={styles.bookingsContainer}>
            {loading && (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading your bookings...</p>
              </div>
            )}

            {error && <div className={styles.errorMessage}>{error}</div>}

            {!loading && !error && bookings.length === 0 && (
              <div className={styles.noBookings}>
                <p>No bookings found.</p>
                <button
                  onClick={() => (window.location.href = "/tours")}
                  className={styles.btnExplore}
                >
                  Explore Tours
                </button>
              </div>
            )}

            {!loading &&
              bookings.map((booking) => (
                <div key={booking.id} className={styles.bookingCard}>
                  {/* Booking Header */}
                  <div className={styles.bookingHeader}>
                    <h3 className={styles.bookingTitle}>Booking #{booking.id}</h3>
                    <span className={styles.bookingDate}>
                      {booking.created_at
                        ? new Date(booking.created_at).toLocaleDateString(
                            "en-AE",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "Date unavailable"}
                    </span>
                  </div>

                  {/* Personal Details Section */}
                  <div className={styles.personalDetailsSection}>
                    <h4 className={styles.sectionSubtitle}>Personal Details</h4>
                    <div className={styles.personalDetailsGrid}>
                      <div className={styles.personalDetailItem}>
                        <span className={styles.personalLabel}>Full Name</span>
                        <span className={styles.personalValue}>
                          {booking?.full_name || "Not provided"}
                        </span>
                      </div>
                      <div className={styles.personalDetailItem}>
                        <span className={styles.personalLabel}>Email Address</span>
                        <span className={styles.personalValue}>
                          {booking?.email || "Not provided"}
                        </span>
                      </div>
                      <div className={styles.personalDetailItem}>
                        <span className={styles.personalLabel}>Mobile Number</span>
                        <span className={styles.personalValue}>
                          {booking?.mobile || "Not provided"}
                        </span>
                      </div>
                      <div className={styles.personalDetailItem}>
                        <span className={styles.personalLabel}>WhatsApp Number</span>
                        <span className={styles.personalValue}>
                          {booking?.whatsapp || booking.mobile_number || "Not provided"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Info */}
                  <div className={styles.bookingInfoSection}>
                    <h4 className={styles.sectionSubtitle}>Booking Information</h4>
                    <div className={styles.bookingInfo}>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Pickup Location</span>
                        <span className={styles.infoValue}>
                          {booking?.pickup_location || "Not specified"}
                        </span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Payment Method</span>
                        <span className={styles.infoValue}>
                          {booking?.payment_method_note || "N/A"}
                        </span>
                      </div>
                    </div>

                    {booking.payment_method_note
                      ?.toLowerCase()
                      .includes("credit") && (
                      <p className={styles.vatNote}>
                        *5% VAT applies for credit card payments
                      </p>
                    )}
                  </div>

                  {/* Cart Items */}
                  <div className={styles.cartItemsSection}>
                    <h4 className={styles.sectionTitle}>
                      Tour Items 
                      <span className={styles.itemCount}>
                        ({booking.cart_items?.length || 0})
                      </span>
                    </h4>

                    {booking.cart_items?.length > 0 ? (
                      <ul className={styles.cartItemsList}>
                        {booking.cart_items.map((item, index) => (
                          <li key={index} className={styles.cartItem}>
                            {/* Place / Tour */}
                            <div className={styles.itemHeader}>
                              <h5 className={styles.itemTitle}>{item?.title}</h5>
                            </div>

                            {/* Tour Details */}
                            <div className={styles.itemDetails}>
                              <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Tour Date</span>
                                <span className={styles.itemDate}>
                                  {item?.tour_date}
                                </span>
                              </div>
                              <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>Persons</span>
                                <span className={styles.detailValue}>{item?.quantity}</span>
                              </div>
                              {item.duration && (
                                <div className={styles.detailItem}>
                                  <span className={styles.detailLabel}>Duration</span>
                                  <span className={styles.detailValue}>{item?.duration}</span>
                                </div>
                              )}
                            </div>

                            {/* Private Transfer Section */}
                            {item.private_transfer && item.vehicle && (
                              <div className={styles.transferSection}>
                                <div className={styles.transferHeader}>
                                  <div className={styles.transferBadge}>
                                    Private Transfer
                                  </div>
                                </div>
                                <div className={styles.transferDetails}>
                                  <div className={styles.transferInfo}>
                                    <span className={styles.transferLabel}>Vehicle Type</span>
                                    <span className={styles.transferType}>
                                      {item?.vehicle.seater}-Seater Vehicle
                                    </span>
                                  </div>
                                  <div className={styles.transferPriceBox}>
                                    <span className={styles.transferPriceLabel}>Transfer Price</span>
                                    <span className={styles.transferPrice}>
                                      AED {Number(item?.vehicle.price || 0).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Item Total */}
                            <div className={styles.itemTotal}>
                              <span>Item Total</span>
                              <span className={styles.price}>
                                AED {Number(item?.item_total || 0).toLocaleString()}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className={styles.emptyMessage}>No items in this booking.</p>
                    )}

                    {/* Overall Total */}
                    <div className={styles.overallTotal}>
                      <span className={styles.totalLabel}>Overall Total</span>
                      <span className={styles.totalAmount}>
                        AED {Number(booking?.total_amount || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;