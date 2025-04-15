import { Container, Typography, Box, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#E2136E", color: "white", py: 3 }}>
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
            &copy; {new Date().getFullYear()} Mobile financial system
          </Typography>
          <Box>
            <Link underline="none" href="/about" color="inherit" sx={{ mx: 1 }}>
              About
            </Link>
            <Link underline="none" href="/blog" color="inherit" sx={{ mx: 1 }}>
              Blog
            </Link>
            <Link
              underline="none"
              href="/privacy-policy"
              color="inherit"
              sx={{ mx: 1 }}
            >
              Privacy Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
