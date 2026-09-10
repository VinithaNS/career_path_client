import { Routes, Route } from "react-router-dom";

import Roadmap from "../components/roadmap/Roadmap";
import RoadmapDetails from "../components/roadmap/RoadmapDetails";
import AIConversation from "../pages/ai/AIConversation";
import AIRecommendation from "../pages/ai/AIRecommendation";
import AIReplaceTracker from "../pages/ai/AIReplaceTracker";
import AISupport from "../pages/ai/AISupport";
import AITools from "../pages/ai/AITools";
import Assessments from "../pages/assessment/Assessment";
import AssessmentDetails from "../pages/assessment/AssessmentDetails";
import AssessmentResult from "../pages/assessment/AssessmentResult";
import TakeAssessment from "../pages/assessment/TakeAssessment";
import CompleteProfile from "../pages/auth/CompleteProfile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import CareerDetails from "../pages/careers/CareerDetails";
import Careers from "../pages/careers/Careers";
import CollegeDetails from "../pages/colleges/CollegeDetails";
import Colleges from "../pages/colleges/Colleges";
import CourseDetails from "../pages/education/CourseDetails";
import Education from "../pages/education/Education";
import Exams from "../pages/exams/Exam";
import ExamDetails from "../pages/exams/ExamDetails";
import MyProfile from "../pages/profile/MyProfile";
import Home from "../pages/public/Home";
import Resources from "../pages/resources/Resources";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* =====================================================
          PUBLIC HOME
      ===================================================== */}

      <Route path="/" element={<Home />} />

      {/* =====================================================
          AUTHENTICATION
      ===================================================== */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/complete-profile" element={<CompleteProfile />} />

      {/* =====================================================
          PROFILE
      ===================================================== */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        }
      />

      {/* =====================================================
          CAREERS
      ===================================================== */}

      <Route path="/careers" element={<Careers />} />

      <Route path="/careers/:id" element={<CareerDetails />} />

      {/* =====================================================
          EDUCATION
      ===================================================== */}

      <Route path="/education" element={<Education />} />

      <Route path="/education/:id" element={<CourseDetails />} />

      {/* =====================================================
          ROADMAP
      ===================================================== */}

      <Route path="/roadmap" element={<Roadmap />} />

      <Route path="/roadmap/:id" element={<RoadmapDetails />} />

      {/* =====================================================
          COLLEGES
      ===================================================== */}

      <Route path="/colleges" element={<Colleges />} />

      <Route path="/colleges/:id" element={<CollegeDetails />} />

      {/* =====================================================
          EXAMS
      ===================================================== */}

      <Route path="/exams" element={<Exams />} />

      <Route path="/exams/:id" element={<ExamDetails />} />

      {/* =====================================================
          RESOURCES
      ===================================================== */}

      <Route path="/resources" element={<Resources />} />

      {/* =====================================================
          AI TOOLS
      ===================================================== */}

      {/* -----------------------------------------------------
          AI TOOLS MAIN PAGE
          URL: /ai-tools
      ----------------------------------------------------- */}

      <Route
        path="/ai-tools"
        element={
          <ProtectedRoute requireProfile>
            <AITools />
          </ProtectedRoute>
        }
      />

      {/* -----------------------------------------------------
          AI CONVERSATION
          URL: /ai-tools/conversation
      ----------------------------------------------------- */}

      <Route
        path="/ai-tools/conversation"
        element={
          <ProtectedRoute requireProfile>
            <AIConversation />
          </ProtectedRoute>
        }
      />

      {/* -----------------------------------------------------
          AI RECOMMENDATION
          URL: /ai-tools/recommendation
      ----------------------------------------------------- */}

      <Route
        path="/ai-tools/recommendation"
        element={
          <ProtectedRoute requireProfile>
            <AIRecommendation />
          </ProtectedRoute>
        }
      />

      {/* -----------------------------------------------------
          AI IMPACT TRACKER
          URL: /ai-tools/impact-tracker
      ----------------------------------------------------- */}

      <Route
        path="/ai-tools/impact-tracker"
        element={
          <ProtectedRoute requireProfile>
            <AIReplaceTracker />
          </ProtectedRoute>
        }
      />

      {/* -----------------------------------------------------
          AI SUPPORT
          URL: /ai-tools/support
      ----------------------------------------------------- */}

      <Route
        path="/ai-tools/support"
        element={
          <ProtectedRoute requireProfile>
            <AISupport />
          </ProtectedRoute>
        }
      />

      {/* =====================================================
          ASSESSMENTS
      ===================================================== */}

      {/* -----------------------------------------------------
          ASSESSMENT LIST
          URL: /assessments
      ----------------------------------------------------- */}

      <Route path="/assessments" element={<Assessments />} />

      {/* -----------------------------------------------------
          ASSESSMENT DETAILS
          URL: /assessments/:id
      ----------------------------------------------------- */}

      <Route
        path="/assessments/:id"
        element={
          <ProtectedRoute requireProfile>
            <AssessmentDetails />
          </ProtectedRoute>
        }
      />

      {/* -----------------------------------------------------
          TAKE ASSESSMENT
          URL: /assessments/attempt/:attemptId
      ----------------------------------------------------- */}

      <Route
        path="/assessments/attempt/:attemptId"
        element={
          <ProtectedRoute requireProfile>
            <TakeAssessment />
          </ProtectedRoute>
        }
      />

      {/* -----------------------------------------------------
          ASSESSMENT RESULT
          URL: /assessments/results/:resultId
      ----------------------------------------------------- */}

      <Route
        path="/assessments/results/:resultId"
        element={
          <ProtectedRoute requireProfile>
            <AssessmentResult />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
