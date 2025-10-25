import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import problemReducer from "../features/Problem/problemSlice";
import subbmissionReducer from "../features/submission/submissionSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    problem:problemReducer,
    submission:subbmissionReducer
  },
});
