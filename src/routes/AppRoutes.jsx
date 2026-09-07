import { Routes, Route } from "react-router-dom";

import Roadmap from "../components/roadmap/Roadmap";
import RoadmapDetails from "../components/roadmap/RoadmapDetails";
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
      {/* HOME */}
      <Route path="/" element={<Home />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />

      {/* PROFILE */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        }
      />

      {/* CAREERS */}
      <Route path="/careers" element={<Careers />} />
      <Route path="/careers/:id" element={<CareerDetails />} />

      {/* EDUCATION */}
      <Route path="/education" element={<Education />} />
      <Route path="/education/:id" element={<CourseDetails />} />

      {/* ROADMAP */}
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/roadmap/:id" element={<RoadmapDetails />} />

      {/* COLLEGES */}
      <Route path="/colleges" element={<Colleges />} />
      <Route path="/colleges/:id" element={<CollegeDetails />} />

      {/* EXAMS */}
      <Route path="/exams" element={<Exams />} />
      <Route path="/exams/:id" element={<ExamDetails />} />

      {/* RESOURCES */}
      <Route path="/resources" element={<Resources />} />

      {/* AI TOOLS */}
      <Route path="/ai-tools" element={<AITools />} />

      {/* ASSESSMENTS */}
      <Route path="/assessments" element={<Assessments />} />
      <Route
        path="/assessments/:id"
        element={
          <ProtectedRoute requireProfile>
            <AssessmentDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assessments/attempt/:attemptId"
        element={
          <ProtectedRoute requireProfile>
            <TakeAssessment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assessments/results/:resultId"
        element={<AssessmentResult />}
      />
    </Routes>
  );
};

export default AppRoutes;
