import axios from "axios";

const API_URL = "https://algoken.onrender.com/user"; // adjust if needed

// Get all problems
const problem = async () => {
  const res = await axios.get(`${API_URL}/problem`, { withCredentials: true });
  return res.data;
};

// Get problem by ID
const getProblemById = async (id) => {
  const res = await axios.get(`${API_URL}/problem/${id}`, { withCredentials: true });
  console.log(res);
  return res.data;
};

const problemService = {
  problem,
  getProblemById,
};

export default problemService;
