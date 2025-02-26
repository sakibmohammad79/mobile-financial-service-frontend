import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";
// import { getuserInfo } from "../services/authService";
// interface UserInfo {
//   role: "user" | "agent" | "admin";
// }

const AgentMain = () => {
  // const navigate = useNavigate();
  // const userInfo: UserInfo | null = getuserInfo();

  // useEffect(() => {
  //   if (!userInfo) {
  //     navigate("/login", { replace: true }); // ✅ replace:true দিলে ব্রাউজার ব্যাক করলে login এ আসবে না
  //   } else {
  //     const rolePath = {
  //       user: "/",
  //       agent: "/agent",
  //       admin: "/admin",
  //     };

  //     // ✅ যদি বর্তমান path সঠিক হয়, তাহলে আর navigate হবে না
  //     if (window.location.pathname !== rolePath[userInfo?.role]) {
  //       navigate(rolePath[userInfo.role], { replace: true });
  //     }
  //   }
  // }, [userInfo, navigate]);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AgentMain;
