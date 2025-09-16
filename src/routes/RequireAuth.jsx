import React from "react";
import { Navigate } from "react-router-dom";
import { tokenStore } from "../api/http";

export default function RequireAuth({ children }) {
  const token = tokenStore.get();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
