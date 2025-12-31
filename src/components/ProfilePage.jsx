import { motion } from "framer-motion";
import ProfileSidebar from "./profile _components/ProfileHeader";
import ActivityHeatmap from "./profile _components/ActivityHeatmap";
import Achievements from "./profile _components/Achievements";
import SolvedStats from "./profile _components/SolvedProblems";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-layer-1 dark:bg-dark-layer-1 text-gray-100">
      <div className="max-w-9xl mx-auto px-2  py-17">
        <div className="grid grid-cols-1 lg:grid-cols-12 sm:gap-25 gap-4">
          {/* Sidebar - Fixed */}
          <div className="lg:col-span-3  ">
            <ProfileSidebar />
          </div>

          {/* Main Content - Scrollable */}
          <div className="lg:col-span-9 space-y-4 min-h-screen ">
            {/* Activity Heatmap */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ActivityHeatmap />
            </motion.section>

            {/* Stats and Achievements */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Solved Stats */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <SolvedStats />
                </motion.div>

                {/* Achievements */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Achievements />
                </motion.div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}