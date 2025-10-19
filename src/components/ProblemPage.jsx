import React, { useState } from "react";
import CodeEditor from "../components/Editor";
import ProblemPanel from "../components/ProblemPanel";
import TestCaseList from "../components/TestCaseList";
import CodeToolbar from "../components/CodeToolbar";
import { submitCodeAPI } from "../utils/api";

const ProblemPage = () => {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(`#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  cout << "Hello Codex!";\n}`);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const problemId = "670a20d"; // dynamically from route in real app
      const token = localStorage.getItem("token") || "";
      const res = await submitCodeAPI(problemId, language, code, token);
      alert(res.message);
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* LEFT SIDE — Problem + Test Cases */}
      <div className="flex flex-col w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-gray-800">
        <ProblemPanel
          title="Two Sum"
          description="Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target."
          examples={[
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
          ]}
        />
        <TestCaseList testCases={["nums=[2,7,11,15]", "nums=[3,2,4]", "nums=[3,3]"]} />
      </div>

      {/* RIGHT SIDE — Editor */}
      <div className="flex-1 flex flex-col bg-black/60 backdrop-blur-lg">
        <CodeToolbar
          language={language}
          setLanguage={setLanguage}
          onRun={() => console.log("Run code")}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
        <div className="flex-1 p-3">
          <CodeEditor language={language} code={code} setCode={setCode} />
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
