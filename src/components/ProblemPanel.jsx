import React from "react";

const ProblemPanel = ({ title, description, examples }) => (
  <div className='flex-1 overflow-y-auto p-6'>
    <h1 className='text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent'>
      🧩 {title}
    </h1>
    <p className='mt-4 text-gray-300 leading-relaxed'>{description}</p>

    <div className='mt-6 text-sm text-gray-400 space-y-4'>
      {examples.map((ex, i) => (
        <div key={i}>
          <p className='font-semibold text-purple-400'>Example {i + 1}:</p>
          <pre className='bg-gray-900/50 p-3 rounded-lg overflow-x-auto text-gray-300'>
            {`Input: ${ex.input}
Output: ${ex.output}`}
          </pre>
        </div>
      ))}
    </div>
  </div>
);

export default ProblemPanel;
