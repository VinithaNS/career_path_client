import { Routes, Route } from "react-router-dom";

import CareerDetails from "../pages/careers/CareerDetails";
import Careers from "../pages/careers/Careers";
import CourseDetails from "../pages/education/CourseDetails";
import Education from "../pages/education/Education";
import Home from "../pages/public/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/careers/:id" element={<CareerDetails />} />
      <Route path="/education" element={<Education />} />
      <Route path="/education/:id" element={<CourseDetails />} />
    </Routes>
  );
};

export default AppRoutes;
