import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContestById } from "../../features/contest/contestSlice";
import { Loader2, Clock, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

export default function ContestDetails() {
  const dispatch = useDispatch();
  const { contestId } = useParams();

  const { contestDetails, loading, error } = useSelector(
    (state) => state.contest
  );

  useEffect(() => {
    if (contestId) dispatch(fetchContestById(contestId));
  }, [dispatch, contestId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <Loader2 className="animate-spin mr-2" /> Loading contest details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-medium py-10">
        {error}
      </div>
    );
  }

  if (!contestDetails) return null;

  const contest = contestDetails; // alias for cleaner usage

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-17 pb-2">
      {/* Contest Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {contest.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              {contest.description}
            </p>
          </div>

          {contest.isFinished ? (
            <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold mt-3 sm:mt-0">
              <CheckCircle2 className="w-5 h-5" /> Finished
            </span>
          ) : contest.isStarted ? (
            <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold mt-3 sm:mt-0">
              <Clock className="w-5 h-5" /> Ongoing
            </span>
          ) : (
            <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 font-semibold mt-3 sm:mt-0">
              <XCircle className="w-5 h-5" /> Upcoming
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-3 items-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              {new Date(contest.startTime).toLocaleString()} -{" "}
              {new Date(contest.endTime).toLocaleString()}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Problems Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Problems
        </h2>

        {contest.problems?.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {contest.problems.map((problem, index) => (
              <motion.div
                key={problem._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                    <Link to={`/contests/${contest._id}/problems/${problem._id}`}>
                    {problem.title} 
                    </Link >
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {problem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <span
                  className={`mt-3 sm:mt-0 px-3 py-1 text-sm font-medium rounded-full ${
                    problem.difficulty === "easy"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : problem.difficulty === "medium"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {problem.difficulty.charAt(0).toUpperCase() +
                    problem.difficulty.slice(1)}
                </span>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No problems yet.</p>
        )}
      </motion.div>
    </div>
  );
}
