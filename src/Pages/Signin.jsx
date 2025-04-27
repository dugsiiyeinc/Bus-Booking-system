import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { signIn } from '../Lib/Auth';
import { useTheme } from '../Context/ThemeContext';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme(); // light or dark

  const HandleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      let { data } = await signIn(email, password);
      console.log("data", data);
      navigate("/");
    } catch (error) {
      setError("Invalid email or password");
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 
      ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-100 via-white to-blue-200'}`}>
      <div className={`backdrop-blur-xl shadow-2xl border rounded-2xl p-8 w-full max-w-md
        ${isDark ? 'bg-gray-800/70 border-gray-700' : 'bg-white/60 border-blue-100'}`}>
        
        <h2 className={`text-3xl font-bold text-center mb-6 ${isDark ? 'text-white' : 'text-blue-700'}`}>
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded-lg p-4 mb-4">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={HandleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <FaEnvelope className={`absolute left-3 top-3 ${isDark ? 'text-gray-300' : 'text-blue-500'}`} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:outline-none placeholder:text-gray-400
                ${isDark 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' 
                  : 'border-blue-200 focus:ring-blue-400'}`}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className={`absolute left-3 top-3 ${isDark ? 'text-gray-300' : 'text-blue-500'}`} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:outline-none placeholder:text-gray-400
                ${isDark 
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-gray-500' 
                  : 'border-blue-200 focus:ring-blue-400'}`}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full cursor-pointer py-2 rounded-lg transition duration-200 font-semibold 
              ${isDark 
                ? 'bg-gray-600 hover:bg-gray-700 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Link to Signup */}
        <p className={`text-sm text-center mt-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Don’t have an account?{' '}
          <Link 
            to="/signup" 
            className={`font-medium hover:underline 
              ${isDark ? 'text-gray-300' : 'text-blue-600'}`}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
