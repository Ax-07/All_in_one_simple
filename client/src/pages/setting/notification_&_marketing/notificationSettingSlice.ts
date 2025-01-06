import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface NotificationSetting {
    smsReminders: boolean;
    emailReminders: boolean;
    reminderHours: number;
}

interface NotificationSettingState {
    notificationSetting: NotificationSetting;
    loading: boolean;
    error: string | null;
}

const initialState: NotificationSettingState = {
    notificationSetting: {
        smsReminders: false,
        emailReminders: false,
        reminderHours: 0,
    },
    loading: false,
    error: null,
};

interface NotificationSettingResponse {
    notificationSetting: NotificationSetting;
}

export const fetchNotificationSetting = createAsyncThunk<NotificationSettingResponse>(
    "notificationSetting/fetchNotificationSetting",
    async () => {
        const response = await fetch("/json/settings/notificationSetting.json");
        if (!response.ok) {
            throw new Error("Erreur lors du chargement des paramètres de notification.");
        }
        return (await response.json()) as NotificationSettingResponse;
    }
);

type UpdateNotificationSettingPayload<K extends keyof NotificationSetting> = {
    field: K;
    value: NotificationSetting[K];
};

const notificationSettingSlice = createSlice({
    name: "notificationSetting",
    initialState,
    reducers: {
        updateNotificationSetting: <K extends keyof NotificationSetting>(
            state: { notificationSetting: { [x: string]: string | boolean | number } },
            action: PayloadAction<UpdateNotificationSettingPayload<K>>
        ) => {
            const { field, value } = action.payload;
            state.notificationSetting[field] = value;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotificationSetting.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotificationSetting.fulfilled, (state, action) => {
                state.notificationSetting = action.payload.notificationSetting;
                state.loading = false;
            })
            .addCase(fetchNotificationSetting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string;
            });
    },
});

export const { updateNotificationSetting } = notificationSettingSlice.actions;
export default notificationSettingSlice.reducer;
export type { NotificationSettingState };