import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import InvoiceForm from './pages/Invoice/InvoiceForm.tsx';
import Login from './pages/auth/Login.tsx';
import Register from './pages/auth/Register.tsx';
import InvoiceTable from './pages/Invoice/InvoiceTable.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext.tsx';
import ProtectedRoute from './components/ProtectedRoutes.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),

    children: [
      {
        path: '/invoice',
        element: <InvoiceTable />,
      },
      {
        path: '/newInvoice',
        element: <InvoiceForm />,
      },
      {
        path: '/newInvoice/:id',
        element: <InvoiceForm />,
      },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
  { path: 'register', element: <Register /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
