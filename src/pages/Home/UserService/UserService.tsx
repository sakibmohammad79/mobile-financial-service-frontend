import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { Send, AccountBalanceWallet, MoneyOff } from "@mui/icons-material";

const UserService = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
        Quick Actions
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Send Money */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
            <CardContent>
              <Send sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="h6" mt={1} fontWeight="bold">
                Send Money
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={2}>
                Instantly transfer money to anyone.
              </Typography>
              <Button variant="contained" fullWidth>
                Send Money
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Cash In */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
            <CardContent>
              <AccountBalanceWallet sx={{ fontSize: 40, color: "#2e7d32" }} />
              <Typography variant="h6" mt={1} fontWeight="bold">
                Cash In
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={2}>
                Add money to your account easily.
              </Typography>
              <Button variant="contained" color="success" fullWidth>
                Cash In
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Cash Out */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
            <CardContent>
              <MoneyOff sx={{ fontSize: 40, color: "#d32f2f" }} />
              <Typography variant="h6" mt={1} fontWeight="bold">
                Cash Out
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={2}>
                Withdraw money securely and quickly.
              </Typography>
              <Button variant="contained" color="error" fullWidth>
                Cash Out
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserService;
