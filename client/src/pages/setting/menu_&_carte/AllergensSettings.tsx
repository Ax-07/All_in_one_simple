// AllergensSettings.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../stores/store";
import { updateMenuSettings } from "./menuSettingsSlice";

const AllergensSettings: React.FC = () => {
  const dispatch = useDispatch();
  const { showAllergens, showVegetarian, showGlutenFree } = useSelector(
    (state: RootState) => state.menuSettings.menuSettings
  );

  return (
    <div className="settings-block">
      <h2>Allergènes &amp; Régimes Spéciaux</h2>
      <p className="section-desc">
        Affichez des informations sur les allergènes, options végétariennes, véganes,
        sans gluten, etc.
      </p>
      <label className="check-label">
        <input
          type="checkbox"
          checked={showAllergens}
          onChange={(e) =>
            dispatch(updateMenuSettings({ field: "showAllergens", value: e.target.checked }))
          }
        />
        Afficher les allergènes sur le menu
      </label>
      <label className="check-label">
        <input
          type="checkbox"
          checked={showVegetarian}
          onChange={(e) =>
            dispatch(updateMenuSettings({ field: "showVegetarian", value: e.target.checked }))
          }
        />
        Indiquer les plats végétariens / véganes
      </label>
      <label className="check-label">
        <input
          type="checkbox"
          checked={showGlutenFree}
          onChange={(e) =>
            dispatch(updateMenuSettings({ field: "showGlutenFree", value: e.target.checked }))
          }
        />
        Indiquer les plats sans gluten
      </label>
    </div>
  );
};

export default AllergensSettings;
