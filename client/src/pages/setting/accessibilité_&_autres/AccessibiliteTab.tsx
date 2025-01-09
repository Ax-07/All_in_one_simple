import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../../stores/store";
import {
  updateAccessibilitySettings,
  updateGeneralSettings,
  updateReviewSettings,
  updatePrivacySettings,
  fetchAccessibility,
  AccessibilitySetting,
  GeneralSettings,
  ReviewSettings,
  PrivacySettings,
} from "./accessibilitySlice";
import Checkbox from "../../../components/checkBox/Checkbox";

const AccessibiliteTab: React.FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { accessibilitySettings, generalSettings, reviewSettings, privacySettings } =
    useSelector((state: RootState) => state.accessibilitySetting);

  const handleAccessibilityChange = (
    field: keyof AccessibilitySetting,
    value: boolean
  ) => {
    dispatch(updateAccessibilitySettings({ field, value }));
  };

  const handleGeneralSettingsChange = (
    field: keyof GeneralSettings,
    value: string
  ) => {
    dispatch(updateGeneralSettings({ field, value }));
  };

  const handleReviewSettingsChange = (
    field: keyof ReviewSettings,
    value: boolean
  ) => {
    dispatch(updateReviewSettings({ field, value }));
  };

  const handlePrivacySettingsChange = (
    field: keyof PrivacySettings,
    value: boolean | string
  ) => {
    dispatch(updatePrivacySettings({ field, value }));
  };

  useEffect(() => {
    dispatch(fetchAccessibility());
  }, [dispatch]);

  return (
    <div>
      {/* Section Accessibilité & Autres Options */}
      <div className="settings-block">
        <h2>Accessibilité & Autres Options</h2>
        <p className="section-desc">
          Définissez les conditions d’accueil, l’accessibilité, le fuseau
          horaire et le mode de réservation de votre établissement.
        </p>

        <div className="access-group">
          <h3>Conditions d’Accueil</h3>
          <p className="section-desc">
            Spécifiez si votre restaurant accueille les enfants, les animaux, et
            propose un accès aux personnes à mobilité réduite.
          </p>
          <Checkbox name="child-friendly"
            checked={accessibilitySettings.childFriendly}
            onChange={(e) => handleAccessibilityChange("childFriendly", e.target.checked)}
          >
            Enfants autorisés
          </Checkbox>
          <Checkbox name="pets-allowed"
            checked={accessibilitySettings.petsAllowed}
            onChange={(e) => handleAccessibilityChange("petsAllowed", e.target.checked)}
          >
            Animaux autorisés
          </Checkbox>
          <Checkbox name="wheelchair-accessible"
            checked={accessibilitySettings.wheelchairAccessible}
            onChange={(e) => handleAccessibilityChange("wheelchairAccessible", e.target.checked)}
          >
            Accessible aux PMR
          </Checkbox>
        </div>

        <div className="general-settings-group">
          <h3>Paramètres Généraux</h3>
          <p className="section-desc">
            Définissez le fuseau horaire et le mode de réservation utilisé par
            votre établissement.
          </p>

          <label htmlFor="time-zone">Fuseau horaire :</label>
          <select name="time-zone"
            id="time-zone"
            value={generalSettings.timeZone}
            onChange={(e) => handleGeneralSettingsChange("timeZone", e.target.value)}
          >
            <option value="Europe/Paris">Europe/Paris</option>
            <option value="Europe/London">Europe/London</option>
            <option value="Europe/Berlin">Europe/Berlin</option>
            <option value="Europe/Madrid">Europe/Madrid</option>
          </select>

          <label htmlFor="reservation-mode">Mode de Réservation :</label>
          <select name="reservation-mode"
            id="reservation-mode"
            value={generalSettings.reservationMode}
            onChange={(e) =>
              handleGeneralSettingsChange("reservationMode", e.target.value)
            }
          >
            <option value="online">En ligne</option>
            <option value="phone">Par téléphone</option>
            <option value="email">Par email</option>
          </select>
        </div>
      </div>

      {/* Affichage des Avis & Notes */}
      <div className="settings-block">
        <h2>Avis & Notes des Clients</h2>
        <p className="section-desc">
          Permettez à vos clients de noter votre restaurant et de laisser des
          avis.
        </p>
        <Checkbox name="enable-reviews"
          checked={reviewSettings.enableReviews}
          onChange={(e) => handleReviewSettingsChange("enableReviews", e.target.checked)}
        >
          Activer les avis et les notes
        </Checkbox>
        <Checkbox name="moderate-reviews"
          checked={reviewSettings.moderateReviews}
          onChange={(e) => handleReviewSettingsChange("moderateReviews", e.target.checked)}
        >
          Modération des avis avant publication
        </Checkbox>
      </div>

      {/* RGPD / Politique de Confidentialité */}
      <div className="settings-block">
        <h2>RGPD & Politique de Confidentialité</h2>
        <p className="section-desc">
          Assurez-vous du respect de la réglementation sur les données
          personnelles.
        </p>
        <Checkbox name="show-privacy-policy"
          checked={privacySettings.showPrivacyPolicy}
          onChange={(e) => handlePrivacySettingsChange("showPrivacyPolicy", e.target.checked)}
        >
          Afficher le lien vers la politique de confidentialité
        </Checkbox>
        <label htmlFor="privacy-policy-url">
          URL de la politique de confidentialité :
        </label>
        <input
          type="url"
          id="privacy-policy-url"
          name="privacy-policy-url"
          placeholder="https://example.com/privacy"
        />

        <Checkbox name="require-consent"
          checked={privacySettings.requireConsent}
          onChange={(e) => handlePrivacySettingsChange("requireConsent", e.target.checked)}
        >
          Exiger le consentement du client pour les communications marketing
        </Checkbox>
      </div>
    </div>
  );
};

export default AccessibiliteTab;
