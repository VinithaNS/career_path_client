// src/pages/department/DepartmentPage.jsx
import { useNavigate } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import DepartmentRoadmap from "../../components/department/DepartmentRoadmap";

const DepartmentsPage = () => {
  const navigate = useNavigate();

  return (
    <main
      style={{
        maxWidth: "1380px",
        margin: "0 auto",
        padding: "20px 28px 80px"
      }}
    >
      <button
        type="button"
        onClick={() => navigate("/")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "transparent",
          border: "none",
          color: "#9333ea",
          fontWeight: "700",
          fontSize: "14px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        <ArrowLeft size={18} />
        <span>Back to Home</span>
      </button>

      <DepartmentRoadmap
        embedded={false}
        onViewRoadmap={(department) => {
          navigate(`/departments/${department.slug}`);
        }}
        onViewAll={() => {
          navigate("/departments");
        }}
      />
    </main>
  );
};

export default DepartmentsPage;
