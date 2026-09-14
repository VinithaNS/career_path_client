import { useNavigate } from "react-router-dom";

import DepartmentRoadmaps from "../../components/department/DepartmentRoadmap";

const DepartmentsPage = () => {
  const navigate = useNavigate();

  const handleViewRoadmap = (department) => {
    navigate(`/departments/${department.slug}`);
  };

  const handleViewAll = () => {
    // Already on the departments page.
    // Keeping this here allows DepartmentRoadmaps to remain reusable.
    navigate("/departments");
  };

  return (
    <main>
      <DepartmentRoadmaps
        onViewRoadmap={handleViewRoadmap}
        onViewAll={handleViewAll}
      />
    </main>
  );
};

export default DepartmentsPage;
