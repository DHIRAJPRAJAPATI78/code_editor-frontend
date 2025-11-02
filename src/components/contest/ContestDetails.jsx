import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContestById,
  registerForContest,
} from "../../features/contest/contestSlice";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function ContestDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { contestDetails, loading, registerMessage } = useSelector(
    (state) => state.contest
  );

  useEffect(() => {
    dispatch(fetchContestById(id));
  }, [dispatch, id]);

  const handleRegister = () => {
    const token = localStorage.getItem("token");
    dispatch(registerForContest({ id, token }));
  };

  if (loading || !contestDetails)
    return (
      <div className="flex justify-center items-center h-80 text-yellow-400">
        <Loader2 className="animate-spin w-8 h-8" /> Loading contest...
      </div>
    );

  return (
    <div className="bg-[#0a0a0f] min-h-screen text-gray-200 p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">
        {contestDetails.title}
      </h1>
      <p className="text-gray-400 mb-6">{contestDetails.description}</p>

      <button
        onClick={handleRegister}
        className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-6 rounded-lg font-semibold transition"
      >
        Register Now
      </button>

      {registerMessage && (
        <p className="text-green-400 mt-4 font-semibold">{registerMessage}</p>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-yellow-400 mb-3">
          Problems:
        </h2>
        {contestDetails.problems?.length > 0 ? (
          <ul className="space-y-3">
            {contestDetails.problems.map((p) => (
              <li
                key={p._id}
                className="bg-[#111827] p-4 rounded-lg flex justify-between items-center"
              >
                <span>{p.title}</span>
                <button
                  onClick={() =>
                    (window.location.href = `/contest/${id}/problem/${p._id}`)
                  }
                  className="bg-yellow-500 text-black px-3 py-1 rounded-md"
                >
                  Solve
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No problems added yet.</p>
        )}
      </div>
    </div>
  );
}
