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
} from "@mui/material";

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
    <Container maxWidth="xl" sx={{ mb: 6, mt: 3 }}>
      <Grid container spacing={3} padding={3}>
        {/* Balance Overview */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              {isLoading ? (
                // Show loader while fetching data
                <Grid container justifyContent="center">
                  <CircularProgress />
                </Grid>
              ) : (
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  {/* Left Side: User Avatar & Name */}
                  <Grid
                    item
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <Avatar
                      src="https://i.ibb.co.com/k2vz7Bn4/man-1.png"
                      alt="User Avatar"
                      sx={{
                        width: 56,
                        height: 56,
                        border: "2px solid #1976d2",
                      }}
                    />
                    <Typography variant="h6" fontWeight="bold">
                      {data?.name || "User"}
                    </Typography>
                  </Grid>

                  {/* Right Side: Account Balance */}
                  <Grid item>
                    <Typography variant="h5" fontWeight="bold" color="gray">
                      Account Balance
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        cursor: "pointer",
                        fontWeight: "bold",
                        transition: "0.3s",
                        filter: balanceVisible ? "none" : "blur(5px)", // Blur effect
                        userSelect: "none",
                        color: balanceVisible ? "black" : "#888",
                      }}
                      onClick={() => setBalanceVisible(!balanceVisible)}
                    >
                      {balanceVisible ? `${data?.balance || 0} Taka` : "******"}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AgentBalanceSection;
