import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";
import { getuserInfo } from "../services/authService";

const AgentMain = () => {
  const { role } = getuserInfo();

  if (role !== "agent") {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default AgentMain;
