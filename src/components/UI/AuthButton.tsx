import { Box, Button, Link } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getuserInfo, removeUser } from "../../services/authService";

const AuthButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userInfo = getuserInfo();
    // console.log(userInfo);
    if (userInfo) {
      setUserId(userInfo?.id);
    }
  }, [location]); // Re-run when the page changes

  const handleLogOut = () => {
    removeUser();
    setUserId("");
    navigate("/login");
  };

  return (
    <Box>
      {userId ? (
        <Button
          onClick={handleLogOut}
          color="error"
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#c62828" },
            borderRadius: "6px",
            padding: "8px 16px",
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          //   color="success"
          variant="contained"
          component={Link}
          href="/login"
          sx={{
            backgroundColor: "#FFFFFF",
            color: "black",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#E2136E" },
            borderRadius: "6px",
            padding: "8px 16px",
          }}
        >
          Login
        </Button>
      )}
    </Box>
  );
};

export default AuthButton;
