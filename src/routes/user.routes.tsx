import { ChangePassword } from "../pages/Users/ChangePassword";
import Profile from "../pages/Users/Profile";
import ViewOrder from "../pages/Users/ViewOrder";
import { TRouter } from "../utils/typeRoute";

export const userRoute: TRouter[] = [
  {
    name: "Profile Manage",
    path: "profile",
    element: <Profile />,
  },
  {
    name: "Order Manage",
    path: "viewOrder",
    element: <ViewOrder />,
  },
  {
    name: "Password Manage",
    path: "changePassword",
    element: <ChangePassword />,
  },
];
