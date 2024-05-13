import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
  
  let auth = { token: localStorage.getItem('token') };
  return auth.token ? <Outlet /> : <Navigate to="/" replace />;
  
};

export default PrivateRoute;