import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CodeEditor from "../components/Editor";
import CodeToolbar from "../components/CodeToolbar";
import { Loader2, ChevronUp, ChevronDown } from "lucide-react";
import { getProblemById } from "../features/Problem/problemSlice";
import {
  submitCode,
  resetSubmission,
} from "../features/Submission/submissionSlice";
import { submitCodeAPI } from "../utils/api";

const ProblemPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentProblem, loading, error } = useSelector(
    (state) => state.problem
  );

  const {
    data: runResult,
    loading: runLoading,
    error: runError,
  } = useSelector((state) => state.submission);

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(
    `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  cout << "Hello Codex!";\n}`
  );
  const [activeTest, setActiveTest] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("statement");
  const [open, setOpen] = useState(false);
  const [leftPanelWidth, setLeftPanelWidth] = useState(450);
  const [testPanelOpen, setTestPanelOpen] = useState(true);
  const [outputPanelOpen, setOutputPanelOpen] = useState(true);

  useEffect(() => {
    if (id) dispatch(getProblemById(id));
  }, [dispatch, id]);

  // ✅ Run Code (integrated with Redux)
  const handleRunCode = async () => {
    if (!id) return alert("Problem not found");
    dispatch(resetSubmission());
    dispatch(submitCode({ problemId: id, language, code }));
  };

  // ✅ Submit Code (for saving submissions)
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token") || "";
      const res = await submitCodeAPI(id, language, code, token);
      alert(res.message || "Code submitted successfully!");
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Horizontal resize handler for left panel
  const handleLeftResize = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = leftPanelWidth;

    const onMouseMove = (eMove) => {
      const diff = eMove.clientX - startX;
      const newWidth = Math.min(
        window.innerWidth * 0.8,
        Math.max(250, startWidth + diff)
      );
      setLeftPanelWidth(newWidth);
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  if (loading)
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#0e1116] text-gray-400 text-xl'>
        <Loader2 className='animate-spin mr-2' /> Loading Problem...
      </div>
    );

  if (error)
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#0e1116] text-red-400 text-xl'>
        {error}
      </div>
    );

  if (!currentProblem)
    return (
      <div className='min-h-screen flex items-center justify-center bg-[#0e1116] text-gray-400 text-xl'>
        Problem not found.
      </div>
    );

  const problem = currentProblem.data || currentProblem;

  const tabs = [
    { id: "statement", label: " Statement" },
    { id: "editorial", label: "Editorial" },
    { id: "solution", label: "Solution" },
    { id: "askai", label: "Ask AI" },
  ];

  return (
    <div className='pt-20 h-screen flex bg-[#0e1116] text-[#d4d4d4]'>
      {/* LEFT SIDE */}
      <div
        className='flex flex-col border-r border-[#2a2c34] overflow-y-auto'
        style={{ width: leftPanelWidth }}
      >
        {/* Tabs */}
        <div className='flex overflow-x-auto border-b border-[#2a2c34] bg-[#131518]'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-md font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? "text-[#ffa500] border-b-2 border-[#ffa500] bg-[#0e1116]"
                  : "text-[#d4d4d4] hover:text-[#ffa500]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className='p-6 md:p-10 space-y-6'>
          {activeTab === "statement" && (
            <>
              <h1 className='text-lg md:text-lg font-bold text-white mb-4'>
                {problem.title}
              </h1>
              <div className='flex flex-wrap gap-3 items-center mb-6'>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    problem.difficulty === "easy"
                      ? "bg-green-700/20 text-green-400 border border-green-700/30"
                      : problem.difficulty === "medium"
                      ? "bg-yellow-700/20 text-yellow-400 border border-yellow-700/30"
                      : "bg-red-700/20 text-red-400 border border-red-700/30"
                  }`}
                >
                  {problem.difficulty?.toUpperCase()}
                </span>
                {problem.tags?.map((tag, i) => (
                  <span
                    key={tag + i}
                    className='text-xs px-2 py-1 bg-[#2a2c34]/20 border border-[#2a2c34]/40 rounded-full text-[#c792ea]'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <p className='leading-relaxed text-[#d4d4d4] mb-8'>
                {problem.description}
              </p>

              <div className='mb-10'>
                <h2 className='text-xl font-semibold text-[#ffa500] mb-4'>
                  Example Test Cases
                </h2>
                {problem.visibleTestCase?.map((test, i) => (
                  <div
                    key={i}
                    className='bg-[#1b1d23] p-4 rounded-lg mb-3 border border-[#2a2c34]'
                  >
                    <p className='text-sm mb-1'>
                      <span className='text-[#82aaff] font-medium'>Input:</span>{" "}
                      {test.input}
                    </p>
                    <p className='text-sm mb-1'>
                      <span className='text-[#c3e88d] font-medium'>
                        Output:
                      </span>{" "}
                      {test.output}
                    </p>
                    {test.explanation && (
                      <p className='text-sm text-gray-500 italic'>
                        💡 {test.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "editorial" && (
            <div className='space-y-6'>
              <h2 className='text-xl font-semibold text-[#ffa500] mb-2'>
                Editorial
              </h2>
              <p className='leading-relaxed text-[#d4d4d4] mb-6'>
                {problem.editorial}
              </p>

              {problem.refrenceSolution?.length > 0 && (
                <div className='mt-8'>
                  <h3 className='text-lg font-semibold text-[#82cfff] mb-3'>
                    Reference Solutions
                  </h3>

                  {problem.refrenceSolution.map((ref, idx) => {
                    return (
                      <div
                        key={idx}
                        className='mb-3 bg-[#1b1d23] border border-[#2a2c34] rounded-lg'
                      >
                        <button
                          className='w-full flex justify-between items-center p-4 text-left text-sm font-medium text-gray-200 hover:bg-[#2a2c34] transition-colors'
                          onClick={() => setOpen(!open)}
                        >
                          <span className='uppercase'>{ref.language}</span>
                          <span>{open ? "▲" : "▼"}</span>
                        </button>

                        {open && (
                          <pre className="text-sm text-[#d4d4d4] overflow-x-auto font-['Fira Code'] whitespace-pre bg-[#0e1116] p-4 rounded-b-lg border-t border-[#2a2c34]">
                            {ref.solution}
                          </pre>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "solution" && (
            <div>
              <h2 className='text-xl font-semibold text-[#82cfff] mb-3'>
                Solution
              </h2>
              <pre className="bg-[#1b1d23] p-4 rounded-lg text-sm text-[#d4d4d4] overflow-x-auto border border-[#2a2c34] font-['Fira Code']">
                {problem.solution || "// Solution coming soon..."}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Left Resizer */}
      <div
        onMouseDown={handleLeftResize}
        className='w-1 cursor-col-resize bg-gradient-to-b from-purple-600/30 to-blue-600/30 hover:from-purple-500/50 hover:to-blue-500/50 transition-all'
      ></div>

      {/* RIGHT SIDE */}
      <div className='flex-1 flex flex-col bg-[#131518]/80 backdrop-blur-lg overflow-hidden min-h-[60vh]'>
        <CodeToolbar
          language={language}
          setLanguage={setLanguage}
          onRun={handleRunCode}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting || runLoading}
        />

        <div className='flex-1 min-h-[250px] p-3 overflow-hidden'>
          <CodeEditor language={language} code={code} setCode={setCode} />
        </div>

        {/* Test Cases */}
        <div className='flex flex-col border-t border-gray-700 bg-[#0e0f11]/80'>
          <div
            className='flex items-center justify-between px-4 py-2 cursor-pointer'
            onClick={() => setTestPanelOpen(!testPanelOpen)}
          >
            <h3 className='text-gray-200 font-semibold text-lg'>Test Cases</h3>
            {testPanelOpen ? (
              <ChevronUp className='text-gray-200' />
            ) : (
              <ChevronDown className='text-gray-200' />
            )}
          </div>

          {testPanelOpen && (
            <div className='px-4 py-4'>
              <div className='flex flex-wrap items-center gap-2 mb-4'>
                {problem.visibleTestCase?.map((test, idx) => (
                  <button
                    key={test._id || idx}
                    onClick={() => setActiveTest(idx)}
                    className={`px-4 py-1 rounded-lg text-sm font-medium ${
                      activeTest === idx
                        ? "bg-[#2a2c34] text-[#ffa500]"
                        : "bg-transparent text-gray-300 hover:bg-[#1b1d23] hover:text-[#ffa500]"
                    }`}
                  >
                    Case {idx + 1}
                  </button>
                ))}
              </div>

              {/* Display the selected test case */}
              {problem.visibleTestCase?.[activeTest] && (
                <div className='bg-[#1b1d23] p-4 rounded-lg border border-[#2a2c34]'>
                  <p className='text-sm mb-1'>
                    <span className='text-[#82aaff] font-medium'>Input:</span>{" "}
                    {problem.visibleTestCase[activeTest].input}
                  </p>
                  <p className='text-sm mb-1'>
                    <span className='text-[#c3e88d] font-medium'>Output:</span>{" "}
                    {problem.visibleTestCase[activeTest].output}
                  </p>
                  {problem.visibleTestCase[activeTest].explanation && (
                    <p className='text-sm text-gray-500 italic'>
                      💡 {problem.visibleTestCase[activeTest].explanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Run Output Panel */}
        <div className='border-t border-gray-700 bg-[#0e0f11]/80'>
          <div
            className='flex items-center justify-between px-4 py-2 cursor-pointer'
            onClick={() => setOutputPanelOpen(!outputPanelOpen)}
          >
            <h3 className='text-gray-200 font-semibold text-lg'>Run Output</h3>
            {outputPanelOpen ? (
              <ChevronUp className='text-gray-200' />
            ) : (
              <ChevronDown className='text-gray-200' />
            )}
          </div>

          {outputPanelOpen && (
            <div className='px-4 py-3'>
              {runLoading && (
                <div className='text-[#ffa500] font-medium animate-pulse'>
                  ⏳ Running your code...
                </div>
              )}

              {runError && (
                <div className='text-red-500 font-medium'> {runError}</div>
              )}

              {runResult && (
                <div className='bg-[#1b1d23] border border-[#2a2c34] rounded-lg p-4 mt-2'>
                  <p className='text-sm mb-2'>
                    Verdict:{" "}
                    <span
                      className={`font-semibold ${
                        runResult.finalVerdict === "Accepted"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {runResult.finalVerdict}
                    </span>
                  </p>
                  <p className='text-sm text-gray-400 mb-3'>
                    {runResult.passedTestCases}/{runResult.totalTestCases} test
                    cases passed.
                  </p>
                  <div className='space-y-3'>
                    {runResult.results?.map((res, i) => (
                      <div
                        key={i}
                        className='bg-[#0e1116] border border-[#2a2c34] rounded-lg p-3 text-sm'
                      >
                        <p className='text-[#82aaff] font-medium mb-1'>
                          Test Case {res.testCase}: {res.verdict}
                        </p>
                        <p>
                          <span className='text-gray-400'>Input:</span>{" "}
                          <span className='text-gray-300'>{res.input}</span>
                        </p>
                        <p>
                          <span className='text-gray-400'>Expected:</span>{" "}
                          <span className='text-green-400'>
                            {res.expectedOutput}
                          </span>
                        </p>
                        <p>
                          <span className='text-gray-400'>Output:</span>{" "}
                          <span className='text-yellow-400'>
                            {res.userOutput || "—"}
                          </span>
                        </p>
                        <p className='text-gray-500 text-xs mt-1'>
                          Time: {res.time}s | Memory: {res.memory} KB
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
