import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import RouteIcon from "@mui/icons-material/Route";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkIcon from "@mui/icons-material/Work";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { getCareerById } from "../../services/careerService";

const CareerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchCareerDetails = async () => {
      if (!id) {
        setError("Career ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        console.log("Fetching career:", id);

        const response = await getCareerById(id);

        console.log("Career API Response:", response);

        /*
          Different backend response formats are supported:

          1. { data: {...} }
          2. { career: {...} }
          3. { data: { career: {...} } }
          4. Direct career object
        */

        const careerData =
          response?.data?.career ||
          response?.data ||
          response?.career ||
          response;

        if (!careerData || typeof careerData !== "object") {
          throw new Error("Career data was not found.");
        }

        setCareer(careerData);
      } catch (err) {
        console.error("Career Details API Error:", err);
        console.error("Error Response:", err?.response);
        console.error("Error Data:", err?.response?.data);

        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Failed to load career details.";

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCareerDetails();
  }, [id]);

  // ---------------------------------------------------------
  // Loading
  // ---------------------------------------------------------

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography color="text.secondary">
            Loading career details...
          </Typography>
        </Stack>
      </Box>
    );
  }

  // ---------------------------------------------------------
  // Error
  // ---------------------------------------------------------

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>

        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/careers")}
        >
          Back to Careers
        </Button>
      </Container>
    );
  }

  // ---------------------------------------------------------
  // Career not found
  // ---------------------------------------------------------

  if (!career) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Career details not found.
        </Alert>

        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/careers")}
        >
          Back to Careers
        </Button>
      </Container>
    );
  }

  // ---------------------------------------------------------
  // Normalize backend fields
  // ---------------------------------------------------------

  const careerName =
    career.name || career.title || career.careerName || "Career";

  const description =
    career.description ||
    career.careerDescription ||
    "No career description available.";

  const overview =
    career.overview || career.about || career.longDescription || description;

  const category =
    career.category || career.domain || career.sector || "General";

  const demand = career.demand || career.jobDemand || "Growing";

  const education =
    career.education ||
    career.educationRequirement ||
    career.educationRequired ||
    "Relevant degree or qualification";

  const salary =
    career.salaryRange ||
    career.salary ||
    career.averageSalary ||
    "Not specified";

  const duration = career.duration || career.courseDuration || "Varies";

  const skills =
    career.skills || career.requiredSkills || career.skillsRequired || [];

  const jobRoles =
    career.jobRoles || career.roles || career.jobOpportunities || [];

  const responsibilities =
    career.responsibilities || career.jobResponsibilities || [];

  // ---------------------------------------------------------
  // Helper
  // ---------------------------------------------------------

  const normalizeArray = (value) => {
    if (!Array.isArray(value)) {
      return [];
    }

    return value;
  };

  const skillsList = normalizeArray(skills);
  const jobRolesList = normalizeArray(jobRoles);
  const responsibilitiesList = normalizeArray(responsibilities);

  // ---------------------------------------------------------
  // Save Career
  // ---------------------------------------------------------

  const handleSaveCareer = () => {
    setSaved((previousValue) => !previousValue);

    /*
      Later connect this with backend:

      POST /api/saved-careers

      Example:

      {
        "careerId": career._id
      }
    */
  };

  // ---------------------------------------------------------
  // Roadmap
  // ---------------------------------------------------------

  const handleExploreRoadmap = () => {
    const careerId = career._id || career.id || id;

    navigate(`/roadmap?careerId=${careerId}`);
  };

  // ---------------------------------------------------------
  // Back
  // ---------------------------------------------------------

  const handleBack = () => {
    navigate("/careers");
  };

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------

  return (
    <Box sx={{ backgroundColor: "#f8fafc", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        {/* =====================================================
            BACK BUTTON
        ===================================================== */}

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3 }}
        >
          Back to Careers
        </Button>

        {/* =====================================================
            HERO SECTION
        ===================================================== */}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            mb: 4
          }}
        >
          <Grid container spacing={4} alignItems="center">
            {/* Career Information */}

            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={2}>
                <Box>
                  <Chip label={category} size="small" sx={{ mb: 2 }} />

                  <Typography
                    variant="h3"
                    component="h1"
                    fontWeight={700}
                    sx={{
                      fontSize: {
                        xs: "2rem",
                        md: "3rem"
                      }
                    }}
                  >
                    {careerName}
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontSize: "1.05rem",
                    lineHeight: 1.8
                  }}
                >
                  {description}
                </Typography>

                {/* Chips */}

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip
                    icon={<TrendingUpIcon />}
                    label={`Demand: ${demand}`}
                    variant="outlined"
                  />

                  <Chip
                    icon={<SchoolOutlinedIcon />}
                    label={education}
                    variant="outlined"
                  />
                </Stack>

                {/* Buttons */}

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  sx={{ pt: 2 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<RouteIcon />}
                    onClick={handleExploreRoadmap}
                  >
                    Explore Roadmap
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={
                      saved ? <BookmarkIcon /> : <BookmarkBorderIcon />
                    }
                    onClick={handleSaveCareer}
                  >
                    {saved ? "Saved" : "Save Career"}
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            {/* Career Icon */}

            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  minHeight: 220,
                  borderRadius: 3,
                  backgroundColor: "primary.main",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <WorkIcon
                  sx={{
                    fontSize: 100
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* =====================================================
            QUICK INFORMATION
        ===================================================== */}

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Education */}

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <SchoolOutlinedIcon color="primary" sx={{ fontSize: 40 }} />

                  <Typography variant="h6" fontWeight={600}>
                    Education
                  </Typography>

                  <Typography color="text.secondary">{education}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Salary */}

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <AccountBalanceWalletOutlinedIcon
                    color="primary"
                    sx={{ fontSize: 40 }}
                  />

                  <Typography variant="h6" fontWeight={600}>
                    Salary
                  </Typography>

                  <Typography color="text.secondary">{salary}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Duration */}

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <AccessTimeIcon color="primary" sx={{ fontSize: 40 }} />

                  <Typography variant="h6" fontWeight={600}>
                    Duration
                  </Typography>

                  <Typography color="text.secondary">{duration}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* =====================================================
            ABOUT CAREER
        ===================================================== */}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            mb: 4
          }}
        >
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
            About This Career
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Typography
            color="text.secondary"
            sx={{
              lineHeight: 1.9,
              whiteSpace: "pre-line"
            }}
          >
            {overview}
          </Typography>
        </Paper>

        {/* =====================================================
            REQUIRED SKILLS
        ===================================================== */}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            mb: 4
          }}
        >
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
            Required Skills
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {skillsList.length > 0 ? (
            <Grid container spacing={2}>
              {skillsList.map((skill, index) => {
                const skillName =
                  typeof skill === "string"
                    ? skill
                    : skill?.name ||
                      skill?.skillName ||
                      skill?.title ||
                      `Skill ${index + 1}`;

                return (
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 4
                    }}
                    key={skill?._id || skill?.id || `${skillName}-${index}`}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <CheckCircleOutlineIcon color="primary" />

                      <Typography>{skillName}</Typography>
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Typography color="text.secondary">
              No specific skills have been added yet.
            </Typography>
          )}
        </Paper>

        {/* =====================================================
            EDUCATION REQUIRED
        ===================================================== */}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            mb: 4
          }}
        >
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <SchoolOutlinedIcon color="primary" sx={{ fontSize: 40 }} />

            <Box>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                Education Required
              </Typography>

              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {education}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* =====================================================
            JOB OPPORTUNITIES
        ===================================================== */}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            mb: 4
          }}
        >
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
            Job Opportunities
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {jobRolesList.length > 0 ? (
            <Stack spacing={2}>
              {jobRolesList.map((role, index) => {
                const roleName =
                  typeof role === "string"
                    ? role
                    : role?.name ||
                      role?.roleName ||
                      role?.title ||
                      `Job Role ${index + 1}`;

                return (
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    key={role?._id || role?.id || `${roleName}-${index}`}
                  >
                    <NavigateNextIcon color="primary" />

                    <Typography>{roleName}</Typography>
                  </Stack>
                );
              })}
            </Stack>
          ) : (
            <Typography color="text.secondary">
              No job opportunities have been added yet.
            </Typography>
          )}
        </Paper>

        {/* =====================================================
            RESPONSIBILITIES
        ===================================================== */}

        {responsibilitiesList.length > 0 && (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              mb: 4
            }}
          >
            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
              Job Responsibilities
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Stack spacing={2}>
              {responsibilitiesList.map((responsibility, index) => {
                const responsibilityText =
                  typeof responsibility === "string"
                    ? responsibility
                    : responsibility?.description ||
                      responsibility?.name ||
                      responsibility?.title ||
                      `Responsibility ${index + 1}`;

                return (
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="flex-start"
                    key={index}
                  >
                    <CheckCircleOutlineIcon color="primary" sx={{ mt: 0.3 }} />

                    <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {responsibilityText}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Paper>
        )}

        {/* =====================================================
            ROADMAP CTA
        ===================================================== */}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "primary.main",
            mb: 4
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                Want to know how to become a {careerName}?
              </Typography>

              <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                Explore the complete career roadmap, education path, skills, and
                recommended steps to reach this career.
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<RouteIcon />}
                onClick={handleExploreRoadmap}
              >
                View Career Roadmap
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default CareerDetails;
