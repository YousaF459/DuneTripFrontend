import styles from './WhyChooseUs.module.css';

function WhyChooseUs() {
  const features = [
    {
      icon: '✓',
      title: 'Licensed & Registered',
      description: 'Officially registered tourism company in Dubai with all necessary certifications'
    },
    {
      icon: '★',
      title: '5000+ Happy Customers',
      description: 'Trusted by thousands of tourists from around the world'
    },
    {
      icon: '💰',
      title: 'Best Price Guarantee',
      description: 'Competitive pricing with no hidden charges or extra fees'
    },
    {
      icon: '24/7',
      title: 'Customer Support',
      description: 'Round-the-clock assistance for all your queries and bookings'
    }
  ];

  return (
    <section className={styles.whySection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Why Choose Us</h2>
        <p className={styles.sectionSubtitle}>
          Your trusted partner for unforgettable Dubai adventures
        </p>
        
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.iconCircle}>
                <span className={styles.icon}>{feature.icon}</span>
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;