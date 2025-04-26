import React from 'react';
import { useTheme } from '../Context/ThemeContext';
import { FaBusAlt, FaHandshake, FaRocket, FaUsers } from 'react-icons/fa';
import { FaEye, FaBullseye } from 'react-icons/fa';


const About = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-all duration-300`}>

<section className="relative w-full min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-700"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1950&q=80)',
          filter: theme === 'dark' ? 'brightness(0.3)' : 'brightness(0.6)',
        }}
      />

      {/* Dark/Light Gradient Overlay */}
      <div className={`absolute inset-0 z-10 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-black/70 via-black/60 to-gray-900/60'
          : 'bg-gradient-to-br from-white/50 via-white/40 to-blue-100/40'
      }`} />

      {/* Content */}
      <div className="relative z-20 text-center max-w-3xl p-6">
        <FaBusAlt className="text-7xl md:text-8xl mb-6 mx-auto text-blue-500 dark:text-yellow-300 animate-pulse" />

        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight text-white drop-shadow-xl">
          Empowering Travel, <br /> One Bus at a Time
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 dark:text-gray-300 font-medium max-w-2xl mx-auto mt-4">
          At BusBooking, we believe every journey matters. We're committed to creating seamless, safe, and smart travel experiences across cities and communities.
        </p>
      </div>
    </section>


      {/* Vision & Mission Section */}
      <section className={`py-20 px-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12">
          Our <span className={`${theme === 'dark' ? 'text-yellow-400' : 'text-blue-600'}`}>Vision</span> & <span className={`${theme === 'dark' ? 'text-yellow-400' : 'text-blue-600'}`}>Mission</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Vision */}
          <div className={`p-8 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <FaEye className="text-5xl mb-4 text-blue-600 dark:text-yellow-400" />
            <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
            <p className="text-lg leading-relaxed opacity-90">
              To become the leading platform for safe, efficient, and reliable bus transportation, connecting people and cities across the nation with ease and innovation.
            </p>
          </div>

          {/* Mission */}
          <div className={`p-8 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <FaBullseye className="text-5xl mb-4 text-blue-600 dark:text-yellow-400" />
            <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
            <p className="text-lg leading-relaxed opacity-90">
              To simplify travel by providing top-notch booking experiences, punctual services, and unwavering support — making every journey stress-free and enjoyable.
            </p>
          </div>
        </div>
      </div>
    </section>
  
      {/* Why Choose Us Section */}
     
      <section className={`py-20 px-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-blue-50 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Why <span className={`${theme === 'dark' ? 'text-yellow-400' : 'text-blue-600'}`}>Choose Us?</span>
        </h2>
        <p className="text-lg md:text-xl mb-14 opacity-80 max-w-2xl mx-auto">
          We make every journey matter by offering speed, reliability, and unmatched service.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className={`group p-8 rounded-3xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <FaHandshake className="text-5xl mb-6 text-blue-600 dark:text-yellow-300 transition-transform group-hover:scale-110" />
            <h4 className="text-2xl font-semibold mb-3">Trustworthy Service</h4>
            <p className="text-md opacity-80 leading-relaxed">
              We’re committed to reliability and customer satisfaction at every step of your travel.
            </p>
          </div>

          {/* Card 2 */}
          <div className={`group p-8 rounded-3xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <FaRocket className="text-5xl mb-6 text-blue-600 dark:text-yellow-300 transition-transform group-hover:scale-110" />
            <h4 className="text-2xl font-semibold mb-3">Fast & Easy Booking</h4>
            <p className="text-md opacity-80 leading-relaxed">
              Book your trip with just a few clicks. Our smooth interface makes planning effortless.
            </p>
          </div>

          {/* Card 3 */}
          <div className={`group p-8 rounded-3xl shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <FaUsers className="text-5xl mb-6 text-blue-600 dark:text-yellow-300 transition-transform group-hover:scale-110" />
            <h4 className="text-2xl font-semibold mb-3">Customer First</h4>
            <p className="text-md opacity-80 leading-relaxed">
              24/7 support from real people who care about your comfort and peace of mind.
            </p>
          </div>
        </div>
      </div>
    </section>

    </div>
  );
};

export default About;
