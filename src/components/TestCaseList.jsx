import React from "react";



const TestCaseList = ({ testCases }) => (
  <div className="border-t border-gray-800 p-4 bg-black/40">
    <h2 className="text-lg font-semibold text-purple-400 mb-3">🧪 Test Cases</h2>
    <div className="space-y-2 text-sm text-gray-300">
      {testCases.map((tc, i) => (
        <div key={i} className="bg-gray-900/60 p-2 rounded-md">
          ✅ {tc}
        </div>
      ))}
    </div>
  </div>
);

export default TestCaseList;
