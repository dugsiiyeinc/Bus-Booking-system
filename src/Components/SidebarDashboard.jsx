import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Users, Settings, Menu, X, Sun, Moon, LogOut } from 'lucide-react';
import { Bus } from 'lucide-react';
import { Route } from 'lucide-react';
import { FaRegCalendarAlt } from 'react-icons/fa';

function ScheduleButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded">
      <FaRegCalendarAlt />
      Jadwalka
    </button>
  );
}



const SidebarDashboard = () => {
  return (
      <aside className="hidden md:flex md:flex-col w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
      <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mb-8">Admin Panel</h2>
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

      Schedules
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
  )
}

export default SidebarDashboard
