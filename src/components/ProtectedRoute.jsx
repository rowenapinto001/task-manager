import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Message from "./Message";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Message type="info" text="Checking your session..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
