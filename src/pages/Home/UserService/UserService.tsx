import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Button,
  Link,
} from "@mui/material";
import { Send, MoneyOff } from "@mui/icons-material";

const UserService = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 6,
        mb: 12,
      }}
    >
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
              <Button
                component={Link}
                href="/send-money"
                variant="contained"
                fullWidth
              >
                Send Money
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
              <Button
                component={Link}
                href="/cash-out"
                variant="contained"
                color="error"
                fullWidth
              >
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
