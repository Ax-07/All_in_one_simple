import { FC } from "react";
import { useDispatch } from "react-redux";
import { store } from "../../../../stores/store";
import { updateAdvancedSettings } from "./advancedSettingsSlice";

interface AdvancedSettings {
    minBookingAdvance: number;
    maxBookingAdvance: number;
}

interface Props {
    advancedSettings: AdvancedSettings;
}

const BookingAdvanceDelay: FC<Props> = ({ advancedSettings }) => {
    const dispatch = useDispatch<typeof store.dispatch>();

    const handleAdvancedSettingsChange = <K extends keyof AdvancedSettings>(
        field: K,
        value: AdvancedSettings[K]
    ) => {
        dispatch(updateAdvancedSettings({ field, value }));
    };

    return (
        <div className="policy-group">
              <h3>Délai Minimum / Maximum de Réservation</h3>
              <p className="section-desc">Spécifiez combien de temps à l’avance un client peut réserver.</p>

            <label htmlFor="min-booking-advance">Délai minimum de réservation (en heures) :
            <input
                type="number"
                id="min-booking-advance"
                name="min-booking-advance"
                min="0"
                value={advancedSettings.minBookingAdvance}
                onChange={(e) => handleAdvancedSettingsChange("minBookingAdvance", Number(e.target.value))}
            />
            </label>
            <label htmlFor="max-booking-advance">Délai maximum de réservation (en jours) :
            <input
                type="number"
                id="max-booking-advance"
                name="max-booking-advance"
                min="1"
                value={advancedSettings.maxBookingAdvance}
                onChange={(e) => handleAdvancedSettingsChange("maxBookingAdvance", Number(e.target.value))}
            />
            </label>
        </div>
    );
};

export default BookingAdvanceDelay;