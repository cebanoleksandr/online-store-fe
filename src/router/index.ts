import { type RouteObject, createBrowserRouter, redirect } from "react-router-dom";
import App from "../App";
import NotFoundPage from "../pages/NotFoundPage";
import SearchPage from "../pages/SearchPage";
import ProfilePage from "../pages/ProfilePage";
import HomePage from "../pages/HomePage";
import AdminPanelPage from "../pages/AdminPanelPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import About from "../pages/About";
import Reviews from "../pages/Reviews";
import DeliveryAndPaymentPage from "../pages/DeliveryAndPaymentPage";
import ExchangeAndReturnPage from "../pages/ExchangeAndReturnPage";
import BlogPage from "../pages/BlogPage";
import FavoritesPage from "../pages/FavoritesPage";

const loader = () => {
  const token = localStorage.getItem("online-store-token");
  if (!token) throw redirect("/login");
  return null;
}

const authLoader = () => {
  const token = localStorage.getItem("online-store-token");
  if (!!token) throw redirect("/");
  return null;
}

const adminLoader = () => {
  const token = localStorage.getItem("online-store-token");
  const userRole = localStorage.getItem("user-role");

  if (!token) {
    throw redirect("/login");
  }

  if (userRole !== "admin") {
    throw redirect("/"); 
  }

  return null;
};

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: App,
    children: [
      { path: '/', Component: HomePage },
      { path: '/admin', Component: AdminPanelPage, loader: adminLoader },
      { path: '/cart', Component: CartPage, loader },
      { path: '/login', Component: LoginPage, loader: authLoader },
      { path: '/register', Component: RegisterPage, loader: authLoader },
      { path: '/forgot-password', Component: ForgotPasswordPage, loader: authLoader },
      { path: '/products', Component: ProductsPage, loader },
      { path: '/products/:id', Component: ProductDetailsPage, loader },
      { path: '/profile', Component: ProfilePage, loader },
      { path: '/search', Component: SearchPage, loader },
      { path: '/about', Component: About, loader },
      { path: '/reviews', Component: Reviews, loader },
      { path: '/favorites', Component: FavoritesPage, loader },
      { path: '/delivery-and-payment', Component: DeliveryAndPaymentPage, loader },
      { path: '/exchange-and-return', Component: ExchangeAndReturnPage, loader },
      { path: '/blog', Component: BlogPage, loader },
      { path: "*", Component: NotFoundPage },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
