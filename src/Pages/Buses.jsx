import React, { useEffect, useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import supabase from "../Lib/supabase";
import { FaBusAlt, FaClock, FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Buses = () => {
  const { theme } = useTheme();
  const [schedules, setSchedules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedules = async () => {
      const { data, error } = await supabase
        .from("Schedules")
        .select(`
          id,
          departure_time,
          price,
          days_of_week,
          Buses ( name, plate_number,TotalSeats ),
          Routes ( From_city, To_city )
        `)
        .order("id", { ascending: true })  // Sort by id in descending order (most recent first)
      // Optional: limit to only the last 10 schedules
    
      if (error) {
        console.error("Error fetching schedules:", error.message);
      } else {
        setSchedules(data);
      }
    };
    
    fetchSchedules();
    
  }, []);

  return (
    <div className={`py-14 min-h-screen transition duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-blue-50 text-gray-800'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-12 text-center">🚍 Explore Bus Schedules</h2>

        {schedules.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No schedules found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {schedules.map((item) => (
              <div
                key={item.id}
                className={`relative bg-white dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 p-6 group transform hover:scale-105`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FaBusAlt className="text-blue-600 group-hover:scale-110 transition-transform duration-300 text-xl" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{item.Buses?.name}</h3>
                  </div>
                  <span className="text-xs font-mono text-gray-400 dark:text-gray-300">{item.Buses?.plate_number}</span>
                </div>

                <div className="text-md font-medium text-gray-700 dark:text-gray-100 flex items-center gap-2 mb-3">
                  <FaMapMarkerAlt className="text-green-500" />
                  {item.Routes?.From_city}
                  <span className="text-gray-400">→</span>
                  {item.Routes?.To_city}
                </div>

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2 gap-2">
                  <FaClock className="text-yellow-500" />
                  <span className="font-medium">{item.departure_time}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-3 gap-2">
                  <FaDollarSign className="text-green-600" />
                  <span className="font-semibold">${item.price}</span>
                </div>

                 {/* Show TotalSeats */}
                 <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <span className="font-medium">Total Seats: {item.Buses?.TotalSeats}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {item.days_of_week?.map((day, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-700/30 dark:text-blue-200 px-2 py-1 rounded-full font-medium"
                    >
                      {day}
                    </span>
                  ))}
                </div>

                <div className="mb-5">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${
                      item.status === "departed"
                        ? "bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300"
                        : "bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300"
                    }`}
                  >
                    {item.status === "departed" ? "🛫 Departed" : "✅ Active"}
                  </span>
                </div>

                <button
  disabled={item.status === "departed"}
  onClick={() => navigate(`/booking/${item.id}`)}
  className={`w-full py-2 px-4 rounded-xl font-bold text-sm transition duration-300 shadow-lg ${
    item.status === "departed"
      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
      : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90"
  }`}
>
  {item.status === "departed" ? "Not Available" : "Book Now"}
</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Buses;
