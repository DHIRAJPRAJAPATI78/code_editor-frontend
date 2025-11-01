import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getAllSolvedProblems } from "../../features/solvedProblem/solvedSlice";
import { Target, TrendingUp, Clock } from "lucide-react";

export default function SolvedStats() {
  const dispatch = useDispatch();

  const { problems: solvedProblems, isLoading, isError, message } = useSelector(
    (state) => state.solved
  );
  const { problems: totalProblems } = useSelector((state) => state.problem);

  useEffect(() => {
    dispatch(getAllSolvedProblems());
  }, [dispatch]);

  // ✅ Compute stats dynamically using Redux data
  const stats = useMemo(() => {
    const easyTotal = totalProblems.filter((p) => p.difficulty === "easy").length;
    const mediumTotal = totalProblems.filter((p) => p.difficulty === "medium").length;
    const hardTotal = totalProblems.filter((p) => p.difficulty === "hard").length;
    const total = totalProblems.length;

    const easySolved = solvedProblems.filter((p) => p.difficulty === "easy").length;
    const mediumSolved = solvedProblems.filter((p) => p.difficulty === "medium").length;
    const hardSolved = solvedProblems.filter((p) => p.difficulty === "hard").length;
    const solved = solvedProblems.length;

    const acceptance = total
      ? ((solved / total) * 100).toFixed(2)
      : "0.00";

    return {
      solved,
      total,
      easy: { solved: easySolved, total: easyTotal },
      medium: { solved: mediumSolved, total: mediumTotal },
      hard: { solved: hardSolved, total: hardTotal },
      attempting: 15,
      acceptance,
    };
  }, [solvedProblems, totalProblems]);

  const getPercentage = (s, t) => (t === 0 ? 0 : (s / t) * 100);
  const mainPct = getPercentage(stats.solved, stats.total);
  const radius = 55;
  const circumference = 2 * Math.PI * radius;

  const difficulties = [
    {
      name: "Easy",
      color: "from-green-400 to-emerald-500",
      textColor: "text-green-400",
      pct: getPercentage(stats.easy.solved, stats.easy.total),
    },
    {
      name: "Medium",
      color: "from-yellow-400 to-amber-500",
      textColor: "text-yellow-400",
      pct: getPercentage(stats.medium.solved, stats.medium.total),
    },
    {
      name: "Hard",
      color: "from-red-500 to-pink-600",
      textColor: "text-red-400",
      pct: getPercentage(stats.hard.solved, stats.hard.total),
    },
  ];

  if (isLoading)
    return (
      <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#2a2a2a] shadow-lg h-[400px] flex items-center justify-center text-gray-400">
        Loading stats...
      </div>
    );

  if (isError)
    return (
      <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#2a2a2a] shadow-lg h-[400px] flex items-center justify-center text-red-400">
        {message || "Failed to load data"}
      </div>
    );

  return (
    <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#2a2a2a] shadow-lg flex flex-col justify-between h-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-white">Solved Problems</h3>
        <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-[#252525] px-2 py-0.5 rounded-md">
          <Target size={13} />
          <span>Overall Progress</span>
        </div>
      </div>

      {/* Main Circle */}
      <div className="relative flex flex-col items-center justify-center flex-1">
        <div className="relative w-[140px] h-[140px]">
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
              className="stroke-[#ffa116]"
              initial={{ strokeDashoffset: circumference }}
              animate={{
                strokeDashoffset:
                  circumference - (mainPct / 100) * circumference,
              }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              className="text-md font-bold text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
            >
              {stats.solved}
            </motion.div>
            <div className="text-xs text-gray-500 mt-1">Solved</div>
            <div className="text-xs text-gray-500">of {stats.total}</div>
          </div>
        </div>

        {/* Difficulty Rings */}
        <div className="flex items-center justify-center gap-4 flex-wrap mt-1">
          {difficulties.map((item) => (
            <div key={item.name} className="text-center">
              <div className="relative w-[65px] h-[65px] mx-auto mb-1">
                <svg className="absolute inset-0 rotate-[-90deg]" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="7"
                    fill="none"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={
                      2 * Math.PI * 40 - (item.pct / 100) * (2 * Math.PI * 40)
                    }
                    className={`stroke-[url(#${item.name}-grad)]`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                    animate={{
                      strokeDashoffset:
                        2 * Math.PI * 40 - (item.pct / 100) * (2 * Math.PI * 40),
                    }}
                    transition={{ duration: 1 }}
                  />
                  <defs>
                    <linearGradient id={`${item.name}-grad`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={item.color.split(" ")[0].replace("from-", "")} />
                      <stop offset="100%" stopColor={item.color.split(" ")[1].replace("to-", "")} />
                    </linearGradient>
                  </defs>
                </svg>
                <span
                  className={`absolute inset-0 flex items-center justify-center text-xs font-semibold ${item.textColor}`}
                >
                  {item.pct.toFixed(0)}%
                </span>
              </div>
              <p className={`text-xs ${item.textColor}`}>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 grid grid-cols-2 gap-3 text-center text-sm">
        <div className="bg-[#252525] p-2.5 rounded-lg">
          <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs mb-1">
            <TrendingUp size={12} /> Acceptance Rate
          </div>
          <div className="text-lg font-semibold text-[#ffa116]">
            {stats.acceptance}%
          </div>
        </div>
        <div className="bg-[#252525] p-2.5 rounded-lg">
          <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs mb-1">
            <Clock size={12} /> Attempting
          </div>
          <div className="text-lg font-semibold text-[#00c853]">
            {stats.attempting}
          </div>
        </div>
      </div>
    </div>
  );
}
