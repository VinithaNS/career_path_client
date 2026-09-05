// import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../src/components/common/Navbar";
import Roadmap from "../src/components/roadmap/Roadmap";
import AITools from "../src/pages/ai/AITools";
import Careers from "../src/pages/careers/Careers";
import Colleges from "../src/pages/colleges/Colleges";
import Exams from "../src/pages/exams/Exam";
import Home from "../src/pages/public/Home";
import Resources from "../src/pages/resources/Resources";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/careers" element={<Careers />} />

        <Route path="/roadmap" element={<Roadmap />} />

        <Route path="/colleges" element={<Colleges />} />

        <Route path="/exams" element={<Exams />} />

        <Route path="/resources" element={<Resources />} />

        <Route path="/ai-tools" element={<AITools />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
