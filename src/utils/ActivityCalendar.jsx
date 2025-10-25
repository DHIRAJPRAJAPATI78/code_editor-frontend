import { useState, useEffect } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from "date-fns";

export default function ActivityCalendar({ solvedDates, contestDates }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [streak, setStreak] = useState(0);

  const today = new Date();

  // Calculate streak
  useEffect(() => {
    const sorted = [...solvedDates].sort((a, b) => new Date(b) - new Date(a));
    let count = 0;
    let prev = new Date(sorted[0]);
    for (let i = 0; i < sorted.length; i++) {
      const current = new Date(sorted[i]);
      const diff = (prev - current) / (1000 * 60 * 60 * 24);
      if (diff === 1 || diff === 0) {
        count++;
        prev = current;
      } else break;
    }
    setStreak(count);
  }, [solvedDates]);

  const isSolved = (day) => solvedDates.some((date) => isSameDay(new Date(date), day));
  const isContest = (day) => contestDates.some((date) => isSameDay(new Date(date), day));

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const firstDayIndex = startOfMonth(currentMonth).getDay();

  return (
    <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 text-gray-200">
      {/* Header: Month + Navigation */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Activity</h3>
        <div className="text-sm text-green-400 font-medium">🔥 {streak} Day Streak</div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
        >
          ‹
        </button>
        <span className="font-semibold text-gray-300">{format(currentMonth, "MMMM yyyy")}</span>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="px-2 py-1 bg-gray-800 rounded hover:bg-gray-700"
        >
          ›
        </button>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 text-center mb-1 text-gray-400 text-xs">
        {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: firstDayIndex }).map((_, i) => <div key={`empty-${i}`} />)}
        {days.map((day) => {
          const solved = isSolved(day);
          const contest = isContest(day);
          const todayMatch = isSameDay(day, today);

          return (
            <div
              key={day}
              className={`relative w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 cursor-pointer ${
                solved
                  ? "bg-green-500/30 text-green-300 border border-green-600"
                  : todayMatch
                  ? "border border-yellow-400 text-yellow-300"
                  : "bg-[#161b22] text-gray-400 hover:bg-gray-800"
              }`}
              title={
                solved
                  ? "Solved a problem"
                  : contest
                  ? "Contest Day"
                  : todayMatch
                  ? "Today"
                  : format(day, "do MMM")
              }
            >
              {format(day, "d")}
              {contest && <span className="absolute bottom-0 right-0 w-2 h-2 bg-pink-500 rounded-full"></span>}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-2  text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-green-500/50 rounded-sm"></span> Solved
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-pink-500/70 rounded-sm"></span> Contest
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 border border-yellow-400 rounded-sm"></span> Today
        </div>
      </div>
    </div>
  );
}
