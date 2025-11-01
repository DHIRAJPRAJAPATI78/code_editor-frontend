import { motion } from "framer-motion";
import {
  Medal,
  Trophy,
  Crown,
  Zap,
  Target,
  Star,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function Achievements() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const achievements = [
    {
      icon: Medal,
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
      borderColor: "border-yellow-400/30",
      title: "Gold Solver",
      description: "Solved 200+ problems",
      progress: 100,
      unlocked: true,
    },
    {
      icon: Trophy,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/30",
      title: "100 Day Streak",
      description: "Maintained streak for 100 days",
      progress: 72,
      unlocked: false,
    },
    {
      icon: Crown,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-400/30",
      title: "Top 1% Rank",
      description: "Achieved top 1% in contests",
      progress: 100,
      unlocked: true,
    },
    {
      icon: Zap,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      borderColor: "border-orange-400/30",
      title: "Speed Solver",
      description: "Solved 50 problems in <15min",
      progress: 68,
      unlocked: false,
    },
    {
      icon: Target,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/30",
      title: "Perfect Score",
      description: "100% accuracy on 30 problems",
      progress: 45,
      unlocked: false,
    },
    {
      icon: Star,
      color: "text-pink-400",
      bgColor: "bg-pink-400/10",
      borderColor: "border-pink-400/30",
      title: "Community Star",
      description: "Helped 50+ developers",
      progress: 32,
      unlocked: false,
    },
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const current = scrollRef.current;
    if (!current) return;
    handleScroll();
    current.addEventListener("scroll", handleScroll);
    return () => current.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#1a1a1a] p-5 rounded-xl border border-[#2a2a2a] shadow-lg flex flex-col justify-between h-[400px] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-white">Achievements</h3>
        <div className="flex items-center gap-1.5 text-xs text-gray-400 bg-[#252525] px-2 py-0.5 rounded-md">
          <Trophy size={13} />
          <span>
            {unlockedCount}/{totalCount} Unlocked
          </span>
        </div>
      </div>

      {/* Scroll Buttons (Top Left & Top Right) */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="absolute left-3 top-12 z-10 bg-[#252525]/80 hover:bg-[#2f2f2f] p-1.5 rounded-full text-gray-400 hover:text-white transition-all shadow-md backdrop-blur-sm"
        >
          <ChevronLeft size={18} />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="absolute right-3 top-12 z-10 bg-[#252525]/80 hover:bg-[#2f2f2f] p-1.5 rounded-full text-gray-400 hover:text-white transition-all shadow-md backdrop-blur-sm"
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Achievements Horizontal Scroll */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 no-scrollbar scroll-smooth"
      >
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`min-w-[180px] p-4 rounded-lg border flex-shrink-0 ${
              achievement.unlocked
                ? `${achievement.bgColor} ${achievement.borderColor} shadow-md`
                : "bg-[#252525] border-[#2a2a2a] opacity-70"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className={`p-2 rounded-lg ${
                  achievement.unlocked ? achievement.bgColor : "bg-[#2f2f2f]"
                }`}
              >
                <achievement.icon
                  className={`w-5 h-5 ${
                    achievement.unlocked ? achievement.color : "text-gray-500"
                  }`}
                />
              </div>
              {achievement.unlocked && (
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              )}
            </div>

            <h4
              className={`text-sm font-semibold mb-1 ${
                achievement.unlocked ? "text-white" : "text-gray-400"
              }`}
            >
              {achievement.title}
            </h4>
            <p className="text-xs text-gray-500 leading-tight mb-2">
              {achievement.description}
            </p>

            <div className="w-full bg-[#2f2f2f] rounded-full h-1.5">
              <motion.div
                className={`h-1.5 rounded-full ${
                  achievement.unlocked
                    ? achievement.color.replace("text-", "bg-")
                    : "bg-gray-600"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${achievement.progress}%` }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-[#2a2a2a] text-center text-xs text-gray-500">
        {unlockedCount === totalCount
          ? "🎉 You’ve unlocked all achievements!"
          : "Keep solving to unlock more!"}
      </div>
    </div>
  );
}
