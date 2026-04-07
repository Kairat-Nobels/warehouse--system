/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";

interface AdminRouteProps {
  children: JSX.Element;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {

  const { valid } = useSelector((state: any) => state.adminReducer);
  const navigate = useNavigate();
  console.log(valid);

  if (!valid) {
    navigate("/login");
    return <><NotFoundPage /></>
  }

  return children;
};

export default AdminRoute;
