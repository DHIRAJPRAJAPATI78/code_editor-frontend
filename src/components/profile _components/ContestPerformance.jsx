import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Week 85", rating: 1740 },
  { name: "Week 86", rating: 1780 },
  { name: "Week 87", rating: 1840 },
  { name: "Week 88", rating: 1876 },
  { name: "Week 89", rating: 1902 },
];

export default function ContestPerformance() {
  return (
    <motion.div
      className="bg-gradient-to-br from-indigo-800/40 to-gray-900/60 p-6 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-xl font-semibold mb-6">Contest Performance</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip
              contentStyle={{
                background: "#1f2937",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="#818cf8"
              strokeWidth={3}
              dot={{ fill: "#a5b4fc", r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between mt-6 text-gray-300 text-sm">
        <p>Current Rating: <span className="text-indigo-400 font-semibold">1876</span></p>
        <p>Peak: <span className="text-emerald-400 font-semibold">1902</span></p>
        <p>Global Rank: <span className="text-yellow-400 font-semibold">#432</span></p>
      </div>
    </motion.div>
  );
}
