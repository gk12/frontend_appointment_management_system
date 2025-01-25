import React from "react";
import UserAuthContext from "../context/UserAuthContext";
import { useContext } from "react";
import { Link, Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useContext(UserAuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
