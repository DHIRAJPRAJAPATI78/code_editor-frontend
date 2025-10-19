import { useEffect, useState, useRef } from "react";
import { Menu, X, Bell, Moon } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Simulate logged-in user
    setUser({
      name: "Dhiraj",
      avatar: "https://i.pravatar.cc/40?img=68",
    });
  }, []);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Problems", href: "#problems" },
    { name: "Contests", href: "#contests" },
    { name: "Leaderboard", href: "#leaderboard" },
    { name: "Discuss", href: "#discuss" },
    { name: "Settings", href: "#Settings", type: "mobile" },
    { name: "Logout", href: "#Logout", type: "mobile" },
    { name: "Submissions", href: "#Submissions", type: "mobile" },
    { name: "My Profile", href: "#My Profile", type: "mobile" },
  ];

  return (
    <header className='fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 z-50'>
      <div className='max-w-7xl mx-auto px-5 py-3 flex items-center justify-between'>
        {/* Logo */}
        <div className='text-2xl font-bold text-white cursor-pointer tracking-wide'>
          Codex
        </div>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center space-x-6 text-gray-300'>
          {navLinks.map(
            (link) =>
              link.type != "mobile" && (
                <a
                  key={link.name}
                  href={link.href}
                  className='hover:text-white transition duration-200'
                >
                  {link.name}
                </a>
              )
          )}
        </nav>

        {/* Right Section */}
        <div className='hidden md:flex items-center space-x-4'>
          {user ? (
            <>
              <button className='text-gray-300 hover:text-white'>
                <Bell size={20} />
              </button>
              <button className='text-gray-300 hover:text-white'>
                <Moon size={20} />
              </button>

              {/* User Dropdown */}
              <div className='relative' ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className='flex items-center focus:outline-none'
                >
                  <img
                    src={user.avatar}
                    alt='User avatar'
                    className='w-10 h-10 rounded-full border border-gray-700 cursor-pointer'
                  />
                </button>

                {dropdownOpen && (
                  <div className='absolute right-0 mt-2 w-44 bg-gray-900 border border-gray-800 rounded-lg shadow-lg z-50'>
                    <div className='px-4 py-2 text-gray-200 border-b border-gray-700'>
                      Hello, {user.name}
                    </div>
                    <ul className='text-gray-300'>
                      <li className='px-4 py-2 hover:bg-gray-800 cursor-pointer'>
                        My Profile
                      </li>
                      <li className='px-4 py-2 hover:bg-gray-800 cursor-pointer'>
                        Submissions
                      </li>
                      <li className='px-4 py-2 hover:bg-gray-800 cursor-pointer'>
                        Settings
                      </li>
                      <li
                        className='px-4 py-2 hover:bg-gray-800 cursor-pointer text-red-400'
                        onClick={() => setUser(null)}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button className='px-4 py-2 rounded-lg border border-gray-600 text-gray-200 hover:bg-white hover:text-black transition duration-200'>
                Login
              </button>
              <button className='px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200'>
                Signup
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='md:hidden text-gray-200'
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='md:hidden bg-black/90 border-t border-gray-800 px-5 py-4 flex flex-col space-y-4 text-gray-300'>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className='hover:text-white transition duration-200'
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}

          {user ? (
            <div className='flex items-center space-x-3 border-t border-gray-800 pt-3'>
              <img
                src={user.avatar}
                alt='User avatar'
                className='w-10 h-10 rounded-full border border-gray-700'
              />
              <span className='text-gray-100 font-medium'>{user.name}</span>
            </div>
          ) : (
            <>
              <button className='w-full px-4 py-2 rounded-lg border border-gray-600 text-gray-200 hover:bg-white hover:text-black transition duration-200'>
                Login
              </button>
              <button className='w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200'>
                Signup
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
