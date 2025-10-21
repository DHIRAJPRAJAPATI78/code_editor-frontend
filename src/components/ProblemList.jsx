import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from "date-fns";

// Single-Month Activity Calendar Component
function ActivityCalendar({ solvedDates, contestDates }) {
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
    <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 text-gray-200 ">
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
      <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
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

export default function ProblemList() {
  const [problems, setProblems] = useState([
    { _id: "1", title: "Two Sum", tags: ["array", "hashmap"], difficulty: "easy" },
    { _id: "2", title: "Median of Two Sorted Arrays", tags: ["array", "binary search"], difficulty: "hard" },
    { _id: "3", title: "Longest Substring Without Repeating Characters", tags: ["string", "sliding window"], difficulty: "medium" },
  ]);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [selectedTag, setSelectedTag] = useState(null);
  // const navigate = useNavigate();

  const solvedDates = ["2025-10-14", "2025-10-17", "2025-10-19"];
  const contestDates = ["2025-10-21", "2025-10-27"];

  const filteredProblems = problems.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchDiff = filterDifficulty === "all" || p.difficulty === filterDifficulty;
    const matchTag = !selectedTag || p.tags.includes(selectedTag);
    return matchSearch && matchDiff && matchTag;
  });

  return (
    <div className="min-h-screen bg-[#0d1117] text-white flex pt-20">
      {/* Sidebar Filters + Calendar */}
      <aside className="hidden lg:block w-1/4 bg-[#161b22] border-r border-gray-800 p-6 space-y-8">
        {/* Difficulty Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-100">Difficulty</h3>
          {["all", "easy", "medium", "hard"].map((diff) => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={`block w-full text-left px-3 py-2 rounded-md mb-2 capitalize transition ${
                filterDifficulty === diff ? "bg-yellow-400 text-black font-semibold" : "bg-gray-900 text-gray-300 hover:bg-gray-800"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* Tag Filter */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-100">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {["array", "string", "hashmap", "binary search", "sliding window"].map((tag) => (
              <span
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-2 py-1 text-xs rounded-md cursor-pointer transition ${
                  selectedTag === tag ? "bg-yellow-400 text-black font-semibold" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Activity Calendar */}
        <ActivityCalendar solvedDates={solvedDates} contestDates={contestDates} />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h2 className="text-3xl font-bold">Problem Set</h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search problems..."
              className="w-full bg-[#0d1117] border border-gray-700 rounded-lg py-2 pl-9 pr-3 text-gray-300 focus:outline-none focus:border-yellow-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-400 animate-pulse">Loading problems...</p>
        ) : filteredProblems.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No problems found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-800">
            <table className="w-full border-collapse">
              <thead className="bg-[#161b22] border-b border-gray-800 text-sm">
                <tr className="text-gray-400">
                  <th className="text-left py-3 px-4 font-medium">#</th>
                  <th className="text-left py-3 px-4 font-medium">Title</th>
                  <th className="text-left py-3 px-4 font-medium">Difficulty</th>
                  <th className="text-left py-3 px-4 font-medium hidden sm:table-cell">Tags</th>
                  <th className="text-left py-3 px-4 font-medium hidden sm:table-cell">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.map((problem, index) => (
                  <tr
                    key={problem._id}
                    onClick={() => navigate(`/problems/${problem._id}`)}
                    className="hover:bg-[#1c2128] cursor-pointer border-b border-gray-800/50 transition"
                  >
                    <td className="py-3 px-4 text-gray-400">{index + 1}</td>
                    <td className="py-3 px-4 text-yellow-400 font-medium">{problem.title}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        problem.difficulty === "easy"
                          ? "text-green-400"
                          : problem.difficulty === "medium"
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {problem.difficulty}
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <div className="flex flex-wrap gap-2">
                        {problem.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-xs bg-gray-800 px-2 py-1 rounded-md text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell text-gray-500">⏳ Unsolved</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-center mt-12 text-sm text-gray-500 italic">“Challenge yourself — one problem at a time.”</p>
      </main>
    </div>
  );
}
