import styles from './Home.module.css'
import SectionHeader from '../SectionHeader/SectionHeader';
import HomeCard from './HomeCards';
import CardsHandler from '../CardsHandler/CardsHandler';
import axiosApi from '../Axios/Axios.js'
import { useEffect, useState } from 'react';
import ToursLoader from '../Loader/Loader.jsx'
import ToursError from '../Error/Error.jsx'
import {sendConversionEvent} from '../../ConversionEvents'
import HeroSection from './HeroSection.jsx';
import WhyChooseUs from './WhyChooseUs.jsx';
import StatsCounter from './StatsCounter.jsx';
import HowItWorks from './HowItWorks.jsx';
import CTABanner from './CTABanner.jsx';

function Home(){
   
const [cardData,setCardData]=useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
      sendConversionEvent({
        event: "ViewContent",
        content_name: "Home Page",
        value: 0,
        currency: "AED",
        email: localStorage.getItem("user_email") || "guest@example.com",
      });
    }, []);
   
    


    const fetchTours = () => {
    setLoading(true);
    setError(false);
    
    axiosApi.get('home/')
      .then(res => {
        // Add type field to each tour
        const toursWithType = res.data.map(tour => ({
          ...tour,
          type: 'home'
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
      <SectionHeader title="OUR PREMIUM ADVENTURES" />

      {loading && <ToursLoader />}

      {error && !loading && <ToursError onRetry={fetchTours} />}

      {!loading && !error && (
        <CardsHandler 
          cards={cardData} 
          splitDescription={false}
          showHighlights={false}
        />
      )}


      <HeroSection/>
      <WhyChooseUs/>
      <StatsCounter/>
      <HowItWorks/>
      <CTABanner/>

    </>
    )


}

export default Home;