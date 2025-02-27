import { Navigate, useLocation } from "react-router-dom";
import useUserRole from "../utils/useUserRole";
import { ReactNode } from "react";

const AgentRoute = ({ children }: { children: ReactNode }) => {
  const [role, loading] = useUserRole();
  const location = useLocation();

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }

  if (role === "agent") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AgentRoute;
