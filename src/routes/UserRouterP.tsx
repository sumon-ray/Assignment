import { ReactNode } from "react";
import { authData } from "../redux/fetchers/auth/authSlice";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";

type TRole = {
  role: string | null;
};
const UserRouterP = ({ children }: { children: ReactNode }) => {
  const user: TRole = useAppSelector(authData) as TRole;
  if (user.role === "customer") {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default UserRouterP;
