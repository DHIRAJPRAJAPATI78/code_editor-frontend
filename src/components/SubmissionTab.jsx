import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSubmissionsByProblem } from "../features/submit/submitSlice";
import { Loader2, CheckCircle2, XCircle} from "lucide-react";

const SubmissionTab = ({ problemId }) => {
  const dispatch = useDispatch();

  const {
    problemSubmissions,
    isFetching,
    isError,
    message,
  } = useSelector((state) => state.submission);

  useEffect(() => {
    if (problemId) {
      dispatch(getUserSubmissionsByProblem(problemId));
    }
  }, [dispatch, problemId]);

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Your Submissions
      </h2>

      {/* 🔹 Loading */}
      {isFetching && (
        <div className="flex justify-center items-center py-6">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          <span className="ml-2 text-gray-600 dark:text-gray-300">
            Fetching submissions...
          </span>
        </div>
      )}

      {/* 🔹 Error */}
      {isError && !isFetching && (
        <div className="text-red-500 text-center py-4">
          {message || "Failed to load submissions"}
        </div>
      )}

      {/* 🔹 No submissions */}
      {!isFetching && !problemSubmissions?.length && !isError && (
        <div className="text-gray-500 text-center py-6">
          No submissions found for this problem.
        </div>
      )}

      {/* 🔹 Table / Cards */}
      {!isFetching && problemSubmissions?.length > 0 && (
        <div className="overflow-x-auto">
          {/* Desktop Table */}
          <table className="hidden md:table min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-left">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Verdict</th>
                <th className="px-4 py-3">Language</th>
                <th className="px-4 py-3">Test Cases</th>
                <th className="px-4 py-3  ">
                Time
                </th>
                <th className="px-4 py-3 ">
                   Memory
                </th>
                <th className="px-4 py-3">Submitted At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {[...problemSubmissions].reverse().map((sub, index) => (
                <tr
                  key={sub._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
                >
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {index + 1}
                  </td>

                  {/* Verdict */}
                  <td className="px-4 py-3">
                    <VerdictBadge verdict={sub.verdict} />
                  </td>

                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-200">
                    {sub.language}
                  </td>

                  {/* Passed / Total Test Cases */}
                  <td className="px-4 py-3">
                    <span
                      className={`font-semibold ${
                        sub.passedTestCases === sub.totalTestCases
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {sub.passedTestCases}/{sub.totalTestCases}
                    </span>
                  </td>

                  {/* Execution Time */}
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {sub.executionTime ? `${sub.executionTime} ms` : "—"}
                  </td>

                  {/* Memory */}
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {sub.memory ? `${sub.memory} KB` : "—"}
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {new Date(sub.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Cards */}
          <div className="space-y-3 md:hidden">
            {[...problemSubmissions].reverse().map((sub, index) => (
              <div
                key={sub._id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    #{index + 1}
                  </p>
                  <VerdictBadge verdict={sub.verdict} />
                </div>

                <div className="grid grid-cols-2 text-sm gap-y-1 mt-2">
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Language:</strong> {sub.language}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Test Cases:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        sub.passedTestCases === sub.totalTestCases
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {sub.passedTestCases}/{sub.totalTestCases}
                    </span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Time:</strong>{" "}
                    {sub.executionTime ? `${sub.executionTime} ms` : "—"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    <strong>Memory:</strong>{" "}
                    {sub.memory ? `${sub.memory} KB` : "—"}
                  </p>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {new Date(sub.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ Verdict Badge Component
const VerdictBadge = ({ verdict }) => {
  const verdictStyles = {
    Accepted: "bg-green-100 text-green-700",
    "Wrong Answer": "bg-red-100 text-red-600",
    "Runtime Error": "bg-yellow-100 text-yellow-700",
    default: "bg-gray-100 text-gray-600",
  };

  const Icon =
    verdict === "Accepted"
      ? CheckCircle2
      : verdict === "Wrong Answer"
      ? XCircle
      : XCircle;

  const color = verdictStyles[verdict] || verdictStyles.default;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${color}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {verdict}
    </span>
  );
};

export default SubmissionTab;
