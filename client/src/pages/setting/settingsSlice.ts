import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface DaySchedule {
  day: string;
  middayClosed: boolean;
  eveningClosed: boolean;
  middayOpen: string;
  middayClose: string;
  eveningOpen: string;
  eveningClose: string;
}

interface Policies {
  cancellation: string;
  serviceFeesPolicy: "inclus" | "supplement";
  serviceFees: number;
  maxPartySize: number;
  dressCode: string;
}

interface SettingsState {
  schedule: DaySchedule[];
  policies: Policies;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  schedule: [],
  policies: {
    cancellation: "",
    serviceFeesPolicy: "inclus",
    serviceFees: 0,
    maxPartySize: 1,
    dressCode: "aucun",
  },
  loading: false,
  error: null,
};

interface SettingsResponse {
  schedule: DaySchedule[];
  policies: Policies;
}

export const fetchSettings = createAsyncThunk<SettingsResponse>(
  "settings/fetchSettings",
  async () => {
    const response = await fetch("/json/settings.json");
    if (!response.ok) {
      throw new Error("Erreur lors du chargement des paramètres.");
    }
    return (await response.json()) as SettingsResponse;
  }
);

type UpdatePolicyPayload<K extends keyof Policies> = {
  field: K;
  value: Policies[K];
};

interface UpdateSchedulePayload {
  dayIndex: number;
  field: keyof DaySchedule;
  value: DaySchedule[keyof DaySchedule];
}

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updatePolicy: <K extends keyof Policies>(
      state: { policies: { [x: string]: string | number } },
      action: PayloadAction<UpdatePolicyPayload<K>>
    ) => {
      const { field, value } = action.payload;
      state.policies[field] = value;
    },
    updateSchedule: (
      state: SettingsState,
      action: PayloadAction<UpdateSchedulePayload>
    ) => {
      const { dayIndex, field, value } = action.payload;
      (state.schedule[dayIndex][field] as string | boolean) = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload.schedule;
        state.policies = action.payload.policies;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur inconnue.";
      });
  },
});

export const { updatePolicy, updateSchedule } = settingsSlice.actions;
export default settingsSlice.reducer;
export type { SettingsState };
