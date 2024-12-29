import React, { useState } from "react";
import TabsNav from "./TabsNav";
import ReservationTab from "./ReservationTab";
import MenuTab from "./MenuTab";
import NotificationsTab from "./NotificationsTab";
import PaiementTab from "./PaiementTab";
import AccessibiliteTab from "./AccessibiliteTab";

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
      <section className="settings-section">{renderActiveTab()}</section>
    </>
  );
};

export default Settings;
