import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("access_token");

  return isAuthenticated ? <Navigate to="/home" /> : element;
};

export default PublicRoute;
