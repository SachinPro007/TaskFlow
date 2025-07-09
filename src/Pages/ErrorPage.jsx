import React from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router';
import { getContext } from '../context/context';

function ErrorPage() {
  const error = useRouteError();
  const { themeStyles } = getContext();
  
  let errorTitle = 'Oops! Something went wrong';
  let errorMessage = 'We apologize for the inconvenience. Please try again later.';
  let errorStatus = '';
  
  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorTitle = error.status === 404 ? 'Page Not Found' : `Error ${error.status}`;
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${themeStyles.container}`}>
      <div className={`max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 border ${themeStyles.card}`}>
        {/* Error Icon Section */}
        <div className={`relative bg-gradient-to-r p-8 flex justify-center border-b-4 ${themeStyles.header}`}>
          <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-red-400 animate-pulse"></div>
          <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-red-400 animate-pulse delay-300"></div>
          <div className={`w-32 h-32 rounded-full flex items-center justify-center shadow-lg ${themeStyles.iconContainer}`}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-20 w-20 animate-bounce ${themeStyles.icon}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
        </div>
        
        {/* Error Content */}
        <div className="p-8 text-center space-y-6">
          <div className="inline-flex items-center justify-center">
            {errorStatus && (
              <span className={`text-5xl font-bold mr-4 ${themeStyles.icon}`}>
                {errorStatus}
              </span>
            )}
            <h1 className={`text-4xl font-bold ${themeStyles.title}`}>
              {errorTitle}
            </h1>
          </div>
          
          <div className="space-y-2">
            {errorStatus === 404 ? (
              <p className={`text-xl ${themeStyles.subtitle}`}>
                The page you're looking for doesn't exist or has been moved.
              </p>
            ) : (
              <p className={`text-xl ${themeStyles.subtitle}`}>
                {errorMessage}
              </p>
            )}
            <p className={`text-lg ${themeStyles.detail}`}>
              Don't worry, let's get you back on track
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link
              to="/"
              className={`px-8 py-3 bg-gradient-to-r text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${themeStyles.homeButton}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Go to Homepage
            </Link>
            <button
              onClick={() => window.location.reload()}
              className={`px-8 py-3 bg-gradient-to-r rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${themeStyles.refreshButton}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Refresh Page
            </button>
          </div>
          
          {/* Only show in development */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 text-left group">
              <summary className={`text-sm cursor-pointer flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${themeStyles.techDetails}`}>
                <span>Technical Details</span>
                <svg className="w-4 h-4 transform group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <pre className={`mt-2 p-4 rounded-lg text-sm overflow-auto max-h-60 ${themeStyles.techContent}`}>
                {JSON.stringify(error, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;