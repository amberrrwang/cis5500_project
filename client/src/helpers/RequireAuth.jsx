// RequireAuth.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ token, children }) => {
  const location = useLocation();

  if (!token) {
    // If no token exists, redirect to login and preserve the current location state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If token exists, render the children (i.e., the protected component)
  return children;
};

export default RequireAuth;