import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProfileLayout from '../layouts/ProfileLayout';
import AdminPreviewLayout from '../layouts/AdminPreviewLayout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import HomePage from '../pages/Home';
import ShopPage from '../pages/Shop';
import ProductDetailPage from '../pages/ProductDetail';
import CartPage from '../pages/Cart';
import CheckoutPage from '../pages/Checkout';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import ForgotPasswordPage from '../pages/ForgotPassword';
import ProfilePage from '../pages/Profile';
import OrdersPage from '../pages/Orders';
import OrderDetailPage from '../pages/OrderDetail';
import SearchPage from '../pages/Search';
import AboutPage from '../pages/About';
import ContactPage from '../pages/Contact';
import NotFoundPage from '../pages/NotFound';
import {
  CategoriesPage,
  CouponsPage,
  DashboardPage,
  InventoryPage,
  OrderDetailPage as AdminOrderDetailPage,
  OrdersPage as AdminOrdersPage,
  ProductCreatePage,
  ProductEditPage,
  ProductsPage,
  ReportsPage,
  ReviewsPage,
  SettingsPage,
  UsersPage,
} from '../pages/Admin';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'product/:id', element: <ProductDetailPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },

      {
        element: <PrivateRoute />,
        children: [
          { path: 'checkout', element: <CheckoutPage /> },
        ],
      },

      {
        element: <ProfileLayout />,
        children: [
          {
            element: <PrivateRoute />,
            children: [
              { path: 'profile', element: <ProfilePage /> },
              { path: 'orders', element: <OrdersPage /> },
              { path: 'orders/:id', element: <OrderDetailPage /> },
            ],
          },
        ],
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },

  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'register', element: <RegisterPage /> },
          { path: 'forgot-password', element: <ForgotPasswordPage /> },
        ],
      },
    ],
  },

  {
    path: 'admin',
    element: <AdminPreviewLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/create', element: <ProductCreatePage /> },
      { path: 'products/edit', element: <ProductEditPage /> },
      { path: 'categories', element: <CategoriesPage /> },
      { path: 'orders', element: <AdminOrdersPage /> },
      { path: 'orders/detail', element: <AdminOrderDetailPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'reviews', element: <ReviewsPage /> },
      { path: 'coupons', element: <CouponsPage /> },
      { path: 'inventory', element: <InventoryPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);

export default router;
