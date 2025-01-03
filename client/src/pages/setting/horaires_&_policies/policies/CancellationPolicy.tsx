import { useDispatch } from "react-redux";
import { store } from "../../../../stores/store";
import { FC } from "react";
import { updatePolicy } from "./policiesSlice";

interface Props {
  policies: {
    cancellation: string;
  };
}

const CancellationPolicy: FC<Props> = ({ policies }) => {
  const dispatch = useDispatch<typeof store.dispatch>();

  const handlePolicyChange = (value: string) => {
    dispatch(updatePolicy({ field: "cancellation", value }));
  };

  return (
    <div className="policy-group">
      <h3>Politique d’annulation</h3>
      <p className="section-desc">
        Définissez les conditions d’annulation : délai, frais en cas
        d’annulation tardive.
      </p>
      <label htmlFor="cancellation-policy">Détails :</label>
      <textarea
        id="cancellation-policy"
        name="cancellation-policy"
        rows={3}
        value={policies.cancellation}
        onChange={(e) => handlePolicyChange(e.target.value)}
      />
    </div>
  );
};

export default CancellationPolicy;
