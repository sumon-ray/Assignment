import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";

const RouteGuard = ({ children }: { children: ReactNode }) => {
  const data = useAppSelector((state) => state.auth);
  if (data.token) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default RouteGuard;
