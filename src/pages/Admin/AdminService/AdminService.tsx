import { motion } from "framer-motion";
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AdminService = () => {
  return (
    <Container maxWidth="lg" sx={{ pt: 6, pb: 8 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        mb={4}
        color="#E2136E"
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Admin Actions
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* User Management */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                textAlign: "center",
                bgcolor: "#E3F2FD",
              }}
            >
              <CardContent>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <People sx={{ fontSize: 40, color: "#1976d2" }} />
                </motion.div>
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
                  sx={{ bgcolor: "#1976d2", "&:hover": { bgcolor: "#1565c0" } }}
                  fullWidth
                >
                  Manage Users
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Agent Management */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                textAlign: "center",
                bgcolor: "#E8F5E9",
              }}
            >
              <CardContent>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <VerifiedUser sx={{ fontSize: 40, color: "#2e7d32" }} />
                </motion.div>
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
                  sx={{ bgcolor: "#2e7d32", "&:hover": { bgcolor: "#1b5e20" } }}
                  fullWidth
                >
                  Manage Agents
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Recharge Request */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                textAlign: "center",
                bgcolor: "#FFF3E0",
              }}
            >
              <CardContent>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <MonetizationOn sx={{ fontSize: 40, color: "#ff9800" }} />
                </motion.div>
                <Typography variant="h6" mt={1} fontWeight="bold">
                  Recharge Request
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  View all agent recharge requests.
                </Typography>
                <Button
                  component={Link}
                  href="/admin/recharge-request"
                  variant="contained"
                  sx={{ bgcolor: "#ff9800", "&:hover": { bgcolor: "#e68900" } }}
                  fullWidth
                >
                  View Requests
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Add Money */}
        <Grid item xs={12} sm={6} md={4}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                textAlign: "center",
                bgcolor: "#E8F5E9",
              }}
            >
              <CardContent>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <AccountBalanceWallet
                    sx={{ fontSize: 40, color: "#4caf50" }}
                  />
                </motion.div>
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
                  sx={{ bgcolor: "#4caf50", "&:hover": { bgcolor: "#388e3c" } }}
                  fullWidth
                >
                  Confirm Add Money
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminService;
