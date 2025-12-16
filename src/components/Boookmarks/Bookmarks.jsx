import { motion } from "framer-motion";
import { Bookmark, Sparkles, Star } from "lucide-react";

export default function Bookmarks() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 mt-17">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-xl rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8 text-center shadow-2xl"
      >
      
        {/* Floating icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-400/10"
        >
          <Bookmark className="h-8 w-8 text-violet-400" />
        </motion.div>

        <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
          Bookmarks Coming Soon 
        </h2>

        <p className="mb-6 text-sm text-zinc-400">
          Save problems, mark favorites, and come back stronger.
          Your personal coding vault is on the way!
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 text-md font-medium text-violet-400"
        >
          <Star className="h-4 w-4" />
          Organize problems you love
        </motion.div>

     

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 flex items-center justify-center gap-2 text-[14px] text-zinc-500"
        >
          <Sparkles className="h-3 w-3" />
          One-click save • Sync across contests • Fast access
        </motion.div>
      </motion.div>
    </div>
  );
}
