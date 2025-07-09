import { getContext } from './context/context';

import {createBrowserRouter, RouterProvider} from 'react-router'
import AppLayout from './components/layout/AppLayout';
import { ErrorPage, HomePage } from './Pages';


function App() {
  const {theme} = getContext()

  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
      ]
    }
  ])





  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'} transition-colors duration-200`}>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;