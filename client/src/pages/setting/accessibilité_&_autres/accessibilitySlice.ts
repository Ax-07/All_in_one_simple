import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AccessibilitySettings {
    childFriendly: boolean;
    petsAllowed: boolean;
    wheelchairAccessible: boolean;
}

interface GeneralSettings {
    timeZone: string;
    reservationMode: string;
}

interface ReviewSettings {
    enableReviews: boolean;
    moderateReviews: boolean;
}

interface PrivacySettings {
    showPrivacyPolicy: boolean;
    privacyPolicyURL: string;
    requireConsent: boolean;
}

interface AccessibilityState {
    accessibilitySettings: AccessibilitySettings;
    generalSettings: GeneralSettings;
    reviewSettings: ReviewSettings;
    privacySettings: PrivacySettings;
    loading: boolean;
    error: string | null;
}

const initialState: AccessibilityState = {
    accessibilitySettings: {
        childFriendly: true,
        petsAllowed: false,
        wheelchairAccessible: true,
    },
    generalSettings: {
        timeZone: "europe-paris",
        reservationMode: "en-ligne",
    },
    reviewSettings: {
        enableReviews: true,
        moderateReviews: true,
    },
    privacySettings: {
        showPrivacyPolicy: true,
        privacyPolicyURL: "https://example.com/privacy",
        requireConsent: true,
    },
    loading: false,
    error: null,
};

interface AccessibilityResponse {
    accessibilitySettings: AccessibilitySettings;
    generalSettings: GeneralSettings;
    reviewSettings: ReviewSettings;
    privacySettings: PrivacySettings;
}

export const fetchAccessibility = createAsyncThunk<AccessibilityResponse>(
    "accessibility/fetchAccessibility",
    async () => {
        const response = await fetch("/json/settings/accessibité_&_autres.json");
        if (!response.ok) {
            throw new Error("Erreur lors du chargement des paramètres d'accessibilité.");
        }
        return (await response.json()) as AccessibilityResponse;
    }
);

type UpdateAccessibilityPayload<K extends keyof AccessibilitySettings> = {
    field: K;
    value: AccessibilitySettings[K];
};

type UpdateGeneralSettingsPayload<K extends keyof GeneralSettings> = {
    field: K;
    value: GeneralSettings[K];
};

type UpdateReviewSettingsPayload<K extends keyof ReviewSettings> = {
    field: K;
    value: ReviewSettings[K];
};

type UpdatePrivacySettingsPayload<K extends keyof PrivacySettings> = {
    field: K;
    value: PrivacySettings[K];
};

const accessibilitySlice = createSlice({
    name: "accessibility",
    initialState,
    reducers: {
        updateAccessibilitySettings: <K extends keyof AccessibilitySettings>(
            state: { accessibilitySettings: { [x: string]: boolean } },
            action: PayloadAction<UpdateAccessibilityPayload<K>>
        ) => {
            const { field, value } = action.payload;
            state.accessibilitySettings[field] = value;
        },
        updateGeneralSettings: <K extends keyof GeneralSettings>(
            state: { generalSettings: { [x: string]: string } },
            action: PayloadAction<UpdateGeneralSettingsPayload<K>>
        ) => {
            const { field, value } = action.payload;
            state.generalSettings[field] = value;
        },
        updateReviewSettings: <K extends keyof ReviewSettings>(
            state: { reviewSettings: { [x: string]: boolean } },
            action: PayloadAction<UpdateReviewSettingsPayload<K>>
        ) => {
            const { field, value } = action.payload;
            state.reviewSettings[field] = value;
        },
        updatePrivacySettings: <K extends keyof PrivacySettings>(
            state: { privacySettings: { [x: string]: boolean | string } },
            action: PayloadAction<UpdatePrivacySettingsPayload<K>>
        ) => {
            const { field, value } = action.payload;
            state.privacySettings[field] = value;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAccessibility.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAccessibility.fulfilled, (state, action) => {
            state.loading = false;
            state.accessibilitySettings = action.payload.accessibilitySettings;
            state.generalSettings = action.payload.generalSettings;
            state.reviewSettings = action.payload.reviewSettings;
            state.privacySettings = action.payload.privacySettings;
        });
        builder.addCase(fetchAccessibility.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Une erreur s'est produite.";
        });
    },
});

export const { updateAccessibilitySettings, updateGeneralSettings, updateReviewSettings, updatePrivacySettings } = accessibilitySlice.actions;
export default accessibilitySlice.reducer;
export type { AccessibilityState, AccessibilitySettings as AccessibilitySetting, GeneralSettings, ReviewSettings, PrivacySettings };