import { useEffect, useState } from "react";
import { useGetSingleAgentQuery } from "../../../redux/api/agentApi";
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

const AgentBalanceSection = () => {
  const [agentId, setAgentId] = useState("");

  useEffect(() => {
    const userInfo = getuserInfo();
    if (userInfo) {
      setAgentId(userInfo?.id);
    }
  }, []);

  const { data, isLoading } = useGetSingleAgentQuery(agentId);
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
              justifyContent="space-between"
              alignItems={"center"}
            >
              {/* Avatar & Name Column */}
              <Grid
                item
                xs={12}
                sm={4} // 1/3 of the width on larger screens
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                <Avatar
                  src="https://i.ibb.co.com/k2vz7Bn4/man-1.png"
                  alt="User Avatar"
                  sx={{ width: 64, height: 64, border: "3px solid #fff" }}
                />
                <Typography color="#E2136E" variant="h6" fontWeight="bold">
                  {data?.name || "Agent"}
                </Typography>
              </Grid>

              {/* Balance Column */}
              <Grid
                item
                xs={12}
                sm={4} // 1/3 of the width on larger screens
                textAlign={{ xs: "center", sm: "center" }}
              >
                <Box
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  sx={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    transition: "0.3s",
                    userSelect: "none",
                    borderRadius: 2,
                    padding: "8px 14px",
                    backgroundColor: "#ffe6f0",
                    backdropFilter: "blur(5px)",
                    display: "inline-block",
                    color: "#E2136E",
                    fontSize: 20,
                  }}
                >
                  {balanceVisible
                    ? `${data?.balance || 0} Taka`
                    : "Tap to see balance"}
                </Box>
              </Grid>

              {/* Status Column */}
              <Grid
                item
                xs={12}
                sm={4} // 1/3 of the width on larger screens
              >
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

export default AgentBalanceSection;
