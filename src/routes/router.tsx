import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import App from "../App";
import AllProduct from "../pages/AllProduct/AllProduct";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Dashboard from "../pages/Dashboard/Dashboard";
import { adminRouter } from "./admin.routes";
import { userRoute } from "./user.routes";
import AdminRouterP from "./AdminRouterP";
import UserRouterP from "./UserRouterP";
import CheckOut from "../pages/CheckOut/CheckOut";
import PaymentIntegrate from "../pages/Payment/PaymentIntefreate";
import { ErrorPage } from "../pages/ErrorPage";
import AboutUs from "../pages/AboutUs";
import RouteGuard from "./RouteGuard";
import UpdateProduct from "../pages/Admin/product/UpdateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/allProduct",
        element: <AllProduct />,
      },
      {
        path: "/productDetails",
        element: <ProductDetails />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/checkOut",
        element: (
          <RouteGuard>
            <CheckOut />
          </RouteGuard>
        ),
      },
      {
        path: "/payment",
        element: (
          <RouteGuard>
            <PaymentIntegrate />
          </RouteGuard>
        ),
      },
    ],
  },
  {
    path: "/dashboard/admin",
    element: (
      <AdminRouterP>
        <Dashboard />
      </AdminRouterP>
    ),
    children: [
      ...adminRouter,
      { path: "updateProduct", element: <UpdateProduct /> },
    ],
  },
  {
    path: "/dashboard/user",
    element: (
      <UserRouterP>
        <Dashboard />
      </UserRouterP>
    ),
    children: userRoute,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
