import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DataProvider from "./components/DataProvider";

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { LoginPage } from './pages/LoginPage'
import './index.css'
import Dashboard from './pages/Dashboard';

const router = createBrowserRouter([{
  path: '/',
  element: <LoginPage />
}, {
  path: '/dashboard',
  element: <Dashboard />
}
], { basename: '/ecolux-test' })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </StrictMode>,
)
