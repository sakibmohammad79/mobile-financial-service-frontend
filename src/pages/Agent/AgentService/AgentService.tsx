import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Button,
  Link,
} from "@mui/material";
import { Send, AccountBalanceWallet } from "@mui/icons-material";

const AgenService = () => {
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
        {/* Cash In */}

        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
            <CardContent>
              <AccountBalanceWallet sx={{ fontSize: 40, color: "#2e7d32" }} />
              <Typography variant="h6" mt={1} fontWeight="bold">
                Cash In
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={2}>
                Cash in to user account easily.
              </Typography>
              <Button
                component={Link}
                href="/agent/cashin"
                variant="contained"
                color="success"
                fullWidth
              >
                Cash In
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Send Money */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
            <CardContent>
              <Send sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="h6" mt={1} fontWeight="bold">
                Balance Request
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={2}>
                Send balance request to admin
              </Typography>
              <Button
                component={Link}
                href="/agent/balance-request"
                variant="contained"
                fullWidth
              >
                Balance Request
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AgenService;
