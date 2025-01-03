import { FC } from "react";
import Select from "../../../../components/select/Select";
import { useDispatch } from "react-redux";
import { store } from "../../../../stores/store";
import { updatePolicy } from "./policiesSlice";

interface DressCodeOption {
  key: string;
  label: string;
}

const options: DressCodeOption[] = [
  { key: "aucun", label: "Aucun" },
  { key: "casual", label: "Casual" },
  { key: "tenue-de-ville", label: "Tenue de ville" },
  { key: "chic-décontracté", label: "Chic-décontracté" },
  { key: "soirée", label: "Soirée" },
];

interface Props {
  policies: {
    dressCode: string;
  };
}

const DressCode: FC<Props> = ({policies}) => {
  const dispatch = useDispatch<typeof store.dispatch>();

  const handlePolicyChange = <K extends keyof typeof policies>(
    field: K,
    value: (typeof policies)[K]
  ) => {
    dispatch(updatePolicy({ field, value }));
  };

  return (
    <div className="policy-group">
      <h3>Code vestimentaire</h3>
      <p className="section-desc">
        Indiquez le dress code souhaité (ex: tenue de ville, chic, etc.).
      </p>
      <Select<DressCodeOption>
        label="Dress Code"
        placeholder="-- Sélectionnez un style --"
        options={options}
        getOptionValue={(opt) => opt.key} // la value = la propriété "key"
        getOptionLabel={(opt) => opt.label} // l’affichage = la propriété "label"
        value={options.find((opt) => opt.key === policies.dressCode) || null}
        onChange={(opt) => {
          const newDressCode = opt ? opt.key : "aucun";
          handlePolicyChange("dressCode", newDressCode);
        }}
      />

      <p>
        Dress code sélectionné :<strong>{policies.dressCode}</strong>
      </p>
    </div>
  );
};

export default DressCode;
