import { motion } from "framer-motion";
import { Settings, Wrench, Sparkles } from "lucide-react";

export default function Setting() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 mt-17">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-xl rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8 text-center shadow-2xl"
      >
       

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400/10"
        >
          <Settings className="h-8 w-8 text-cyan-400" />
        </motion.div>

        <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">
          Settings Under Construction 🛠️
        </h2>

        <p className="mb-6 text-sm text-zinc-400">
          We’re crafting powerful customization options so you can fine-tune
          your coding experience. Hang tight!
        </p>

        <div className="flex items-center justify-center gap-2 text-md font-medium text-cyan-400">
          <Wrench className="h-4 w-4" />
          Personalization features coming soon
        </div>

  

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 flex items-center justify-center gap-2 text-[14px] text-zinc-500"
        >
          <Sparkles className="h-3 w-3" />
          New controls, preferences & security options on the way
        </motion.div>
      </motion.div>
    </div>
  );
}
