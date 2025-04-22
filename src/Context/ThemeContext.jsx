import React, { createContext, useReducer, useContext, useEffect, useState } from 'react';
import { themeReducer } from '../Reducer/themeReducer';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, dispatch] = useReducer(themeReducer, 'light');
  const [isLoaded, setIsLoaded] = useState(false); // Wait for localStorage

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      dispatch({ type: 'SET_THEME', payload: storedTheme });
    }
    setIsLoaded(true); // now we can render
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('theme', theme);
    }
  }, [theme, isLoaded]);

  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' });
  const setTheme = (mode) => dispatch({ type: 'SET_THEME', payload: mode });

  // Prevent rendering until theme is loaded
  if (!isLoaded) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
