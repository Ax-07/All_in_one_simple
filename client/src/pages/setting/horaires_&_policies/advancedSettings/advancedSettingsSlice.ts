import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AdvancedSettings {
    depositRequired: boolean;
    depositAmount: number;
    minBookingAdvance: number;
    maxBookingAdvance: number;
    noShowFees: number;
    blockAfterNoShow: boolean;
  }

interface AdvancedSettingsState {
    advancedSettings: AdvancedSettings;
    loading: boolean;
    error: string | null;
}

const initialState: AdvancedSettingsState = {
    advancedSettings: {
        depositRequired: false,
        depositAmount: 0,
        minBookingAdvance: 0,
        maxBookingAdvance: 0,
        noShowFees: 0,
        blockAfterNoShow: false
    },
    loading: false,
    error: null,
};

interface AdvancedSettingsResponse {
    advancedSettings: AdvancedSettings;
}

export const fetchAdvancedSettings = createAsyncThunk<AdvancedSettingsResponse>(
    "advancedSettings/fetchAdvancedSettings",
    async () => {
        const response = await fetch("/json/settings/advancedSettings.json");
        if (!response.ok) {
            throw new Error("Erreur lors du chargement des paramètres avancés.");
        }
        return (await response.json()) as AdvancedSettingsResponse;
    }
);

type UpdateAdvancedSettingsPayload<K extends keyof AdvancedSettings> = {
    field: K;
    value: AdvancedSettings[K];
};

const advancedSettingsSlice = createSlice({
    name: "advancedSettings",
    initialState,
    reducers: {
        updateAdvancedSettings: <K extends keyof AdvancedSettings>(
            state: { advancedSettings: { [x: string]: string | number | boolean } },
            action: PayloadAction<UpdateAdvancedSettingsPayload<K>>
        ) => {
            const { field, value } = action.payload;
            state.advancedSettings[field] = value;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAdvancedSettings.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAdvancedSettings.fulfilled, (state, action) => {
            state.loading = false;
            state.advancedSettings = action.payload.advancedSettings;
        });
        builder.addCase(fetchAdvancedSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Une erreur est survenue.";
        });
    },
});

export const { updateAdvancedSettings } = advancedSettingsSlice.actions;
export default advancedSettingsSlice.reducer;
export type { AdvancedSettingsState };