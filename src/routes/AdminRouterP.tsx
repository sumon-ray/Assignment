import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";

import { authData } from "../redux/fetchers/auth/authSlice";
type TRole = {
  role: string | null;
};
const AdminRouterP = ({ children }: { children: ReactNode }) => {
  const user: TRole = useAppSelector(authData) as TRole;
  if (user.role === "admin") {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default AdminRouterP;
