import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../features/profile/profileSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message,user } = useSelector(
    (state) => state.auth
  );

  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (activeTab === "login") {
      await dispatch(loginUser(formData)).unwrap();
      dispatch(getUserProfile());
    } else {
      await dispatch(registerUser(formData)).unwrap();
      dispatch(getUserProfile());
    }
  };

  useEffect(() => {
    // Reset after showing message
  if(user){
    navigate("/");
  }
    if (isSuccess || isError) {
      const timeout = setTimeout(() => dispatch(reset()), 3000);
      return () => clearTimeout(timeout);
    }
    
  }, [isSuccess, isError, dispatch]);

  return (
    <div className='relative min-h-screen flex flex-col md:flex-row bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white overflow-hidden'>
      <div className='flex-1 flex items-center justify-center p-6 md:p-12'>
        <div className='w-full max-w-md bg-gradient-to-br from-purple-600/20 to-purple-900/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 border border-purple-500/30'>
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
              disabled={isLoading}
              className='w-full py-2 mt-4 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg font-semibold hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-purple-800/30'
            >
              {isLoading
                ? "Processing..."
                : activeTab === "login"
                ? "Login"
                : "Register"}
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

      <div className='absolute bottom-4 w-full text-center text-sm text-gray-500'>
        © {new Date().getFullYear()} Codex — Code. Compete. Create.
      </div>
    </div>
  );
}
