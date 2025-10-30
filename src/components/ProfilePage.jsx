import { motion } from "framer-motion";
import ProfileHeader from "./profile _components/ProfileHeader";
import ActivityHeatmap from "./profile _components/ActivityHeatmap";
import Achievements from "./profile _components/Achievements";
import SolvedStats from "./profile _components/SolvedProblems";
export default function ProfilePage() {
  return (
     <div className="min-h-screen bg-[#0a0a0a] text-gray-100 py-16">
      <div className="lg:max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid Layout — LeetCode-style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* === Left Column — Profile Header === */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 shadow-lg sticky top-24">
              <ProfileHeader />
            </div>
          </motion.div>

          {/* === Right Column — Activity, Stats, Achievements === */}
          <div className="lg:col-span-9 space-y-10">
            {/* Calendar Activity Section */}
            <section>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-[#111111] rounded-2xl border border-gray-800 p-6 shadow-xl"
              >
                <ActivityHeatmap />
              </motion.div>
            </section>

            {/* Stats & Achievements */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Solved Stats */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#111111] border border-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <SolvedStats />
                </motion.div>

                {/* Achievements */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-[#111111] border border-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <Achievements />
                </motion.div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className="fixed top-1/4 -left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/3 -right-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
