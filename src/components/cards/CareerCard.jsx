import {
  ArrowRight,
  Code2,
  Shield,
  BarChart3,
  Palette,
  Database,
  BriefcaseBusiness
} from "lucide-react";

const CareerCard = ({ career, onViewDetails }) => {
  // =====================================================
  // SELECT ICON
  // =====================================================

  const getCareerIcon = (careerName = "") => {
    const name = careerName.toLowerCase();

    if (
      name.includes("software") ||
      name.includes("developer") ||
      name.includes("program")
    ) {
      return <Code2 size={24} />;
    }

    if (name.includes("cyber") || name.includes("security")) {
      return <Shield size={24} />;
    }

    if (name.includes("data") || name.includes("scientist")) {
      return <BarChart3 size={24} />;
    }

    if (
      name.includes("ui") ||
      name.includes("ux") ||
      name.includes("designer")
    ) {
      return <Palette size={24} />;
    }

    if (name.includes("database") || name.includes("database")) {
      return <Database size={24} />;
    }

    return <BriefcaseBusiness size={24} />;
  };

  // =====================================================
  // DEMAND
  // =====================================================

  const getDemand = () => {
    const name = career?.careerName?.toLowerCase() || "";

    if (
      name.includes("software") ||
      name.includes("developer") ||
      name.includes("data") ||
      name.includes("cyber")
    ) {
      return "High Demand";
    }

    return "Medium Demand";
  };

  return (
    <div className="career-card">
      {/* ICON */}
      <div className="career-card-icon">
        {getCareerIcon(career?.careerName)}
      </div>

      {/* CAREER NAME */}
      <h3>{career?.careerName || "Career"}</h3>

      {/* DESCRIPTION */}
      <p className="career-description">
        {career?.shortDescription ||
          career?.description ||
          "Explore this career opportunity."}
      </p>

      {/* DEMAND */}
      <span
        className={`career-demand ${
          getDemand() === "High Demand" ? "high-demand" : "medium-demand"
        }`}
      >
        {getDemand()}
      </span>

      {/* SALARY */}
      <div className="career-salary">
        {career?.averageSalary || "Salary information unavailable"}
      </div>

      {/* BUTTON */}
      <button
        className="career-details-btn"
        onClick={() => onViewDetails(career?._id)}
      >
        View Details
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default CareerCard;
