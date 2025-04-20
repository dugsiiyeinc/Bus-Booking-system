import React from 'react';

const DashboardHeader = () => {
  const handleLogout = () => {
    // Add your logout logic here (e.g., clear tokens, redirect, etc.)
    console.log("User logged out");
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <button 
          onClick={handleLogout} 
          className="text-red-400 hover:text-red-300 underline"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
