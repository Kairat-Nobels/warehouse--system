/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: JSX.Element;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuth } = useSelector((state: any) => state.adminReducer);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
