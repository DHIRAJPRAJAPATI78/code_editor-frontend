import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = "http://localhost:3000/submit/user/all-submission";

export default function MySubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [pagination, setPagination] = useState({
    totalSubmissions: 0,
    totalPages: 0,
    currentPage: 1,
  });

  const fetchSubmissions = async (pageNo = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_URL}?page=${pageNo}&limit=${limit}`,
        { withCredentials: true }
      );

      setSubmissions(res.data.submissions);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Failed to fetch submissions", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page or limit changes
  useEffect(() => {
    fetchSubmissions(page);
  }, [page, limit]);

  // Reset page when limit changes
  useEffect(() => {
    setPage(1);
  }, [limit]);

  const verdictColor = (verdict) => {
    switch (verdict) {
      case "Accepted":
        return "text-green-400";
      case "Wrong Answer":
        return "text-red-400";
      case "Time Limit Exceeded":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-[#0e1116] text-gray-200 px-4 py-20">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-yellow-400 mb-8 text-center"
      >
        My Submissions
      </motion.h1>

      {/* Header Controls */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-400">
          Total Submissions: {pagination.totalSubmissions}
        </span>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Rows per page:</span>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="bg-[#0e1116] border border-gray-700 rounded px-2 py-1 text-gray-200 focus:outline-none"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="overflow-x-auto bg-[#161b22] border border-gray-800 rounded-xl shadow-lg"
      >
        <table className="w-full text-sm">
          <thead className="bg-[#1a1d25] border-b border-gray-800">
            <tr className="text-gray-400">
              <th className="px-4 py-3 text-left">Problem</th>
              <th className="px-4 py-3">Language</th>
              <th className="px-4 py-3">Verdict</th>
              <th className="px-4 py-3">Testcases</th>
              <th className="px-4 py-3">Runtime</th>
              <th className="px-4 py-3">Memory</th>
              <th className="px-4 py-3">Submitted</th>
            </tr>
          </thead>

          <motion.tbody layout>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  Loading submissions...
                </td>
              </tr>
            ) : submissions.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No submissions found
                </td>
              </tr>
            ) : (
              submissions.map((sub, idx) => (
                <motion.tr
                  key={sub._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-gray-800 hover:bg-[#1f242c]"
                >
                  <td className="px-4 py-3">
                    {sub.problem ? (
                      <>
                        <p className="text-yellow-400 font-medium">
                          {sub.problem.title}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {sub.problem.difficulty}
                        </p>
                      </>
                    ) : (
                      <span className="text-gray-500 italic">
                        Problem deleted
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center uppercase">
                    {sub.language}
                  </td>

                  <td
                    className={`px-4 py-3 text-center font-semibold ${verdictColor(
                      sub.verdict
                    )}`}
                  >
                    {sub.verdict}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {sub.passedTestCases}/{sub.totalTestCases}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {sub.executionTime} ms
                  </td>

                  <td className="px-4 py-3 text-center">
                    {sub.memory} KB
                  </td>

                  <td className="px-4 py-3 text-center text-gray-400">
                    {new Date(sub.createdAt).toLocaleString()}
                  </td>
                </motion.tr>
              ))
            )}
          </motion.tbody>
        </table>
      </motion.div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className={`px-4 py-2 rounded-md font-semibold ${
              page === 1
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-yellow-400 text-black hover:bg-yellow-300"
            }`}
          >
            Previous
          </button>

          <span className="text-gray-400">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>

          <button
            disabled={page === pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className={`px-4 py-2 rounded-md font-semibold ${
              page === pagination.totalPages
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-yellow-400 text-black hover:bg-yellow-300"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
