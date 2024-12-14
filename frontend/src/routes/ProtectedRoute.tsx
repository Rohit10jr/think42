import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const location = useLocation();

  // Retrieve the access token from localStorage
  const accessToken = localStorage.getItem("access_token");

  // Check if the access token exists
  const isAuthenticated = !!accessToken;

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

//   if (isAuthenticated) {
//     return element;
//   } else {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }
// };

export default ProtectedRoute;
