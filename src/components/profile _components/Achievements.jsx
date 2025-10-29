import { motion } from "framer-motion";
import { Medal, Award, Gem } from "lucide-react";

export default function Achievements() {
  const badges = [
    { icon: Medal, color: "text-yellow-400", title: "Gold Solver" },
    { icon: Award, color: "text-blue-400", title: "100 Day Streak" },
    { icon: Gem, color: "text-pink-400", title: "Top 1% Rank" },
  ];

  return (
    <div className="bg-gray-800/50 p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">Achievements</h3>
      <div className="flex gap-5">
        {badges.map((b, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.2, rotate: 5 }}
            className={`p-4 bg-gray-900/60 rounded-xl border ${b.color}`}
          >
            <b.icon className={`${b.color} w-8 h-8`} />
            <p className="text-sm mt-2">{b.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
