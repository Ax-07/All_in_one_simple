import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import profileSlice from "../pages/profil/profileSlice";
import horaires from "../pages/setting/horaires_&_policies/horaires/horairesSlices";
import policies from "../pages/setting/horaires_&_policies/policies/policiesSlice";
import advancedSettings from "../pages/setting/horaires_&_policies/advancedSettings/advancedSettingsSlice";
import menuSettings from "../pages/setting/menu_&_carte/menuSettingsSlice";
import notificationSetting from "../pages/setting/notification_&_marketing/notificationSettingSlice";
import marketingSetting from "../pages/setting/notification_&_marketing/marketingSettingSlice";
import paymentSettings from "../pages/setting/paiement_&_plan_de_salle/paiementSlice";
import accessibilitySetting from "../pages/setting/accessibilité_&_autres/accessibilitySlice";


const persistConfig = {
    key: "root",
    //storage: storageSession, // Use session storage
    storage: localStorage, // Use local storage
};

const store = configureStore({
    reducer: {
        profile: profileSlice,
        horaires: horaires,
        policies: policies,
        advancedSettings: advancedSettings,
        menuSettings: menuSettings,
        notificationSetting: notificationSetting,
        marketingSetting: marketingSetting,
        paymentSettings: paymentSettings,
        accessibilitySetting: accessibilitySetting,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };