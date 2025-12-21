import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Flame, Calendar, Target, Zap } from "lucide-react";

export default function ActivityHeatmap() {
  const [heatmap, setHeatmap] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isOpen, setIsOpen] = useState(false);

  // 🧠 Fetch user heatmap for selected year
  useEffect(() => {
    const fetchHeatmap = async () => {
      try {
        const res = await axios.get(
          `https://algoken.onrender.com/user/track/activity?year=${year}`,
          { withCredentials: true }
        );
        setHeatmap(res.data);
      } catch (err) {
        console.error("Failed to fetch activity data", err);
      }
    };
    fetchHeatmap();
  }, [year]);

  // 📊 Stats Calculation
  const { totalSubmissions, totalActiveDays } = useMemo(() => {
    if (!heatmap?.data) return { totalSubmissions: 0, totalActiveDays: 0 };
    const submissions = Object.values(heatmap.data).reduce((t, c) => t + c, 0);
    const activeDays = Object.values(heatmap.data).filter(c => c > 0).length;
    return { totalSubmissions: submissions, totalActiveDays: activeDays };
  }, [heatmap]);

  // 🎨 Authentic LeetCode Dark Theme Colors
  const colorScale = [
    "bg-[#161b22]", // no submission
    "bg-[#0e4429]", // 1
    "bg-[#006d32]", // 2–3
    "bg-[#26a641]", // 4–5
    "bg-[#39d353]", // 6+
  ];

  // 📅 Calendar Generation
  const { calendar, monthLabels } = useMemo(() => {
    if (!heatmap?.data) return { calendar: [], monthLabels: [] };

    const dateMap = {};
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const iso = date.toISOString().split("T")[0];
      dateMap[iso] = heatmap.data[iso] || 0;
    }

    const months = [];
    const labels = [];

    for (let month = 0; month < 12; month++) {
      const monthData = [];
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const firstDayOfWeek = firstDay.getDay();

      for (let i = 0; i < firstDayOfWeek; i++) monthData.push(null);
      for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        const iso = date.toISOString().split("T")[0];
        monthData.push([iso, dateMap[iso]]);
      }

      months.push(monthData);
      labels.push(firstDay.toLocaleString("default", { month: "short" }));
    }

    return { calendar: months, monthLabels: labels };
  }, [heatmap, year]);

  const getColorLevel = (count) => {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count <= 3) return 2;
    if (count <= 5) return 3;
    return 4;
  };

  const availableYears = Array.from(
    { length: new Date().getFullYear() - 2020 + 1 },
    (_, i) => new Date().getFullYear() - i
  );

  if (!heatmap) {
    return (
      <div className="bg-[#0d1117] p-6 rounded-lg border border-[#30363d] w-full max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-6 bg-[#161b22] rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-[#161b22] rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-12 gap-4 mb-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-24 bg-[#161b22] rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0d1117] p-4 sm:p-6 rounded-lg border border-[#30363d] w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
          <h3 className="text-white text-lg font-semibold">Activity Heatmap</h3>
          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400">
            <span className="flex items-center gap-1 bg-[#161b22] px-2 py-1 rounded-md">
              <Flame size={14} className="text-red-500" />
              <strong className="text-red-400">{heatmap.currentStreak}d</strong>
            </span>
            <span className="flex items-center gap-1 bg-[#161b22] px-2 py-1 rounded-md">
              <Target size={14} className="text-orange-400" />
              <strong className="text-orange-400">{heatmap.longestStreak}d</strong>
            </span>
            <span className="flex items-center gap-1 bg-[#161b22] px-2 py-1 rounded-md">
              <Calendar size={14} className="text-green-400" />
              <strong className="text-green-400">{totalActiveDays}</strong>
            </span>
            <span className="flex items-center gap-1 bg-[#161b22] px-2 py-1 rounded-md">
              <Zap size={14} className="text-yellow-400" />
              <strong className="text-yellow-400">{totalSubmissions}</strong>
            </span>
          </div>
        </div>

        {/* Year Dropdown */}
        <div className="relative self-start">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] border border-[#30363d] rounded-md text-gray-300 hover:bg-[#21262d] transition text-sm w-28 justify-between"
          >
            <span>{year}</span>
            <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-1 w-28 bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden shadow-lg z-20 max-h-60 overflow-y-auto"
              >
                {availableYears.map((y) => (
                  <li
                    key={y}
                    onClick={() => {
                      setYear(y);
                      setIsOpen(false);
                    }}
                    className={`px-3 py-1.5 cursor-pointer text-sm hover:bg-[#21262d] ${
                      year === y ? "bg-[#238636] text-white" : "text-gray-300"
                    }`}
                  >
                    {y}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="pb-4 sm:pb-6">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
          {calendar.map((monthData, monthIndex) => (
            <div key={monthIndex} className="flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-2 font-medium">
                {monthLabels[monthIndex]}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {monthData.map((day, dayIndex) => {
                  if (day === null) return <div key={dayIndex} className="w-3 h-3 sm:w-3 sm:h-3" />;
                  const [date, count] = day;
                  const level = getColorLevel(count);

                  return (
                    <div
                      key={date}
                      onMouseEnter={() => setHovered({ date, count })}
                      onMouseLeave={() => setHovered(null)}
                      className="relative"
                    >
                      <motion.div
                        className={`w-3 h-3 sm:w-3 sm:h-3 rounded-sm ${colorScale[level]} border border-[#0d1117] cursor-pointer`}
                        whileHover={{ scale: 1.3 }}
                      />
                      <AnimatePresence>
                        {hovered?.date === date && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: -8 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.15 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#161b22] text-gray-300 text-xs px-3 py-2 rounded-md shadow-lg border border-[#30363d] whitespace-nowrap z-20"
                          >
                            <div className="font-medium text-center">
                              {new Date(date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                            <div className="text-gray-400 text-center mt-1">
                              {count === 0
                                ? "No submissions"
                                : `${count} submission${count === 1 ? "" : "s"}`}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 pt-3 border-t border-[#30363d] gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-500 justify-center sm:justify-start">
          <span>Less</span>
          <div className="flex gap-0.5">
            {colorScale.map((color, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${color} border border-[#0d1117]`}></div>
            ))}
          </div>
          <span>More</span>
        </div>
        <div className="text-xs text-gray-400 text-center sm:text-right">
          Avg:{" "}
          <strong className="text-white">
            {(totalSubmissions / totalActiveDays || 0).toFixed(1)} per active day
          </strong>
        </div>
      </div>
    </div>
  );
}
