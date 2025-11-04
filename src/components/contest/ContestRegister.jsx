import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchContestById,
  registerForContest,
  clearContestError,
  clearRegisterMessage,
} from "../../features/contest/contestSlice";
import { motion } from "framer-motion";
import { Loader2, Info } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const ContestRegister = () => {
  const { contestId } = useParams();
  const dispatch = useDispatch();

  const { contestDetails, loading, error, registerMessage } = useSelector(
    (state) => state.contest
  );

  useEffect(() => {
    if(!contestDetails)
    dispatch(fetchContestById(contestId));

    return () => {
      dispatch(clearContestError());
      dispatch(clearRegisterMessage());
    };
  }, [contestId, dispatch]);

  // Show toast when registerMessage or error changes
  useEffect(() => {
    if (registerMessage) {
      toast.success(registerMessage, {
        style: {
          background: "#1a1f2c",
          color: "#d4d4d4",
          border: "1px solid #22c55e",
        },
        iconTheme: {
          primary: "#22c55e",
          secondary: "#1a1f2c",
        },
      });
      dispatch(clearRegisterMessage());
    }

    if (error) {
      toast.error(error, {
        style: {
          background: "#1a1f2c",
          color: "#d4d4d4",
          border: "1px solid #ef4444",
        },
        iconTheme: {
          primary: "#ef4444",
          secondary: "#1a1f2c",
        },
      });
      dispatch(clearContestError());
    }
  }, [registerMessage, error, dispatch]);

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(registerForContest( contestId ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="animate-spin text-yellow-400 w-10 h-10" />
      </div>
    );
  }

  if (!contestDetails) {
    return (
      <div className="text-center text-gray-400 mt-20 text-lg">
        Contest not found.
      </div>
    );
  }

  const { title, description, startTime, endTime } = contestDetails;

  return (
    <motion.div
      className="min-h-screen bg-[#0d1117] flex flex-col items-center text-gray-100 px-4 pt-20 pb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Card */}
      <motion.div
        className="bg-[#161b22] w-full max-w-3xl rounded-2xl shadow-lg p-8 border border-gray-700"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl font-bold text-yellow-400 mb-4">{title}</h1>
        <p className="text-gray-300 mb-6">{description}</p>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-400">
          <div>
            <span className="font-semibold text-gray-200">Start:</span>{" "}
            {new Date(startTime).toLocaleString()}
          </div>
          <div>
            <span className="font-semibold text-gray-200">End:</span>{" "}
            {new Date(endTime).toLocaleString()}
          </div>
        </div>

        {/* Guidelines Section */}
        <div className="bg-[#0f1620] border border-gray-700 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Info className="text-yellow-400 w-5 h-5" />
            <h2 className="text-xl font-semibold text-yellow-400">
              Contest Guidelines
            </h2>
          </div>

          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
            <li>
              The contest includes <strong>4 coding problems</strong> of varying
              difficulty.
            </li>
            <li>
              Duration: <strong>90 minutes</strong>.
            </li>
            <li>
              Allowed languages: C++, Java, Python, and JavaScript.
            </li>
            <li>
              Submissions are evaluated automatically using hidden test cases.
            </li>
            <li>
              Any form of plagiarism will lead to immediate disqualification.
            </li>
            <li>
              Rankings are based on the <strong>number of solved problems</strong> and{" "}
              <strong>total time taken</strong>.
            </li>
            <li>
              Registered users can access this contest from the{" "}
              <strong>“My Contests”</strong> section.
            </li>
          </ul>
        </div>

        {/* Register button */}
        <div className="flex justify-center">
          <motion.button
            onClick={handleRegister}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-300 transition-all"
          >
            {loading ? "Processing..." : "Register for Contest"}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContestRegister;
