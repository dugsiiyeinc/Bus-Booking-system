import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';  // Add Sun and Moon icons
import { useAuth } from '../Context/AuthContext';
import supabase from '../Lib/supabase';

import { useTheme } from '../Context/ThemeContext';
import NotFound from '../Components/NotFound';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { IsLoggedIn, profile, logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const id = profile?.session?.user?.id;
  const [userRole, setUserRole] = useState(null); // Role state

  console.log("userRoleeee", userRole);

  useEffect(() => {
    const FetchUserRole = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', id)
          .single();

        if (error) throw error;
        setUserRole(data?.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    FetchUserRole();
  }, [id]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleDashboardClick = () => {
    if (userRole !== 'admin') {
       navigate('/UnAuthenticated'); // Redirect to sign-in
      <NotFound/>
      return;
    }
    navigate('/Dashboard/Overview'); // Redirect to the dashboard page
    toggleMenu();
  };

  return (
    <header className={`sticky top-0 z-50 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'} shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className={`text-2xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-blue-600'}`}>
          🚌 BusBooking
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link to="/" className={`hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} transition`}>Home</Link>
          {IsLoggedIn && (
            <Link to="/Buses" className={`hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} transition`}>Buses</Link>
          )}
         
          <Link to="/About" className={`hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} transition`}>About</Link>
        </nav>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-3">
          {IsLoggedIn ? (
            <div className="flex items-center space-x-3">
              <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                Welcome, {profile?.name}
              </span>

             {
                userRole === 'admin' && (
                  <>
                   <button
                onClick={handleDashboardClick}
                className={`px-4 py-2 cursor-pointer rounded-full ${theme === 'dark' ? 'border-blue-400 text-blue-400 hover:bg-blue-600' : 'border-blue-600 text-blue-600 hover:bg-blue-100'} transition duration-200`}
              >
                Dashboard
              </button>
                  </>
                )
             }

              <button
                onClick={logout}
                className={`px-4 py-2 cursor-pointer rounded-full ${theme === 'dark' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-500 text-white hover:bg-red-600'} transition duration-200`}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/Signin"
                className={`px-4 py-2 rounded-full border ${theme === 'dark' ? 'border-blue-400 text-blue-400 hover:bg-blue-600' : 'border-blue-600 text-blue-600 hover:bg-blue-100'} transition duration-200`}
              >
                Login
              </Link>

              <Link
                to="/Signup"
                className={`px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'} transition duration-200`}
              >
                Signup
              </Link>
            </div>
          )}
        </div>

        {/* Theme Toggle Icon */}
        <button
          onClick={toggleTheme}
          className={`p-2 ${theme === 'dark' ? 'text-white' : 'text-gray-700'}`}
        >
          {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className={`md:hidden ${theme === 'dark' ? 'text-white' : 'text-gray-700'} p-2`}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className={`md:hidden px-4 pb-4 space-y-2 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'} shadow-sm`}>
          <Link to="/" onClick={toggleMenu} className={`block hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Home</Link>
          <Link to="/buses" onClick={toggleMenu} className={`block hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>Buses</Link>
         
          <Link to="/About" onClick={toggleMenu} className={`block hover:${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>About</Link>
          <hr />
          {IsLoggedIn ? (
            <div className="flex flex-col space-y-2">

{
  userRole === 'admin' && (
    <button
      onClick={handleDashboardClick}
      className={`block ${
        theme === 'dark' ? 'text-blue-400 hover:text-blue-600' : 'text-gray-700 hover:text-blue-600'
      }`}
    >
      Dashboard 
    </button>
  )
}


           




              <button onClick={logout} className={`block ${theme === 'dark' ? 'text-red-500' : 'text-red-500'} hover:${theme === 'dark' ? 'text-red-600' : 'text-red-600'}`}>Logout</button>
            </div>
          ) : (
            <>
              <Link to="/Signin" onClick={toggleMenu} className={`block ${theme === 'dark' ? 'text-blue-600' : 'text-blue-600'} font-medium`}>Login</Link>
              <Link to="/Signup" onClick={toggleMenu} className={`cursor-pointer block ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700'} px-3 py-1 rounded text-center mt-1`}>
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
