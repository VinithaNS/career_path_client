import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import CareerDetails from "../pages/careers/CareerDetails";
import CareerList from "../pages/careers/CareerList";
import Home from "../pages/home/Home";
import CareerRoadmap from "../pages/roadmap/CareerRoadmap";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="careers" element={<CareerList />} />

          <Route path="/careers/:id" element={<CareerDetails />} />

          <Route path="roadmap" element={<CareerRoadmap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
