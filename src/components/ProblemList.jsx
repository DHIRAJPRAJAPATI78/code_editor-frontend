import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { getProblemList } from "../features/Problem/problemSlice";
import { fetchAllContests } from "../features/contest/contestSlice";

function ActivityCalendar({ solvedDates, contestDates }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [streak, setStreak] = useState(0);
  const today = new Date();

  useEffect(() => {
    if (!solvedDates.length) return;
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

  const isSolved = (day) =>
    solvedDates.some((date) => isSameDay(new Date(date), day));
  const isContest = (day) =>
    contestDates.some((date) => isSameDay(new Date(date), day));

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const firstDayIndex = startOfMonth(currentMonth).getDay();

  return (
    <div className='bg-[#1a1d25] p-5 rounded-2xl border border-gray-800 text-gray-200 shadow-md hover:shadow-lg transition'>
      <div className='flex justify-between items-center mb-3'>
        <h3 className='text-lg font-semibold text-gray-100'>Activity</h3>
        <div className='text-sm text-yellow-400 font-medium'>
          🔥 {streak} Day Streak
        </div>
      </div>

      <div className='flex justify-between items-center mb-2'>
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className='px-2 py-1 bg-gray-800 rounded hover:bg-gray-700'
        >
          ‹
        </button>
        <span className='font-semibold text-gray-300'>
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className='px-2 py-1 bg-gray-800 rounded hover:bg-gray-700'
        >
          ›
        </button>
      </div>

      <div className='grid grid-cols-7 text-center mb-1 text-gray-400 text-xs'>
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={d + i}>{d}</div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-1 text-center'>
        {Array.from({ length: firstDayIndex }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((day) => {
          const solved = isSolved(day);
          const contest = isContest(day);
          const todayMatch = isSameDay(day, today);

          return (
            <div
              key={day}
              className={`relative w-8 h-8 flex items-center justify-center rounded-md transition-all duration-200 cursor-pointer ${
                solved
                  ? "bg-green-600/30 text-green-300 border border-green-500/50"
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
              {contest && (
                <span className='absolute bottom-0 right-0 w-2 h-2 bg-pink-500 rounded-full'></span>
              )}
            </div>
          );
        })}
      </div>

      <div className='flex items-center justify-between mt-3 text-xs text-gray-400'>
        <div className='flex items-center gap-1'>
          <span className='w-3 h-3 bg-green-500/60 rounded-sm'></span> Solved
        </div>
        <div className='flex items-center gap-1'>
          <span className='w-3 h-3 bg-pink-500/70 rounded-sm'></span> Contest
        </div>
        <div className='flex items-center gap-1'>
          <span className='w-3 h-3 border border-yellow-400 rounded-sm'></span>{" "}
          Today
        </div>
      </div>
    </div>
  );
}

export default function ProblemList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {contests}=useSelector(state=>state.contest)
  useEffect(()=>{
    if(!contests || contests.length===0)
      dispatch(fetchAllContests({page:1,limit:10}))      
  },[])
  console.log(contests);
  const { problems, isLoading, isError, message } = useSelector(
    (state) => state.problem
  );
  const { user } = useSelector((state) => state.profile);

  const [search, setSearch] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [selectedTag, setSelectedTag] = useState("All");
  const [showAllTags, setShowAllTags] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const problemsPerPage = 10;

  const solvedDates = ["2025-10-14", "2025-10-17", "2025-10-19"];
  const contestDates = useMemo(() => {
  if (!contests?.length) return [];

  return contests.map(contest =>
    contest.startTime
  );
}, [contests]);


  useEffect(() => {
    if (!problems?.length) dispatch(getProblemList());
  }, [dispatch, problems]);

  const allTags = useMemo(() => {
    const tagsSet = new Set();
    problems?.forEach((p) => p.tags?.forEach((tag) => tagsSet.add(tag)));
    return ["All", ...Array.from(tagsSet)];
  }, [problems]);

  const visibleTags = showAllTags
    ? allTags
    : [allTags[0], ...allTags.slice(1, 8)];

  const filteredProblems = problems?.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchDiff =
      filterDifficulty === "all" || p.difficulty === filterDifficulty;
    const matchTag = selectedTag === "All" || p.tags.includes(selectedTag);
    return matchSearch && matchDiff && matchTag;
  });

  const totalPages = Math.ceil(filteredProblems?.length / problemsPerPage);
  const startIndex = (currentPage - 1) * problemsPerPage;
  const currentProblems = filteredProblems?.slice(
    startIndex,
    startIndex + problemsPerPage
  );

  useEffect(() => setCurrentPage(1), [search, filterDifficulty, selectedTag]);

  return (
    <div className='min-h-screen bg-[#0e1116]  text-white flex flex-col lg:flex-row pt-20 transition-all px-3 py-3'>
      {/* SIDEBAR */}
      <aside className='lg:w-1/4 bg-[#161b22] border-r border-gray-800  p-6 space-y-8 rounded-t-2xl lg:rounded-none'>
        {/* Difficulty Filter */}
        <div>
          <h3 className='text-lg font-semibold mb-3 text-gray-100'>
            Difficulty
          </h3>
          {["all", "easy", "medium", "hard"].map((diff) => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={`block w-full text-left px-3 py-2 rounded-md mb-2 capitalize transition-all duration-200 ${
                filterDifficulty === diff
                  ? "bg-yellow-400 text-black font-semibold shadow-sm"
                  : "bg-gray-900 text-gray-300 hover:bg-gray-800"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* Tag Filter */}
        <div>
          <h3 className='text-lg font-semibold mb-3 text-gray-100'>Tags</h3>
          <div className='flex flex-wrap gap-2'>
            {visibleTags.map((tag) => (
              <span
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-2 py-1 text-xs rounded-md cursor-pointer transition-all duration-200 ${
                  selectedTag === tag
                    ? "bg-yellow-400 text-black font-semibold shadow"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
          {allTags.length > 8 && (
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className='mt-3 text-yellow-400 flex items-center gap-1 text-sm hover:underline'
            >
              {showAllTags ? (
                <>
                  Show Less <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Show More <ChevronDown size={16} />
                </>
              )}
            </button>
          )}
        </div>

        <ActivityCalendar
          solvedDates={solvedDates}
          contestDates={contestDates}
        />
      </aside>

      {/* MAIN SECTION */}
      <main className='flex-1 p-6 md:p-10 flex justify-between flex-col '>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>
          <h2 className='text-3xl font-bold text-yellow-400 tracking-tight'>
            Problem Set
          </h2>
          <div className='relative w-full md:w-80'>
            <Search className='absolute left-3 top-3 text-gray-400' size={18} />
            <input
              type='text'
              placeholder='Search problems...'
              className='w-full bg-[#0e1116] border border-gray-700 rounded-lg py-2 pl-9 pr-3 text-gray-300 focus:outline-none focus:border-yellow-400 transition'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {/* Problems Table */}
        {isLoading ? (
          <p className='text-center text-gray-400 animate-pulse'>
            Loading problems...
          </p>
        ) : isError ? (
          <p className='text-center text-red-400'>{message}</p>
        ) : currentProblems?.length === 0 ? (
          <p className='text-center text-gray-400 mt-10'>No problems found.</p>
        ) : (
          <>
            <div className='overflow-x-auto rounded-xl border border-gray-800 bg-[#161b22] shadow-md'>
              <table className='w-full border-collapse'>
                <thead className='bg-[#1a1d25] border-b border-gray-800 text-sm'>
                  <tr className='text-gray-400'>
                    <th className='text-left py-3 px-4 font-medium'>#</th>
                    <th className='text-left py-3 px-4 font-medium'>Title</th>
                    <th className='text-left py-3 px-4 font-medium'>
                      Difficulty
                    </th>
                    <th className='text-left py-3 px-4 font-medium hidden sm:table-cell'>
                      Tags
                    </th>
                    <th className='text-left py-3 px-4 font-medium hidden sm:table-cell'>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentProblems.map((problem, index) => {
                    const isSolved = user?.problemSolved?.includes(problem._id);

                    return (
                      <tr
                        key={problem._id}
                        onClick={() => navigate(`/problems/${problem._id}`)}
                        className='hover:bg-[#1f242c] cursor-pointer border-b border-gray-800/40 transition duration-200'
                      >
                        <td className='py-3 px-4 text-gray-500'>
                          {startIndex + index + 1}
                        </td>
                        <td className='py-3 px-4 text-yellow-400 font-medium hover:underline'>
                          {problem.title}
                        </td>
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
                        <td className='py-3 px-4 hidden sm:table-cell'>
                          <div className='flex flex-wrap gap-2'>
                            {problem.tags.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className='text-xs bg-gray-800 px-2 py-1 rounded-md text-gray-300'
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className='py-3 px-4 hidden sm:table-cell'>
                          {isSolved ? (
                            <span className='text-green-400 font-medium'>
                              Solved
                            </span>
                          ) : (
                            <span className='text-gray-500'>Unsolved</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
        <p className='text-center mt-12 text-sm text-gray-500 italic'>
          “Challenge yourself — one problem at a time.”
        </p>{" "}
        {/* Pagination */}
        <div className='flex justify-center items-center gap-4 mt-6 '>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md font-semibold ${
              currentPage === 1
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-yellow-400 text-black hover:bg-yellow-300"
            }`}
          >
            Previous
          </button>
          <span className='text-gray-300'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md font-semibold ${
              currentPage === totalPages
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-yellow-400 text-black hover:bg-yellow-300"
            }`}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
