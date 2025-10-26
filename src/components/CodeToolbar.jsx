import { Play, Send, Loader2 } from "lucide-react";
import Timer from "../utils/Timer";

const CodeToolbar = ({
  language,
  setLanguage,
  onRun,
  onSubmit,
  isSubmitting,
  isRunning,
}) => {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800 bg-black/60">
      <div className="flex items-center gap-4">
        <Timer />
        <span className="text-gray-200 text-sm font-medium select-none">
          {"</>code"}
        </span>
      </div>

      <div className="flex items-center gap-3">

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-black border border-gray-700 rounded-md px-2 py-1 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
        </select>

        <button
          onClick={onRun}
          disabled={isRunning}
          className={`flex items-center gap-2 px-4 py-1.5 border rounded-md text-sm font-medium transition-colors duration-200
            ${isRunning
              ? "bg-green-500 text-white cursor-not-allowed"
              : "border border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            }`}
        >
          {isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
          {isRunning ? "Running..." : "Run"}
        </button>

        <button
          onClick={onSubmit}
          disabled={ isRunning}
          className={`flex items-center gap-2 px-4 py-1.5 border rounded-md text-sm font-semibold transition-transform duration-200
            ${isSubmitting || isRunning
              ? "bg-purple-500 text-white cursor-not-allowed opacity-50"
              : "border border-purple-500/50 text-purple-400 hover:bg-purple-600/20 hover:scale-105"
            }`}
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
        </button>
      </div>
    </div>
  );
};

export default CodeToolbar;
