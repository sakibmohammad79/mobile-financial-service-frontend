import { useEffect, useState } from "react";
import { getuserInfo } from "../../../services/authService";
import {
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useGetAdminQuery } from "../../../redux/api/adminApi";
import { motion } from "framer-motion";

const AdminBalanceSection = () => {
  const [adminId, setAdminId] = useState("");

  useEffect(() => {
    const userInfo = getuserInfo();
    if (userInfo) {
      setAdminId(userInfo?.id);
    }
  }, []);

  const { data, isLoading } = useGetAdminQuery(adminId);
  const [balanceVisible, setBalanceVisible] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ pb: 6, pt: 8 }}>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 5,
          background: "white",
          padding: 2,
        }}
      >
        <CardContent>
          {isLoading ? (
            <Grid container justifyContent="center">
              <CircularProgress sx={{ color: "#E2136E" }} />
            </Grid>
          ) : (
            <Grid
              container
              spacing={3}
              alignItems="center"
              justifyContent={"space-between"}
            >
              {/* Left Column: Avatar and User Name */}
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  src="https://i.ibb.co.com/k2vz7Bn4/man-1.png"
                  alt="User Avatar"
                  sx={{ width: 64, height: 64, marginRight: 2 }}
                />
                <Typography color="#E2136E" variant="h6" fontWeight="bold">
                  {data?.name || "User"}
                </Typography>
              </Grid>

              {/* Middle Column: Account Balance */}
              <Grid
                item
                xs={12}
                sm={4}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Box
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  sx={{
                    fontSize: 20,
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "0.3s",
                    color: "#E2136E",
                    userSelect: "none",
                    borderRadius: 2,
                    padding: "8px 14px",
                    backgroundColor: "#ffe6f0",
                    backdropFilter: "blur(5px)",
                    display: "inline-block",
                  }}
                >
                  {balanceVisible
                    ? `${data?.totalSystemBalance || 0} Taka`
                    : "Tap to see system balance"}
                </Box>
              </Grid>

              {/* Right Column: Status */}
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Typography color={"#E2136E"}>Status:</Typography>
                <Typography
                  component="span"
                  sx={{ color: data?.isActive ? "green" : "red" }}
                >
                  {data?.isActive ? "Active" : "Inactive"}
                </Typography>
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: data?.isActive ? "green" : "red",
                  }}
                />
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdminBalanceSection;
