import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if token exists
  console.log("Token in ProtectedRoute:", token); // Debugging log

  if (!token) {
    console.log("No token found. Redirecting to login.");
    return <Navigate to="/login" replace />;
  }

  console.log("Token found. Rendering protected page.");
  return children;
};

export default ProtectedRoute;
