import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AllContests from "./contest/AllContests";
import LiveContests from "./contest/LiveContests";

export default function ContestsPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-gray-100 px-4  pt-17">
      <div className="max-w-9xl mx-auto space-y-10">
        {/* 🔘 Tab Navigation */}
        <div className="flex justify-center gap-3 sm:gap-6">
          {["all", "live"].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl font-semibold tracking-wide transition-all duration-300 shadow-md backdrop-blur-md
                ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black"
                    : "bg-[#141414] text-gray-300 hover:bg-[#1c1c1c]"
                }`}
            >
              {tab === "all" ? "All Contests" : "Live Contests"}
            </motion.button>
          ))}
        </div>

        {/* ✨ Animated Tab Content */}
        <div className="relative mt-6">
          <AnimatePresence mode="wait">
            {activeTab === "all" && (
              <motion.div
                key="all"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
              >
                <AllContests />
              </motion.div>
            )}

            {activeTab === "live" && (
              <motion.div
                key="live"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <LiveContests />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
