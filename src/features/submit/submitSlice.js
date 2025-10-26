import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import submitService from "./submitService";

export const submitCode = createAsyncThunk(
  "submission/submitCode",
  async ({ problemId, language, code, contestId }, thunkAPI) => {
    try {
      return await submitService.submitCode({ problemId, language, code, contestId });
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Submission failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  submissionData: null,
  isSubmitting: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const submitSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {
    resetSubmission: (state) => {
      state.submissionData = null;
      state.isSubmitting = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCode.pending, (state) => {
        state.isSubmitting = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(submitCode.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.isSuccess = true;
        state.submissionData = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(submitCode.rejected, (state, action) => {
        state.isSubmitting = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetSubmission } = submitSlice.actions;
export default submitSlice.reducer;
