import { createContext, useContext, useState, useMemo } from "react";

const AuthContext = createContext();

// Theme styles that can be used across components
const getThemeStyles = (isDark) => ({
  container: isDark 
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
    : 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50',
  card: isDark 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200',
  header: isDark 
    ? 'from-gray-700 to-gray-600 border-gray-600' 
    : 'from-red-50 to-pink-50 border-red-200',
  iconContainer: isDark 
    ? 'bg-gray-700' 
    : 'bg-red-100',
  icon: isDark 
    ? 'text-red-400' 
    : 'text-red-500',
  title: isDark 
    ? 'text-white' 
    : 'text-gray-800',
  subtitle: isDark 
    ? 'text-gray-300' 
    : 'text-gray-600',
  detail: isDark 
    ? 'text-gray-400' 
    : 'text-gray-500',
  homeButton: isDark 
    ? 'from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600' 
    : 'from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500',
  refreshButton: isDark 
    ? 'from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-gray-200' 
    : 'from-gray-200 to-gray-100 hover:from-gray-300 hover:to-gray-200 text-gray-800',
  techDetails: isDark 
    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
    : 'bg-gray-100 hover:bg-gray-200 text-gray-500',
  techContent: isDark 
    ? 'bg-gray-700 text-gray-300' 
    : 'bg-gray-100 text-gray-800'
});

export const AuthProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || "light");
  const [newTaskHover, setNewTaskHover] = useState(false);
  const [todo, setTodo] = useState(null);
  
  // Memoize theme styles to prevent unnecessary recalculations
  const themeStyles = useMemo(() => getThemeStyles(theme), [theme]);

  return (
    <AuthContext.Provider value={{ 
      theme, 
      setTheme, 
      newTaskHover, 
      setNewTaskHover, 
      todo, 
      setTodo,
      themeStyles
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const getContext = () => {
  return useContext(AuthContext);
};