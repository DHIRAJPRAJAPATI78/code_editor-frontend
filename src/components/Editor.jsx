import React from "react";
import { Editor } from "@monaco-editor/react";



const CodeEditor= ({ language, code, setCode }) => {
  return (
    <div className="h-full w-full bg-black/50 rounded-lg overflow-hidden border border-gray-800">
      <Editor
        height="100%"
        defaultLanguage={language}
        language={language}
        value={code}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          automaticLayout: true,
        }}
        onChange={(value) => setCode(value || "")}
      />
    </div>
  );
};

export default CodeEditor;
