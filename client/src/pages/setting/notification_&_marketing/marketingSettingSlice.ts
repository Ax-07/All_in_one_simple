import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface MarketingSetting {
    enablePromotions: boolean;
    promotionText: string;
    sendNewsletters: boolean;
    confirmationEmailText: string;
    reminderEmailText: string;
}

interface MarketingSettingState {
    marketingSetting: MarketingSetting;
    loading: boolean;
    error: string | null;
}

const initialState: MarketingSettingState = {
    marketingSetting: {
        enablePromotions: false,
        promotionText: "",
        sendNewsletters: false,
        confirmationEmailText: "",
        reminderEmailText: "",
    },
    loading: false,
    error: null,
};

interface MarketingSettingResponse {
    marketingSetting: MarketingSetting;
}

export const fetchMarketingSetting = createAsyncThunk<MarketingSettingResponse>(
    "marketingSetting/fetchMarketingSetting",
    async () => {
        const response = await fetch("/json/settings/marketingSetting.json");
        if (!response.ok) {
            throw new Error("Erreur lors du chargement des paramètres marketing.");
        }
        return (await response.json()) as MarketingSettingResponse;
    }
);

type UpdateMarketingSettingPayload<K extends keyof MarketingSetting> = {
    field: K;
    value: MarketingSetting[K];
};

const marketingSettingSlice = createSlice({
    name: "marketingSetting",
    initialState,
    reducers: {
        updateMarketingSetting: <K extends keyof MarketingSetting>(
            state: { marketingSetting: { [x: string]: string | boolean } },
            action: PayloadAction<UpdateMarketingSettingPayload<K>>
        ) => {
            const { field, value } = action.payload;
            state.marketingSetting[field] = value;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMarketingSetting.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchMarketingSetting.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.marketingSetting = action.payload.marketingSetting;
        });
        builder.addCase(fetchMarketingSetting.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
    },
});

export const { updateMarketingSetting } = marketingSettingSlice.actions;
export default marketingSettingSlice.reducer;
export type { MarketingSettingState };