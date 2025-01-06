import { FC, useEffect } from "react";
import MenuSettings from "./MenuSettings";
import AllergensSettings from "./AllergensSettings";
import { fetchMenuSettings } from "./menuSettingsSlice";
import { useDispatch } from "react-redux";
import { store } from "../../../stores/store";

const MenuTab: FC = () => {
  const dispatch = useDispatch<typeof store.dispatch>();

  useEffect(() => {
    // Chargez les paramètres du menu
    dispatch(fetchMenuSettings());
  }, [dispatch]);
  return (
    <div>
      {/* Section Menu & Carte */}
      <MenuSettings />

      {/* Paramètres Spécifiques aux Plats (Allergènes & Régimes) */}
      <AllergensSettings />
    </div>
  );
};

export default MenuTab;
