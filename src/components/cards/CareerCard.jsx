import { Card, CardContent, Typography, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

const CareerCard = ({ career }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight={700}>
          {career.title || career.name}
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {career.description}
        </Typography>

        <Button
          sx={{ mt: 2 }}
          variant="outlined"
          onClick={() => navigate(`/careers/${career._id}`)}
        >
          View Details →
        </Button>
      </CardContent>
    </Card>
  );
};

export default CareerCard;
