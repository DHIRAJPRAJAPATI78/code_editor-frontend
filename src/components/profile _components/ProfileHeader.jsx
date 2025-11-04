import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../features/profile/profileSlice";
import { Edit3, Calendar, User, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function ProfileSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user, isLoading, isError, message } = useSelector((state) => state.profile);
  const { problems: totalProblems } = useSelector((state) => state.problem);
  useEffect(() => {
    dispatch(getUserProfile(navigate));
  }, [dispatch,navigate]);

  const dynamicSkills = useMemo(() => {
    if (!totalProblems || totalProblems.length === 0) return null;

    const grouped = {
      easy: {},
      medium: {},
      hard: {},
    };

    totalProblems.forEach((problem) => {
      const level = problem.difficulty?.toLowerCase();
      if (!grouped[level]) return;
      problem.tags?.forEach((tag) => {
        grouped[level][tag] = (grouped[level][tag] || 0) + 1;
      });
    });

    return {
      fundamental: Object.entries(grouped.easy).map(([name, count]) => ({ name, count })),
      intermediate: Object.entries(grouped.medium).map(([name, count]) => ({ name, count })),
      advanced: Object.entries(grouped.hard).map(([name, count]) => ({ name, count })),
    };
  }, [totalProblems]);

  const getActualData = () => {
    if (!user) return null;

    const problemsSolved = user.problemSolved?.length || 0;
    const username = user.username || `${user.firstName}_${user.lastName}`.toUpperCase();
    const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });

    const getRank = () => {
      if (problemsSolved >= 500) return { rank: "1,234", level: "Knight" };
      if (problemsSolved >= 200) return { rank: "12,345", level: "Guardian" };
      if (problemsSolved >= 100) return { rank: "45,678", level: "Expert" };
      if (problemsSolved >= 50) return { rank: "123,456", level: "Specialist" };
      return { rank: "633,499", level: "Apprentice" };
    };

    const rankInfo = getRank();

    const languages = [
      { name: "JavaScript", problems: Math.floor(problemsSolved * 0.4) },
      { name: "Python", problems: Math.floor(problemsSolved * 0.3) },
      { name: "C++", problems: Math.floor(problemsSolved * 0.2) },
      { name: "Java", problems: Math.floor(problemsSolved * 0.1) },
    ].filter((lang) => lang.problems > 0);

    return {
      problemsSolved,
      username,
      joinDate,
      rankInfo,
      languages,
      skills: dynamicSkills || { fundamental: [], intermediate: [], advanced: [] },
    };
  };

  const actualData = getActualData();

  if (isLoading) {
    return (
      <div className="bg-[#1A1A1A] text-gray-300 rounded-lg flex justify-center items-center h-60">
        Loading profile...
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="bg-[#1A1A1A] text-red-400 rounded-lg flex justify-center items-center h-60">
        {message || "No user data found"}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:sticky lg:top-16 flex flex-col bg-[#1A1A1A] text-gray-200 p-6 rounded-2xl w-full sm:w-[320px] border border-[#2A2A2A] shadow-lg"
    >
      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex h-20 w-20 shrink-0">
          {user.profilePic ? (
            <img
              alt="Avatar"
              className="h-20 w-20 rounded-xl object-cover border border-[#2A2A2A]"
              src={user.profilePic}
            />
          ) : (
            <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-[#FFA116] to-[#FF8700] flex items-center justify-center text-black text-2xl font-bold">
              {user.firstName?.charAt(0).toUpperCase() || "U"}
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1">
          <h2 className="text-lg font-semibold truncate">{actualData.username}</h2>
          <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
            <User size={12} />
            <span className="capitalize">{user.role}</span>
          </p>
          <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
            <Mail size={12} />
            <span className="truncate">{user.email}</span>
          </p>
          <p className="mt-2 text-sm">
            Rank{" "}
            <span className="font-medium text-[#FFA116]">#{actualData.rankInfo.rank}</span>
          </p>
        </div>
      </div>

      {/* Bio */}
      {user.bio && (
        <p className="bg-[#242424] text-gray-300 mt-5 p-3 rounded-lg text-sm border border-[#2A2A2A] leading-relaxed">
          {user.bio}
        </p>
      )}
    
<Link to="/profile/update" className="mt-5 bg-[#FFA116] text-black font-semibold py-2 rounded-lg hover:bg-[#ff8c00] transition flex items-center justify-center gap-2">
        <Edit3 size={16}  />
        Edit Profile
</Link>
      
      {/* Divider */}
      <div className="my-5 h-px w-full bg-[#2A2A2A]"></div>

      {/* Stats */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Problems Solved</span>
          <span className="font-semibold text-white">{actualData.problemsSolved}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Rating</span>
          <span className="font-semibold text-white">{user.rating || 0}</span>
        </div>
        <div className="flex justify-between text-sm items-center">
          <span className="text-gray-400">Joined</span>
          <span className="flex items-center gap-1 font-medium text-white">
            <Calendar size={12} /> {actualData.joinDate}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 h-px w-full bg-[#2A2A2A]"></div>

      {/* Languages */}
      <div>
        <h3 className="text-base font-medium text-white mb-3">Languages</h3>
        <div className="flex flex-col gap-2">
          {actualData.languages.map((lang, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="bg-[#2A2A2A] px-2 py-1 rounded-full text-gray-300">
                {lang.name}
              </span>
              <span className="text-gray-400">{lang.problems} solved</span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 h-px w-full bg-[#2A2A2A]"></div>

      {/* ✅ Skills (Dynamic) */}
      <div>
        <h3 className="text-base font-medium text-white mb-3">Skills</h3>
        {["advanced", "intermediate", "fundamental"].map(
          (level) =>
            actualData.skills[level]?.length > 0 && (
              <div key={level} className="mb-4">
                <h4 className="text-sm font-semibold capitalize mb-2 text-[#FFA116]">
                  {level}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {actualData.skills[level].map((s, idx) => (
                    <span
                      key={idx}
                      className="bg-[#2A2A2A] text-gray-300 text-xs px-2 py-1 rounded-full hover:bg-[#333] transition-all"
                    >
                      {s.name} <span className="text-gray-500">x{s.count}</span>
                    </span>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </motion.div>
  );
}
