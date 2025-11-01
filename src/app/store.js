import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import problemReducer from "../features/Problem/problemSlice";
import runReducer from "../features/Submission/submissionSlice";
import subbmissionReducer from "../features/submit/submitSlice";
import profileReducer from "../features/profile/profileSlice";
import solvedReducer from "../features/solvedProblem/solvedSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    problem:problemReducer,
    run:runReducer,
    submission: subbmissionReducer,
    profile: profileReducer,  
    solved: solvedReducer,
  },
});
