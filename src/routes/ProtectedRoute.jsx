import { Navigate } from "react-router-dom";

import { useAuth } from "../pages/context/AuthContext";

const ProtectedRoute = ({ children, requireProfile = false }) => {
  const { user, studentProfile, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireProfile && user.role === "student" && !studentProfile) {
    return <Navigate to="/complete-profile" replace />;
  }

  return children;
};

export default ProtectedRoute;
