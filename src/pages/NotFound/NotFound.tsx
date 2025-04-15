import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#121212",
        color: "#fff",
        padding: "20px",
      }}
    >
      <Typography variant="h2" fontWeight={700} color="error">
        404
      </Typography>
      <Typography variant="h5" sx={{ mt: 2, mb: 4 }}>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          backgroundColor: "#E2136E",
          "&:hover": { backgroundColor: "#e00060" },
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
