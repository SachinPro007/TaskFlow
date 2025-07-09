import React, { useState } from 'react';
import { getContext } from '../context/context';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

function ApiDemoNotice() {
  const { theme, themeStyles } = getContext();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={`mb-6 p-4 rounded-lg border transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-800/70 border-gray-700 shadow-lg shadow-gray-900/20'
        : 'bg-blue-50/90 border-blue-200 shadow-lg shadow-blue-100/30'
    } relative animate-fadeIn`}>
      <div className="flex gap-3">
        <div className={`mt-0.5 flex-shrink-0 ${
          theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500'
        }`}>
          <FiAlertTriangle className="w-5 h-5" />
        </div>
        
        <div className="flex-1">
          <h3 className={`font-semibold mb-1.5 ${
            theme === 'dark' ? 'text-gray-100' : 'text-blue-900'
          }`}>
            Demo Notice
          </h3>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-blue-800'
          }`}>
            This app uses a mock API. Your tasks will appear to save, but they won't be stored permanently.
            All new tasks will show ID 101 because this is a demonstration API.
          </p>
        </div>
        
        <button 
          onClick={() => setIsVisible(false)}
          className={`p-1 rounded-full transition-colors ${
            theme === 'dark' 
              ? 'hover:bg-gray-700/50 text-gray-400 hover:text-gray-200'
              : 'hover:bg-blue-100/70 text-blue-500 hover:text-blue-700'
          }`}
          aria-label="Close notice"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>
      
      {/* Progress bar that disappears when closing */}
      <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${
        theme === 'dark' 
          ? 'from-yellow-400 to-yellow-600' 
          : 'from-yellow-400 to-yellow-500'
      } animate-progress`}></div>
    </div>
  );
}

export default ApiDemoNotice;