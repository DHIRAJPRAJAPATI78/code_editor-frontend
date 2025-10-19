import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProblemList() {
  const [problems, setProblems] = useState([
  {
    _id: "1",
    title: "Two Sum",
    description: "Find two numbers in an array that add up to a target value.",
    tags: ["array", "hashmap"],
    difficulty: "easy",
    visibleTestCase: [
      { input: "[2,7,11,15], target=9", output: "[0,1]", explanation: "2+7=9" },
    ],
    editorial: "Use a hashmap to store visited numbers and check complements.",
  },
  {
    _id: "2",
    title: "Median of Two Sorted Arrays",
    description: "Find the median of two sorted arrays of different sizes.",
    tags: ["array", "binary search"],
    difficulty: "hard",
    visibleTestCase: [
      { input: "[1,3], [2]", output: "2.0", explanation: "Combined array [1,2,3]" },
    ],
    editorial:
      "Use binary search on the smaller array to find the correct partition point.",
  },
  {
    _id: "3",
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters.",
    tags: ["string", "sliding window"],
    difficulty: "medium",
    visibleTestCase: [
      { input: '"abcabcbb"', output: "3", explanation: "Longest substring is 'abc'" },
    ],
    editorial:
      "Use a sliding window with a set to track characters in the current substring.",
  },{
    _id: "3",
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters.",
    tags: ["string", "sliding window"],
    difficulty: "medium",
    visibleTestCase: [
      { input: '"abcabcbb"', output: "3", explanation: "Longest substring is 'abc'" },
    ],
    editorial:
      "Use a sliding window with a set to track characters in the current substring.",
  },{
    _id: "3",
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters.",
    tags: ["string", "sliding window"],
    difficulty: "medium",
    visibleTestCase: [
      { input: '"abcabcbb"', output: "3", explanation: "Longest substring is 'abc'" },
    ],
    editorial:
      "Use a sliding window with a set to track characters in the current substring.",
  },{
    _id: "3",
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters.",
    tags: ["string", "sliding window"],
    difficulty: "medium",
    visibleTestCase: [
      { input: '"abcabcbb"', output: "3", explanation: "Longest substring is 'abc'" },
    ],
    editorial:
      "Use a sliding window with a set to track characters in the current substring.",
  },{
    _id: "3",
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters.",
    tags: ["string", "sliding window"],
    difficulty: "medium",
    visibleTestCase: [
      { input: '"abcabcbb"', output: "3", explanation: "Longest substring is 'abc'" },
    ],
    editorial:
      "Use a sliding window with a set to track characters in the current substring.",
  },{
    _id: "3",
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters.",
    tags: ["string", "sliding window"],
    difficulty: "medium",
    visibleTestCase: [
      { input: '"abcabcbb"', output: "3", explanation: "Longest substring is 'abc'" },
    ],
    editorial:
      "Use a sliding window with a set to track characters in the current substring.",
  },{
    _id: "3",
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters.",
    tags: ["string", "sliding window"],
    difficulty: "medium",
    visibleTestCase: [
      { input: '"abcabcbb"', output: "3", explanation: "Longest substring is 'abc'" },
    ],
    editorial:
      "Use a sliding window with a set to track characters in the current substring.",
  },{
    _id: "3",
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters.",
    tags: ["string", "sliding window"],
    difficulty: "medium",
    visibleTestCase: [
      { input: '"abcabcbb"', output: "3", explanation: "Longest substring is 'abc'" },
    ],
    editorial:
      "Use a sliding window with a set to track characters in the current substring.",
  },
]);
  const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/problems");
        const data = await res.json();
        setProblems(data.problems || []);
      } catch (error) {
        console.error("Error fetching problems:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white px-6 md:px-16 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent">
        Problem Set
      </h1>

      {loading ? (
        <p className="text-center text-gray-400 text-lg animate-pulse">
          Loading problems...
        </p>
      ) : problems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No problems found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <div
              key={problem._id}
              onClick={() => navigate(`/problems/${problem._id}`)}
              className="bg-gradient-to-br from-[#1a1a1a] via-[#111] to-black border border-gray-800/70 p-6 rounded-2xl cursor-pointer hover:border-purple-500/50 hover:scale-[1.03] transition-all duration-300 shadow-lg hover:shadow-purple-700/30"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-100">
                {problem.title}
              </h2>

              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    problem.difficulty === "easy"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : problem.difficulty === "medium"
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}
                >
                  {problem.difficulty.toUpperCase()}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {problem.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-center mt-12 text-sm text-gray-500 italic">
        “Challenge yourself — one problem at a time.”
      </p>
    </div>
  );
}
