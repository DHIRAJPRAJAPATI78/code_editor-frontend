import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
  baseURL: "https://algoken.onrender.com/contest",
  withCredentials: true,
});

export const fetchAllContests = createAsyncThunk(
  "contest/fetchAll",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await API.get(`/user/AllContest?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch contests"
      );
    }
  }
);


export const fetchLiveContests = createAsyncThunk(
  "contest/fetchLive",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get(`/user/live`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch live contests"
      );
    }
  }
);


export const fetchContestById = createAsyncThunk(
  "contest/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/${id}`);
      console.log(res);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch contest details"
      );
    }
  }
);


export const registerForContest = createAsyncThunk(
  "contest/register",
  async ( id , { rejectWithValue }) => {
    try {
      const res = await API.post(
        `/${id}/register`,
        {},
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to register for contest"
      );
    }
  }
);


export const fetchProblemInContest = createAsyncThunk(
  "contest/fetchProblemInContest",
  async ({ contestId, problemId, token = null }, { rejectWithValue }) => {
    try {
      const res = await API.get(`/${contestId}/problem/${problemId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch problem in contest"
      );
    }
  }
);


const contestSlice = createSlice({
  name: "contest",
  initialState: {
    contests: [],
    liveContests: [],
    contestDetails: null,
    problemInContest: null,
    currentPage: 1,
    totalPages: 1,
    totalContests: 0,
    loading: false,
    error: null,
    registerMessage: null,
  },
  reducers: {
    clearContestError: (state) => {
      state.error = null;
    },
    clearRegisterMessage: (state) => {
      state.registerMessage = null;
    },
    clearProblemInContest: (state) => {
      state.problemInContest = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //  All Contests
      .addCase(fetchAllContests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllContests.fulfilled, (state, action) => {
        state.loading = false;
        state.contests = action.payload.contests;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalContests = action.payload.totalContests;
      })
      .addCase(fetchAllContests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Live Contests
      .addCase(fetchLiveContests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLiveContests.fulfilled, (state, action) => {
        state.loading = false;
        state.liveContests = action.payload.contests || [];
      })
      .addCase(fetchLiveContests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Contest by ID
      .addCase(fetchContestById.pending, (state) => {
        state.loading = true;
        state.contestDetails = null;
      })
      .addCase(fetchContestById.fulfilled, (state, action) => {
        state.loading = false;
        state.contestDetails = action.payload;
      })
      .addCase(fetchContestById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Register for Contest
      .addCase(registerForContest.pending, (state) => {
        state.loading = true;
        state.registerMessage = null;
      })
      .addCase(registerForContest.fulfilled, (state, action) => {
        state.loading = false;
        state.registerMessage = action.payload.message;
      })
      .addCase(registerForContest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Problem in Contest
      .addCase(fetchProblemInContest.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.problemInContest = null;
      })
      .addCase(fetchProblemInContest.fulfilled, (state, action) => {
        state.loading = false;
        state.problemInContest = action.payload;
      })
      .addCase(fetchProblemInContest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.problemInContest = null;
      });
  },
});

export const {
  clearContestError,
  clearRegisterMessage,
  clearProblemInContest,
} = contestSlice.actions;

export default contestSlice.reducer;
