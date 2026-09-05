import { Card, CardContent, Typography, Button } from "@mui/material";

import { Link } from "react-router-dom";

const EducationCard = ({ title, description, path, buttonText }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {description}
        </Typography>

        <Button component={Link} to={path} variant="contained">
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default EducationCard;
