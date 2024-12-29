import React from "react";

const MenuTab: React.FC = () => {
  return (
    <div>
      <h2>Menu & Carte</h2>
      <p className="section-desc">
        Gérez l’affichage de votre menu, de votre carte des vins, et importez plusieurs documents PDF (menus, cartes,
        boissons, vins) pour vos clients.
      </p>
      <div className="menu-documents-section">
        <h3>Documents PDF</h3>
        <button type="button" className="btn-secondary">
          + Ajouter un document
        </button>
      </div>
    </div>
  );
};

export default MenuTab;
