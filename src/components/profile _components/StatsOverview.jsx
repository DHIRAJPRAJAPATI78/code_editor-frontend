import { motion } from "framer-motion";

export default function StatsOverview() {
  const stats = [
    { label: "Total Solved", value: 324, color: "text-green-400" },
    { label: "Easy", value: 142, color: "text-emerald-400" },
    { label: "Medium", value: 132, color: "text-yellow-400" },
    { label: "Hard", value: 50, color: "text-red-400" },
    { label: "Accuracy", value: "78%", color: "text-blue-400" },
  ];

  return (
    <motion.div
      className="grid grid-cols-5 gap-6 text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      {stats.map((s, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -5, scale: 1.05 }}
          className="bg-gray-800/50 rounded-xl p-5 shadow-md hover:shadow-indigo-500/30"
        >
          <h3 className={`text-3xl font-bold ${s.color}`}>{s.value}</h3>
          <p className="text-gray-400">{s.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
