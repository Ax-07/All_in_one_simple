import React from "react";

const NotificationsTab: React.FC = () => {
  return (
    <div>
      <h2>Notifications Automatiques</h2>
      <p className="section-desc">
        Définissez le mode et le délai d’envoi des rappels afin que vos clients ne manquent pas leur réservation.
      </p>
      <div>
        <label>
          <input type="checkbox" /> Envoyer des rappels par SMS
        </label>
        <label>
          <input type="checkbox" /> Envoyer des rappels par Email
        </label>
      </div>
    </div>
  );
};

export default NotificationsTab;
