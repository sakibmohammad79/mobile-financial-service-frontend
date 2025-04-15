import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
} from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: 4 }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Introduction Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%", p: 3 }}>
              <CardContent>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="#E2136E"
                  textAlign="center"
                  gutterBottom
                >
                  About Us
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" textAlign="justify" sx={{ mb: 2 }}>
                  Welcome to our platform! We are committed to providing
                  innovative solutions to enhance user experiences. Our mission
                  is to make technology accessible, efficient, and impactful.
                  Whether you're here to explore, learn, or collaborate, we are
                  always striving for excellence.
                </Typography>
                <Typography variant="body1" textAlign="justify">
                  Our dedicated team is passionate about delivering high-quality
                  services that cater to your needs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Vision & Mission Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 3, boxShadow: 3, height: "100%", p: 3 }}>
              <CardContent>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color="#E2136E"
                  textAlign="center"
                  gutterBottom
                >
                  Our Vision & Mission
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" textAlign="justify" sx={{ mb: 2 }}>
                  <strong>Vision:</strong> To revolutionize the tech industry by
                  delivering innovative and user-friendly solutions that drive
                  progress.
                </Typography>
                <Typography variant="body1" textAlign="justify" sx={{ mb: 2 }}>
                  <strong>Mission:</strong> Our mission is to continuously
                  improve our services, ensuring a seamless and effective
                  experience for all users.
                </Typography>
                <Typography variant="body1" textAlign="justify">
                  We believe in the power of technology to transform lives and
                  create opportunities for growth and success.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
