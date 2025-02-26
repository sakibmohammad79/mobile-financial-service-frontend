import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";
import { getuserInfo } from "../services/authService";

const AgentMain = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getuserInfo();
    setRole(user?.role || null);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  if (role !== "agent") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AgentMain;
