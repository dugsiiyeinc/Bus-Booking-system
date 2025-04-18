import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-blue-600">
          🚌 BusBooking
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-gray-700 text-sm font-medium">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/buses" className="hover:text-blue-600 transition">Buses</Link>
          <Link to="/bookings" className="hover:text-blue-600 transition">Bookings</Link>
          <Link to="/About" className="hover:text-blue-600 transition">About</Link>
        </nav>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex space-x-4">
          <Link to="/Signin" className="px-4 py-1 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
            Login
          </Link>
          <Link to="/Signup" className="px-4 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
            Signup
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-gray-700 p-2">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow-sm">
          <Link to="/" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/buses" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600">Buses</Link>
          <Link to="/bookings" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600">Bookings</Link>
          <Link to="/About" onClick={toggleMenu} className="block text-gray-700 hover:text-blue-600">About</Link>
          <hr />
          <Link to="/Signin" onClick={toggleMenu} className="block text-blue-600 font-medium">Login</Link>
          <Link to="/Signup" onClick={toggleMenu} className="block text-white bg-blue-600 px-3 py-1 rounded text-center mt-1 hover:bg-blue-700">
            Signup
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
