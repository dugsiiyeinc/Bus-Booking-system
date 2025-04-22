import React from 'react'
import { useTheme } from '../Context/ThemeContext';

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>

        <h1>Home</h1>
      
    </div>
  )
}

export default Home
