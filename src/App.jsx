import Header from "./Components/Header/Header";
import QuadBikes from "./Components/QuadBikes/QuadBikes";
import DesertSafari from "./Components/DesertSafari/DesertSafari";
import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from "./Components/Footer/Footer";
import AddToCart from './Components/AddToCart/AddToCart.jsx'
import BookingConfirmed from "./Components/BookingConfirmed/BookingConfirmed.jsx";
import MyBookings from "./Components/MyBookings/MyBookings.jsx";
import AbuDhabiTours from "./Components/AbuDhbaiTours/AbuDhbaiTours.jsx";
import DubaiCityTours from "./Components/DubaiTours/DubaiTours.jsx";
import DuneBuggy from "./Components/DuneBuggy/DuneBuggy.jsx";
import Yachts from "./Components/Yachts/Yachts.jsx";
import PrivacyPolicy from "./Components/Legal/PrivacyPolicy.jsx";
import RefundCancellation from "./Components/Legal/RefundCancellation.jsx";
import TermsConditions from "./Components/Legal/TermsConditions.jsx";
import FloatingCartAndWhatsApp from "./Components/CartandWhatsapp/FloatingCartAndWhatsApp.jsx";
import AttractionTickets from "./Components/AttractionTickets/AttractionTickets.jsx";
import { initFacebookPixel } from "./facebookPixel";
import { useEffect } from "react";

function App() {
  
  useEffect(() => {
    initFacebookPixel();
  }, []);

  return (
    <>
    <BrowserRouter>
    <Header></Header>

    <Routes>


    
    <Route path="/" element={<Home />} />
  <Route path="*" element={<Home />} />
    <Route path="/desert-safari" element={<DesertSafari />} />
      
    <Route path="/quad-bikes" element={<QuadBikes />} />
    <Route path="/cart" element={<AddToCart />} />
    <Route path="/booking-confirmed" element={<BookingConfirmed/>}/>
    <Route path="/my-bookings" element={<MyBookings/>}/>
    <Route path="/abudhabi-tours" element={<AbuDhabiTours/>}/>
    <Route path="/dubaicity-tours" element={<DubaiCityTours/>}/>
    <Route path="/dunebuggy" element={<DuneBuggy/>}/>
    <Route path="/yachts" element={<Yachts/>}/>
    <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
    <Route path="/terms-conditions" element={<TermsConditions/>}/>
    <Route path="/refund-policy" element={<RefundCancellation/>}/>
    <Route path="/attraction-tickets" element={<AttractionTickets/>}/>


    </Routes>

    <FloatingCartAndWhatsApp/>
    <Footer/>

    </BrowserRouter>
    </>
  )
}

export default App
