import React from "react";

const AccessibiliteTab: React.FC = () => {
  return (
    <div>
      <h2>Accessibilité & Autres Options</h2>
      <p className="section-desc">Définissez les conditions d’accueil, l’accessibilité, et les paramètres généraux.</p>
      <label>
        <input type="checkbox" /> Accessible aux PMR
      </label>
      <label>
        Fuseau horaire :
        <select>
          <option value="europe-paris">Europe/Paris</option>
          <option value="europe-berlin">Europe/Berlin</option>
        </select>
      </label>
    </div>
  );
};

export default AccessibiliteTab;
