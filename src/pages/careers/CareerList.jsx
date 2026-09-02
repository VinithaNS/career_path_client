import { Container, Typography, Grid } from "@mui/material";

import { useEffect, useState } from "react";

import { getCareers } from "../../services/careerService";
import CareerCard from "../../components/cards/CareerCard";

const CareerList = () => {
  const [careers, setCareers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const loadCareers = async () => {
      try {
        const result = await getCareers();

        setCareers(result.data || result);
      } catch (error) {
        console.error(error);

        setError("Unable to load careers");
      } finally {
        setLoading(false);
      }
    };

    loadCareers();
  }, []);

  if (loading) {
    return <Typography sx={{ p: 5 }}>Loading careers...</Typography>;
  }

  if (error) {
    return (
      <Typography color="error" sx={{ p: 5 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h4" fontWeight={700} mb={4}>
        Explore Career Paths
      </Typography>

      <Grid container spacing={3}>
        {careers.map((career) => (
          <Grid item xs={12} sm={6} md={4} key={career._id}>
            <CareerCard career={career} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CareerList;
