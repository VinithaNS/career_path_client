import { Routes, Route } from "react-router-dom";

import Roadmap from "../components/roadmap/Roadmap";
import RoadmapDetails from "../components/roadmap/RoadmapDetails";
import AITools from "../pages/ai/AITools";
import CareerDetails from "../pages/careers/CareerDetails";
import Careers from "../pages/careers/Careers";
import CollegeDetails from "../pages/colleges/CollegeDetails";
import Colleges from "../pages/colleges/Colleges";
import CourseDetails from "../pages/education/CourseDetails";
import Education from "../pages/education/Education";
import Exams from "../pages/exams/Exam";
import Home from "../pages/public/Home";
import Resources from "../pages/resources/Resources";

const AppRoutes = () => {
  return (
    <Routes>
      {/* HOME */}
      <Route path="/" element={<Home />} />

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

      {/* RESOURCES */}
      <Route path="/resources" element={<Resources />} />

      {/* AI TOOLS */}
      <Route path="/ai-tools" element={<AITools />} />
    </Routes>
  );
};

export default AppRoutes;
