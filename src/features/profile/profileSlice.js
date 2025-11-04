import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";

export const getUserProfile = createAsyncThunk(
  "profile/getUserProfile",
  async (arg, thunkAPI) => {
    const { navigate } = arg; 
    try {
      return await profileService.getUserProfile();
    } catch (error) {
      const status = error.response?.status;
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch profile";

      if (status == 401 && navigate) {
        navigate("/login"); 
      }

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetProfile: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
