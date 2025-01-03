import { FC } from "react";
import { useDispatch } from "react-redux";
import { store } from "../../../../stores/store";
import { updatePolicy } from "./policiesSlice";

interface Props {
  policies: {
    maxPartySize: number;
  };
}

const MaxPartySize: FC<Props> = ({ policies }) => {
  const dispatch = useDispatch<typeof store.dispatch>();

  const handlePolicyChange = (value: number) => {
    dispatch(updatePolicy({ field: "maxPartySize", value }));
  };

  return (
    <div className="policy-group">
      <h3>Nombre maximal de convives</h3>
      <p className="section-desc">
        Limitez la taille des groupes pouvant réserver.
      </p>
      <label htmlFor="max-party-size">Taille max :</label>
      <input
        type="number"
        id="max-party-size"
        min="1"
        value={policies.maxPartySize}
        onChange={(e) => handlePolicyChange(Number(e.target.value))}
      />
    </div>
  );
};

export default MaxPartySize;
