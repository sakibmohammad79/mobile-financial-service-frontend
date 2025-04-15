import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import { MonetizationOn, AccountBalance, Lock } from "@mui/icons-material";
import { getuserInfo } from "../../../services/authService";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const { role } = getuserInfo();

  return (
    <Box
      sx={{
        backgroundColor: "#121212",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            gutterBottom
            sx={{
              color: "#ff4081",
              fontSize: {
                xs: "h5.fontSize",
                sm: "h4.fontSize",
                md: "h3.fontSize",
              },
            }}
          >
            Secure & Efficient Mobile Financial Services
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: { xs: 2, sm: 3, md: 4 },
              fontSize: { xs: "body1.fontSize", sm: "h6.fontSize" },
            }}
          >
            Experience seamless money transactions with our innovative MFS
            platform. Send money, cash-in, cash-out, and manage your finances
            with ease and security.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#E2136E",
              color: "#fff",
              fontWeight: 700,
              "&:hover": { backgroundColor: "#e00060" },
              fontSize: { xs: "0.8rem", sm: "1rem" },
              padding: { xs: "8px 16px", sm: "10px 20px" },
            }}
            onClick={() => {
              if (role === "user") {
                navigate("/user");
              } else if (role === "agent") {
                navigate("/agent");
              } else if (role === "admin") {
                navigate("/admin");
              } else {
                navigate("/login");
              }
            }}
          >
            Get Started
          </Button>
        </motion.div>

        {/* Highlighted Services */}
        <Grid container spacing={4} sx={{ mt: { xs: 4, sm: 6 } }}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    backgroundColor: "#1e1e1e",
                    color: "#fff",
                    textAlign: "center",
                    py: { xs: 2, sm: 3 },
                  }}
                >
                  <CardContent>
                    <service.icon
                      sx={{
                        fontSize: { xs: 40, sm: 50 },
                        color: "#ff4081",
                        mb: 2,
                      }}
                    />
                    <Typography
                      variant="h5"
                      fontWeight={600}
                      sx={{
                        fontSize: { xs: "h6.fontSize", sm: "h5.fontSize" },
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        fontSize: {
                          xs: "body2.fontSize",
                          sm: "body1.fontSize",
                        },
                      }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// Service data
const services = [
  {
    title: "Instant Transactions",
    description: "Send and receive money securely within seconds.",
    icon: MonetizationOn,
  },
  {
    title: "Reliable Banking",
    description: "Manage your digital finances with trust and transparency.",
    icon: AccountBalance,
  },
  {
    title: "Secure & Encrypted",
    description: "Advanced encryption ensures your funds stay safe.",
    icon: Lock,
  },
];

export default HeroSection;
