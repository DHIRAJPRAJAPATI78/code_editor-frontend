import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function SolvedStats() {
  const stats = {
    solved: 213,
    total: 3730,
    easy: { solved: 87, total: 909 },
    medium: { solved: 108, total: 1942 },
    hard: { solved: 18, total: 879 },
    attempting: 15,
    acceptance: 46.54,
  };

  const getPercentage = (s, t) => (s / t) * 100;
  const mainPct = getPercentage(stats.solved, stats.total);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  const difficulties = [
    { name: "Easy", color: "from-green-400 to-emerald-500", pct: getPercentage(stats.easy.solved, stats.easy.total) },
    { name: "Medium", color: "from-yellow-400 to-amber-500", pct: getPercentage(stats.medium.solved, stats.medium.total) },
    { name: "Hard", color: "from-red-500 to-pink-600", pct: getPercentage(stats.hard.solved, stats.hard.total) },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl shadow-2xl p-6 text-gray-100 flex flex-col items-center justify-center">
      {/* Title */}
      <h3 className="text-lg font-semibold mb-6">Overall Progress</h3>

      {/* Center Ring */}
      <div className="relative flex items-center justify-center w-[200px] h-[200px] mb-6">
        <svg className="absolute inset-0 rotate-[-90deg]" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="10"
            fill="none"
          />
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (mainPct / 100) * circumference}
            className="stroke-[url(#gradientMain)]"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (mainPct / 100) * circumference }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradientMain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-white">{stats.solved}</h1>
          <p className="text-sm text-gray-400">of {stats.total}</p>
          <div className="mt-2 flex items-center gap-1 text-emerald-400 text-xs">
            <Check size={14} /> <span>Solved</span>
          </div>
        </div>
      </div>

      {/* Difficulty Rings */}
      <div className="flex gap-4 flex-wrap justify-center w-full max-w-md">
        {difficulties.map((item, i) => {
          const pct = item.pct.toFixed(1);
          const dash = (circumference * pct) / 100;
          const gap = circumference - dash;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="relative flex flex-col items-center"
            >
              <div className="relative w-[90px] h-[90px]">
                <svg
                  className="rotate-[-90deg]"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="6"
                    fill="none"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${dash}, ${gap}`}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: gap }}
                    transition={{ duration: 1.4, ease: "easeInOut" }}
                    className={`stroke-[url(#grad-${item.name})]`}
                  />
                  <defs>
                    <linearGradient id={`grad-${item.name}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      {item.name === "Easy" && (
                        <>
                          <stop offset="0%" stopColor="#34d399" />
                          <stop offset="100%" stopColor="#059669" />
                        </>
                      )}
                      {item.name === "Medium" && (
                        <>
                          <stop offset="0%" stopColor="#facc15" />
                          <stop offset="100%" stopColor="#f59e0b" />
                        </>
                      )}
                      {item.name === "Hard" && (
                        <>
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="100%" stopColor="#be123c" />
                        </>
                      )}
                    </linearGradient>
                  </defs>
                </svg>

                {/* Label in Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-xs">
                  <span
                    className={`font-semibold ${
                      item.name === "Easy"
                        ? "text-green-400"
                        : item.name === "Medium"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.name}
                  </span>
                  <span className="text-gray-300">{pct}%</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 text-sm text-gray-400 text-center">
        Acceptance Rate:{" "}
        <span className="text-emerald-400 font-semibold">{stats.acceptance}%</span> •{" "}
        Attempting:{" "}
        <span className="text-amber-400 font-semibold">{stats.attempting}</span>
      </div>
    </div>
  );
}
