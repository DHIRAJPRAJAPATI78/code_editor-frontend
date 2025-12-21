import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = "https://algoken.onrender.com/submit/user/all-submission";

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

  // Fetch submissions with pagination
  const fetchSubmissions = async (pageNo = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${API_URL}?page=${pageNo}&limit=${limit}`,
        { withCredentials: true }
      );
      
      console.log("API Response:", res.data);
      
      // Check if the response has the expected structure
      if (res.data && res.data.submissions) {
        setSubmissions(res.data.submissions);
      } else if (Array.isArray(res.data)) {
        // If the response is directly an array
        setSubmissions(res.data);
      }
      
      // Set pagination if available
      if (res.data.pagination) {
        setPagination(res.data.pagination);
      } else {
        // Calculate pagination based on data
        const total = res.data.submissions?.length || res.data.length || 0;
        setPagination({
          totalSubmissions: total,
          totalPages: Math.ceil(total / limit),
          currentPage: pageNo
        });
      }
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

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    const totalPages = pagination.totalPages || 1;
    
    if (totalPages <= 1) return [1];
    
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  const verdictColor = (verdict) => {
    switch (verdict) {
      case "Accepted":
        return "text-green-400";
      case "Wrong Answer":
        return "text-red-400";
      case "Time Limit Exceeded":
        return "text-yellow-400";
      case "Runtime Error":
        return "text-orange-400";
      case "Compilation Error":
        return "text-purple-400";
      case "Memory Limit Exceeded":
        return "text-pink-400";
      default:
        return "text-gray-400";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) {
      return "Just now";
    } else if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  // Handle code display (if needed)
  const ViewCodeModal = ({ code, isOpen, onClose }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-[#1a1d25] border border-gray-700 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-yellow-400">Submission Code</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>
          </div>
          <div className="p-4 overflow-auto max-h-[60vh]">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
              {code}
            </pre>
          </div>
          <div className="p-4 border-t border-gray-700 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-300 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // State for code modal
  const [selectedCode, setSelectedCode] = useState(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  const handleViewCode = (code) => {
    setSelectedCode(code);
    setIsCodeModalOpen(true);
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
          Total Submissions: {pagination.totalSubmissions || 0}
          {submissions.length > 0 && 
            ` • Showing ${(page - 1) * limit + 1}-${Math.min(page * limit, pagination.totalSubmissions || submissions.length)}`
          }
        </span>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Rows per page:</span>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              className="bg-[#0e1116] border border-gray-700 rounded px-2 py-1 text-gray-200 focus:outline-none focus:border-yellow-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
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
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <motion.tbody layout>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-8 text-gray-400">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mb-2"></div>
                    Loading submissions...
                  </div>
                </td>
              </tr>
            ) : submissions.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-8 text-gray-500">
                  No submissions found
                </td>
              </tr>
            ) : (
              submissions.map((sub, idx) => (
                <motion.tr
                  key={sub._id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-gray-800 hover:bg-[#1f242c] transition-colors duration-200"
                >
                  <td className="px-4 py-3">
                    {sub.problem ? (
                      <>
                        <p className="text-yellow-400 font-medium">
                          {sub.problem.title || "Untitled Problem"}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {sub.problem.difficulty || "Unknown"}
                        </p>
                      </>
                    ) : (
                      <span className="text-gray-500 italic">
                        Problem deleted
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center uppercase text-sm">
                    {sub.language || "Unknown"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span className={`font-semibold ${verdictColor(sub.verdict)}`}>
                      {sub.verdict || "Pending"}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {sub.passedTestCases !== undefined && sub.totalTestCases !== undefined ? (
                      <span className="font-medium">
                        {sub.passedTestCases}/{sub.totalTestCases}
                      </span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {sub.executionTime !== undefined ? (
                      <span className="font-medium">{sub.executionTime} ms</span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {sub.memory !== undefined ? (
                      <span className="font-medium">{sub.memory} KB</span>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center text-gray-400 text-xs">
                    <div className="flex flex-col">
                      <span>{formatDate(sub.createdAt)}</span>
                      <span className="text-gray-400">
                        {sub.createdAt ? new Date(sub.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ""}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {sub.code && (
                      <button
                        onClick={() => handleViewCode(sub.code)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition-colors"
                      >
                        View Code
                      </button>
                    )}
                  </td>
                </motion.tr>
              ))
            )}
          </motion.tbody>
        </table>
      </motion.div>

      {/* Code Modal */}
      <ViewCodeModal
        code={selectedCode}
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />

      {/* Enhanced Pagination */}
      {(pagination.totalPages > 1 || submissions.length > limit ) && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
          <span className="text-sm text-gray-400">
            Page {page} of {pagination.totalPages || Math.ceil(submissions.length / limit)} • {pagination.totalSubmissions || submissions.length} total items
          </span>
          
          <div className="flex items-center gap-2">
            {/* First Page */}
            <button
              disabled={page === 1}
              onClick={() => setPage(1)}
              className={`px-3 py-2 rounded-md ${
                page === 1
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-[#1a1d25] text-gray-300 hover:bg-gray-700 hover:text-yellow-400"
              }`}
              aria-label="First page"
            >
              &laquo;
            </button>

            {/* Previous Page */}
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className={`px-4 py-2 rounded-md ${
                page === 1
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-[#1a1d25] text-gray-300 hover:bg-gray-700 hover:text-yellow-400"
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-10 h-10 rounded-md font-medium ${
                    page === pageNum
                      ? "bg-yellow-400 text-black"
                      : "bg-[#1a1d25] text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            {/* Next Page */}
            <button
              disabled={page === (pagination.totalPages || Math.ceil(submissions.length / limit))}
              onClick={() => setPage(p => p + 1)}
              className={`px-4 py-2 rounded-md ${
                page === (pagination.totalPages || Math.ceil(submissions.length / limit))
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-[#1a1d25] text-gray-300 hover:bg-gray-700 hover:text-yellow-400"
              }`}
            >
              Next
            </button>

            {/* Last Page */}
            <button
              disabled={page === (pagination.totalPages || Math.ceil(submissions.length / limit))}
              onClick={() => setPage(pagination.totalPages || Math.ceil(submissions.length / limit))}
              className={`px-3 py-2 rounded-md ${
                page === (pagination.totalPages || Math.ceil(submissions.length / limit))
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-[#1a1d25] text-gray-300 hover:bg-gray-700 hover:text-yellow-400"
              }`}
              aria-label="Last page"
            >
              &raquo;
            </button>
          </div>

          {/* Page Input */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Go to page:</span>
            <input
              type="number"
              min="1"
              max={pagination.totalPages || Math.ceil(submissions.length / limit)}
              value={page}
              onChange={(e) => {
                const maxPage = pagination.totalPages || Math.ceil(submissions.length / limit);
                const value = Math.max(1, Math.min(maxPage, Number(e.target.value) || 1));
                setPage(value);
              }}
              className="w-16 bg-[#1a1d25] border border-gray-700 rounded px-2 py-1 text-gray-200 text-center focus:outline-none focus:border-yellow-500"
            />
          </div>
        </div>
      )}
    </div>
  );
}