import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return userInfo ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

export const AdminRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) return <Navigate to="/login" />;
  if (!userInfo.isAdmin) return <Navigate to="/" />;
  return children;
};