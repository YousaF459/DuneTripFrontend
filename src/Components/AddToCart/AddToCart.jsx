import { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import styles from "./AddToCart.module.css";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosApi from '../Axios/Axios.js'
import Swal from "sweetalert2";
import ReactPixel from "react-facebook-pixel";
import { v4 as uuidv4 } from "uuid";
import {sendConversionEvent} from '../../ConversionEvents'

function AddToCart() {
  const { cart, removeFromCart, updateCartItem,setCart } = useCart();
  const [tourDates, setTourDates] = useState({});
  const navigate = useNavigate();
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

  // State
  const [quantities, setQuantities] = useState({});
  const [durations, setDurations] = useState({});
  const [privateTransfers, setPrivateTransfers] = useState({});
  const [privateVehicleSelection, setPrivateVehicleSelection] = useState({});
  const timeOptions = [30, 60, 90, 120, 150, 180];

  // Create uniqueId per cart item
  const createUniqueId = (item) => `${item.type || "tour"}_${item.id}`;

useEffect(() => {
  sendConversionEvent({
    event: "ViewContent",
    content_name: "Cart Page",
    value: 0,
    currency: "AED",
    email: localStorage.getItem("user_email") || "guest@example.com",
  });
}, []);


  // Initialize state whenever cart changes
  useEffect(() => {
    const initialQuantities = {};
    const initialDurations = {};
    const initialPrivateTransfers = {};
    const initialPrivateVehicleSelection = {};

    cart?.forEach((item) => {
      const uniqueId = createUniqueId(item);
      initialQuantities[uniqueId] = item.persons || 1;
      initialDurations[uniqueId] = item.duration || 30;
      initialPrivateTransfers[uniqueId] = false;

      // Default vehicle selection if private transfer exists
      if (item.privateTransferOptions?.length > 0) {
        initialPrivateVehicleSelection[uniqueId] = null; // not selected by default
      }
    });

    setQuantities(initialQuantities);
    setDurations(initialDurations);
    setPrivateTransfers(initialPrivateTransfers);
    setPrivateVehicleSelection(initialPrivateVehicleSelection);
  }, [cart]);


  const handleWhatsAppCheckout = () => {
    
  sendConversionEvent({
    event: "ClickToWhatsApp",
    content_name: "Contact via WhatsApp",
    value: 0,
    currency: "AED",
    email: localStorage.getItem("user_email") || "guest@example.com",
  });
  
 const message =
    "Hi!\nI visited your website and I’m interested in booking a tour. Could you please share more details regarding available tours, prices, and timings?\nLooking forward to your response. Thank you!";

 // you can customize

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank"); // opens WhatsApp in a new tab
};
  // Handlers
  const handleQuantityChange = (uniqueId, value) => {
    setQuantities((prev) => ({ ...prev, [uniqueId]: Number(value) || 1 }));
  };

  const handleDurationChange = (uniqueId, value) => {
    setDurations((prev) => ({ ...prev, [uniqueId]: Number(value) }));
  };

  const handlePrivateTransferChange = (uniqueId, checked) => {
    setPrivateTransfers((prev) => ({ ...prev, [uniqueId]: checked }));

    if (!checked) {
      setPrivateVehicleSelection((prev) => ({ ...prev, [uniqueId]: null }));
    } else {
      const item = cart.find((i) => createUniqueId(i) === uniqueId);
      if (item?.privateTransferOptions?.length > 0) {
        setPrivateVehicleSelection((prev) => ({
          ...prev,
          [uniqueId]: item.privateTransferOptions[0], // default first option
        }));
      }
    }
  };

  const handlePrivateVehicleChange = (uniqueId, vehicleId) => {
    const item = cart.find((i) => createUniqueId(i) === uniqueId);
    const vehicle = item.privateTransferOptions.find(
      (v) => v.id === parseInt(vehicleId)
    );
    setPrivateVehicleSelection((prev) => ({ ...prev, [uniqueId]: vehicle }));
  };

  // Pricing
  const getItemTotal = (item) => {
  const uniqueId = createUniqueId(item);
  const quantity = quantities[uniqueId] || 1;
  const duration = item?.time ? durations[uniqueId] || 30 : 30;

  let basePrice = parseFloat(item.price) || 0;

  if (item?.time) {
    basePrice *= duration / 30; // scale by duration
  }

  // Multiply base price by quantity
  let total = basePrice * quantity;

  // Add private vehicle price **once per item**, not per person
  const vehicle = privateVehicleSelection[uniqueId];
  if (vehicle) {
    total += vehicle.price;
  }

  return total;
};

  const getGrandTotal = () => {
    return cart?.reduce((total, item) => total + getItemTotal(item), 0) || 0;
  };

 {/* const handleCheckout = async () => {
  // -----------------------------
  // 1️⃣ BASIC VALIDATION
  // -----------------------------
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const pickupLocation = document.getElementById("pickupLocation").value;

  if (!fullName || !email || !mobile || !pickupLocation) {
    Swal.fire({
      icon: "warning",
      title: "Missing Information",
      text: "Please fill all required personal details.",
      background: "#0a0a0a",
      color: "#fff",
      customClass: { popup: "swal-dark swal-border" },
    });
    return;
  }

  for (const item of cart) {
    const uid = createUniqueId(item);
    if (!tourDates[uid]) {
       Swal.fire({
        icon: "warning",
        title: "Tour Date Missing",
        text: `Please select tour date for "${item.title}"`,
        background: "#0a0a0a",
        color: "#fff",
        customClass: { popup: "swal-dark swal-border" },
      });
      return;
    }
  }

  Swal.fire({
    title: "Processing Booking...",
    html: "Please wait while we confirm your tour",
    allowOutsideClick: false,
    allowEscapeKey: false,
    background: "#0a0a0a",
    color: "#fff",
    customClass: { popup: "swal-dark swal-border" },
    didOpen: () => {
      Swal.showLoading(); // this shows the spinner
    },
  });

  // -----------------------------
  // 2️⃣ CREATE FORMDATA
  // -----------------------------
  const formData = new FormData();

  formData.append("full_name", fullName);
  formData.append("email", email);
  formData.append("mobile", mobile);
  formData.append("whatsapp", document.getElementById("whatsapp").value || "");
  formData.append("pickup_location", pickupLocation);
  formData.append("total_amount", getGrandTotal());

  formData.append(
    "payment_method_note",
    "Cash or Credit Card payment on tour day only"
  );

  // -----------------------------
  // 3️⃣ CART ITEMS
  // -----------------------------
  const cartPayload = cart.map(item => {
    const uid = createUniqueId(item);
    const vehicle = privateVehicleSelection[uid];

    return {
      id: item.id,
      title: item.title,
      base_price: item.price,
      quantity: quantities[uid] || 1,
      duration: item?.time ? durations[uid] : null,
      tour_date: tourDates[uid],
      private_transfer: privateTransfers[uid] || false,
      vehicle: vehicle
        ? {
            id: vehicle.id,
            seater: vehicle.seater,
            price: vehicle.price
          }
        : null,
      item_total: getItemTotal(item),
    };
  });

  formData.append("cart_items", JSON.stringify(cartPayload));

  // -----------------------------
  // 4️⃣ SEND TO BACKEND (FIXED)
  // -----------------------------
  try {
    const res = await axiosApi.post(
      "booking-confirmation/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const data = res.data;
    Swal.close();

    Swal.fire({
      icon: "success",
      title: "Booking Successful!",
      text: `Booking ID: ${data.booking_id}`,
      timer: 2000,
      showConfirmButton: false,
      background: "#0a0a0a",
      color: "#fff",
      customClass: { popup: "swal-dark swal-border" },
    });
    
    setQuantities({});
    setDurations({});
    setPrivateTransfers({});
    setPrivateVehicleSelection({});
    setTourDates({});

    navigate("/booking-confirmed");

  } catch (error) {
    console.error(error.response?.data || error);
    Swal.fire({
      icon: "error",
      title: "Booking Failed",
      text: "Please contact us on WhatsApp",
      background: "#0a0a0a",
      color: "#fff",
      customClass: { popup: "swal-dark swal-border" },
    });
  }
}; */}

const handleCheckout = async () => {
  // -----------------------------
  // 1️⃣ BASIC VALIDATION
  // -----------------------------
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const pickupLocation = document.getElementById("pickupLocation").value;

  if (!fullName || !email || !mobile || !pickupLocation) {
    Swal.fire({
      icon: "warning",
      title: "Missing Information",
      text: "Please fill all required personal details.",
      background: "#0a0a0a",
      color: "#fff",
      customClass: { popup: "swal-dark swal-border" },
    });
    return;
  }

  for (const item of cart) {
    const uid = createUniqueId(item);
    if (!tourDates[uid]) {
      Swal.fire({
        icon: "warning",
        title: "Tour Date Missing",
        text: `Please select tour date for "${item.title}"`,
        background: "#0a0a0a",
        color: "#fff",
        customClass: { popup: "swal-dark swal-border" },
      });
      return;
    }
  }

  Swal.fire({
    title: "Processing Booking...",
    html: "Please wait while we confirm your tour",
    allowOutsideClick: false,
    allowEscapeKey: false,
    background: "#0a0a0a",
    color: "#fff",
    customClass: { popup: "swal-dark swal-border" },
    didOpen: () => Swal.showLoading(),
  });

  // -----------------------------
  // 2️⃣ SEND CONVERSION EVENT (FB Pixel / CAPI)
  // -----------------------------
  try {
    sendConversionEvent({
      event: "Lead",
      content_name: "Tour Booking",
      value: getGrandTotal(),
      currency: "AED",
      email: localStorage.getItem("user_email") || "guest@example.com",
    });

    // -----------------------------
    // 3️⃣ CREATE FORMDATA
    // -----------------------------
    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("whatsapp", document.getElementById("whatsapp").value || "");
    formData.append("pickup_location", pickupLocation);
    formData.append("total_amount", getGrandTotal());
    formData.append("payment_method_note", "Cash or Credit Card payment on tour day only");

    const cartPayload = cart.map((item) => {
      const uid = createUniqueId(item);
      const vehicle = privateVehicleSelection[uid];

      return {
        id: item.id,
        title: item.title,
        base_price: item.price,
        quantity: quantities[uid] || 1,
        duration: item?.time ? durations[uid] : null,
        tour_date: tourDates[uid],
        private_transfer: privateTransfers[uid] || false,
        vehicle: vehicle
          ? {
              id: vehicle.id,
              seater: vehicle.seater,
              price: vehicle.price,
            }
          : null,
        item_total: getItemTotal(item),
      };
    });

    formData.append("cart_items", JSON.stringify(cartPayload));

    // -----------------------------
    // 4️⃣ SEND TO BACKEND
    // -----------------------------
    const res = await axiosApi.post("booking-confirmation/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const data = res.data;
    Swal.close();

    Swal.fire({
      icon: "success",
      title: "Booking Successful!",
      text: `Booking ID: ${data.booking_id}`,
      timer: 2000,
      showConfirmButton: false,
      background: "#0a0a0a",
      color: "#fff",
      customClass: { popup: "swal-dark swal-border" },
    });

    // -----------------------------
    // 5️⃣ EMPTY CART AFTER SUCCESS
    // -----------------------------
    setCart([]);
    localStorage.removeItem("cart");

    // reset all states
    setQuantities({});
    setDurations({});
    setPrivateTransfers({});
    setPrivateVehicleSelection({});
    setTourDates({});

    navigate("/booking-confirmed");

  } catch (error) {
    console.error(error.response?.data || error);
    Swal.fire({
      icon: "error",
      title: "Booking Failed",
      text: "Please contact us on WhatsApp",
      background: "#0a0a0a",
      color: "#fff",
      customClass: { popup: "swal-dark swal-border" },
    });
  }
};


  return (
    <div className={styles.cartPageWrapper}>
      <div className="container">
        <div className="row g-4">
          {/* Left Side */}
          <div className="col-lg-8">
            <div className={styles.cartItemsSection}>
              <h2 className={styles.sectionTitle}>Your Cart</h2>

              <div className={styles.supportNotice}>
                <span>Having trouble booking? </span>
                <div onClick={handleWhatsAppCheckout} className={styles.whatsappContact}>
      
                  Contact us on WhatsApp

                </div>
                
              </div>
              {cart.length < 1 && (
                <h3 className={`text-center ${styles.emptyCart}`}>Cart Is Empty</h3>
              )}

              {cart.length > 0 &&
                cart.map((item) => {
                  const uniqueId = createUniqueId(item);
                  return (
                    <div key={uniqueId} className={styles.cartItem}>
                      <div className={styles.cartItemImage}>
                        <img src={item?.image} alt={item?.title} />
                      </div>

                      <div className={styles.cartItemDetails}>
                        <h3 className={styles.cartItemTitle}>{item?.title}</h3>
                        <p className={styles.cartItemPrice}>
                          {item?.price} AED{" "}
                          <span className={styles.groupType}>per {item?.grouptype}</span>
                        </p>

                        <div className={styles.personSelector}>
                          <div>
                            <label htmlFor={`people-${uniqueId}`}>Number Of Persons</label>
                            <input
                              id={`people-${uniqueId}`}
                              type="number"
                              min="1"
                              value={quantities[uniqueId] || 1}
                              onChange={(e) =>
                                handleQuantityChange(uniqueId, e.target.value)
                              }
                              className={styles.personInput}
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`tourDate-${uniqueId}`}
                              className={styles.formLabel}
                            >
                              Tour Date *
                            </label>

                            <input
                              type="date"
                              id={`tourDate-${uniqueId}`}
                              className={`${styles.formInput} ${styles.tourDate}`}
                              value={tourDates[uniqueId] || ""}
                              onChange={(e) =>
                                setTourDates(prev => ({
                                  ...prev,
                                  [uniqueId]: e.target.value,
                                }))
                              }
                              required
                            />
                          </div>
                        </div>

                        {/* Duration selector for quad/dune buggy */}
                        {item?.time && (
                          <div className={styles.durationSelectorCart}>
                            <label htmlFor={`duration-${uniqueId}`}>Ride Duration *</label>
                            <select
                              id={`duration-${uniqueId}`}
                              value={durations[uniqueId] || 30}
                              onChange={(e) =>
                                handleDurationChange(uniqueId, e.target.value)
                              }
                              className={styles.durationSelect}
                            >
                              {timeOptions.map((time) => {
                                const basePrice = parseFloat(item.price) || 0;
                                const multiplier = time / 30;
                                const calculatedPrice = basePrice * multiplier;
                                return (
                                  <option key={`${uniqueId}-${time}`} value={time}>
                                    {time} minutes - {calculatedPrice} AED
                                  </option>
                                );
                              })}
                            </select>
                              
                          </div>
                        )}

                        {/* Private Transfer for other tours */}
                        {item.has_private_transfer && (
                          <div className={styles.privateTransferWrapper}>
                            <label className={styles.privateTransferCheckbox}>
                              <input
                                type="checkbox"
                                checked={privateTransfers[uniqueId] || false}
                                onChange={(e) =>
                                  handlePrivateTransferChange(uniqueId, e.target.checked)
                                }
                              />
                              Include Private Transfer
                            </label>

                            {privateTransfers[uniqueId] &&
                              item.privateTransferOptions?.length > 0 && (
                                <select
                                  value={privateVehicleSelection[uniqueId]?.id || ""}
                                  onChange={(e) =>
                                    handlePrivateVehicleChange(uniqueId, e.target.value)
                                  }
                                  className={styles.privateVehicleSelect}
                                >
                                  {item.privateTransferOptions.map((vehicle) => (
                                    <option key={vehicle.id} value={vehicle.id}>
                                      {vehicle.seater} Seater (+ {vehicle.price} AED)
                                    </option>
                                  ))}
                                </select>
                              )}
                          </div>
                        )}
                      </div>

                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.id, item.type)}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
            </div>

            {/* Booking Form */}
            <div className={styles.bookingForm}>
              <h2 className={styles.sectionTitle}>Booking Details</h2>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="fullName" className={styles.formLabel}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      className={styles.formInput}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className={styles.formLabel}>
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={styles.formInput}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="mobile" className={styles.formLabel}>
                      Mobile Number *
                    </label>
                    <input
                      type="text"
                      id="mobile"
                      className={styles.formInput}
                      placeholder="Enter your mobile number"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="whatsapp" className={styles.formLabel}>
                      WhatsApp Number
                    </label>
                    <input
                      type="text"
                      id="whatsapp"
                      className={styles.formInput}
                      placeholder="Enter your WhatsApp number"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="pickupLocation" className={styles.formLabel}>
                      Pickup Location *
                    </label>
                    <input
                      type="text"
                      id="pickupLocation"
                      className={styles.formInput}
                      placeholder="Enter pickup location"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side - Cart Summary */}
          <div className="col-lg-4">
            <div className={styles.cartSummary}>
              <h2 className={styles.summaryTitle}>Cart Summary</h2>
              <div className={styles.summaryContent}>
                {cart?.map((item) => {
                  const uniqueId = createUniqueId(item);
                  return (
                    <div key={uniqueId} className={styles.summaryItem}>
                      <div className={styles.summaryItemName}>
                        {item?.title}
                        {item?.time && durations[uniqueId] && (
                          <span className={styles.durationBadge}>
                            {" "}• {durations[uniqueId]} min
                          </span>
                        )}
                        <span className={styles.summaryItemQty}>
                          × {quantities[uniqueId] || 1} person
                          {quantities[uniqueId] > 1 ? "s" : ""}
                        </span>
                      </div>

                      {privateTransfers[uniqueId] && privateVehicleSelection[uniqueId] && (
                        <div className={styles.summaryPrivateTransfer}>
                          Private Transfer: {privateVehicleSelection[uniqueId].seater} Seater
                        </div>
                      )}

                      <div className={styles.summaryItemPrice}>
                        {getItemTotal(item)} AED
                      </div>
                    </div>
                  );
                })}

                <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                  <span>Total</span>
                  <span>{getGrandTotal()} AED</span>
                </div>
                <p className={styles.paymentNotice}>
                  ⚠️ Payment on tour day only (Cash or Credit Card)
                </p>
                <p className={`${styles.vatTax}`}>
                  5% VAT applies to credit card payments
                </p>
              </div>

              <button className={styles.checkoutBtn} onClick={handleCheckout}>Proceed to Checkout</button>
              <button className={styles.whatsappCheckout} onClick={handleWhatsAppCheckout}>
  <FaWhatsapp style={{ fontSize: "30px" }} />
  Book via WhatsApp
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;
