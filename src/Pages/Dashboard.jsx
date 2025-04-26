import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, Users, Settings, Menu, X, Sun, Moon, LogOut } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import SidebarDashboard from "../Components/SidebarDashboard"
import { Toaster } from 'react-hot-toast'
import { Bus } from 'lucide-react';
import { Route } from 'lucide-react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaTicketAlt } from "react-icons/fa"; // icon cusub

function ScheduleButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded">
      <FaRegCalendarAlt />
      Jadwalka
    </button>
  );
}



const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const {  IsLoggedIn,  profile, logout, user}= useAuth();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
   
   logout()
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const navLinks = [
    { to: '/Dashboard/overview', icon: <Home size={20} />, label: 'Overview' },
    { to: '/Dashboard/users', icon: <Users size={20} />, label: 'Users' },
    { to: '/Dashboard/Booking', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className={`${darkMode ? 'dark' : ''} flex min-h-screen`}>      
   
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      
        <header className="md:hidden flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 shadow">
          <button onClick={() => setSidebarOpen(true)} className="focus:outline-none">
            <Menu size={24} />
          </button>
          <span className="text-lg font-bold">Dashboard</span>
          <button onClick={toggleDarkMode} className="focus:outline-none">
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </header>

        <div className={`fixed inset-0 z-40 flex md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            className={`relative flex flex-col w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between p-6">
              <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">Admin Panel</h2>
              <button onClick={() => setSidebarOpen(false)} className="focus:outline-none">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 space-y-4">
  <NavLink
    to="/Dashboard/overview"
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
        isActive
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-inner'
          : 'hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-700'
      }`
    }
  >
    <Home size={20} />
    Overview
  </NavLink>

  

  <NavLink
    to="/Dashboard/BusesIndex"
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
        isActive
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-inner'
          : 'hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-700'
      }`
    }
  >
   <Bus size={20} />

   Buses
  </NavLink>

  <NavLink
    to="/Dashboard/RouteIndex"
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
        isActive
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-inner'
          : 'hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-700'
      }`
    }
  >
<Route size={24} className="text-blue-600" />
  Route
  </NavLink>

  <NavLink
    to="/Dashboard/ScheduleIndex"
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
        isActive
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-inner'
          : 'hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-700'
      }`
    }
  >
 <FaRegCalendarAlt  size={24} className="text-blue-600" />
SChedules
  </NavLink>

  <NavLink
    to="/Dashboard/BookingIndex"
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
        isActive
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-inner'
          : 'hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-700'
      }`
    }
  >
  <FaTicketAlt size={24} className="text-blue-600" /> 
Booking
  </NavLink>

  <NavLink
    to="/Dashboard/Users"
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
        isActive
          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 shadow-inner'
          : 'hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-700'
      }`
    }
  >
    <Users size={20} />
    Users
  </NavLink>
</nav>

          </aside>
        </div>

        <div className="flex flex-1">
      
       <SidebarDashboard/>


          
          <div className="flex-1 flex flex-col">
           
            <header className="hidden md:flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <div className="flex items-center space-x-4">
                <button onClick={toggleDarkMode} className="focus:outline-none">
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition cursor:pointer"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </header>

         
            <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
            <Toaster  reverseOrder={false} />
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
