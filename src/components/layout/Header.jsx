import React, { useEffect } from "react";
import { getContext } from "../../context/context";
import { NavLink } from "react-router";
import { FiMoon, FiSun, FiPlus } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";

function Header() {
  const { theme, setTheme } = getContext();

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-lg transition-colors duration-300  ${
        theme === "dark" ? "bg-gray-900/80" : "bg-white/95"
      } border-b ${
        theme === "dark" ? "border-gray-800" : "border-gray-200"
      } shadow-sm`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center max-w-7xl">
        <NavLink 
          to="/" 
          className="flex items-center gap-2 group"
          aria-label="Home"
        >
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
              theme === "dark" 
                ? "bg-purple-600/20 group-hover:bg-purple-600/30" 
                : "bg-blue-500/10 group-hover:bg-blue-500/20"
            }`}
          >
            <FaTasks className="h-5 w-5 text-blue-500 dark:text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            TaskFlow
          </h1>
        </NavLink>

        <div className="flex items-center gap-4">
                    
          <button
            onClick={handleTheme}
            className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 ${
              theme === "dark"
                ? "bg-gray-800 hover:bg-gray-700 focus:ring-purple-500/30"
                : "bg-gray-100 hover:bg-gray-200 focus:ring-blue-500/30"
            }`}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <FiMoon className="h-5 w-5 text-gray-700" />
            ) : (
              <FiSun className="h-5 w-5 text-yellow-300" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;