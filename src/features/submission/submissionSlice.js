
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { submitCodeService } from "./submissionService";


export const runCode = createAsyncThunk(
  "run/runCode",
  async ({ problemId, language, code }, thunkAPI) => {
    try {
      const response = await submitCodeService(problemId, language, code);
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Submission failed"
      );
    }
  }
);

const submissionSlice = createSlice({
  name: "run",
  initialState: {
    data: null,
    loading: false,
    error: null,
    message: "",
  },
  reducers: {
    resetSubmission: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(runCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(runCode.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.message = action.payload.message;
      })
      .addCase(runCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSubmission } = submissionSlice.actions;
export default submissionSlice.reducer;
