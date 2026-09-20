import {
  Wrench,
  Clock,
  Briefcase,
  GraduationCap,
  ArrowRight
} from "lucide-react";

import "./DiplomaCard.css";

const DiplomaCard = ({ diploma, onViewDetails }) => {
  const {
    _id,
    courseName,
    courseCode,
    stream,
    duration,
    // skills,
    averageSalary,
    lateralEntryScope,
    directJobRoles
  } = diploma;

  return (
    <div className="diploma-card">
      <div className="diploma-card-header">
        <div className="diploma-card-icon">
          <Wrench size={22} />
        </div>
        <span className="diploma-badge">{courseCode}</span>
      </div>

      <span className="diploma-stream-label">
        {stream || "Technical Diploma"}
      </span>
      <h3 className="diploma-title">{courseName}</h3>

      <div className="diploma-metrics">
        <div className="metric-pill">
          <Clock size={14} />
          <span>{duration || "3 Years"}</span>
        </div>
        {averageSalary && (
          <div className="metric-pill">
            <Briefcase size={14} />
            <span>{averageSalary}</span>
          </div>
        )}
      </div>

      <div className="diploma-section-info">
        <strong>Direct Job Roles:</strong>
        <p>
          {directJobRoles && directJobRoles.length > 0
            ? directJobRoles
                .map((j) =>
                  typeof j === "string" ? j : j.title || j.roleTitle
                )
                .slice(0, 2)
                .join(", ")
            : "Junior Engineer, Technician, Site Assistant"}
        </p>
      </div>

      {lateralEntryScope?.eligibleForDirectSecondYearBE && (
        <div className="lateral-pill">
          <GraduationCap size={15} />
          <span>Direct 2nd Year B.E. / B.Tech Eligible</span>
        </div>
      )}

      <button
        type="button"
        className="diploma-view-btn"
        onClick={() => onViewDetails(_id)}
      >
        <span>Explore Curriculum & Career Scope</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default DiplomaCard;
