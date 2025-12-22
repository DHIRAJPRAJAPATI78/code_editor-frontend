import { useEffect, useState, useRef } from "react";
import { Menu, X, Bell, Moon, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, reset } from "../features/auth/authSlice";
import { getUserProfile,resetProfile } from "../features/profile/profileSlice";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(reset());
      setDropdownOpen(false);
      setMenuOpen(false);
      dispatch(resetProfile());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const navLinks = [
    { name: "Problems", href: "/problems",vis:true  },
    { name: "Contests", href: "/contests" ,vis:true},
    { name: "Leaderboard", href: "/leaderboard",vis:true },
    { name: "Settings", href: "/settings", type: "mobile" ,vis:true},
    { name: "Logout", href: "", type: "mobile",vis:false },
    { name: "Submissions", href: "/submissions", type: "mobile" ,vis:true},
    { name: "Bookmark", href: "/bookmarks" ,vis:true},
    { name: "My Profile", href: "/profile", type: "mobile" ,vis:true},
  ];

  if (isLoading) {
    return (
      <header className='fixed top-0 left-0 w-full h-16 bg-black/80 backdrop-blur-md border-b border-gray-800 z-50'>
        <div className='max-w-7xl mx-auto px-5 h-full flex items-center justify-between'>
          <div className='flex gap-2'>
            <div className='w-6 h-6 bg-gray-700 rounded animate-pulse' />
            <div className='w-24 h-5 bg-gray-700 rounded animate-pulse' />
          </div>
          <div className='flex gap-4'>
            <div className='w-6 h-6 bg-gray-700 rounded animate-pulse' />
            <div className='w-9 h-9 bg-gray-700 rounded-full animate-pulse' />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className='fixed top-0 left-0 w-full h-16 bg-black/80 backdrop-blur-md border-b border-gray-800 z-50 shadow-md'>
      <div className='max-w-7xl mx-auto px-5 h-full flex items-center justify-between'>
        {/* Logo */}
        <Link
          to='/'
          className='flex items-center gap-2 text-2xl font-bold text-purple-400'
        >
          <Shield size={22} />
          AlgoKen
        </Link>

        {/* Desktop Nav */}
        <nav className='hidden md:flex space-x-6 text-gray-300'>
          {navLinks.map((link) => (
            ( link.type !== "mobile" && <Link key={link.name} to={link.href} className='hover:text-white'>
              {link.name}
            </Link>)
          ))}
        </nav>

        {/* Right */}
        <div className='hidden md:flex items-center space-x-4'>
          {user ? (
            <>
              <Bell className='text-gray-300 hover:text-white' />
              <Moon className='text-gray-300 hover:text-white' />

              {/* Dropdown */}
              <div className='relative' ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`}
                    className='w-9 h-9 rounded-full border border-gray-700'
                  />
                </button>

                {dropdownOpen && (
                  <div className='absolute right-0 mt-2 w-44 bg-gray-900 border border-gray-800 rounded-lg shadow-xl'>
                    <div className='px-4 py-2 border-b border-gray-700 text-orange-300 text-md font-semibold'>
                      Hello, {user.firstName}
                    </div>
                    <ul className='text-gray-300'>
                      <li className='px-4 py-2 hover:bg-gray-800'>
                        <Link to='/profile'>My Profile</Link>
                      </li>
                      <li className='px-4 py-2 hover:bg-gray-800'>
                        <Link to='/submissions'>Submissions</Link>
                      </li>
                      <li className='px-4 py-2 hover:bg-gray-800'>
                        <Link to='/settings'>Settings</Link>
                      </li>
                      <li
                        className='px-4 py-2 text-red-400 hover:bg-gray-800 cursor-pointer'
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to='/login'
              className='bg-purple-600 px-4 py-2 rounded text-white'
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='md:hidden text-white'
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='md:hidden fixed top-16 left-0 w-full bg-black border-t border-gray-800 z-50'>
          <div className='flex flex-col px-6 py-5 space-y-4 text-gray-300'>
            {navLinks.map((l) => (
        ( l.vis && <Link
                key={l.name}
                to={l.href}
                onClick={() => setMenuOpen(false)}
                className='block py-2 text-base hover:text-white transition'
              >
                {l.name}
              </Link>)
            ))}

            {user && (
              <>
                <div className='h-px bg-gray-800 my-2' />

                <button
                  onClick={handleLogout}
                  className='text-left py-2 text-red-400 hover:text-red-500 transition'
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
