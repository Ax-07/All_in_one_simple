import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../../stores/store";
import { updateMarketingSetting } from "./marketingSettingSlice";
import Checkbox from "../../../components/checkBox/Checkbox";

const MarketingSetting: FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const {
    enablePromotions,
    promotionText,
    sendNewsletters,
    confirmationEmailText,
    reminderEmailText,
  } = useSelector(
    (state: RootState) => state.marketingSetting.marketingSetting
  );

  const handleEnablePromotions = (checked: boolean) => {
    dispatch(
      updateMarketingSetting({ field: "enablePromotions", value: checked })
    );
  };

  const handlePromotionText = (text: string) => {
    dispatch(updateMarketingSetting({ field: "promotionText", value: text }));
  };

  const handleSendNewsletters = (checked: boolean) => {
    dispatch(
      updateMarketingSetting({ field: "sendNewsletters", value: checked })
    );
  };

  const handleConfirmationEmailText = (text: string) => {
    dispatch(
      updateMarketingSetting({ field: "confirmationEmailText", value: text })
    );
  };

  const handleReminderEmailText = (text: string) => {
    dispatch(
      updateMarketingSetting({ field: "reminderEmailText", value: text })
    );
  };

  return (
    <div className="settings-block">
      <h2>Paramètres de Communication & Marketing</h2>
      <p className="section-desc">
        Gérez les promotions, newsletters, et textes des emails pour améliorer
        la relation client.
      </p>

      {/* Promotions & Offres Spéciales */}
      <div className="policy-group">
        <h3>Promotions & Offres Spéciales</h3>
        <p className="section-desc">
          Mettez en avant des offres spéciales ou des événements (happy hour,
          menus festifs).{" "}
        </p>
        <Checkbox name="enable-promotions"
          checked={enablePromotions}
          onChange={(e) => handleEnablePromotions(e.target.checked)}
        >
          Activer les promotions
        </Checkbox>
        <label htmlFor="promotion-text">Texte de la promotion :</label>
        <textarea
          id="promotion-text"
          name="promotion-text"
          rows={2}
          value={promotionText}
          onChange={(e) => handlePromotionText(e.target.value)}
        ></textarea>
      </div>

      {/* Newsletters & Communications */}
      <div className="policy-group">
        <h3>Newsletters & Communications</h3>
        <p className="section-desc">
          Envoyez régulièrement des newsletters ou des promotions par email aux
          clients inscrits.
        </p>
        <Checkbox name="send-newsletters"
          checked={sendNewsletters}
          onChange={(e) => handleSendNewsletters(e.target.checked)}
        >
          Envoyer des newsletters
        </Checkbox>
      </div>

      {/* Personnalisation des Emails */}
      <div className="policy-group">
        <h3>Personnalisation des Emails</h3>
        <p className="section-desc">
          Modifiez le texte des emails de confirmation, de rappel, ou
          d’annulation pour une touche plus personnelle.
        </p>
        <label htmlFor="confirmation-email-text">
          Texte Email Confirmation :
        </label>
        <textarea
          id="confirmation-email-text"
          name="confirmation-email-text"
          rows={3}
          value={confirmationEmailText}
          onChange={(e) => handleConfirmationEmailText(e.target.value)}
        ></textarea>
        <label htmlFor="reminder-email-text">Texte Email Rappel :</label>
        <textarea
          id="reminder-email-text"
          name="reminder-email-text"
          rows={3}
          value={reminderEmailText}
          onChange={(e) => handleReminderEmailText(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default MarketingSetting;
