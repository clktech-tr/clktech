import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { AdminDashboard } from '@/pages/admin/dashboard';
import { AdminLogin } from '@/pages/admin/login';
import { AdminProducts } from '@/pages/admin/products';
import { AdminOrders } from '@/pages/admin/orders';
import { AdminContacts } from '@/pages/admin/contacts';
import { AdminSettings } from '@/pages/admin/settings';
import { ProductForm } from '@/components/admin/ProductForm';

export const adminRouter = createBrowserRouter([
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            element: <AdminProducts />,
          },
          {
            path: 'new',
            element: <ProductForm />,
          },
          {
            path: ':id/edit',
            element: <ProductForm isEditMode />,
          },
        ],
      },
      {
        path: 'orders',
        element: <AdminOrders />,
      },
      {
        path: 'contacts',
        element: <AdminContacts />,
      },
      {
        path: 'settings',
        element: <AdminSettings />,
      },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
]);
