import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

const PublicRoute = () => {
  const { auth, loading } = useAuth();

  if (loading || auth.isAuthenticated === null) {
    return <div className="m-4">Loading...</div>;
  }

  return auth.isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;

