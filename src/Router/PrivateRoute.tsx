/* eslint-disable @typescript-eslint/no-explicit-any */
import { getuserInfo } from "../services/authService";
import { Navigate, useLocation } from "react-router-dom";
const PrivateRoute = ({ children }: { children: any }) => {
  const userInfo = getuserInfo();
  const location = useLocation();

  if (userInfo?.id) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
