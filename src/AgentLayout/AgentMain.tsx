import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";

const Main = () => {
  // const [role, setUserRole] = useState("");
  // const navigate = useNavigate();
  // console.log(role);
  // useEffect(() => {
  //   const userInfo = getuserInfo();
  //   console.log(userInfo);
  //   if (userInfo) {
  //     setUserRole(userInfo?.role);
  //   }
  // }, [role]);

  // if (role === "user") {
  //   navigate("/home");
  // } else if (role === "agent") {
  //   navigate("/register");
  // }
  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default Main;
