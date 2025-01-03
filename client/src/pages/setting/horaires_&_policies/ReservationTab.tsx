import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, store } from "../../../stores/store";
import Horaires from "./horaires/Horaires";
import DressCode from "./policies/DressCode";
import CancellationPolicy from "./policies/CancellationPolicy";
import ServiceFeesPolicy from "./policies/ServiceFeesPolicy";
import MaxPartySize from "./policies/MaxPartySize";
import { fetchPolicies } from "./policies/policiesSlice";

const ReservationTab = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const policies = useSelector((state: RootState) => state.policies.policies);

  useEffect(() => {
    // Au montage du composant, on déclenche la récupération des données
    dispatch(fetchPolicies());
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
    </div>
  );
};

export default ReservationTab;
