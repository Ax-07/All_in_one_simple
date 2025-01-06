import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface MenuDocument {
    type: string;
    fileName: string; // correspond au fileName si vous le souhaitez
    url: string;
}

interface MenuSettings {
    showMenuOnline: boolean;
    showWineList: boolean;
    documents: MenuDocument[];
    showAllergens: boolean;
    showVegetarian: boolean;
    showGlutenFree: boolean;
}

interface MenuSettingsState {
    menuSettings: MenuSettings;
    loading: boolean;
    error: string | null;
}

const initialState: MenuSettingsState = {
    menuSettings: {
        showMenuOnline: false,
        showWineList: false,
        documents: [],
        showAllergens: false,
        showVegetarian: false,
        showGlutenFree: false,
    },
    loading: false,
    error: null,
};

interface MenuSettingsResponse {
    menuSettings: MenuSettings;
}

export const fetchMenuSettings = createAsyncThunk<MenuSettingsResponse>(
    "menuSettings/fetchMenuSettings",
    async () => {
        const response = await fetch("/json/settings/menuData.json");
        if (!response.ok) {
            throw new Error("Erreur lors du chargement des paramètres du menu.");
        }
        return (await response.json()) as MenuSettingsResponse;
    }
);

type UpdateMenuSettingsPayload<K extends keyof MenuSettings> = {
    field: K;
    value: MenuSettings[K];
};

const menuSettingsSlice = createSlice({
    name: "menuSettings",
    initialState,
    reducers: {
        updateMenuSettings: <K extends keyof MenuSettings>(
            state: MenuSettingsState,
            action: PayloadAction<UpdateMenuSettingsPayload<K>>
        ) => {
            const { field, value } = action.payload;
            state.menuSettings[field] = value;
        },
        addDocument: (state, action: PayloadAction<MenuDocument>) => {
            state.menuSettings.documents.push(action.payload);
          },
          updateDocument: (
            state,
            action: PayloadAction<{ index: number; data: Partial<MenuDocument> }>
          ) => {
            const { index, data } = action.payload;
            state.menuSettings.documents[index] = {
              ...state.menuSettings.documents[index],
              ...data,
            };
          },
          removeDocument: (state, action: PayloadAction<number>) => {
            state.menuSettings.documents.splice(action.payload, 1);
          },
        },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMenuSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.menuSettings = action.payload.menuSettings;
            })
            .addCase(fetchMenuSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
            });
    },
});

export const { updateMenuSettings, addDocument, updateDocument, removeDocument } = menuSettingsSlice.actions;
export default menuSettingsSlice.reducer;
export type { MenuSettingsState };