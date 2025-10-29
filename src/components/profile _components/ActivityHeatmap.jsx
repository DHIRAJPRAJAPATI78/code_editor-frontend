export default function ActivityHeatmap() {
  const days = Array.from({ length: 30 }, (_, i) => Math.floor(Math.random() * 4));

  return (
    <div className="bg-gray-800/40 p-6 rounded-2xl">
      <h3 className="text-lg font-semibold mb-4">Activity Heatmap</h3>
      <div className="grid grid-cols-15 gap-1">
        {days.map((lvl, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-sm ${
              lvl === 0
                ? "bg-gray-700"
                : lvl === 1
                ? "bg-green-700"
                : lvl === 2
                ? "bg-green-500"
                : "bg-green-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
