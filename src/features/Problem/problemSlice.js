import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import problemService from "./problemService";

// Fetch all problems
export const getProblemList = createAsyncThunk(
  "problem/getAll",
  async (_, thunkAPI) => {
    try {
      return await problemService.problem();
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch single problem
export const getProblemById = createAsyncThunk(
  "problem/getById",
  async (id, thunkAPI) => {
    try {
      return await problemService.getProblemById(id);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Something went wrong";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const problemSlice = createSlice({
  name: "problem",
  initialState: {
    problems: [],
    currentProblem: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Problems
      .addCase(getProblemList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProblemList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.problems = action.payload.problems;
      })
      .addCase(getProblemList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Problem by ID
      .addCase(getProblemById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProblemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentProblem = action.payload;
      })
      .addCase(getProblemById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = problemSlice.actions;
export default problemSlice.reducer;
