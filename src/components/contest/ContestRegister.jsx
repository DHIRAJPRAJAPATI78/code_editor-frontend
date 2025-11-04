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
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

const ContestRegister = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { contestDetails, loading, error, registerMessage } = useSelector(
    (state) => state.contest
  );

  useEffect(() => {
    dispatch(fetchContestById(id));

    return () => {
      dispatch(clearContestError());
      dispatch(clearRegisterMessage());
    };
  }, [id, dispatch]);

  const handleRegister = () => {
    dispatch(registerForContest({ id }));
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
      className="min-h-screen bg-[#0d1117] flex flex-col items-center text-gray-100 px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Card */}
      <motion.div
        className="bg-[#161b22] w-full max-w-2xl rounded-2xl shadow-lg p-8 border border-gray-700"
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

        {/* Success Message */}
        {registerMessage && (
          <div className="mt-6 flex items-center gap-2 text-green-400 bg-green-900/30 border border-green-800 p-3 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
            <span>{registerMessage}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 flex items-center gap-2 text-red-400 bg-red-900/30 border border-red-800 p-3 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ContestRegister;
