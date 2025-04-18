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
import { motion } from "framer-motion";

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
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: 4, textAlign: "center" }}>
              <CardContent>
                <AccountBalanceWallet sx={{ fontSize: 42, color: "#43a047" }} />
                <Typography variant="h6" mt={1} fontWeight="bold">
                  Cash In
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  Cash in to user account easily.
                </Typography>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={Link}
                    href="/agent/cashin"
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#43a047",
                      "&:hover": { backgroundColor: "#388e3c" },
                    }}
                  >
                    Cash In
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Balance Request */}
        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: 4, textAlign: "center" }}>
              <CardContent>
                <Send sx={{ fontSize: 42, color: "#1565c0" }} />
                <Typography variant="h6" mt={1} fontWeight="bold">
                  Balance Request
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  Send balance request to admin
                </Typography>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={Link}
                    href="/agent/balance-request"
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#1565c0",
                      "&:hover": { backgroundColor: "#0d47a1" },
                    }}
                  >
                    Balance Request
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AgenService;
