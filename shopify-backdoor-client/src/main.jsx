import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './layout/Root';
import Home from './pages/Home';
import ProjectForm from './pages/ProjectForm'
import Login from './pages/Login'
import Register from './pages/Register'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/form",
        element: <ProjectForm></ProjectForm>,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
       <RouterProvider router={router} />
     </QueryClientProvider>
  </StrictMode>,
)
