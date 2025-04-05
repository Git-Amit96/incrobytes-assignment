import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

const ProtectedRoute = () => {
  const { auth, loading } = useAuth();

  if (loading || auth.isAuthenticated === null) {
    return <div className="m-4">Loading...</div>; 
  }

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
