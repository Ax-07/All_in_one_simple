import React from 'react';
// import '../styles/Hero.scss';

const Hero: React.FC = () => {
  return (
    <section className="hero" id='hero'>
      <div className="hero-content">
        <h1>Optimisez la Gestion de Vos Réservations</h1>
        <p>Gérez vos réservations, améliorez l'expérience client et boostez vos ventes.</p>
        <div className="cta-buttons">
          <button className="signup-btn" onClick={() => window.location.href = '/signup'}>Commencer Gratuitement</button>
          <button className="learnmore-btn" onClick={() => console.log('features')}>En savoir plus</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
