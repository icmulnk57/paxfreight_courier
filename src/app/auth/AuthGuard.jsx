import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import useToken from "app/hooks/useToken";
import { setUser } from "app/features/auth/authSlice";

const AuthGuard = ({ children, authentication = true, kycRequired = false }) => {
  const { token, setToken } = useToken();
  const location = useLocation();
  const dispatch = useDispatch();

 
  const authToken = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user); 
  const authStatus = Boolean(token); 


  const kycStatus = user?.kyc_status || "Pending";

  useEffect(() => {
    if (authToken) {
      setToken(authToken);
    } else {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (loggedInUser) {
        dispatch(setUser({
          user: loggedInUser,
          token: loggedInUser.token
        }));
      }
    }
  }, [authToken, setToken, dispatch]);

  
  if (authentication && !authStatus) {
    return <Navigate to="/session/signin" state={{ from: location.pathname }} replace />;
  }

  
  if (kycRequired && kycStatus !== "Verified") {
    return <Navigate to="/profile" state={{ from: location.pathname }} replace />;
  }


  if (!authentication && authStatus) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
