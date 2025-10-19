import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProblemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/problems/${id}`);
        const data = await res.json();
        setProblem(data);
      } catch (error) {
        console.error("Error fetching problem:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400 text-xl">
        Loading...
      </div>
    );

  if (!problem)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-400 bg-black">
        <p>Problem not found.</p>
        <button
          onClick={() => navigate("/problems")}
          className="mt-4 px-6 py-2 rounded-lg bg-purple-600/30 border border-purple-500/40 hover:bg-purple-600/50 text-purple-300 transition-all"
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white px-6 md:px-20 py-12">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-purple-400 hover:text-purple-300 mb-6 transition-all"
      >
        ← Back to Problems
      </button>

      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
        {problem.title}
      </h1>

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

      <p className="mt-6 text-gray-300 leading-relaxed">{problem.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {problem.tags.map((tag, i) => (
          <span
            key={i}
            className="text-xs px-2 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-purple-400 mb-2">
          Example Test Cases
        </h2>
        {problem.visibleTestCase.map((test, i) => (
          <div
            key={i}
            className="bg-gray-900/50 p-4 rounded-lg mb-3 border border-gray-800"
          >
            <p className="text-sm text-gray-400">
              <span className="text-purple-400">Input:</span> {test.input}
            </p>
            <p className="text-sm text-gray-400">
              <span className="text-blue-400">Output:</span> {test.output}
            </p>
            {test.explanation && (
              <p className="text-sm text-gray-500 italic">
                {test.explanation}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-fuchsia-400 mb-2">
          Editorial
        </h2>
        <p className="text-gray-400 leading-relaxed">{problem.editorial}</p>
      </div>
    </div>
  );
}
