import React from "react";

interface TabsNavProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabsNav: React.FC<TabsNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "tab-reservation", label: "Réservation & Politiques" },
    { id: "tab-menu", label: "Menu & Carte" },
    { id: "tab-notifications", label: "Notifications & Marketing" },
    { id: "tab-paiement", label: "Paiement & Plan de Salle" },
    { id: "tab-accessibilite", label: "Accessibilité & Autres" },
  ];

  return (
    <nav className="tabs-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-link ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default TabsNav;
