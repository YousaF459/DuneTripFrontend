import styles from './AttractionTickets.module.css'
import CardsHandler from '../CardsHandler/CardsHandler.jsx'
import SectionHeader from '../SectionHeader/SectionHeader.jsx'
import { useEffect, useState } from 'react'
import axiosApi from '../Axios/Axios.js'
import ToursLoader from '../Loader/Loader.jsx'
import ToursError from '../Error/Error.jsx'
import ReactPixel from "react-facebook-pixel";
import {sendConversionEvent} from '../../ConversionEvents'

function AttractionTickets(){

    const [cardData,setCardData]=useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
  sendConversionEvent({
    event: "ViewContent",
    content_name: "Attraction Tickets Page",
    value: 0,
    currency: "AED",
    email: localStorage.getItem("user_email") || "guest@example.com",
  });
}, []);
    

  

   const fetchTours = () => {
    setLoading(true);
    setError(false);
    
    axiosApi.get('attraction-tickets/')
      .then(res => {
        // Add type field to each tour
        const toursWithType = res.data.map(tour => ({
          ...tour,
          type: 'attractionTickets'
        }));
        setCardData(toursWithType);
     
        setLoading(false);
      })
      .catch(err => {
       
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTours();
  }, []);

return(
        
        
         <>
      <SectionHeader title="ATTRACTION TICKETS" />

      {loading && <ToursLoader />}

      {error && !loading && <ToursError onRetry={fetchTours} />}

      {!loading && !error && (
        <CardsHandler 
          cards={cardData} 
          splitDescription={true}
          showHighlights={true}
        />
      )}
    </>
    )

}

export default AttractionTickets;