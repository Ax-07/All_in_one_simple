import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import profileSlice from "../pages/profil/profileSlice";
import horaires from "../pages/setting/horaires_&_policies/horaires/horairesSlices";
import policies from "../pages/setting/horaires_&_policies/policies/policiesSlice";

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