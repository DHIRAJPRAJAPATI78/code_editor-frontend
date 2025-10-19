import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  // Code animation setup
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

  const [visibleLines, setVisibleLines] = useState([]);
  const containerRef = useRef(null);

  // Auto typing + looping logic
  useEffect(() => {
    let i = 0;
    let interval;

    const type = () => {
      if (i < codeLines.length) {
        setVisibleLines((prev) => [...prev, codeLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        // Restart typing after 3 seconds pause
        setTimeout(() => {
          setVisibleLines([]);
          i = 0;
          interval = setInterval(type, 150);
        }, 1000);
      }
    };

    interval = setInterval(type, 150);
    return () => clearInterval(interval);
  }, []);

  // Auto scroll as new lines appear
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines]);

  // Form handlers
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const url = activeTab === "login" ? "/api/login" : "/api/register";
      const res = await axios.post(url, formData, { withCredentials: true });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    
    <div className='relative min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white overflow-hidden'>
      {/* LEFT SIDE — Animated Code Window */}

      <div className='hidden lg:flex w-1/2 flex-col justify-center items-center p-10 '>
        <div
          className='relative max-w-6xl -mt-12 mx-auto h-[36rem] w-full border-4 border-[#6C6C6C] p-2.5 bg-gradient-to-br from-[#2a2a2a] via-[#222222] to-[#1a1a1a] rounded-[30px] shadow-2xl'
          style={{ transform: "scale(0.7) rotateX(20deg)" }}
        >
          <div className='absolute -inset-6 rounded-[40px] bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-40 blur-3xl animate-pulse pointer-events-none'></div>

          {/* Code Area */}
          <div className='h-full w-full bg-black overflow-hidden rounded-[20px] relative z-40'>
            {/* Top Bar */}
            <div className='absolute top-0 left-0 flex items-center gap-2 w-full h-12 px-6 bg-black/90 border-b border-gray-800/50 rounded-t-[20px] z-50 backdrop-blur-md'>
              <div className='w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition'></div>
              <div className='w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition'></div>
              <div className='w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition'></div>
              <div className='text-gray-200 ml-4 text-sm font-medium select-none'>
                CodexDemo.cpp
              </div>
              <div className='ml-auto flex items-center gap-2'>
                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                <span className='text-xs text-green-400'>Live Coding</span>
              </div>
            </div>

            {/* Code Content */}
            <div className='absolute inset-3 bg-black rounded-[15px] pt-12 overflow-hidden'>
              <div
                ref={containerRef}
                className='p-3 h-full overflow-y-auto no-scrollbar scroll-smooth'
              >
                <div className='space-y-1 font-mono text-sm lg:text-base leading-relaxed'>
                  {visibleLines.map((line, index) => (
                    <div
                      key={index}
                      className={`px-3 py-0.5 rounded transition-colors duration-200 hover:bg-gray-900/30 ${
                        line?.includes("class") || line?.includes("void")
                          ? "text-blue-400"
                          : line?.includes("cout")
                          ? "text-cyan-400"
                          : line?.includes("#include")
                          ? "text-purple-400"
                          : line?.includes("private") ||
                            line?.includes("public")
                          ? "text-gray-400"
                          : "text-gray-300"
                      }`}
                    >
                      <span className='text-gray-700 select-none mr-6 text-sm'>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className='whitespace-pre'>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className='text-gray-400 text-center text-sm italic'>
          “Every coder writes history — one line at a time.”
        </p>
      </div>

      {/* RIGHT SIDE — FORM */}
      <div className='flex-1 flex items-center justify-center p-6 md:p-12'>
        <div className='w-full max-w-md bg-gradient-to-br from-purple-600/20 to-purple-900/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-purple-500/30'>
          {/* Tabs */}
          <div className='flex justify-center mb-6'>
            <button
              onClick={() => setActiveTab("login")}
              className={`w-1/2 py-2 font-semibold rounded-l-lg transition-all ${
                activeTab === "login"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`w-1/2 py-2 font-semibold rounded-r-lg transition-all ${
                activeTab === "register"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            {activeTab === "register" && (
              <>
                <div>
                  <label className='block text-sm mb-1'>First Name</label>
                  <input
                    type='text'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className='w-full px-3 py-2 bg-gray-800 rounded-md focus:ring-2 focus:ring-purple-500 outline-none'
                  />
                </div>

                <div>
                  <label className='block text-sm mb-1'>Last Name</label>
                  <input
                    type='text'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className='w-full px-3 py-2 bg-gray-800 rounded-md focus:ring-2 focus:ring-purple-500 outline-none'
                  />
                </div>
              </>
            )}

            <div>
              <label className='block text-sm mb-1'>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 bg-gray-800 rounded-md focus:ring-2 focus:ring-purple-500 outline-none'
              />
            </div>

            <div>
              <label className='block text-sm mb-1'>Password</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
                className='w-full px-3 py-2 bg-gray-800 rounded-md focus:ring-2 focus:ring-purple-500 outline-none'
              />
            </div>

            <button
              type='submit'
              className='w-full py-2 mt-4 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg font-semibold hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-purple-800/30'
            >
              {activeTab === "login" ? "Enter Codex →" : "Join Codex →"}
            </button>
          </form>

          {message && (
            <p className='text-center text-sm text-purple-300 mt-4'>
              {message}
            </p>
          )}

          <div className='text-center mt-6 text-sm text-gray-400'>
            {activeTab === "login" ? (
              <p>
                New to Codex?{" "}
                <button
                  onClick={() => setActiveTab("register")}
                  className='text-purple-400 hover:underline'
                >
                  Create an account
                </button>
              </p>
            ) : (
              <p>
                Already a member?{" "}
                <button
                  onClick={() => setActiveTab("login")}
                  className='text-purple-400 hover:underline'
                >
                  Login here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='absolute bottom-4 w-full text-center text-sm text-gray-500'>
        © {new Date().getFullYear()} Codex — Code. Compete. Create.
      </div>
    </div>
  );
}




