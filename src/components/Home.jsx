import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";

export default function Home() {
  // const navigate = useNavigate();
  const [visibleText, setVisibleText] = useState("");
  const containerRef = useRef(null);

  // === Your updated code snippet ===
  const codeLines = [
    "#include <iostream>",
    "#include <vector>",
    "#include <string>",
    "#include <algorithm>",
    "#include <memory>",
    "#include <thread>",
    "#include <chrono>",
    "",
    "using namespace std;",
    "",
    "class Codex {",
    "  private:",
    "    vector<string> users;",
    "    unique_ptr<int> projectCount;",
    "    bool isActive;",
    '    const string motto = "Code. Compete. Create.";',
    "",
    "  public:",
    "    Codex() : projectCount(make_unique<int>(0)), isActive(true) {",
    '      cout << "[SYSTEM] Codex initialized successfully." << endl;',
    "    }",
    "",
    "    void join(const string& user) {",
    "      users.push_back(user);",
    '      cout << "[NEW USER] " << user << " joined Codex." << endl;',
    "    }",
    "",
    "    void startSession() {",
    "      if (!isActive) {",
    '        cout << "[ERROR] Codex offline." << endl;',
    "        return;",
    "      }",
    '      cout << "[SESSION] Coding started." << endl;',
    "    }",
    "};",
  ];

  // Combine all lines into one string with proper line breaks
  const fullText = codeLines.join("\n");

//   === Typing effect (character by character, looping) ===
 useEffect(() => {
  let i = 0;
  let interval;

  const type = () => {
    setVisibleText(fullText.slice(0, i));
    i++;

    if (i > fullText.length) {
      clearInterval(interval);
      // Pause before restarting the loop
      setTimeout(() => {
        i = 0;
        setVisibleText("");
        interval = setInterval(type, 3000);
      }, 2000);
    }
  };

  interval = setInterval(type, 250); // each char every 30ms
  return () => clearInterval(interval);
}, []);



  return (
    <div className="relative min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* LEFT SIDE — Code Window */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-center p-10">
        <div
          className="relative max-w-6xl -mt-12 mx-auto h-[36rem] w-full border-4 border-[#6C6C6C] p-2.5 bg-gradient-to-br from-[#2a2a2a] via-[#222222] to-[#1a1a1a] rounded-[30px] shadow-2xl"
          style={{ transform: "scale(0.7) rotateX(20deg)" }}
        >
          <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-40 blur-3xl animate-pulse pointer-events-none"></div>

          <div className="h-full w-full bg-black overflow-hidden rounded-[20px] relative z-40">
            {/* Header */}
            <div className="absolute top-0 left-0 flex items-center gap-2 w-full h-12 px-6 bg-black/90 border-b border-gray-800/50 rounded-t-[20px] backdrop-blur-md z-50">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <div className="text-gray-200 ml-4 text-sm font-medium select-none">
                Codex.cpp
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">Running</span>
              </div>
            </div>

            {/* Typing Area */}
            <div className="absolute inset-3 bg-black rounded-[15px] pt-12 overflow-hidden">
              <div
                ref={containerRef}
                className="p-3 h-full overflow-y-auto no-scrollbar scroll-smooth font-mono text-sm lg:text-base leading-relaxed text-gray-300"
              >
                <pre className="whitespace-pre-wrap text-gray-300">
                  {visibleText}
                  <span className="animate-pulse text-cyan-400">▌</span>
                </pre>
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-400 text-center text-sm italic mt-6">
          “Every idea starts as a single line of code.”
        </p>
      </div>

      {/* RIGHT SIDE — Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-8 md:px-16 py-12">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent leading-tight drop-shadow-lg">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            Codex
          </span>
        </h1>

        <p className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed">
          Enter a world where <span className="text-purple-400">logic</span>{" "}
          meets <span className="text-blue-400">creativity</span>. At Codex, we
          empower developers to{" "}
          <span className="text-fuchsia-400">build</span>,
          <span className="text-purple-400"> collaborate</span>, and{" "}
          <span className="text-blue-400">compete</span> — turning code into
          art.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            // onClick={() => navigate("/login")}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg font-semibold hover:scale-[1.03] transition-transform duration-300 shadow-lg shadow-purple-800/30"
          >
            Login
          </button>
          <button
            // onClick={() => navigate("/register")}
            className="px-8 py-3 border border-purple-500/50 rounded-lg font-semibold hover:bg-purple-600/20 hover:scale-[1.03] transition-all duration-300"
          >
            Register
          </button>
        </div>

        <p className="mt-10 text-sm text-gray-500 italic">
          “Your journey from syntax to success begins here.”
        </p>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 w-full text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Codex — Code. Compete. Create.
      </div>
    </div>
  );
}
