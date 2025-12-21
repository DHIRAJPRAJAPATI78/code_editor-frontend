import { motion } from "framer-motion";
import { Trophy, Sparkles } from "lucide-react";

export default function Leaderboard() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 mt-17">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-xl rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8 text-center shadow-2xl"
      >


        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400/10"
        >
          <Trophy className="h-8 w-8 text-yellow-400" />
        </motion.div>

        <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
          Leaderboard is Coming Soon 
        </h2>

        <p className="mb-6 text-sm text-zinc-400">
          Compete with top coders, climb the ranks, and showcase your skills.
          We’re building something exciting for you!
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-xs font-medium text-yellow-400"
        >
          <Sparkles className="h-4 w-4" />
          Feature under active development
        </motion.div>


      </motion.div>
    </div>
  );
}
