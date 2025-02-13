import Manageuser from "../pages/Admin/Manageuser";
import Ordermanage from "../pages/Admin/Ordermanage";
import ProductManage from "../pages/Admin/ProductManage";
import { TRouter } from "../utils/typeRoute";

export const adminRouter: TRouter[] = [
  {
    name: "User Manage",
    path: "manageUser",
    element: <Manageuser />,
  },
  {
    name: "Product Manage",
    path: "manageProduct",
    element: <ProductManage />,
  },
  {
    name: "Order Manage",
    path: "orderManage",
    element: <Ordermanage />,
  },
];
