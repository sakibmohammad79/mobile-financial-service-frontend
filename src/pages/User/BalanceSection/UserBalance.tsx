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
import { motion } from "framer-motion";
import { useGetSingleUserQuery } from "../../../redux/api/userApi";

const UserBalance = () => {
  const [userId, setUsertId] = useState("");

  useEffect(() => {
    const userInfo = getuserInfo();
    if (userInfo) {
      setUsertId(userInfo?.id);
    }
  }, []);

  const { data, isLoading } = useGetSingleUserQuery(userId);
  const [balanceVisible, setBalanceVisible] = useState(false);

  return (
    <Container maxWidth="lg" sx={{ pb: 6, pt: 8 }}>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 5,
          background: "#fff",
          padding: 3,
          color: "#d81b60",
        }}
      >
        <CardContent>
          {isLoading ? (
            <Grid container justifyContent="center">
              <CircularProgress sx={{ color: "#d81b60" }} />
            </Grid>
          ) : (
            <Grid
              container
              spacing={3}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {/* Left Column: Avatar and Name */}
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                gap={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  src="https://i.ibb.co.com/k2vz7Bn4/man-1.png"
                  alt="User Avatar"
                  sx={{ width: 64, height: 64, border: "3px solid #d81b60" }}
                />
                <Typography variant="h6" fontWeight="bold">
                  {data?.name || "Agent"}
                </Typography>
              </Grid>

              {/* Center Column: Account Balance */}
              <Grid item xs={12} sm={4} md={3} textAlign="center">
                <Box
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  sx={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "0.3s",
                    userSelect: "none",
                    borderRadius: 2,
                    fontSize: 20,
                    padding: "8px 14px",
                    backgroundColor: "#ffe6f0",
                    display: "inline-block",
                  }}
                >
                  {balanceVisible
                    ? `${data?.balance || 0} Taka`
                    : "Tap to see balance"}
                </Box>
              </Grid>

              {/* Right Column: Active Status */}
              <Grid item xs={12} sm={4} md={3} textAlign="center">
                <Box
                  sx={{
                    mt: 1,
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
                </Box>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserBalance;
