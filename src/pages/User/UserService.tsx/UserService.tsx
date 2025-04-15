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
import { motion } from "framer-motion";

const UserService = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 6,
        mb: 12,
      }}
    >
      <Typography
        color="#E2136E"
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        mb={4}
      >
        Quick Actions
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Send Money */}
        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: 4, textAlign: "center" }}>
              <CardContent>
                <Send sx={{ fontSize: 40, color: "#E2136E" }} />
                <Typography variant="h6" mt={1} fontWeight="bold">
                  Send Money
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  Instantly transfer money to anyone.
                </Typography>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={Link}
                    href="/user/send-money"
                    variant="contained"
                    sx={{
                      bgcolor: "#E2136E",
                      "&:hover": { bgcolor: "#C51162" },
                    }}
                    fullWidth
                  >
                    Send Money
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Cash Out */}
        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: 4, textAlign: "center" }}>
              <CardContent>
                <MoneyOff sx={{ fontSize: 40, color: "#00CEFF" }} />
                <Typography variant="h6" mt={1} fontWeight="bold">
                  Cash Out
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  Withdraw money securely and quickly.
                </Typography>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={Link}
                    href="/user/cash-out"
                    variant="contained"
                    sx={{
                      bgcolor: "#00CEFF",
                      "&:hover": { bgcolor: "#00A5FF" },
                    }}
                    fullWidth
                  >
                    Cash Out
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

export default UserService;
