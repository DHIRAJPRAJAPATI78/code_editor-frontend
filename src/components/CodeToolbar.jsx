import Timer from "../utils/Timer";

const CodeToolbar = ({
  language,
  setLanguage,
  onRun,
  onSubmit,
  isSubmitting,
}) => {
  return (
    <div className='flex items-center justify-between px-5 py-3 border-b border-gray-800 bg-black/60'>
      {/* LEFT SIDE: Timer + Code Label */}
      <div className='flex items-center gap-4'>
        {/* Timer with start/stop/reset */}
        <Timer />

        {/* Code label */}
        <span className='text-gray-200 text-sm font-medium select-none'>
          {"</>code"}
        </span>
      </div>

      {/* RIGHT SIDE: Language dropdown + Buttons */}
      <div className='flex items-center gap-3'>
        {/* Language selection */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className='bg-transparent border border-gray-700 rounded-md px-2 py-1 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500'
        >
          <option value='cpp'>C++</option>
          <option value='python'>Python</option>
          <option value='javascript'>JavaScript</option>
          <option value='java'>Java</option>
        </select>

        {/* Run button */}
        <button
          onClick={onRun}
          className='px-4 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-md text-sm font-semibold hover:scale-105 transition-transform'
        >
          Run
        </button>

        {/* Submit button */}
        <button
          disabled={isSubmitting}
          onClick={onSubmit}
          className='px-4 py-1.5 border border-purple-500/50 rounded-md text-sm font-semibold hover:bg-purple-600/20 hover:scale-105 transition-transform disabled:opacity-50'
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default CodeToolbar;
