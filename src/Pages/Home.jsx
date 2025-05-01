import React from 'react';
import { useTheme } from '../Context/ThemeContext';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';  
import { FaBusAlt, FaClock, FaSearchLocation, FaPhoneAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Home = () => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(null); // Track which FAQ is open
  
  const faqData = [
    { question: "How do I book a ticket?", answer: "To book a ticket, you can select your route and choose the bus schedule, then proceed to payment." },
    { question: "What payment methods are accepted?", answer: "We accept credit cards, debit cards, and PayPal." },
    { question: "Can I cancel my booking?", answer: "Yes, cancellations are allowed up to 24 hours before the departure time for a full refund." },
    { question: "How can I contact customer support?", answer: "You can reach our customer support team via email at support@busbooking.com or call us at 1-800-123-4567." },
  ];

  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index); // Toggle FAQ open state
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-all duration-300`}>
      
      {/* Header */}
     
{/* Hero Section */}
<section className={`relative flex flex-col items-center justify-center text-center py-36 px-8 
  ${theme === 'dark' ? 'bg-gradient-to-b from-gray-800 to-gray-900 text-white' : 'bg-gradient-to-br from-blue-100 to-white text-gray-900'}`}>
  
  {/* Background Image or Gradient */}
  <div className="absolute inset-0 bg-cover bg-center" 
    style={{
      backgroundImage: 'url(https://source.unsplash.com/1600x900/?bus,travel)',
      filter: theme === 'dark' ? 'brightness(0.5)' : 'brightness(0.6)', // Adjust brightness for dark mode
    }}></div>

  {/* Content Overlay */}
  <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-b from-transparent to-black opacity-50' : 'bg-gradient-to-b from-transparent to-white opacity-30'}`}></div>

  {/* Hero Icon */}
  <FaBusAlt className="text-8xl mb-6 text-blue-600 dark:text-yellow-300 animate-pulse" />

  {/* Hero Title */}
  <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-wider drop-shadow-lg">
    Welcome to <span className={`${theme === 'dark' ? 'text-yellow-400' : 'text-blue-600'}`}>Bus Booking System</span>
  </h2>

  {/* Subtitle */}
  <p className="text-xl max-w-3xl mb-8 mx-auto opacity-80">
    Book your bus travel with ease. Browse routes, pick your seats, and get going in just a few clicks.
  </p>

  {/* Call to Action Button */}
  <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
    Get Started
  </button>
</section>

{/* Features Section */}
{/* Features Section */}
<section className={`py-16 px-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
  <h3 className="text-4xl font-bold text-center mb-12">Why Choose Our Bus Booking System?</h3>
  
  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
    {/* Feature 1 */}
    <div className={`p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'} hover:bg-blue-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105`}>
      <FaClock className="text-5xl mb-6 text-blue-600 dark:text-yellow-300 transition-all duration-300 transform hover:rotate-12" />
      <h4 className="text-2xl font-semibold mb-4">Timely Departures</h4>
      <p className="text-lg opacity-80">Never worry about missing a bus! Our buses always depart on time.</p>
    </div>

    {/* Feature 2 */}
    <div className={`p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'} hover:bg-blue-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105`}>
      <FaSearchLocation className="text-5xl mb-6 text-blue-600 dark:text-yellow-300 transition-all duration-300 transform hover:rotate-12" />
      <h4 className="text-2xl font-semibold mb-4">Widespread Routes</h4>
      <p className="text-lg opacity-80">Choose from multiple routes across various cities to reach your destination smoothly.</p>
    </div>

    {/* Feature 3 */}
    <div className={`p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'} hover:bg-blue-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105`}>
      <FaPhoneAlt className="text-5xl mb-6 text-blue-600 dark:text-yellow-300 transition-all duration-300 transform hover:rotate-12" />
      <h4 className="text-2xl font-semibold mb-4">24/7 Customer Support</h4>
      <p className="text-lg opacity-80">Our support team is available 24/7 to assist with booking and travel inquiries.</p>
    </div>
  </div>
</section>

{/* Featured Routes Section */}
<section className={`py-16 px-6 ${theme === 'dark' ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white' : 'bg-gradient-to-r from-blue-100 to-white text-gray-900'}`}>
  <h3 className="text-4xl font-bold text-center mb-12 tracking-wide transform transition-all duration-300 hover:scale-105">
    Featured Routes
  </h3>
  
  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {/* Example Route 1 */}
    <div className="p-8 rounded-xl shadow-lg bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 hover:scale-105 transition-all duration-300 transform hover:shadow-2xl">
      <div className="bg-cover bg-center h-48 rounded-lg" style={{backgroundImage: 'url(https://source.unsplash.com/1600x900/?city,travel)'}}></div>
      <h4 className="text-2xl font-semibold mt-6 mb-2 hover:text-blue-700 transition-all duration-300">Muqdisho To Baydhabo</h4>
      <p className="text-lg opacity-80 hover:text-blue-600 transition-all duration-300">Choose from multiple departures daily.</p>
    </div>

    {/* Example Route 2 */}
    <div className="p-8 rounded-xl shadow-lg bg-gradient-to-r from-yellow-400 to-yellow-200 hover:scale-105 transition-all duration-300 transform hover:shadow-2xl">
      <div className="bg-cover bg-center h-48 rounded-lg" style={{backgroundImage: 'url(https://source.unsplash.com/1600x900/?city,travel)'}}></div>
      <h4 className="text-2xl font-semibold mt-6 mb-2 hover:text-yellow-700 transition-all duration-300">Galkio to Garowe</h4>
      <p className="text-lg opacity-80 hover:text-yellow-600 transition-all duration-300">Book your seat now for a smooth ride!</p>
    </div>

    {/* Example Route 3 */}
    <div className="p-8 rounded-xl shadow-lg bg-gradient-to-r from-green-400 to-green-200 hover:scale-105 transition-all duration-300 transform hover:shadow-2xl">
      <div className="bg-cover bg-center h-48 rounded-lg" style={{backgroundImage: 'url(https://source.unsplash.com/1600x900/?nature,travel)'}}></div>
      <h4 className="text-2xl font-semibold mt-6 mb-2 hover:text-green-700 transition-all duration-300">LaasCaanood to Hargaysa</h4>
      <p className="text-lg opacity-80 hover:text-green-600 transition-all duration-300">Enjoy the scenic route with comfort.</p>
    </div>
  </div>
</section>





{/* Testimonials Section */}
<section className={`py-16 px-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
  <h3 className="text-4xl font-bold text-center mb-12">What Our Customers Say</h3>

  <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center">
    {/* Testimonial 1 */}
    <div className={`p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'} hover:scale-105 transition-all duration-300 transform`}>
      <p className="text-lg italic mb-4 opacity-80">
        "This bus booking system made my travel plans so easy! Booking was a breeze, and the service is top-notch."
      </p>
      <div className="flex justify-center items-center mt-6">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Customer 1"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="font-semibold">Abdale Axmed</p>
          <p className="text-sm text-gray-500">FrontEnd Developer</p>
        </div>
      </div>
    </div>
    

    

    {/* Testimonial 2 */}
    <div className={`p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'} hover:scale-105 transition-all duration-300 transform`}>
      <p className="text-lg italic mb-4 opacity-80">
        "I love the wide variety of routes available. It makes booking buses much easier and faster. Highly recommend!"
      </p>
      <div className="flex justify-center items-center mt-6">
        <img
          src="https://randomuser.me/api/portraits/women/45.jpg"
          alt="Customer 2"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="font-semibold">Maxmed jama</p>
          <p className="text-sm text-gray-500">Frequent Traveler</p>
        </div>
      </div>
    </div>

    {/* Testimonial 3 */}
    <div className={`p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-50'} hover:scale-105 transition-all duration-300 transform`}>
      <p className="text-lg italic mb-4 opacity-80">
        "The customer service is exceptional! They were available to assist with all my queries during the booking process."
      </p>
      <div className="flex justify-center items-center mt-6">
        <img
          src="https://randomuser.me/api/portraits/men/20.jpg"
          alt="Customer 3"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="font-semibold">Xaliimo Maxamed</p>
          <p className="text-sm text-gray-500">Solo Traveler</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section className={`py-16 px-6 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h3 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h3>

      <div className="max-w-3xl mx-auto">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`p-6 mb-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer
              ${theme === 'dark' ? 
                open === index 
                  ? 'bg-gradient-to-r from-gray-800 to-gray-700' 
                  : 'bg-gray-800 hover:bg-gray-700'
                : 
                open === index 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-300 text-white' 
                  : 'bg-blue-50 hover:bg-blue-100'
              }`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h4 className="text-2xl font-semibold">
                {item.question}
              </h4>
              <div className={`text-2xl ${theme === 'dark' ? 'text-yellow-400' : 'text-blue-600'}`}>
                {open === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
            </div>
            {open === index && (
              <p className={`mt-4 text-lg opacity-80 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>

    </div>
  );
};

export default Home;
