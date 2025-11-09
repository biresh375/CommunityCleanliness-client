import React, { use } from "react";

import { Navigate, useLocation } from "react-router";

import { AuthContext } from "../Context/AuthContext";
import Loading from "../Components/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = use(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (user && user?.email) {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
};

export default PrivateRoute;
