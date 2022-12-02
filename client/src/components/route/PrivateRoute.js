import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;

  return !isAuthenticated && loading ? (
    <Navigate replace to="/login" />
  ) : (
    <Component />
  );
};

export default PrivateRoute;
