import { motion } from "framer-motion";
import ProfileHeader from "./profile _components/ProfileHeader";
import StatsOverview from "./profile _components/StatsOverview";
import ActivityHeatmap from "./profile _components/ActivityHeatmap";
import ContestPerformance from "./profile _components/ContestPerformance";
import SolvedProblems from "./profile _components/SolvedProblems";
import Achievements from "./profile _components/Achievements";


export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto space-y-12"
      >
        <ProfileHeader />
        <StatsOverview />
        <ActivityHeatmap />
        <ContestPerformance />
        <SolvedProblems />
        <Achievements />
      </motion.div>
    </div>
  );
}
