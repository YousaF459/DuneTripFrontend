import styles from "./CardsHandler.module.css"
import HomeCard from "../Home/HomeCards";

function CardsHandler({ cards, splitDescription, showHighlights }){



    return(
        <>
        
        <div className={`${styles.backgroundChange}`}>
        <div className={`container`}>
        <div className="row g-4">
          {cards?.map((card, index) => (
            <div key={index}  className="col-lg-4 col-md-6 col-sm-12 mb-4 ">
              <HomeCard 
               card={card}
               splitDescription={splitDescription}
              showHighlights={showHighlights}
              
              />
            </div>
          ))}
        </div>
        </div>
        </div>

        </>
    )
}

export default CardsHandler;