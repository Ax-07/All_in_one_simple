import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../../stores/store";
import { updateNotificationSetting } from "./notificationSettingSlice";
import Checkbox from "../../../components/checkBox/Checkbox";

const NotificationSetting: FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { smsReminders, emailReminders, reminderHours } = useSelector(
    (state: RootState) => state.notificationSetting.notificationSetting
  );

  const handleSmsReminders = (checked: boolean) => {
    dispatch(
      updateNotificationSetting({ field: "smsReminders", value: checked })
    );
  };

  const handleEmailReminders = (checked: boolean) => {
    dispatch(
      updateNotificationSetting({ field: "emailReminders", value: checked })
    );
  };

  const handleReminderHours = (hours: number) => {
    dispatch(
      updateNotificationSetting({ field: "reminderHours", value: hours })
    );
  };

  return (
    <div className="settings-block">
      <h2>Notifications Automatiques</h2>
      <p className="section-desc">
        Définissez le mode et le délai d’envoi des rappels afin que vos clients
        ne manquent pas leur réservation.
      </p>

      {/* Méthodes de Notification */}
      <div className="notifications-group">
        <h3>Méthodes de Notification</h3>
        <p className="section-desc">
          Choisissez comment prévenir vos clients avant leur réservation.
        </p>

        <Checkbox name="sms-reminders"
          checked={smsReminders}
          onChange={(e) => handleSmsReminders(e.target.checked)}
        >
          Envoyer des rappels par SMS
        </Checkbox>
        <Checkbox name="email-reminders"
          checked={emailReminders}
          onChange={(e) => handleEmailReminders(e.target.checked)}
        >
          Envoyer des rappels par Email
        </Checkbox>
      </div>

      {/* Délai d’Envoi */}
      <div className="delay-group">
        <h3>Délai d’Envoi</h3>
        <p className="section-desc">
          Spécifiez combien d’heures avant la réservation le rappel doit être
          envoyé.
        </p>
        <label htmlFor="reminder-hours">Heures avant la réservation :</label>
        <input
          type="number"
          id="reminder-hours"
          name="reminder-hours"
          value={reminderHours}
          min="1"
          max="168"
          onChange={(e) => handleReminderHours(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default NotificationSetting;