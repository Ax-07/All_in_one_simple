import React from 'react';
// import '../styles/Pricing.scss';

const Testimonials: React.FC = () => {
  return (
<section className="testimonials" id="testimonials">
        <h2>Avis de Nos Utilisateurs</h2>
        <div className="testimonial-list">
          <div className="testimonial-item">
            <p>"RéservApp a transformé la façon dont nous gérons nos réservations. Plus de confusion, tout est clair et organisé."</p>
            <h4>Marie Dupont</h4>
            <span>Propriétaire - Bistro Chez Marie</span>
          </div>
          <div className="testimonial-item">
            <p>"L'analyse des données nous a permis de mieux comprendre nos clients et d'optimiser notre service."</p>
            <h4>Jean Martin</h4>
            <span>Manager - La Table de Jean</span>
          </div>
          <div className="testimonial-item">
            <p>"L'application mobile est incroyablement pratique. Je peux gérer les réservations même en déplacement."</p>
            <h4>Claire Leblanc</h4>
            <span>Chef - Gourmet Delight</span>
          </div>
        </div>
      </section>
  );
};

export default Testimonials;
