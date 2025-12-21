// src/features/profile/profileService.js
import axios from "axios";

const API_URL = "https://algoken.onrender.com/user/profile";

// ✅ Fetch logged-in user's profile
const getUserProfile = async () => {
  const { data } = await axios.get(API_URL, { withCredentials: true });
  console.log(data);
  return data.user; 
};

const profileService = {
  getUserProfile,
};

export default profileService;
