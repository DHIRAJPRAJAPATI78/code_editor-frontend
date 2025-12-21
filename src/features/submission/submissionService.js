
import axios from "axios";

const BASE_URL = "https://algoken.onrender.com";

export const submitCodeService = async (problemId, language, code) => {
 
  const response = await axios.post(
    `${BASE_URL}/run/code/${problemId}`,
    { language, code },
    {withCredentials: true}
  );

  return response.data;
};
