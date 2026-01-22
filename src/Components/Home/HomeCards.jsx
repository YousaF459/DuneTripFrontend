import styles from "./HomeCards.module.css";
import { FaWhatsapp } from 'react-icons/fa';
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from '../Context/CartContext.jsx'
import { Link } from 'react-router-dom';
import ReactPixel from "react-facebook-pixel";
import { v4 as uuidv4 } from "uuid";
import {sendConversionEvent} from '../../ConversionEvents'


function HomeCard({ card,splitDescription, showHighlights}){

    const { addToCart } = useCart();
      const {description,highlights}=card;

    const highlightsList =
  highlights && highlights.trim()
    ? highlights.split(/\r?\n|\r/).filter(item => item.trim())
    : [];

const descriptionList =
  description && description.trim()
    ? description.split(/\r?\n|\r/).filter(item => item.trim())
    : [];


const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

const handleWhatsAppClick = () => {
  
  sendConversionEvent({
    event: "ClickToWhatsApp",
    content_name: "Contact via WhatsApp",
    value: 0,
    currency: "AED",
    email: localStorage.getItem("user_email") || "guest@example.com",
  });
  // Combine highlights and description lines
  const combinedLines = [
    ...(card.highlights ? card.highlights.split(/\r?\n|\r/).filter(line => line.trim()) : []),
    ...(card.description ? card.description.split(/\r?\n|\r/).filter(line => line.trim()) : []),
  ];

  // Convert to bullet points
  const descriptionText = combinedLines.length
    ? `\nDescription:\n- ${combinedLines.join("\n- ")}`
    : "";

  const message = `Hello! I'm interested in this tour:\n` +
                  `Title: ${card.title}\n` +
                  `Price: ${card.price} AED per ${card.grouptype}` +
                  descriptionText;

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank"); // opens WhatsApp in a new tab
};

    return(
    <div className={`${styles.card}`}>
      <img src={card?.image} alt={card?.title} className={styles.cardImage} />
      <h2 className={styles.cardTitle}>{card?.title}</h2>


      {!showHighlights && (
      <p className={`${styles.cardDesc}`}>{description}</p>)
      }
      
      
      
      {highlightsList && highlightsList.length > 0 && (
  <ul className={`${styles.cardList} ${styles.highlightsListitems}`}>
    {highlightsList?.map((item, index) => (
      <li key={index} >{item}</li>
    ))}
  </ul>
)}

      {descriptionList && highlightsList.length > 0 && (

        <ul className={styles.cardList}>

      {descriptionList?.map((item,index)=>(
        <li key={index}>{item}</li>
      ))}

      </ul>
      )}

      {card?.price && (
  <p className={styles.cardPrice}>
    {card?.price} AED<span>per {card?.grouptype}</span>
  </p>
)}
    {!showHighlights && (
  <Link to={card?.linkForward} className={styles.cardButton}>
    Explore and Book
  </Link>
)}
      

    {showHighlights && ( 
      <div className={styles.cardButtons}>
      {card?.addToCartButton && (
          <button className={styles.cardButton} onClick={() => addToCart(card)}>Add to Cart  <FaCartShopping style={{fontSize:"25px"}}/></button>

      )}
  <button className={styles.whatsappButton} onClick={handleWhatsAppClick}>
  <FaWhatsapp size={20} className={styles.whatsappIcon} />
  WhatsApp
</button>
</div>
    ) }
      

    </div>
  );
}

export default HomeCard;