import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Button,
  Link,
} from "@mui/material";
import {
  People,
  VerifiedUser,
  MonetizationOn,
  AccountBalanceWallet,
} from "@mui/icons-material";

const AdminService = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 6,
        mb: 12,
      }}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
        Admin Services
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* User Management */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
            <CardContent>
              <People sx={{ fontSize: 40, color: "#1976d2" }} />
              <Typography variant="h6" mt={1} fontWeight="bold">
                User Management
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={2}>
                Manage all users, block/unblock users.
              </Typography>
              <Button
                component={Link}
                href="/admin/manage-user"
                variant="contained"
                fullWidth
              >
                Manage Users
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Agent Management */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
            <CardContent>
              <VerifiedUser sx={{ fontSize: 40, color: "#2e7d32" }} />
              <Typography variant="h6" mt={1} fontWeight="bold">
                Agent Management
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={2}>
                Approve agents, block/unblock agents.
              </Typography>
              <Button
                component={Link}
                href="/admin/manage-agent"
                variant="contained"
                color="success"
                fullWidth
              >
                Manage Agents
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* agent balance */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
            <CardContent>
              <MonetizationOn sx={{ fontSize: 40, color: "#ff9800" }} />
              <Typography variant="h6" mt={1} fontWeight="bold">
                Recharge Request
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={2}>
                View all agent recharge request.
              </Typography>
              <Button
                component={Link}
                href="/admin/recharge-request"
                variant="contained"
                fullWidth
              >
                View recharge request
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* add money to the agent's account. */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, textAlign: "center" }}>
            <CardContent>
              <AccountBalanceWallet sx={{ fontSize: 40, color: "#4caf50" }} />
              <Typography variant="h6" mt={1} fontWeight="bold">
                Add Money
              </Typography>
              <Typography variant="body2" color="textSecondary" mb={2}>
                Add money to the agent's account.
              </Typography>
              <Button
                component={Link}
                href="/admin/add-money"
                variant="contained"
                fullWidth
              >
                Confirm Add Money
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminService;
