import { useEffect, useState } from "react";

import {
  ArrowRight,
  GraduationCap,
  Building2,
  Wrench,
  RefreshCw
} from "lucide-react";

import { fetchAllDepartments } from "../../services/departmentService";

import "./DepartmentRoadmaps.css";

const DepartmentRoadmaps = ({ embedded = false, onViewRoadmap, onViewAll }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchAllDepartments();
        if (isMounted) {
          setDepartments(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || "Failed to load departments.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="departments-loading-box">
        <RefreshCw className="spin" size={26} />
        <span>Loading College Departments & Roadmaps...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="departments-error-box">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="department-roadmaps-section-inner">
      {/* RENDER HEADER ONLY IF NOT EMBEDDED IN HOME */}
      {!embedded && (
        <div className="department-standalone-header">
          <span className="section-badge">COLLEGE DEPARTMENTS</span>
          <h2>
            Department & Career <span>Roadmaps</span>
          </h2>
          <p>
            Explore the top college departments, degree courses, and industry
            career paths.
          </p>
        </div>
      )}

      {/* Modern Unique Card Grid */}
      <div className="departments-custom-grid">
        {departments.map((dept) => (
          <div key={dept._id} className="department-modern-card">
            <div className="dept-card-top">
              <div className="dept-card-icon">
                <GraduationCap size={22} />
              </div>
              <span className="dept-code-tag">{dept.code || "ENGG"}</span>
            </div>

            <h3 className="dept-name">{dept.departmentName}</h3>
            <p className="dept-desc">{dept.description}</p>

            <div className="dept-tags-row">
              {dept.degreesOffered?.slice(0, 3).map((deg, i) => (
                <span key={i} className="dept-tag">
                  {typeof deg === "string" ? deg : deg.courseCode || "B.E"}
                </span>
              ))}
            </div>

            <button
              type="button"
              className="dept-action-btn"
              onClick={() => onViewRoadmap(dept)}
            >
              <span>View Department Roadmap</span>
              <ArrowRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentRoadmaps;
