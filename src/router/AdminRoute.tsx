import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

interface AdminRouteProps {
  children: ReactNode; 
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const isAdmin = useAppSelector((s) => s.auth.isAdmin);
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>; 
};

