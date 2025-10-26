import axios from "axios";
const BASE_URL = "http://localhost:3000/";


const submitCode = async ({ problemId, language, code, contestId }) => {
    const response = await axios.post(
        `${BASE_URL}/submit/code/${problemId}`,
        { language, code, contestId },
        { withCredentials: true }
    );

    return response.data;
};

const submitService = { submitCode };
export default submitService;
