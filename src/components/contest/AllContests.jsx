import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllContests } from "../../features/contest/contestSlice";
import { Loader2, Trophy, Timer, Users, ListChecks, User } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AllContests() {
  const dispatch = useDispatch();
  const { contests, loading, error, currentPage, totalPages } = useSelector(
    (state) => state.contest
  );

  useEffect(() => {
    dispatch(fetchAllContests({ page: currentPage, limit: 10 }));
  }, [dispatch, currentPage]);

  if (loading)
    return (
      <div className='flex justify-center items-center h-80 text-yellow-400'>
        <Loader2 className='animate-spin w-8 h-8 mr-2' />
        Loading contests...
      </div>
    );

  // ❌ Error state
  if (error)
    return (
      <div className='text-red-400 text-center font-semibold mt-10'>
        {error}
      </div>
    );
  if (!contests || contests.length === 0)
    return (
      <div className='text-center text-gray-400 mt-20 text-lg'>
        No contests available right now.
      </div>
    );

  return (
    <div className='bg-[#0a0a0f] min-h-screen text-gray-200 flex flex-col justify-between'>
      {/* Contest Grid */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {contests.map((contest) => (
          <motion.div
            key={contest._id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className='bg-[#111827] border border-gray-700 rounded-2xl p-5 shadow-md hover:shadow-yellow-500/20 transition-all'
          >
            {/* 🏆 Header */}
            <div className='flex items-center gap-3 mb-3'>
              <Trophy className='text-yellow-400 w-6 h-6' />
              <h2 className='text-lg font-semibold'>{contest.title}</h2>
            </div>

            {/* 📝 Description */}
            <p className='text-sm text-gray-400 mb-3 line-clamp-2'>
              {contest.description || "No description available"}
            </p>

            {/* 🕓 Time Info */}
            <div className='text-xs text-gray-400 mb-3 space-y-1'>
              <p>
                <Timer className='inline w-4 h-4 mr-1 text-yellow-400' />
                <span className='font-medium text-gray-300'>Start:</span>{" "}
                {new Date(contest.startTime).toLocaleString()}
              </p>
              <p>
                <Timer className='inline w-4 h-4 mr-1 text-yellow-400' />
                <span className='font-medium text-gray-300'>End:</span>{" "}
                {new Date(contest.endTime).toLocaleString()}
              </p>
            </div>

            {/* 🧩 Extra Info */}
            <div className='flex justify-between text-xs text-gray-500 mb-4'>
              <span className='flex items-center gap-1'>
                <ListChecks className='w-4 h-4 text-yellow-500' />
                {contest.totalProblems} Problems
              </span>
              <span className='flex items-center gap-1'>
                <Users className='w-4 h-4 text-yellow-500' />
                {contest.totalUsers} Participants
              </span>
            </div>

            {/* 📊 Status */}
            <div className='text-sm font-semibold mb-4'>
              <span
                className={`capitalize px-3 py-1 rounded-full ${
                  contest.status === "live"
                    ? "bg-green-500/20 text-green-400"
                    : contest.status === "upcoming"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {contest.status}
              </span>
            </div>

            <Link
              to={`/contests/${contest._id}`}
              className='w-full block bg-yellow-500 hover:bg-yellow-400 text-black py-2 rounded-lg font-semibold transition  text-center'
            >
              {" "}
              View Details
            </Link>
          </motion.div>
        ))}
      </div>

      {/* 🔄 Pagination */}
      <div className='flex justify-center items-center mt-10 gap-3 mb-2 '>
        <button
          disabled={currentPage === 1}
          onClick={() => dispatch(setPage(currentPage - 1))}
          className={`px-4 py-2 rounded-lg font-medium ${
            currentPage === 1
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-400 text-black"
          }`}
        >
          Prev
        </button>

        <span className='text-gray-300 font-semibold'>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => dispatch(setPage(currentPage + 1))}
          className={`px-4 py-2 rounded-lg font-medium ${
            currentPage === totalPages
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-400 text-black"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
