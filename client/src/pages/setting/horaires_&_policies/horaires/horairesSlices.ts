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

interface HorairesState {
    schedule: DaySchedule[];
    loading: boolean;
    error: string | null;
}

const initialState: HorairesState = {
    schedule: [],
    loading: false,
    error: null,
};

interface HorairesResponse {
    schedule: DaySchedule[];
}

export const fetchHoraires = createAsyncThunk<HorairesResponse>(
    "horaires/fetchHoraires",
    async () => {
        const response = await fetch("/json/settings/horaires.json");
        if (!response.ok) {
            throw new Error("Erreur lors du chargement des horaires.");
        }
        return (await response.json()) as HorairesResponse;
    }
);

interface UpdateSchedulePayload {
    dayIndex: number;
    field: keyof DaySchedule;
    value: DaySchedule[keyof DaySchedule];
}

const horairesSlice = createSlice({
    name: "horaires",
    initialState,
    reducers: {
        updateSchedule(state, action: PayloadAction<UpdateSchedulePayload>) {
            const { dayIndex, field, value } = action.payload;
            (state.schedule[dayIndex][field] as string | boolean) = value;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHoraires.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchHoraires.fulfilled, (state, action) => {
            state.loading = false;
            state.schedule = action.payload.schedule;
        });
        builder.addCase(fetchHoraires.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Une erreur est survenue.";
        });
    },
});

export const { updateSchedule } = horairesSlice.actions;
export default horairesSlice.reducer;
export type { HorairesState };