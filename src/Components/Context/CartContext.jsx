import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import ReactPixel from "react-facebook-pixel";
import {sendConversionEvent} from '../../ConversionEvents'

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


const addToCart = (tour) => {
  setCart((prev) => {
    const tourUniqueId = `${tour.type || "tour"}_${tour.id}`;

    const exists = prev.find((item) => {
      const itemUniqueId = `${item.type || "tour"}_${item.id}`;
      return itemUniqueId === tourUniqueId;
    });

    if (exists) {
      Swal.fire({
        icon: "info",
        title: "Already in Cart",
        text: "This tour is already in your cart",
        timer: 1500,
        showConfirmButton: false,
        background: "#0a0a0a",
        color: "#fff",
        customClass: {
          popup: "swal-dark swal-border",
        },
      });

      return prev;
    }
   

     
      
       sendConversionEvent({
      event: "AddToCart",
      content_name: tour.name,
      value: tour.price,
      currency: "AED",
      email: localStorage.getItem("user_email") || "guest@example.com",
    });

    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: "Tour has been added to your cart",
      timer: 1500,
      showConfirmButton: false,
      background: "#0a0a0a",
      color: "#fff",
      customClass: {
        popup: "swal-dark swal-border",
      },
    });

    return [...prev, tour];
  });
};

const removeFromCart = (id, type) => {
  const removeUniqueId = `${type || "tour"}_${id}`;

  Swal.fire({
    icon: "warning",
    title: "Remove Tour?",
    text: "This tour will be removed from your cart",
    showCancelButton: true,
    confirmButtonText: "Yes, remove",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#ef4444",
    background: "#0a0a0a",
    color: "#fff",
    customClass: {
      popup: "swal-dark swal-border",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Remove item
      setCart((prev) => {
        const newCart = prev.filter(
          (item) => `${item.type || "tour"}_${item.id}` !== removeUniqueId
        );

        // ✅ Show success after computing newCart
        Swal.fire({
          icon: "success",
          title: "Removed",
          text: "Tour has been removed from your cart",
          timer: 1200,
          showConfirmButton: false,
          background: "#0a0a0a",
          color: "#fff",
          customClass: {
            popup: "swal-dark swal-border",
          },
        });

        return newCart;
      });
    }
  });
};




  return (
    <CartContext.Provider value={{setCart, cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);