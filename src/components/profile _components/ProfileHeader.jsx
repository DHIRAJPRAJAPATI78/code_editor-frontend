import { motion } from "framer-motion";
import { Trophy, Flame, Star } from "lucide-react";

export default function ProfileHeader() {
  return (
    <motion.div
      className="bg-gray-800/60 rounded-2xl p-8 flex justify-between items-center backdrop-blur-lg shadow-lg"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="flex items-center gap-6">
        <img
          src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
          alt="avatar"
          className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold">Dhiraj Prajapati</h2>
          <p className="text-gray-400">Passionate coder • 300+ problems solved</p>
          <div className="flex gap-3 mt-2">
            <Trophy className="text-yellow-400" />
            <Star className="text-blue-400" />
            <Flame className="text-orange-500" />
          </div>
        </div>
      </div>

      <motion.div
        className="bg-indigo-600/30 p-5 rounded-xl text-right"
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-xl font-semibold">Rank #432</h3>
        <p className="text-gray-300">Rating: <span className="font-bold text-indigo-400">1876</span></p>
        <p>🔥 21-day streak</p>
      </motion.div>
    </motion.div>
  );
}
