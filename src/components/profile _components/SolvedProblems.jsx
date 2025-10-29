import { motion } from "framer-motion";
import { useState } from "react";

export default function SolvedProblems() {
  const [filter, setFilter] = useState("All");

  const problems = [
    { name: "Two Sum", difficulty: "Easy", status: "✔", lang: "C++", runtime: "4 ms" },
    { name: "Add Two Numbers", difficulty: "Medium", status: "✔", lang: "JS", runtime: "120 ms" },
    { name: "Reverse Linked List", difficulty: "Hard", status: "❌", lang: "C++", runtime: "—" },
    { name: "Palindrome Number", difficulty: "Easy", status: "✔", lang: "Python", runtime: "28 ms" },
  ];

  const filtered =
    filter === "All" ? problems : problems.filter((p) => p.difficulty === filter);

  return (
    <motion.div
      className="bg-gray-800/50 p-6 rounded-2xl shadow-md"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Solved Problems</h3>

        <div className="flex gap-3">
          {["All", "Easy", "Medium", "Hard"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                filter === tab
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700/60 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-300">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="text-left py-2">Problem</th>
              <th>Difficulty</th>
              <th>Status</th>
              <th>Lang</th>
              <th>Runtime</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-gray-700/50 hover:bg-gray-700/40"
              >
                <td className="py-2">{p.name}</td>
                <td
                  className={`text-center ${
                    p.difficulty === "Easy"
                      ? "text-green-400"
                      : p.difficulty === "Medium"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {p.difficulty}
                </td>
                <td className="text-center">{p.status}</td>
                <td className="text-center text-indigo-400">{p.lang}</td>
                <td className="text-center">{p.runtime}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
