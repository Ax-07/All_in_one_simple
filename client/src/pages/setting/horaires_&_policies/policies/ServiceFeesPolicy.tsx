import { FC } from "react";
import { useDispatch } from "react-redux";
import { store } from "../../../../stores/store";
import { updatePolicy } from "./policiesSlice";

interface Policies {
  serviceFees: number;
  serviceFeesPolicy: string;
}

interface Props {
  policies: Policies;
}

const ServiceFeesPolicy: FC<Props> = ({ policies }) => {
  const dispatch = useDispatch<typeof store.dispatch>();

  const handlePolicyChange = <K extends keyof Policies>(field: K, value: Policies[K]) => {
    dispatch(updatePolicy({ field, value }));
  };

  return (
    <div className="policy-group">
      <h3>Frais de Service</h3>
      <p className="section-desc">
        Indiquez un pourcentage de frais de service et la façon dont ils
        sont appliqués.
      </p>

      <label htmlFor="service-fees">Pourcentage de frais de service :</label>
      <input
        type="number"
        id="service-fees"
        min="0"
        value={policies.serviceFees}
        onChange={(e) => handlePolicyChange("serviceFees", Number(e.target.value))}
        disabled={policies.serviceFeesPolicy === "inclus"}
      />

      <p className="section-subtitle">Application des frais de service :</p>
      <div className="service-fees-options">
        <label className="radio-label">
          <input
            type="radio"
            name="service-fees-policy"
            value="inclus"
            checked={policies.serviceFeesPolicy === "inclus"}
            onChange={() => handlePolicyChange("serviceFeesPolicy", "inclus")}
          />
          {"  "}
          Inclus dans le prix affiché
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="service-fees-policy"
            value="supplement"
            checked={policies.serviceFeesPolicy === "supplement"}
            onChange={() => handlePolicyChange("serviceFeesPolicy", "supplement")}
          />
          {"  "}
          Ajoutés en supplément sur la facture finale
        </label>
      </div>
    </div>
  );
};

export default ServiceFeesPolicy;
