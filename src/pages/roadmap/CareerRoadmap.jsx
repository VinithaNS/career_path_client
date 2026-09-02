import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WorkIcon from "@mui/icons-material/Work";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { getRoadmapByCareerId } from "../../services/roadmapService";

const CareerRoadmap = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const careerId = searchParams.get("careerId");

  const [roadmap, setRoadmap] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        setError("");

        if (!careerId) {
          setError("Career ID is missing.");
          return;
        }

        const response = await getRoadmapByCareerId(careerId);

        console.log("Roadmap Response:", response);

        const roadmapData = response?.data || response?.roadmap || response;

        setRoadmap(roadmapData);
      } catch (err) {
        console.error("Roadmap error:", err);

        setError(
          err?.response?.data?.message || "Unable to load career roadmap."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [careerId]);

  // Loading
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Error
  if (error) {
    return (
      <Container sx={{ py: 6 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/careers")}
          sx={{ mb: 3 }}
        >
          Back to Careers
        </Button>

        <Card>
          <CardContent>
            <Typography color="error" variant="h6">
              {error}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  // No roadmap
  if (!roadmap) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h5" fontWeight={700}>
          Roadmap not found.
        </Typography>
      </Container>
    );
  }

  /*
    Different backend models may use:

    title
    name
    careerName

    steps
    roadmapSteps
    stages
  */

  const steps = roadmap.steps || roadmap.roadmapSteps || roadmap.stages || [];

  return (
    <Box
      sx={{
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        py: 5
      }}
    >
      <Container maxWidth="lg">
        {/* Back */}

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/careers")}
          sx={{
            mb: 3,
            textTransform: "none"
          }}
        >
          Back to Careers
        </Button>

        {/* Header */}

        <Card
          sx={{
            borderRadius: 3,
            mb: 4
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h3" fontWeight={800}>
              {roadmap.title ||
                roadmap.name ||
                roadmap.careerName ||
                "Career Roadmap"}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 2,
                maxWidth: 800,
                lineHeight: 1.8
              }}
            >
              {roadmap.description ||
                "Follow this step-by-step roadmap to build the required knowledge, skills and experience for your career."}
            </Typography>

            {/* Information */}

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mt: 3
              }}
            >
              {roadmap.duration && (
                <Chip
                  icon={<AccessTimeIcon />}
                  label={`Duration: ${roadmap.duration}`}
                />
              )}

              {roadmap.level && <Chip label={`Level: ${roadmap.level}`} />}

              {roadmap.category && <Chip label={roadmap.category} />}
            </Box>
          </CardContent>
        </Card>

        {/* Roadmap Steps */}

        <Typography variant="h4" fontWeight={800} sx={{ mb: 3 }}>
          Roadmap Steps
        </Typography>

        {steps.length === 0 ? (
          <Card>
            <CardContent>
              <Typography color="text.secondary">
                No roadmap steps available.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Box>
            {steps.map((step, index) => (
              <Card
                key={step._id || step.id || index}
                sx={{
                  mb: 3,
                  borderRadius: 3
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Grid container spacing={3} alignItems="center">
                    {/* Step Number */}

                    <Grid item xs={12} md={1}>
                      <Box
                        sx={{
                          width: 55,
                          height: 55,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#e8f0fe"
                        }}
                      >
                        <Typography fontWeight={800} fontSize={20}>
                          {index + 1}
                        </Typography>
                      </Box>
                    </Grid>

                    {/* Content */}

                    <Grid item xs={12} md={8}>
                      <Typography variant="h6" fontWeight={700}>
                        {step.title || step.name || `Step ${index + 1}`}
                      </Typography>

                      <Typography
                        color="text.secondary"
                        sx={{
                          mt: 1,
                          lineHeight: 1.7
                        }}
                      >
                        {step.description ||
                          step.details ||
                          "Complete this stage to continue your career journey."}
                      </Typography>
                    </Grid>

                    {/* Status */}

                    <Grid item xs={12} md={3}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1
                        }}
                      >
                        <CheckCircleIcon />

                        <Typography>Step {index + 1}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {/* Career Goal */}

        <Card
          sx={{
            mt: 4,
            borderRadius: 3
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight={800}>
              Your Career Goal
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center"
              }}
            >
              <WorkIcon />

              <Typography color="text.secondary">
                Follow each step and build your skills consistently to reach
                your desired career.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CareerRoadmap;
