import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const EducationCard = ({ title, description, path, buttonText }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #F5D9EA",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(124, 39, 173, 0.06)",
        transition: "0.2s ease",
        "&:hover": {
          borderColor: "#EC4899",
          boxShadow: "0 8px 20px rgba(124, 39, 173, 0.12)",
          transform: "translateY(-2px)"
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "#3B0764", fontWeight: 700 }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "#7C6E8C", mb: 3 }}
        >
          {description}
        </Typography>

        <Button
          component={Link}
          to={path}
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #9333EA, #EC4899)",
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "0 5px 14px rgba(147, 51, 234, 0.25)",
            "&:hover": {
              background: "#DB2777",
              boxShadow: "0 5px 14px rgba(147, 51, 234, 0.35)"
            }
          }}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EducationCard;