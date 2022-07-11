import "../styles/dark-mode/darkMode.css";
import React from "react";
import { setTheme } from '../store/slices/App';
import { useDispatch } from 'react-redux';



const DarkMode = () => {
    const dispatch = useDispatch();

    const setDark = () => {
        localStorage.setItem("theme", "dark");
        dispatch(setTheme("dark"))
        document.documentElement.setAttribute("data-theme", "dark");
      };
      
      const setLight = () => {
        localStorage.setItem("theme", "light");
        dispatch(setTheme("light"))
        document.documentElement.setAttribute("data-theme", "light");
      };
      
      const storedTheme = localStorage.getItem("theme");
      
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      
      const defaultDark =
        storedTheme === "dark" || (storedTheme === null && prefersDark);
      
      if (defaultDark) {
        setDark();
      }
      
      const toggleTheme = (e) => {
        if (e.target.checked) {
          setDark();
        } else {
          setLight();
        }
      };

  return (
    <div className="toggle-theme-wrapper">
      <span>☀️</span>
      <label className="toggle-theme" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          onChange={toggleTheme}
          defaultChecked={defaultDark}
        />
        <div className="slider round"></div>
      </label>
      <span>🌒</span>
    </div>
  );
};

export default DarkMode;
