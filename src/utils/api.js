import axios from "axios";

export const submitCodeAPI = async (problemId, language, code, token) => {
  const res = await axios.post(
    `/api/submission/code/${problemId}`,
    { language, code },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
