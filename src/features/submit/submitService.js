import axios from "axios";

const BASE_URL = "https://algoken.onrender.com";

// ✅ Submit user code
const submitCode = async ({ problemId, language, code, contestId }) => {
  const response = await axios.post(
    `${BASE_URL}/submit/code/${problemId}`,
    { language, code, contestId },
    { withCredentials: true }
  );
  return response.data;
};

// ✅ Get all submissions of the logged-in user
const getUserSubmissions = async (page = 1, limit = 10) => {
  const response = await axios.get(
    `${BASE_URL}/submit/user/all-submission?page=${page}&limit=${limit}`,
    { withCredentials: true }
  );
  return response.data;
};

// ✅ Get all submissions for a particular problem by the user
const getUserSubmissionsByProblem = async (problemId) => {
  const response = await axios.get(
    `${BASE_URL}/submit/user/problem/${problemId}`,
    { withCredentials: true }
  );
  return response.data;
};

const submitService = { submitCode, getUserSubmissions, getUserSubmissionsByProblem };
export default submitService;
