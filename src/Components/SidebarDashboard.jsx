import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Users, Settings, Menu, X, Sun, Moon, LogOut } from 'lucide-react';
import { Bus } from 'lucide-react';
import { Route } from 'lucide-react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaTicketAlt } from "react-icons/fa"; // icon cusub
import supabase from '../Lib/supabase';

function ScheduleButton() {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded">
      <FaRegCalendarAlt />
      Jadwalka
    </button>
  );
}



const SidebarDashboard = () => {
  const [pendingCount, setPendingCount] = useState(0);

  const fetchPendingCount = async () => {
    const { count, error } = await supabase
      .from("Bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending");

    if (error) {
      console.error("Error fetching pending bookings count:", error.message);
    } else {
      setPendingCount(count); // Update the state to trigger re-render
    }
  };

  useEffect(() => {
    // Fetch initial pending bookings count
    fetchPendingCount();

    // Verify Supabase real-time
    const verifySupabaseRealTime = async () => {
      try {
        // List all current channels
        const channels = supabase.getChannels();
        console.log("Current active channels", channels.length);

        // Test fetching data (useful for debugging connection)
        const { error, data } = await supabase
          .from("Bookings")
          .select("*")
          .eq("status", "pending");

        if (error) {
          console.error("Error connecting to Supabase:", error);
        } else {
          console.log("Connected to Supabase successfully, pending count:", data);
        }
      } catch (error) {
        console.log("Error during real-time check:", error);
      }
    };

    // Run the verification function
    verifySupabaseRealTime();

    // Cleanup any existing subscriptions first
    supabase.getChannels().forEach((channel) => {
      console.log("Found channel:", channel.topic);
      supabase.removeChannel(channel); // Remove the channel to avoid duplicates
    });

    // Create a new subscription for the Bookings table
    const bookingChannel = supabase
      .channel("Bookings-channel") // Unique name for the channel
      .on(
        "postgres_changes", 
        {
          event: "INSERT",
          schema: "public",
          table: "Bookings",
          filter: "status=eq.pending",
        },
        (payload) => {
          console.log("Insert Event received:", payload);
          fetchPendingCount(); // Re-fetch the pending count after insert
        }
      )
      .on(
        "postgres_changes", 
        {
          event: "UPDATE",
          schema: "public",
          table: "Bookings",
          filter: "status=eq.pending",
        },
        (payload) => {
          console.log("Update Event received:", payload);
          fetchPendingCount(); // Re-fetch the pending count after update
        }
      )
      .on(
        "postgres_changes", 
        {
          event: "DELETE",
          schema: "public",
          table: "Bookings",
          filter: "status=eq.pending",
        },
        (payload) => {
          console.log("Delete Event received:", payload);
          fetchPendingCount(); // Re-fetch the pending count after delete
        }
      )
      .subscribe();

    // Cleanup function for component unmount
    return () => {
      supabase.getChannels().forEach((channel) => {
        console.log("Removing channel:", channel.topic);
        supabase.removeChannel(channel); // Remove all active channels when the component unmounts
      });
    };
  }, []);

  return (
      <aside className="hidden md:flex md:flex-col w-64 bg-white dark:bg-gray-800 shadow-lg p-6">
      <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mb-8">Admin Panel</h2>
      <nav className="flex-1 space-y-4">
        <NavLink
          to="/Dashboard/Overview"
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
  <span className="text-red-900 font-semibold">{pendingCount}</span>
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
  )
}

export default SidebarDashboard
