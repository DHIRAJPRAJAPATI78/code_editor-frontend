import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
          `http://localhost:3000/user/track/activity?year=${year}`,
          { withCredentials: true }
        );
        setHeatmap(res.data);
      } catch (err) {
        console.error("Failed to fetch activity data", err);
      }
    };
    fetchHeatmap();
  }, [year]);

  // 📊 Calculate statistics
  const { totalSubmissions, totalActiveDays } = useMemo(() => {
    if (!heatmap?.data) return { totalSubmissions: 0, totalActiveDays: 0 };
    
    const submissions = Object.values(heatmap.data).reduce((total, count) => total + count, 0);
    const activeDays = Object.values(heatmap.data).filter(count => count > 0).length;
    
    return { totalSubmissions: submissions, totalActiveDays: activeDays };
  }, [heatmap]);

  // 🎨 LeetCode color scale
  const colorScale = [
    "bg-[#ebedf0] dark:bg-[#161b22]", // 0 submissions
    "bg-[#9be9a8] dark:bg-[#0e4429]", // 1 submission
    "bg-[#40c463] dark:bg-[#006d32]", // 2-3 submissions
    "bg-[#30a14e] dark:bg-[#26a641]", // 4-5 submissions
    "bg-[#216e39] dark:bg-[#39d353]", // 6+ submissions
  ];

  // 📆 Generate LeetCode-style calendar (months × days)
  const { calendar, monthLabels } = useMemo(() => {
    if (!heatmap?.data) return { calendar: [], monthLabels: [] };

    // Create a map for all dates in the year
    const dateMap = {};
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const iso = date.toISOString().split("T")[0];
      dateMap[iso] = heatmap.data[iso] || 0;
    }

    // Group by months
    const months = [];
    const labels = [];
    
    for (let month = 0; month < 12; month++) {
      const monthData = [];
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      
      // Add empty cells for days before the first day of month
      const firstDayOfWeek = firstDay.getDay();
      for (let i = 0; i < firstDayOfWeek; i++) {
        monthData.push(null);
      }
      
      // Add all days of the month
      for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        const iso = date.toISOString().split("T")[0];
        monthData.push([iso, dateMap[iso] || 0]);
      }
      
      months.push(monthData);
      labels.push(firstDay.toLocaleString("default", { month: "short" }));
    }

    return { calendar: months, monthLabels: labels };
  }, [heatmap, year]);

  // Get color level based on submission count (LeetCode algorithm)
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
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 w-full max-w-6xl mx-auto">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-12 gap-4 mb-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 w-full max-w-6xl mx-auto">
      {/* 🔥 Header Bar - LeetCode Style */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">

          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-1">
              <span className="hidden sm:inline">Current Streak:</span>
              <strong className="text-green-600 dark:text-green-400">{heatmap.currentStreak}d</strong>
            </span>
            <span className="flex items-center gap-1">
              <span className="hidden sm:inline">Longest Streak:</span>
              <strong className="text-green-600 dark:text-green-400">{heatmap.longestStreak}d</strong>
            </span>
            <span className="flex items-center gap-1">
              <span className="hidden sm:inline">Active Days:</span>
              <strong className="text-green-600 dark:text-green-400">{totalActiveDays}</strong>
            </span>
            <span className="flex items-center gap-1">
              <span className="hidden sm:inline">Total Submissions:</span>
              <strong className="text-green-600 dark:text-green-400">{totalSubmissions}</strong>
            </span>
          </div>
        </div>

        {/* Year Selector */}
        <div className="relative self-start">
          <button
            onClick={() => setIsOpen((p) => !p)}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition text-sm w-28 justify-between"
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
                className="absolute right-0 mt-1 w-28 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden shadow-lg z-20 max-h-60 overflow-y-auto"
              >
                {availableYears.map((y) => (
                  <li
                    key={y}
                    onClick={() => {
                      setYear(y);
                      setIsOpen(false);
                    }}
                    className={`px-3 py-1.5 cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                      year === y 
                        ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" 
                        : "text-gray-700 dark:text-gray-200"
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

      {/* 📱 Responsive Container for Calendar */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        {/* 🗓️ LeetCode Style Calendar Grid */}
        <div className="flex gap-3 sm:gap-4 md:gap-6 min-w-max pb-4">
          {calendar.map((monthData, monthIndex) => (
            <div key={monthIndex} className="flex flex-col items-center">
              {/* Month Label */}
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 h-4 font-medium">
                {monthLabels[monthIndex]}
              </div>
              
              {/* Month Grid */}
              <div className="grid grid-cols-7 gap-1">
                {monthData.map((day, dayIndex) => {
                  if (day === null) {
                    return <div key={dayIndex} className="w-3 h-3 sm:w-3 sm:h-3" />; // Empty cell for alignment
                  }

                  const [date, count] = day;
                  const level = getColorLevel(count);
                  
                  return (
                    <div
                      key={date}
                      onMouseEnter={() => setHovered({ date, count, level })}
                      onMouseLeave={() => setHovered(null)}
                      className="relative"
                    >
                      <motion.div
                        className={`w-3 h-3 sm:w-3 sm:h-3 rounded-sm ${
                          colorScale[level]
                        } border border-white/10 dark:border-gray-800/10 cursor-pointer transition-colors`}
                        whileHover={{ scale: 1.2 }}
                      ></motion.div>

                      {/* Hover Info */}
                      <AnimatePresence>
                        {hovered?.date === date && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: -8 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.15 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-10 pointer-events-none"
                          >
                            <div className="font-medium">
                              {new Date(date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                            <div className="text-gray-300 text-center">
                              {count === 0 
                                ? "No submissions" 
                                : `${count} submission${count === 1 ? "" : "s"}`
                              }
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

      {/* 📊 Legend & Stats - LeetCode Style */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 gap-3">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 justify-center sm:justify-start">
          <span>Less</span>
          <div className="flex gap-0.5">
            {colorScale.map((color, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${color}`}></div>
            ))}
          </div>
          <span>More</span>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center sm:text-right">
          <span className="hidden sm:inline">Average: </span>
          <strong className="text-gray-700 dark:text-gray-300">
            {(totalSubmissions / totalActiveDays || 0).toFixed(1)} submissions per active day
          </strong>
        </div>
      </div>

      {/* Day of Week Labels */}
      <div className="grid grid-cols-7 gap-1 mt-3 max-w-md mx-auto">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <div
            key={day}
            className={`text-xs text-gray-400 text-center h-3 flex items-center justify-center ${
              index === 0 || index === 6 ? "text-gray-500" : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 📊 Mobile Stats Summary */}
      <div className="sm:hidden mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Current Streak</div>
            <div className="text-sm font-semibold text-green-600 dark:text-green-400">{heatmap.currentStreak} days</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Longest Streak</div>
            <div className="text-sm font-semibold text-green-600 dark:text-green-400">{heatmap.longestStreak} days</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Active Days</div>
            <div className="text-sm font-semibold text-green-600 dark:text-green-400">{totalActiveDays}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total Submissions</div>
            <div className="text-sm font-semibold text-green-600 dark:text-green-400">{totalSubmissions}</div>
          </div>
        </div>
      </div>
    </div>
  );
}