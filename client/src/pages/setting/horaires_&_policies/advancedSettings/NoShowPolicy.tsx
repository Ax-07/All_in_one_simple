import { FC } from "react";
import { useDispatch } from "react-redux";
import { store } from "../../../../stores/store";
import { updateAdvancedSettings } from "./advancedSettingsSlice";

interface AdvancedSettings {
  noShowFees: number;
  blockAfterNoShow: boolean;
}

interface Props {
  advancedSettings: AdvancedSettings;
}

const NoShowPolicy: FC<Props> = ({ advancedSettings }) => {
  const dispatch = useDispatch<typeof store.dispatch>();

  const handleAdvancedSettingsChange = <K extends keyof AdvancedSettings>(
    field: K,
    value: AdvancedSettings[K]
  ) => {
    dispatch(updateAdvancedSettings({ field, value }));
  };

  return (
    <div className="policy-group">
      <h3>Politique de No-Show</h3>
      <p className="section-desc">
        Définissez les mesures en cas de non-présentation du client.
      </p>

      <label htmlFor="no-show-fees">Frais en cas de no-show (en €) :</label>
      <input
        type="number"
        id="no-show-fees"
        name="no-show-fees"
        min="0"
        value={advancedSettings.noShowFees}
        onChange={(e) =>
          handleAdvancedSettingsChange("noShowFees", Number(e.target.value))
        }
      />
      <label className="check-label">
        <input
          type="checkbox"
          name="block-after-no-show"
          checked={advancedSettings.blockAfterNoShow}
          onChange={(e) =>
            handleAdvancedSettingsChange("blockAfterNoShow", e.target.checked)
          }
        />
        Bloquer les clients après un no-show (jusqu’à intervention manuelle)
      </label>
    </div>
  );
};

export default NoShowPolicy;
