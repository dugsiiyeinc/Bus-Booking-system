import React from 'react'
import { useTheme } from '../Context/ThemeContext';

const About = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
        <h1>About</h1>
      
    </div>
  )
}

export default About
