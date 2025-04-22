import React from 'react'
import { useTheme } from '../Context/ThemeContext';
import { useAuth } from '../Context/AuthContext';

const Booking = () => {
  const { theme, toggleTheme } = useTheme();
  const {  IsLoggedIn,  profile, logout, user}= useAuth();
  return (
    <div>
        <h1>Booking</h1>
      
    </div>
  )
}

export default Booking
