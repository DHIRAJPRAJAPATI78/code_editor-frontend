import { useState, useEffect, useRef } from "react";


export default function Home() {

  const [visibleText, setVisibleText] = useState("");
  const containerRef = useRef(null);

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
    "class Algoken {",
    "  private:",
    "    vector<string> users;",
    "    unique_ptr<int> projectCount;",
    "    bool isActive;",
    '    const string motto = "Code. Compete. Create."; ',
    "",
    "  public:",
    "    Algoken() : projectCount(make_unique<int>(0)), isActive(true) {",
    '      cout << "[SYSTEM] Algoken initialized successfully." << endl;',
    "    }",
    "",
    "    void join(const string& user) {",
    "      users.push_back(user);",
    '      cout << "[NEW USER] " << user << " joined Algoken." << endl;',
    "    }",
    "",
    "    void startSession() {",
    "      if (!isActive) {",
    '        cout << "[ERROR] Algoken offline." << endl;',
    "        return;",
    "      }",
    '      cout << "[SESSION] Coding started." << endl;',
    "    }",
    "};",
  ];

  const fullText = codeLines.join("\n");

  // Typing animation
  useEffect(() => {
    let i = 0;
    let interval;

    const type = () => {
      setVisibleText(fullText.slice(0, i));
      i++;

      if (i > fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          i = 0;
          setVisibleText("");
          interval = setInterval(type, 150);
        }, 2000);
      }
    };

    interval = setInterval(type, 150);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visibleText]);

  return (
    <div className='relative min-h-screen flex flex-col lg:flex-row bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white overflow-hidden pt-16'>
      {/* RIGHT SIDE — Hero Section */}
      <div className='flex-1 flex flex-col justify-center items-center text-center px-6 md:px-16 py-12'>
        <p className='italic text-2xl md:text-3xl font-bold  leading-tight drop-shadow-lg'>
          Welcome to <span className=''>AlgoKen</span>
        </p>

   <p className="mt-6 text-gray-300 text-md md:text-xl max-w-2xl leading-relaxed">
  Enter a world where <span className="text-purple-400">logic</span>{" "}
  meets <span className="text-blue-400">creativity</span>. At Algoken, we
  empower developers to <span className="text-fuchsia-400">build</span>,
  <span className="text-purple-400"> collaborate</span>, and{" "}
  <span className="text-blue-400">compete</span> — turning code into
  art.
  <br /><br />
  Pace your <span className="text-purple-400">coding skills</span> using
  your <span className="text-blue-400">favorite language</span>, solve
  real-world problems, and grow from beginner to expert through{" "}
  <span className="text-fuchsia-400">hands-on challenges</span>.
  Whether you love <span className="text-purple-400">C++</span>,{" "}
  <span className="text-blue-400">Python</span>,{" "}
  <span className="text-fuchsia-400">JavaScript</span>, or{" "}
  <span className="text-purple-400">Java</span>, Algoken is your arena to
  learn, practice, and <span className="text-blue-400">level up</span>.
</p>

        <p className='mt-10 text-md md:text-lg text-rose-500 italic'>
          “Your journey from syntax to success begins here.”
        </p>
      </div>
      {/* LEFT SIDE — Code Window */}
      <div className='flex w-full lg:w-1/2 flex-col justify-center items-center p-6 md:p-10'>
        <div
          className='relative max-w-6xl mx-auto h-[26rem] md:h-[30rem] w-full border-4 border-[#6C6C6C] p-2.5 bg-gradient-to-br from-[#2a2a2a] via-[#222222] to-[#1a1a1a] rounded-[25px] md:rounded-[30px] shadow-2xl'
          style={{ transform: "scale(0.95)" }}
        >
          <div className='absolute -inset-6 rounded-[40px] bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-40 blur-3xl animate-pulse pointer-events-none'></div>

          <div className='h-full w-full bg-black overflow-hidden rounded-[20px] relative z-40'>
            {/* Header */}
            <div className='absolute top-0 left-0 flex items-center gap-2 w-full h-12 px-6 bg-black/90 border-b border-gray-800/50 rounded-t-[20px] backdrop-blur-md z-50'>
              <div className='w-3 h-3 bg-red-500 rounded-full' />
              <div className='w-3 h-3 bg-yellow-500 rounded-full' />
              <div className='w-3 h-3 bg-green-500 rounded-full' />
              <div className='text-gray-200 ml-4 text-sm font-medium select-none'>
                Algoken.cpp
              </div>
              <div className='ml-auto flex items-center gap-2'>
                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                <span className='text-xs text-green-400'>Running</span>
              </div>
            </div>

            {/* Typing Area */}
            <div className='absolute inset-3 bg-black rounded-[15px] pt-12 overflow-hidden'>
              <div
                ref={containerRef}
                className='p-3 h-full overflow-y-auto scroll-smooth font-mono text-xs sm:text-sm md:text-base leading-relaxed text-gray-300 no-scrollbar'
              >
                <pre className='whitespace-pre-wrap text-gray-300'>
                  {visibleText}
                  <span className='animate-pulse text-cyan-400'>▌</span>
                </pre>
              </div>
            </div>
          </div>
        </div>
        <p className='text-green-400 text-center text-base md:text-xl italic mt-6 md:mt-10'>
          “Every idea starts as a single line of code.”
        </p>
      </div>
    </div>
  );
}
