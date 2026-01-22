import { FaCartShopping } from "react-icons/fa6";
import styles from "./Header.module.css"
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from 'react-router-dom';
import { useState } from "react";
import { useCart } from "../Context/CartContext";
function Header(){



  const { cart } = useCart();
  const [hamburger,setHamburger]=useState(false)

 
  


  const handleHamburgerClick = () => {
  setHamburger(prev => !prev);
};
 


    return(
        <>
        <header className={`container-fluid ${styles.customHeader}`}>
    <div className={`d-flex justify-content-between py-3 ${styles.headerDiv}`}>

<NavLink to="/home"  className={`${styles.navlinks}`}>
<h1 className={styles.logo}>
  DuneTrip
  <span className={styles.safari}>Safari</span>
</h1>
</NavLink>

<div className={`d-flex ${styles.rightCorner}`}>
      <h2 className={`${styles.myBookings}`}><NavLink className={`${styles.navlinks}`} to="/my-bookings">My Bookings</NavLink></h2>

      <div className={`${styles.cartDiv}`}>
        <NavLink to="/cart" className={`${styles.navlinks}`}>
      <FaCartShopping className={`${styles.FaCart}`}/>
      <span className={`${styles.cartCount}`}>{cart.length}</span>
      </NavLink>
      </div>


      <div className={`${styles.hamburgerDiv}`} onClick={handleHamburgerClick}> 
        <GiHamburgerMenu className={`${styles.FaHumberger}`}/>
      </div>
      

    </div>
    </div>

    
    <div className={`${styles.toursList}`}>
        <div >
          <ul className={`${styles.listMain} ${
      hamburger ? styles.menuOpen : ""
    }`}>

            <li><NavLink to="/"  className={`${styles.navlinks}`}>Home</NavLink></li>
              <li><NavLink to="/desert-safari"  className={`${styles.navlinks}`}>Desert Safari</NavLink></li>
            <li><NavLink to="/abudhabi-tours"  className={`${styles.navlinks}`}>Abu Dhabi Tour</NavLink></li>
            <li><NavLink to="/dubaicity-tours"  className={`${styles.navlinks}`}>Dubai City Tours</NavLink></li>
            <li><NavLink to="/dunebuggy"  className={`${styles.navlinks}`}>Dune Buggy</NavLink></li>
            <li><NavLink to="/quad-bikes"  className={`${styles.navlinks}`}>Quad Bikes</NavLink></li>
            <li><NavLink to="/yachts"  className={`${styles.navlinks}`}>Yachts</NavLink></li>
            <li><NavLink to="/attraction-tickets"  className={`${styles.navlinks}`}>Attraction Tickets</NavLink></li>
            <li className={`${styles.mobileShowItems}`}><NavLink  className={`${styles.navlinks}`} to="/my-bookings">My Bookings</NavLink></li>
           
            <li className={`${styles.mobileShowItems}`}>
              <div className={`${styles.cartDivMobile}`}>
                <NavLink to="/cart" className={`${styles.navlinks}`}>
      <FaCartShopping className={`${styles.FaCartMobile}`}/>
      <span className={`${styles.cartCountMobile}`}>{cart.length}</span>
      </NavLink>
      </div>
      </li>

          </ul>
        </div>

    </div>


    
    </header>
        </>
    )
}

export default Header