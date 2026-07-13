import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProfileLayout from '../layouts/ProfileLayout';
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
]);

export default router;
