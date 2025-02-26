import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";
import { getuserInfo } from "../services/authService";

const AdminMain = () => {
  const user = getuserInfo();
  const role = user?.role;

  if (role !== "admin") {
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

export default AdminMain;
