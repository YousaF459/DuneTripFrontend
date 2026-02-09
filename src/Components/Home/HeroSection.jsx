import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';
import desertHeroImage from '../../assets/images/desert-hero.jpg';

function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Experience Dubai's Best <span className={styles.highlight}>Desert Adventures</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Licensed & Registered Tourism Company in Dubai
        </p>
        <p className={styles.heroDescription}>
          Create unforgettable memories with our premium desert safari experiences, 
          thrilling dune buggy rides, and exclusive Abu Dhabi city tours.
        </p>
        <div className={styles.heroButtons}>
          <Link to="/desert-safari" className={styles.btnPrimary}>
            Book Your Adventure
          </Link>
          
        </div>
      </div>
    </section>
  );
}

export default HeroSection;