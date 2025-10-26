// 

import { useEffect, useState, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Start the timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  // Stop / Pause the timer
  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  // Reset timer to 00:00
  const resetTimer = () => {
    setSeconds(0);
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
   <div className="flex items-center gap-2">
  {/* Timer Display - LeetCode Style */}
  <div className="flex items-center gap-2 bg-transparent rounded-lg px-3 py-1.5 min-w-[80px] justify-center">
    <span className="font-mono text-sm font-medium text-gray-700 dark:text-gray-300 tracking-wide">
      {formatTime(seconds)}
    </span>
  </div>

  {/* Control Buttons - LeetCode Style */}
  <div className="flex items-center gap-1">
    {isRunning ? (
      <button
        onClick={stopTimer}
        className="p-1.5 rounded text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        title="Pause Timer"
      >
        <Pause className="w-3.5 h-3.5" />
      </button>
    ) : (
      <button
        onClick={startTimer}
        className="p-1.5 rounded text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        title="Start Timer"
      >
        <Play className="w-3.5 h-3.5" />
      </button>
    )}
    
    <button
      onClick={resetTimer}
      className="p-1.5 rounded text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      title="Reset Timer"
    >
      <RotateCcw className="w-3.5 h-3.5" />
    </button>
  </div>
</div>
  );
}