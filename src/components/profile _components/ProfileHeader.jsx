import { motion } from "framer-motion";
import { Edit3, MapPin, Calendar, Link, Award } from "lucide-react";

export default function ProfileHeader() {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cover Photo Area */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        {/* Profile Picture */}
        <div className="absolute -bottom-12 left-6">
          <div className="relative">
            <img
              src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
            />
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="absolute top-4 right-4">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm border border-gray-300 dark:border-gray-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Edit3 size={16} />
            Edit Profile
          </motion.button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-14 pb-6 px-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          {/* Left Section - Basic Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dhiraj Prajapati
              </h1>
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full text-xs font-medium">
                <Award size={12} />
                Knight
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Passionate full-stack developer • 300+ problems solved
            </p>

            {/* User Stats */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <MapPin size={16} className="text-gray-400" />
                <span>India</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Calendar size={16} className="text-gray-400" />
                <span>Joined January 2023</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Link size={16} className="text-gray-400" />
                <span className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                  github.com/dhiraj
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Streak & Additional Stats */}
        <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 dark:text-gray-300">
              <strong className="text-orange-600 dark:text-orange-400">21</strong> day streak
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <strong>342</strong> problems solved
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <strong>98%</strong> acceptance rate
          </div>
        </div>
      </div>
    </motion.div>
  );
}