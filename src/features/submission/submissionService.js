
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const submitCodeService = async (problemId, language, code) => {
 
  const response = await axios.post(
    `${BASE_URL}/run/code/${problemId}`,
    { language, code },
    {withCredentials: true}
  );

  return response.data;
};
