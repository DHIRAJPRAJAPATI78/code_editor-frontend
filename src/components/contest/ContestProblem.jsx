import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProblemInContest } from "../../features/contest/contestSlice";
import { Loader2 } from "lucide-react";

export default function ContestProblem() {
  const { contestId, problemId } = useParams();
  const dispatch = useDispatch();
  const { problemInContest, loading } = useSelector((state) => state.contest);

  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(fetchProblemInContest({ contestId, problemId, token }));
  }, [dispatch, contestId, problemId]);

  if (loading || !problemInContest)
    return (
      <div className="flex justify-center items-center h-80 text-yellow-400">
        <Loader2 className="animate-spin w-8 h-8" /> Loading problem...
      </div>
    );

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-gray-200 p-6">
      <h1 className="text-2xl font-bold text-yellow-400 mb-3">
        {problemInContest.title}
      </h1>
      <p className="text-gray-300 mb-6">{problemInContest.description}</p>
      <div className="bg-[#111827] p-5 rounded-lg">
        <h2 className="text-lg font-semibold mb-2 text-yellow-400">
          Constraints
        </h2>
        <pre className="text-gray-400 text-sm whitespace-pre-wrap">
          {problemInContest.constraints}
        </pre>
      </div>
    </div>
  );
}
