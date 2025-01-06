import { FC } from "react";
import { useDispatch } from "react-redux";
import { store } from "../../../../stores/store";
import { updateAdvancedSettings } from "./advancedSettingsSlice";

interface AdvancedSettings {
    depositRequired: boolean;
    depositAmount: number;
}

interface Props {
    advancedSettings: AdvancedSettings;
}

const DepositRequirement: FC<Props> = ({ advancedSettings }) => {
    const dispatch = useDispatch<typeof store.dispatch>();

    const handleAdvancedSettingsChange = <K extends keyof AdvancedSettings>(
        field: K,
        value: AdvancedSettings[K]
    ) => {
        dispatch(updateAdvancedSettings({ field, value }));
    };

    return (
        <div className="policy-group">
              <h3>Dépôt / Acompte</h3>
              <p className="section-desc">Choisissez si le client doit verser un acompte lors de la réservation.</p>
              <label className="check-label">
                    <input
                        type="checkbox"
                        name="deposit-required"
                        checked={advancedSettings.depositRequired}
                        onChange={(e) => handleAdvancedSettingsChange("depositRequired", e.target.checked)}
                    />
                Accompte obligatoire
                </label>
                <label htmlFor="deposit-amount">Montant de l’acompte (en €) :</label>
                <input
                    type="number"
                    id="deposit-amount"
                    name="deposit-amount"
                    min="0"
                    value={advancedSettings.depositAmount}
                    onChange={(e) => handleAdvancedSettingsChange("depositAmount", Number(e.target.value))}
                    disabled={!advancedSettings.depositRequired}
                />
        </div>
    );
};

export default DepositRequirement;