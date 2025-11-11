import React, { use } from "react";

import { Navigate, useLocation } from "react-router";

import { AuthContext } from "../Context/AuthContext";
import Loading from "../Components/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }

  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} replace to="/login"></Navigate>;
};

export default PrivateRoute;
