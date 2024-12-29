import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSettings, updatePolicy, updateSchedule } from "./settingsSlice";
import { RootState, store } from "../../stores/store";
import Select from "../../components/select/Select";

// Imaginons que nos options soient des objets de ce type
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

const ReservationTab = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const schedule = useSelector((state: RootState) => state.settings.schedule);
  const policies = useSelector((state: RootState) => state.settings.policies);

  useEffect(() => {
    // Au montage du composant, on déclenche la récupération des données
    dispatch(fetchSettings());
  }, [dispatch]);

  const handleScheduleChange = (
    dayIndex: number,
    field: keyof (typeof schedule)[0],
    value: string | boolean
  ) => {
    dispatch(updateSchedule({ dayIndex, field, value }));
  };

  const handlePolicyChange = <K extends keyof typeof policies>(
    field: K,
    value: typeof policies[K]
  ) => {
    dispatch(updatePolicy({ field, value }));
  };
  
  return (
    <div
      className="tab-content"
      id="tab-reservation"
      style={{ display: "block" }}
    >
      <div className="settings-block">
        <h2>Horaires d’Ouverture</h2>
        <p className="section-desc">
          Définissez vos horaires pour le midi et le soir, ou cochez "Fermé" si
          vous n’êtes pas ouvert ce jour.
        </p>

        <table className="hours-table">
          <thead>
            <tr>
              <th>Jour</th>
              <th>Fermé Midi</th>
              <th>Fermé Soir</th>
              <th colSpan={2}>Midi</th>
              <th colSpan={2}>Soir</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>Ouverture</th>
              <th>Fermeture</th>
              <th>Ouverture</th>
              <th>Fermeture</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((day, index) => (
              <tr key={day.day}>
                <td>{day.day}</td>
                <td>
                  <input
                    type="checkbox"
                    className="closed-check"
                    checked={day.middayClosed}
                    onChange={(e) =>
                      handleScheduleChange(
                        index,
                        "middayClosed",
                        e.target.checked
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    className="closed-check"
                    checked={day.eveningClosed}
                    onChange={(e) =>
                      handleScheduleChange(
                        index,
                        "eveningClosed",
                        e.target.checked
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={day.middayOpen}
                    onChange={(e) =>
                      handleScheduleChange(index, "middayOpen", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={day.middayClose}
                    onChange={(e) =>
                      handleScheduleChange(index, "middayClose", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={day.eveningOpen}
                    onChange={(e) =>
                      handleScheduleChange(index, "eveningOpen", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="time"
                    value={day.eveningClose}
                    onChange={(e) =>
                      handleScheduleChange(
                        index,
                        "eveningClose",
                        e.target.value
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Section Politiques */}
        <div className="settings-block">
          <h2>Politiques</h2>

          {/* Politique d'annulation */}
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
              onChange={(e) => handlePolicyChange("cancellation", e.target.value)}
            />
          </div>

          {/* Frais de Service */}
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
              onChange={(e) =>
                handlePolicyChange("serviceFees", Number(e.target.value))
              }
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
                  onChange={() =>
                    handlePolicyChange("serviceFeesPolicy", "supplement")
                  }
                />
                {"  "}
                Ajoutés en supplément sur la facture finale
              </label>
            </div>
          </div>

          {/* Nombre maximal de convives */}
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
              onChange={(e) =>
                handlePolicyChange("maxPartySize", Number(e.target.value))
              }
            />
          </div>

          {/* Dress code */}
          <div className="policy-group">
            <h3>Code vestimentaire</h3>
            <p className="section-desc">
              Indiquez le dress code souhaité (ex: tenue de ville, chic, etc.).
            </p>
            <Select<DressCodeOption>
               label="Dress Code"
               placeholder="-- Sélectionnez un style --"
               options={options}
               getOptionValue={(opt) => opt.key}       // la value = la propriété "key"
               getOptionLabel={(opt) => opt.label}     // l’affichage = la propriété "label"
               value={options.find((opt) => opt.key === policies.dressCode) || null}
               onChange={(opt) => {
                const newDressCode = opt ? opt.key : "aucun";
                handlePolicyChange("dressCode", newDressCode);
              }}
             />
       
             <p>
               Dress code sélectionné :
               <strong>{policies.dressCode}</strong>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ReservationTab;
