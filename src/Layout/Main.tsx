import { Navigate, Outlet } from "react-router-dom";

import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";
import { getuserInfo } from "../services/authService";

const UserMain = () => {
  const { role } = getuserInfo();

  if (role !== "user") {
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

export default UserMain;
