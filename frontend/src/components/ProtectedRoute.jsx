import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem("adminToken");

  if (!isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  return children;
}

export default ProtectedRoute;
