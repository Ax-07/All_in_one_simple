import React, { useState } from "react";
import TabsNav from "./TabsNav";
import ReservationTab from "./horaires_&_policies/ReservationTab";
import MenuTab from "./menu_&_carte/MenuTab";
import NotificationsTab from "./notification_&_marketing/NotificationsTab";
import PaiementTab from "./paiement_&_plan_de_salle/PaiementTab";
import AccessibiliteTab from "./accessibilité_&_autres/AccessibiliteTab";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("tab-reservation");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "tab-reservation":
        return <ReservationTab />;
      case "tab-menu":
        return <MenuTab />;
      case "tab-notifications":
        return <NotificationsTab />;
      case "tab-paiement":
        return <PaiementTab />;
      case "tab-accessibilite":
        return <AccessibiliteTab />;
      default:
        return null;
    }
  };

  return (
    <>
      <TabsNav activeTab={activeTab} onTabChange={setActiveTab} />
      <section className="settings-section">
        <form className="settings-form">
          {renderActiveTab()}
          <button type="submit" className="btn-primary">
            Enregistrer
          </button>
        </form>
      </section>
    </>
  );
};

export default Settings;
