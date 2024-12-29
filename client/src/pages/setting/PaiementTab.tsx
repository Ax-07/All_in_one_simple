import React from "react";

const PaiementTab: React.FC = () => {
  return (
    <div>
      <h2>Paramètres de Paiement en Ligne</h2>
      <p className="section-desc">
        Activez le paiement en ligne et configurez la passerelle de paiement.
      </p>
      <label>
        <input type="checkbox" /> Activer le paiement en ligne
      </label>
      <label>
        Prestataire :
        <select>
          <option value="stripe">Stripe</option>
          <option value="paypal">PayPal</option>
        </select>
      </label>
    </div>
  );
};

export default PaiementTab;
