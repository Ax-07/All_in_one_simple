import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../../../stores/store";
import {
  fetchPaymentSettings,
  FloorPlanSettings,
  PaymentSettings,
  updateFloorPlanSettings,
  updatePaymentSettings,
} from "./paiementSlice";
import Checkbox from "../../../components/checkBox/Checkbox";

const PaiementTab: React.FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { paymentSettings, floorPlanSettings } = useSelector((state: RootState) => state.paymentSettings);

  const handlePaymentChange = (
    field: keyof PaymentSettings,
    value: boolean | string
  ) => {
    dispatch(updatePaymentSettings({ field, value }));
  };

  const handleFloorPlanChange = (
    field: keyof FloorPlanSettings,
    value: boolean | string
  ) => {
    dispatch(updateFloorPlanSettings({ field, value }));
  };

  useEffect(() => {
    dispatch(fetchPaymentSettings());
  }, [dispatch]);

  return (
    <div>
      {/* Paramètres de Paiement en Ligne */}
      <div className="settings-block">
        <h2>Paramètres de Paiement en Ligne</h2>
        <p className="section-desc">
          Activez le paiement en ligne et configurez la passerelle de paiement.
        </p>

        <div className="policy-group">
          <h3>Activer le Paiement en Ligne</h3>
          <p className="section-desc">
            Permettez à vos clients de payer en ligne lors de la réservation.
          </p>
          <Checkbox name="online-payment-enabled"
            checked={paymentSettings.onlinePaymentEnabled}
            onChange={(e) =>
              handlePaymentChange("onlinePaymentEnabled", e.target.checked)
            }
          >
            Activer le paiement en ligne
          </Checkbox>
        </div>

        <div className="policy-group">
          <h3>Passerelle de Paiement</h3>
          <p className="section-desc">
            Sélectionnez un prestataire de paiement et renseignez vos
            identifiants.
          </p>
          <label htmlFor="payment-provider">Prestataire :</label>
          <select
            id="payment-provider"
            name="payment-provider"
            value={paymentSettings.paymentProvider}
            onChange={(e) =>
              handlePaymentChange("paymentProvider", e.target.value)
            }
          >
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
          </select>

          <label htmlFor="payment-api-key">Clé API :</label>
          <input
            type="text"
            id="payment-api-key"
            name="payment-api-key"
            placeholder="Votre clé API du prestataire"
            value={paymentSettings.paymentApiKey}
            onChange={(e) =>
              handlePaymentChange("paymentApiKey", e.target.value)
            }
          />

          <Checkbox name="full-prepayment"
            checked={paymentSettings.fullPrepayment}
            onChange={(e) =>
              handlePaymentChange("fullPrepayment", e.target.checked)
            }
          >
            Exiger le paiement total à la réservation
          </Checkbox>
        </div>
      </div>

      {/* Gestion du Plan de Salle */}
      <div className="settings-block">
        <h2>Gestion du Plan de Salle</h2>
        <p className="section-desc">
          Configurez un plan de salle pour aider les clients à choisir leur
          table.
        </p>

        <div className="policy-group">
          <h3>Affichage du Plan de Salle</h3>
          <p className="section-desc">
            Permettez aux clients de voir la disposition de la salle et
            éventuellement de choisir leur table.
          </p>
          <Checkbox name="show-floor-plan"
            checked={floorPlanSettings.showFloorPlan}
            onChange={(e) =>
              handleFloorPlanChange("showFloorPlan", e.target.checked)
            }
          >
            Afficher le plan de salle en ligne
          </Checkbox>
          <label htmlFor="floor-plan-url">
            URL du Plan de Salle (image ou page) :
          </label>
          <input
            type="url"
            id="floor-plan-url"
            name="floor-plan-url"
            placeholder="https://example.com/plan.jpg"
            value={floorPlanSettings.floorPlanURL}
            onChange={(e) =>
              handleFloorPlanChange("floorPlanURL", e.target.value)
            }
          />
        </div>

        <div className="policy-group">
          <h3>Tables & Capacités</h3>
          <p className="section-desc">
            Définissez le nombre de tables, leurs capacités, et leurs noms ou
            numéros.
          </p>
          <label htmlFor="tables-info">
            Détails (ex: Table 1: 4 pers, Table 2: 2 pers) :
          </label>
          <textarea
            id="tables-info"
            name="tables-info"
            rows={3}
            value={floorPlanSettings.tablesInfo}
            onChange={(e) =>
              handleFloorPlanChange("tablesInfo", e.target.value)
            }
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default PaiementTab;
