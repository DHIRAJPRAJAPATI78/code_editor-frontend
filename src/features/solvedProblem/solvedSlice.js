import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async Thunk to fetch solved problems
export const getAllSolvedProblems = createAsyncThunk(
  "solved/getAllSolvedProblems",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("http://localhost:3000/user/Allproblem/solved", { withCredentials: true });
      return res.data.problems;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Failed to fetch problems";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const solvedSlice = createSlice({
  name: "solved",
  initialState: {
    problems: [],
    isLoading: false,
    isError: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSolvedProblems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSolvedProblems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.problems = action.payload;
      })
      .addCase(getAllSolvedProblems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default solvedSlice.reducer;
