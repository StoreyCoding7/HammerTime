import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ component: Component }) => {
  const { user } = useAuth(); // Get user state from AuthContext
  const isAuthenticated = !!user?.token; // Check if token exists

  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
