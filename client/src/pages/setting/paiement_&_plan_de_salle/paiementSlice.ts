import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface PaymentSettings {
    onlinePaymentEnabled: boolean;
    paymentProvider: string;
    paymentApiKey: string;
    fullPrepayment: boolean;
}

interface FloorPlanSettings {
    showFloorPlan: boolean;
    floorPlanURL: string;
    tablesInfo: string;
}

interface PaymentSettingsState {
    paymentSettings: PaymentSettings;
    floorPlanSettings: FloorPlanSettings;
    loading: boolean;
    error: string | null;
}

const initialState: PaymentSettingsState = {
    paymentSettings: {
        onlinePaymentEnabled: true,
        paymentProvider: "stripe",
        paymentApiKey: "",
        fullPrepayment: false,
    },
    floorPlanSettings: {
        showFloorPlan: false,
        floorPlanURL: "",
        tablesInfo: "",
    },
    loading: false,
    error: null,
};

interface PaymentSettingsResponse {
    paymentSettings: PaymentSettings;
    floorPlanSettings: FloorPlanSettings;
}

export const fetchPaymentSettings = createAsyncThunk<PaymentSettingsResponse>(
    "paymentSettings/fetchPaymentSettings",
    async () => {
        const response = await fetch("/json/settings/payment_&_floorPlan.json");
        if (!response.ok) {
            throw new Error("Erreur lors du chargement des paramètres de paiement.");
        }
        return (await response.json()) as PaymentSettingsResponse;
    }
);

type UpdatePaymentSettingsPayload<K extends keyof PaymentSettings> = {
    field: K;
    value: PaymentSettings[K];
};

type UpdateFloorPlanSettingsPayload<K extends keyof FloorPlanSettings> = {
    field: K;
    value: FloorPlanSettings[K];
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        updatePaymentSettings: <K extends keyof PaymentSettings>(
            state: { paymentSettings: { [x: string]: string | boolean } },
            action: PayloadAction<UpdatePaymentSettingsPayload<K>>
        ) => {
            const { field, value } = action.payload;
            state.paymentSettings[field] = value;
        },
        updateFloorPlanSettings: <K extends keyof FloorPlanSettings>(
            state: { floorPlanSettings: { [x: string]: string | boolean } },
            action: PayloadAction<UpdateFloorPlanSettingsPayload<K>>
        ) => {
            const { field, value } = action.payload;
            state.floorPlanSettings[field] = value;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPaymentSettings.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPaymentSettings.fulfilled, (state, action) => {
            state.loading = false;
            state.paymentSettings = action.payload.paymentSettings;
            state.floorPlanSettings = action.payload.floorPlanSettings;
        });
        builder.addCase(fetchPaymentSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Une erreur s'est produite.";
        });
    },
});

export const { updatePaymentSettings, updateFloorPlanSettings } = paymentSlice.actions;
export default paymentSlice.reducer;
export type { PaymentSettingsState, PaymentSettings, FloorPlanSettings };