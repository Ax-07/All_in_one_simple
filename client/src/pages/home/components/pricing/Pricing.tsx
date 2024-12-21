import React from 'react';
// import '../styles/Pricing.scss';

const Pricing: React.FC = () => {
  const pricingPlans = [
    { title: 'Basique', price: 'Gratuit', features: ['Réservations', 'Stocks'] },
    { title: 'Premium', price: '29€/mois', features: ['Réservations', 'Stock', 'Caisse'] },
    { title: 'Entreprise', price: 'Contactez-nous', features: ['Premium + Personnalisation'] }
  ];

  return (
    <section className="pricing" id="pricing">
      <h2>Nos Tarifs</h2>
      <div className="pricing-cards">
        {pricingPlans.map(plan => (
          <div className="pricing-card" key={plan.title}>
            <h3>{plan.title}</h3>
            <p className="price">{plan.price}</p>
            <ul>
              {plan.features.map((feature, index) => <li key={index}>{feature}</li>)}
            </ul>
            <button>Choisir</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
