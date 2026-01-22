import CardsHandler from '../CardsHandler/CardsHandler.jsx'
import SectionHeader from '../SectionHeader/SectionHeader.jsx'
import { useEffect, useState } from 'react'
import axiosApi from '../Axios/Axios.js'
import ReactPixel from "react-facebook-pixel";
import {sendConversionEvent} from '../../ConversionEvents'


function Yachts(){

    const [cardData,setCardData]=useState([])


  

         useEffect(() => {
  sendConversionEvent({
    event: "ViewContent",
    content_name: "Yachts Page",
    value: 0,
    currency: "AED",
    email: localStorage.getItem("user_email") || "guest@example.com",
  });
}, []);


    useEffect(()=>{
        axiosApi.get('yachts/')
        .then(res => {
            // Add type field to each tour
            const toursWithType = res.data.map(tour => ({
                ...tour,
                type: 'yachts'
            }));
            setCardData(toursWithType);
            console.log(toursWithType);
        })
    },[])

return(
        <>
        <SectionHeader title="Yachts"/> 

        <CardsHandler  cards={cardData} splitDescription={true}
            showHighlights={true}/>
        
        </>
    )

}

export default Yachts;