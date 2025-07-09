import React from "react";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

function ErrorComponent({ error, onRetry, className = "" }) {
  return (
    <div 
      className={`flex flex-col items-center justify-center p-8 rounded-xl border 
        bg-red-50/80 dark:bg-red-900/10
        border-red-200 dark:border-red-900/30
        shadow-lg shadow-red-100/30 dark:shadow-red-900/10
        animate-fadeIn ${className}`}
    >
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
          <FiAlertCircle className="w-12 h-12 text-red-500 dark:text-red-400 animate-pulse" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">!</span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-3 text-center">
        Something Went Wrong
      </h2>
      
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-center max-w-md">
        {error?.message || error || "We encountered an unexpected error"}
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors flex items-center gap-2"
        >
          <FiRefreshCw className="w-4 h-4" />
          Refresh Page
        </button>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            Retry Action
          </button>
        )}
      </div>

      {process.env.NODE_ENV === 'development' && error && (
        <details className="mt-6 w-full max-w-md">
          <summary className="text-sm text-red-500 dark:text-red-400 cursor-pointer">
            Technical Details
          </summary>
          <pre className="mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg text-xs overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}

export default ErrorComponent;