import { Routes, Route } from "react-router-dom";

import CourseLearningPath from "../components/courseLearningPath/CourseLearningPath";
import DepartmentDetails from "../components/department/DepartmentDetails";
import EleventhGroupDetails from "../components/eleventhGroup/EleventhGroupDetails";
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
import DepartmentsPage from "../pages/department/DepartmentPage";
import CourseDetails from "../pages/education/CourseDetails";
import DiplomaCourse from "../pages/education/DiplomaCourse";
import DiplomaCourseDetails from "../pages/education/DiplomaCourseDetails";
import Education from "../pages/education/Education";
import EleventhGroupsPage from "../pages/eleventhGroup/EleventhGroupsPage";
import Exams from "../pages/exams/Exam";
import ExamDetails from "../pages/exams/ExamDetails";
import MyProfile from "../pages/profile/MyProfile";
import Home from "../pages/public/Home";
import NotFound from "../pages/public/NotFound";
import Resources from "../pages/resources/Resources";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        }
      />

      {/* Post-10th Streams */}
      <Route path="/eleventh-groups" element={<EleventhGroupsPage />} />
      <Route path="/eleventh-groups/:id" element={<EleventhGroupDetails />} />

      {/* Post-10th Vocational Diplomas */}
      <Route path="/diploma-courses" element={<DiplomaCourse />} />
      <Route path="/diploma-courses/:id" element={<DiplomaCourseDetails />} />

      {/* Degree Courses */}
      <Route path="/education" element={<Education />} />
      <Route path="/education/learning-path" element={<CourseLearningPath />} />
      <Route path="/education/:id" element={<CourseDetails />} />

      {/* Departments */}
      <Route path="/departments" element={<DepartmentsPage />} />
      <Route path="/departments/:slug" element={<DepartmentDetails />} />

      {/* Careers & Roadmaps */}
      <Route path="/careers" element={<Careers />} />
      <Route path="/careers/:id" element={<CareerDetails />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/roadmap/:id" element={<RoadmapDetails />} />

      {/* Colleges */}
      <Route path="/colleges" element={<Colleges />} />
      <Route path="/colleges/:id" element={<CollegeDetails />} />

      {/* Exams */}
      <Route path="/exams" element={<Exams />} />
      <Route path="/exams/:id" element={<ExamDetails />} />

      {/* Resources */}
      <Route path="/resources" element={<Resources />} />

      {/* AI Tools */}
      <Route
        path="/ai-tools"
        element={
          <ProtectedRoute requireProfile>
            <AITools />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-tools/conversation"
        element={
          <ProtectedRoute requireProfile>
            <AIConversation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-tools/recommendation"
        element={
          <ProtectedRoute requireProfile>
            <AIRecommendation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-tools/impact-tracker"
        element={
          <ProtectedRoute requireProfile>
            <AIReplaceTracker />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-tools/support"
        element={
          <ProtectedRoute requireProfile>
            <AISupport />
          </ProtectedRoute>
        }
      />

      {/* Assessments */}
      <Route path="/assessments" element={<Assessments />} />
      <Route path="/assessments/:id" element={<AssessmentDetails />} />
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
        element={
          <ProtectedRoute requireProfile>
            <AssessmentResult />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
