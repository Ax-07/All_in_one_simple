import { FC } from "react";
import { useDispatch } from "react-redux";
import { store } from "../../../../stores/store";
import { updateAdvancedSettings } from "./advancedSettingsSlice";
import Checkbox from "../../../../components/checkBox/Checkbox";

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
      <Checkbox name="block-after-no-show"
        checked={advancedSettings.blockAfterNoShow}
        onChange={(e) => handleAdvancedSettingsChange("blockAfterNoShow", e.target.checked)}
      >
        Bloquer les clients après un no-show (jusqu’à intervention manuelle)
      </Checkbox>
    </div>
  );
};

export default NoShowPolicy;
