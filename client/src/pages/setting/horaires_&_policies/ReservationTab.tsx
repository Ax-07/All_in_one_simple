import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, store } from "../../../stores/store";
import Horaires from "./horaires/Horaires";
import DressCode from "./policies/DressCode";
import CancellationPolicy from "./policies/CancellationPolicy";
import ServiceFeesPolicy from "./policies/ServiceFeesPolicy";
import MaxPartySize from "./policies/MaxPartySize";
import { fetchPolicies } from "./policies/policiesSlice";
import DepositRequirement from "./advancedSettings/DepositRequirement";
import { fetchAdvancedSettings } from "./advancedSettings/advancedSettingsSlice";
import BookingAdvanceDelay from "./advancedSettings/BookingAdvanceDelay";
import NoShowPolicy from "./advancedSettings/NoShowPolicy";

const ReservationTab = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const policies = useSelector((state: RootState) => state.policies.policies);
  const advancedSettings = useSelector((state: RootState) => state.advancedSettings.advancedSettings);

  useEffect(() => {
    // Au montage du composant, on déclenche la récupération des données
    dispatch(fetchPolicies());
    dispatch(fetchAdvancedSettings());
  }, [dispatch]);

  return (
    <div
      className="tab-content"
      id="tab-reservation"
      style={{ display: "block" }}
    >
      <div className="settings-block">
        <Horaires />
      </div>

      {/* Section Politiques */}
      <div className="settings-block">
        <h2>Politiques</h2>

        {/* Politique d'annulation */}
        <CancellationPolicy policies={policies} />

        {/* Frais de Service */}
        <ServiceFeesPolicy policies={policies} />

        {/* Nombre maximal de convives */}
        <MaxPartySize policies={policies} />

        {/* Dress code */}
        <DressCode policies={policies}/>
      </div>

      {/* Paramètres de Réservation Avancée */}
      <div className="settings-block">
        <h2>Paramètres de Réservation Avancée</h2>

        {/* Exigence de dépôt */}
        <DepositRequirement advancedSettings={advancedSettings} />

        {/* Délai de réservation */}
        <BookingAdvanceDelay advancedSettings={advancedSettings} />

        {/* Politique de non-présentation */}
        <NoShowPolicy advancedSettings={advancedSettings} />
        
      </div>
    </div>
  );
};

export default ReservationTab;
