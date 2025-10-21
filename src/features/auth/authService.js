import axios from "axios";

const API_URL = "http://localhost:3000/user"; 

// Register user
const register = async (userData) => {
  const res = await axios.post(`${API_URL}/register`, userData, { withCredentials: true });
  return res.data;
};

// Login user
const login = async (userData) => {
  const res = await axios.post(`${API_URL}/login`, userData, { withCredentials: true });
  return res.data;
};
const logout = async () => {
  await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
}

const authService = {
  register,
  login,
  logout
};

export default authService;
