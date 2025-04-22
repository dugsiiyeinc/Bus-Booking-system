import React from 'react';
import { useTheme } from '../Context/ThemeContext';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-900'} py-12 transition-all duration-300`}>
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-yellow-400">Bus Booking System</h2>
          <p className="text-sm opacity-80">
            Book your travels seamlessly with our trusted and fast bus booking platform.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline hover:text-blue-500 dark:hover:text-yellow-300">Home</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-500 dark:hover:text-yellow-300">About</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-500 dark:hover:text-yellow-300">FAQ</a></li>
            <li><a href="#" className="hover:underline hover:text-blue-500 dark:hover:text-yellow-300">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 text-xl">
            <a href="#" className="hover:text-blue-600 dark:hover:text-yellow-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-yellow-400"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-600 dark:hover:text-yellow-400"><FaInstagram /></a>
            <a href="#" className="hover:text-red-500 dark:hover:text-yellow-400"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-10 text-center text-sm opacity-70">
        © {new Date().getFullYear()} Bus Booking System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
