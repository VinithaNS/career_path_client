import { Box, Typography, Button, Container } from "@mui/material";

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}

      <Box
        sx={{
          background: "linear-gradient(135deg, #eef6ff, #f5f0ff)",
          py: 8
        }}
      >
        <Container>
          <Typography
            variant="overline"
            sx={{
              fontWeight: 700
            }}
          >
            FIND YOUR PERFECT CAREER PATH
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              maxWidth: 700,
              mt: 2
            }}
          >
            Discover, Learn & Build Your
            <span style={{ color: "#1976d2" }}> Bright Future</span>
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mt: 2,
              maxWidth: 700,
              color: "text.secondary"
            }}
          >
            Explore career options, find the right courses, discover colleges
            and prepare for your future.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 4
            }}
          >
            <Button variant="contained" size="large">
              Explore Careers →
            </Button>

            <Button variant="outlined" size="large">
              Take Assessment
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
