import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserProfile {
  userName: string;
  userMail: string;
  restaurantName: string;
  restaurantAddress: string;
  restaurantDescription: string;
  restaurantCoverImage: string;
}

interface ProfileState {
  data: UserProfile;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: {
    userName: "",
    userMail: "",
    restaurantName: "",
    restaurantAddress: "",
    restaurantDescription: "",
    restaurantCoverImage: "",
  },
  loading: false,
  error: null,
};

// Action pour charger les données depuis le fichier JSON
export const fetchProfile = createAsyncThunk("profile/fetchProfile", async () => {
  const response = await fetch("/json/userProfile.json");
  if (!response.ok) {
    throw new Error("Erreur lors du chargement des données.");
  }
  return response.json() as Promise<UserProfile>;
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      (state.data as UserProfile)[field as keyof UserProfile] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur inconnue.";
      });
  },
});


export const { updateField } = profileSlice.actions;
export default profileSlice.reducer;
export type { ProfileState };
