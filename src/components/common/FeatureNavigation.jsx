import { Box, Paper, Typography } from "@mui/material";

const features = [
  {
    title: "Careers",
    subtitle: "Explore Options",
    icon: "🧭"
  },
  {
    title: "Roadmaps",
    subtitle: "Step by Step",
    icon: "🗺️"
  },
  {
    title: "Colleges",
    subtitle: "Find Best Fit",
    icon: "🏫"
  },
  {
    title: "Exams",
    subtitle: "Prepare Better",
    icon: "📋"
  },
  {
    title: "Assessments",
    subtitle: "Know Yourself",
    icon: "🧠"
  },
  {
    title: "AI Tools",
    subtitle: "Smart Guidance",
    icon: "🤖"
  },
  {
    title: "Resources",
    subtitle: "Learn More",
    icon: "📚"
  }
];

const FeatureNavigation = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
        overflowX: "auto"
      }}
    >
      {features.map((item) => (
        <Paper
          key={item.title}
          sx={{
            p: 2,
            minWidth: 150
          }}
        >
          <Typography fontSize={30}>{item.icon}</Typography>

          <Typography fontWeight={700}>{item.title}</Typography>

          <Typography variant="body2" color="text.secondary">
            {item.subtitle}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default FeatureNavigation;
