import { Routes, Route } from "react-router-dom";

import Roadmap from "../components/roadmap/Roadmap";
import AITools from "../pages/ai/AITools";
import CareerDetails from "../pages/careers/CareerDetails";
import Careers from "../pages/careers/Careers";
import Colleges from "../pages/colleges/Colleges";
import CourseDetails from "../pages/education/CourseDetails";
import Education from "../pages/education/Education";
import Exams from "../pages/exams/Exam";
import Home from "../pages/public/Home";
import Resources from "../pages/resources/Resources";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Careers */}
      <Route path="/careers" element={<Careers />} />
      <Route path="/careers/:id" element={<CareerDetails />} />

      {/* Education */}
      <Route path="/education" element={<Education />} />
      <Route path="/education/:id" element={<CourseDetails />} />

      {/* Roadmap */}
      <Route path="/roadmap" element={<Roadmap />} />

      {/* Colleges */}
      <Route path="/colleges" element={<Colleges />} />

      {/* Exams */}
      <Route path="/exams" element={<Exams />} />

      {/* Resources */}
      <Route path="/resources" element={<Resources />} />

      {/* AI Tools */}
      <Route path="/ai-tools" element={<AITools />} />
    </Routes>
  );
};

export default AppRoutes;
