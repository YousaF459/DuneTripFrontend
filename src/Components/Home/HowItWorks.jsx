import styles from './HowItWorks.module.css';

function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Adventure',
      description: 'Browse our wide range of desert safaris, city tours, and adventure activities'
    },
    {
      number: '02',
      title: 'Book & Confirm',
      description: 'Select your preferred date, add to cart, and complete your secure booking'
    },
    {
      number: '03',
      title: 'Enjoy Your Experience',
      description: 'Get picked up from your location and enjoy an unforgettable adventure'
    }
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <p className={styles.sectionSubtitle}>
          Simple and easy booking process in just 3 steps
        </p>

        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div key={index} className={styles.stepCard}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={styles.connector}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;