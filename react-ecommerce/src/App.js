import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { Login } from "./features/auth/components/Login";
import { Signup } from "./features/auth/components/Signup";

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Cart } from "./features/cart/Cart";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/Checkout";
import ProductsDetails from "./features/productslist/components/productsDetails";
import ProductDetailPage from "./pages/ProductDetail";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrders from "./features/user/components/UserOrder";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfile from "./features/user/components/UserProfile";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import ProductForm from "./features/admin/ProductForm";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <CheckoutPage></CheckoutPage>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path:'/order-success/:id',
    element: (
      <OrderSuccessPage></OrderSuccessPage>
    )
  },
  {
    path:'/orders',
    element: (
      <UserOrderPage></UserOrderPage>
      // we will add page later right now use 
    )
  },
  {
    path:'/profile',
    element: (
      <UserProfilePage></UserProfilePage>
      // we will add page later right now use 
    )
  },
  {
    path:'/logout',
    element: (
      <Logout></Logout>
    )
  },
  {
    path:'/forgot-password',
    element: (
      <ForgotPasswordPage></ForgotPasswordPage>
    )
  },
  {
    path:'/admin',
    element: (
      <ProtectedAdmin>
      <AdminHome></AdminHome>
      </ProtectedAdmin>
    )
  },
  {
    path:'/admin/product-form',
    element: (
      <ProtectedAdmin>
      <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    )
  },
  {
    path:'/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
      <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    )
  },
  {
    path:'/admin/orders',
    element: (
      <ProtectedAdmin>
      <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    )
  },
  {
    path:'*',
    element:(
      <PageNotFound></PageNotFound>
    )
  }
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch,user]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
