import React from "react";
import { Container, Typography, Box, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "primary.main", color: "white", py: 3, mt: 5 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            textAlign: "center",
          }}
        >
          <Typography variant="body1">
            &copy; {new Date().getFullYear()} Your Company Name
          </Typography>
          <Box>
            <Link href="/about" color="inherit" sx={{ mx: 1 }}>
              About
            </Link>
            <Link href="/contact" color="inherit" sx={{ mx: 1 }}>
              Contact
            </Link>
            <Link href="/privacy-policy" color="inherit" sx={{ mx: 1 }}>
              Privacy Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
