import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import submitService from "./submitService";

// ✅ Submit Code
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

// ✅ Get all submissions of the logged-in user
export const getUserSubmissions = createAsyncThunk(
  "submission/getUserSubmissions",
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      return await submitService.getUserSubmissions(page, limit);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to fetch submissions";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ✅ Get submissions by problem
export const getUserSubmissionsByProblem = createAsyncThunk(
  "submission/getUserSubmissionsByProblem",
  async (problemId, thunkAPI) => {
    try {
      return await submitService.getUserSubmissionsByProblem(problemId);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to fetch submissions for this problem";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  submissionData: null,
  userSubmissions: [],
  problemSubmissions: [],
  pagination: {},
  isSubmitting: false,
  isFetching: false,
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
      state.userSubmissions = [];
      state.problemSubmissions = [];
      state.pagination = {};
      state.isSubmitting = false;
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Submit Code
      .addCase(submitCode.pending, (state) => {
        state.isSubmitting = true;
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
      })

      // 🔹 Get All User Submissions
      .addCase(getUserSubmissions.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getUserSubmissions.fulfilled, (state, action) => {
        state.isFetching = false;
        state.userSubmissions = action.payload.submissions;
        state.pagination = action.payload.pagination;
      })
      .addCase(getUserSubmissions.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 🔹 Get Submissions by Problem
      .addCase(getUserSubmissionsByProblem.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getUserSubmissionsByProblem.fulfilled, (state, action) => {
        state.isFetching = false;
        state.problemSubmissions = action.payload.submissions;
      })
      .addCase(getUserSubmissionsByProblem.rejected, (state, action) => {
        state.isFetching = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetSubmission } = submitSlice.actions;
export default submitSlice.reducer;
