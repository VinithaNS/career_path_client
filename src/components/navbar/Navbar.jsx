import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        color: "#111827",
        borderBottom: "1px solid #e5e7eb"
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mr: 4
          }}
        >
          🎓 CareerPath
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexGrow: 1
          }}
        >
          <Button component={Link} to="/">
            Home
          </Button>

          <Button component={Link} to="/careers">
            Careers
          </Button>

          <Button component={Link} to="/roadmap">
            Roadmap
          </Button>

          <Button component={Link} to="/colleges">
            Colleges
          </Button>

          <Button component={Link} to="/exams">
            Exams
          </Button>

          <Button component={Link} to="/resources">
            Resources
          </Button>

          <Button component={Link} to="/ai">
            AI Tools
          </Button>
        </Box>

        <IconButton>
          <NotificationsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
