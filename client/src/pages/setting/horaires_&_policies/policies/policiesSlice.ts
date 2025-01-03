import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


interface Policies {
  cancellation: string;
  serviceFeesPolicy: "inclus" | "supplement";
  serviceFees: number;
  maxPartySize: number;
  dressCode: string;
}

interface PoliciesState {
    policies: Policies;
    loading: boolean;
    error: string | null;
    }

const initialState: PoliciesState = {
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

interface PoliciesResponse {
    policies: Policies;
}

export const fetchPolicies = createAsyncThunk<PoliciesResponse>(
    "policies/fetchPolicies",
    async () => {
        const response = await fetch("/json/settings/Policies.json");
        if (!response.ok) {
            throw new Error("Erreur lors du chargement des politiques.");
        }
        return (await response.json()) as PoliciesResponse;
    }
);

type UpdatePolicyPayload<K extends keyof Policies> = {
    field: K;
    value: Policies[K];
};

const policiesSlice = createSlice({
    name: "policies",
    initialState,
    reducers: {
        updatePolicy: <K extends keyof Policies>(
            state: { policies: { [x: string]: string | number } },
            action: PayloadAction<UpdatePolicyPayload<K>>
        ) => {
            const { field, value } = action.payload;
            state.policies[field] = value;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPolicies.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPolicies.fulfilled, (state, action) => {
            state.loading = false;
            state.policies = action.payload.policies;
        });
        builder.addCase(fetchPolicies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
    },
});

export const { updatePolicy } = policiesSlice.actions;
export default policiesSlice.reducer;
export type { PoliciesState };