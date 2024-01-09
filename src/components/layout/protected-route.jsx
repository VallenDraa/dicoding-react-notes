import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../hooks";

export function ProtectedRoute() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
