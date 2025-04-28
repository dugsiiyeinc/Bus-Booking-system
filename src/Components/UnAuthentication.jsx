import React from 'react';
import { ShieldOff } from 'lucide-react'; 
import { useTheme } from '../Context/ThemeContext';

const UnAuthentication = () => {
  const { theme } = useTheme(); 

  return (
    <div className={`flex items-center justify-center min-h-screen px-4 
      ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className={`p-4 rounded-full 
            ${theme === 'dark' ? 'bg-red-900' : 'bg-red-100'}`}>
            <ShieldOff className={`h-16 w-16 
              ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`} />
          </div>
        </div>

        <h1 className={`text-5xl font-bold mb-4 
          ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          403 - Access Forbidden
        </h1>

        <p className={`text-lg mb-6 
          ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Waan ka xunnahay, ma haysid ogolaansho aad ku gasho boggan.
        </p>

        <a
          href="/"
          className="inline-block bg-red-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-600 transition duration-300"
        >
          Ku Laabo Bogga Hore
        </a>
      </div>
    </div>
  );
};

export default UnAuthentication;
