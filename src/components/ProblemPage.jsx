import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CodeEditor from "../components/Editor";
import CodeToolbar from "../components/CodeToolbar";
import {
  Loader2,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { getProblemById } from "../features/Problem/problemSlice";
import {
  submitCode,
  resetSubmission,
} from "../features/Submission/submissionSlice";

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
  } = useSelector((state) => state.run);

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(
    `#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b << endl;\n    return 0;\n}`
  );
  const [activeTest, setActiveTest] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("statement");
  const [openSolutions, setOpenSolutions] = useState({});
  const [leftPanelWidth, setLeftPanelWidth] = useState(450);
  const [testPanelOpen, setTestPanelOpen] = useState(true);
  const [outputPanelOpen, setOutputPanelOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getProblemById(id));
      dispatch(resetSubmission());
      setOutputPanelOpen(false);
      setActiveTest(0);
    }
  }, [dispatch, id]);

  const handleRunCode = async () => {
    if (!id) return alert("Problem not found");
    setOutputPanelOpen(true);
    dispatch(resetSubmission());
    dispatch(submitCode({ problemId: id, language, code }));
  };

  const handleSubmit = async () => {
    if (!id) return alert("Problem not found");
    try {
      setIsSubmitting(true);
      dispatch(resetSubmission());
      const resultAction = dispatch(
        submitCode({ problemId: id, language, code })
      );
      if (submitCode.fulfilled.match(resultAction)) {
        alert(resultAction.payload.message || "Code submitted successfully!");
        setActiveTab("submission");
      } else {
        alert(resultAction.payload || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLeftResize = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = leftPanelWidth;
    const onMouseMove = (eMove) =>
      setLeftPanelWidth(
        Math.min(
          window.innerWidth * 0.8,
          Math.max(250, startWidth + eMove.clientX - startX)
        )
      );
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const getStatusColor = (verdict) => {
    switch (verdict) {
      case "Accepted":
        return "text-green-400";
      case "Wrong Answer":
        return "text-red-400";
      case "Time Limit Exceeded":
        return "text-yellow-400";
      case "Runtime Error":
        return "text-orange-400";
      case "Compilation Error":
        return "text-purple-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (verdict) => {
    switch (verdict) {
      case "Accepted":
        return <CheckCircle className='w-4 h-4 text-green-400' />;
      case "Wrong Answer":
        return <XCircle className='w-4 h-4 text-red-400' />;
      case "Time Limit Exceeded":
        return <XCircle className='w-4 h-4 text-yellow-400' />;
      case "Runtime Error":
        return <XCircle className='w-4 h-4 text-orange-400' />;
      default:
        return <XCircle className='w-4 h-4 text-gray-400' />;
    }
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
    { id: "statement", label: "Statement" },
    { id: "editorial", label: "Editorial" },
    { id: "submission", label: "Submission" },
    { id: "askai", label: "Ask AI" },
  ];

  return (
    <div className='pt-16 h-screen flex bg-[#0e1116] text-[#d4d4d4]'>
      {/* LEFT SIDE */}
      <div
        className='flex flex-col border-r border-[#2a2c34] overflow-y-auto'
        style={{ width: leftPanelWidth }}
      >
        {/* Tabs */}
        <div className='flex py-1 overflow-x-auto border-b border-[#2a2c34] bg-[#131518]'>
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
        <div className='p-2 md:p-3 space-y-6'>
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
                    className='text-md px-2 py-1 bg-[#2a2c34]/20 border border-[#2a2c34]/40 rounded-full text-[#c792ea]'
                  >
                    {tag}
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
                      <p className='text-sm text-gray-300 italic'>
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
                  {problem.refrenceSolution.map((ref, idx) => (
                    <div
                      key={idx}
                      className='mb-3 bg-[#1b1d23] border border-[#2a2c34] rounded-lg'
                    >
                      <button
                        className='w-full flex justify-between items-center p-4 text-left text-sm font-medium text-gray-200 hover:bg-[#2a2c34] transition-colors'
                        onClick={() =>
                          setOpenSolutions((prev) => ({
                            ...prev,
                            [idx]: !prev[idx],
                          }))
                        }
                      >
                        <span className='uppercase'>{ref.language}</span>
                        <span>{openSolutions[idx] ? "▲" : "▼"}</span>
                      </button>
                      {openSolutions[idx] && (
                        <pre className="text-sm text-[#d4d4d4] overflow-x-auto font-['Fira Code'] whitespace-pre bg-[#0e1116] p-4 rounded-b-lg border-t border-[#2a2c34]">
                          {ref.solution}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
      <div className='flex-1 flex flex-col bg-[#131518]/80 backdrop-blur-lg overflow-y-auto'>
        <CodeToolbar
          language={language}
          setLanguage={setLanguage}
          onRun={handleRunCode}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isRunning={runLoading}
        />

        <div className='flex-1 min-h-0 flex flex-col'>
          <div className='flex-1 min-h-[200px] p-3'>
            <CodeEditor
              language={language}
              code={code}
              setCode={setCode}
              disabled={runLoading}
            />
          </div>

          {/* Test Cases Panel */}
          <div className='flex-shrink-0 border-t border-gray-700 bg-[#0e0f11]/80'>
            <div
              className='flex items-center justify-between px-4 py-2 cursor-pointer'
              onClick={() => setTestPanelOpen(!testPanelOpen)}
            >
              <h3 className='text-gray-200 font-semibold text-lg'>
                Test Cases
              </h3>
              {testPanelOpen ? (
                <ChevronUp className='text-gray-200' />
              ) : (
                <ChevronDown className='text-gray-200' />
              )}
            </div>

            {testPanelOpen && (
              <div className='px-4 py-4 space-y-4'>
                {/* Show error if any */}
                {runError && (
                  <div className='bg-[#1b1d23] p-3 rounded-lg border border-red-500 text-red-400 font-mono text-sm'>
                    <strong>Error:</strong> {runError}
                  </div>
                )}

                {/* Test case buttons */}
                <div className='flex flex-wrap items-center gap-2'>
                  {(runResult?.results || problem.visibleTestCase)?.map(
                    (test, idx) => {
                      const verdict = runResult?.results?.[idx]?.verdict;
                      const statusColor = verdict
                        ? getStatusColor(verdict)
                        : "text-gray-300";
                      return (
                        <button
                          key={test._id || idx}
                          onClick={() => setActiveTest(idx)}
                          className={`flex items-center gap-1 px-4 py-1 rounded-lg text-sm font-medium transition-all ${
                            activeTest === idx
                              ? "bg-[#2a2c34] text-[#ffa500]"
                              : `bg-transparent hover:bg-[#1b1d23] hover:text-[#ffa500] ${statusColor}`
                          }`}
                        >
                          {verdict && getStatusIcon(verdict)}
                          <span>Case {idx + 1}</span>
                        </button>
                      );
                    }
                  )}
                </div>

                {/* Selected Test Case Details */}
                {((runResult?.results && runResult.results[activeTest]) ||
                  problem.visibleTestCase?.[activeTest]) && (
                  <div className='bg-[#1b1d23] p-4 rounded-lg border border-[#2a2c34] space-y-3'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                      <div>
                        <div className='text-[#82aaff] font-medium mb-1'>
                          Input
                        </div>
                        <div className='bg-[#0e1116] p-2 rounded border border-[#2a2c34] font-mono text-xs'>
                          {runResult?.results?.[activeTest]?.input ||
                            problem.visibleTestCase[activeTest].input}
                        </div>
                      </div>

                      <div>
                        <div className='text-[#c3e88d] font-medium mb-1'>
                          Expected Output
                        </div>
                        <div className='bg-[#0e1116] p-2 rounded border border-[#2a2c34] font-mono text-xs text-green-400'>
                          {runResult?.results?.[activeTest]?.expectedOutput ||
                            problem.visibleTestCase[activeTest].output}
                        </div>
                      </div>
                    </div>

                    {runResult?.results?.[activeTest] && (
                      <div>
                        <div className='text-[#ff9d00] font-medium mb-1'>
                          Your Output
                        </div>
                        <div
                          className={`bg-[#0e1116] p-2 rounded border border-[#2a2c34] font-mono text-xs ${
                            runResult.results[activeTest].verdict === "Accepted"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {runResult.results[activeTest].userOutput ||
                            "No output"}
                        </div>
                      </div>
                    )}

                    {/* Compilation / Runtime Error */}
                    {runResult?.results?.[activeTest]?.error && (
                      <div className='bg-[#1b1d23] p-2 rounded border border-red-500 text-red-400 font-mono text-sm'>
                        <strong>Error:</strong>{" "}
                        {runResult.results[activeTest].error}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
