import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authcontext";
import { useLocation } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const { isUser } = useAuth();
  const location = useLocation();
  console.log("cehking User from Require Auth", isUser);
  if (!isUser) {
    return (
      <>
        <Navigate to="/login" state={{ path: location.pathname }} />
      </>
    );
  }
  return children;
};
