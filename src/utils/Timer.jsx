import { useEffect, useState, useRef } from "react";

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
    <div className="flex items-center gap-3 text-gray-300 text-sm font-medium">
      <span className="font-mono text-purple-400">⏱ {formatTime(seconds)}</span>

      <div className="flex items-center gap-1">
        {isRunning ? (
          <button
            onClick={stopTimer}
            className="px-2 py-1 text-xs rounded bg-red-600/30 hover:bg-red-600/50 transition-all"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={startTimer}
            className="px-2 py-1 text-xs rounded bg-green-600/30 hover:bg-green-600/50 transition-all"
          >
            Start
          </button>
        )}
        <button
          onClick={resetTimer}
          className="px-2 py-1 text-xs rounded bg-gray-600/30 hover:bg-gray-600/50 transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
