import { useCallback, useEffect, useState } from "react";

import {
  ArrowRight,
  Building2,
  Cpu,
  Dna,
  GraduationCap,
  HeartPulse,
  Radio,
  RotateCcw,
  Settings,
  TrendingUp,
  Zap
} from "lucide-react";

import { fetchAllDepartments } from "../../services/departmentService";

import "./DepartmentRoadmaps.css";

const ICON_MAP = {
  "computer-science": {
    Icon: Cpu,
    color: "blue"
  },

  "electronics-communication": {
    Icon: Radio,
    color: "teal"
  },

  mechanical: {
    Icon: Settings,
    color: "indigo"
  },

  civil: {
    Icon: Building2,
    color: "purple"
  },

  "electrical-electronics": {
    Icon: Zap,
    color: "pink"
  },

  biotechnology: {
    Icon: Dna,
    color: "rose"
  },

  "medical-allied-health": {
    Icon: HeartPulse,
    color: "red"
  },

  "business-management": {
    Icon: TrendingUp,
    color: "sky"
  }
};

const DEFAULT_ICON = {
  Icon: GraduationCap,
  color: "violet"
};

const getVisuals = (department) => {
  const key = department?.icon || department?.slug;

  return ICON_MAP[key] || DEFAULT_ICON;
};

const getDepartmentSubtitle = (department) => {
  const tags = Array.isArray(department?.tags)
    ? department.tags.filter(Boolean)
    : [];

  if (department?.shortCode && tags.length > 0) {
    return `${department.shortCode} • ${tags.slice(0, 2).join(" • ")}`;
  }

  if (department?.shortCode) {
    return department.shortCode;
  }

  return tags.slice(0, 3).join(" • ");
};

const DepartmentCard = ({ department, onViewRoadmap }) => {
  const { Icon, color } = getVisuals(department);

  const subtitle = getDepartmentSubtitle(department);

  return (
    <article className={`dept-card dept-color-${color}`}>
      <div className="dept-card-top">
        <div className="dept-card-icon">
          <Icon size={22} strokeWidth={2} />
        </div>

        {department?.isPopular && (
          <span className="dept-popular-badge">Popular</span>
        )}
      </div>

      <div className="dept-card-body">
        <h3 className="dept-card-name">{department?.name || "Department"}</h3>

        {subtitle && <p className="dept-card-tags">{subtitle}</p>}

        {department?.description && (
          <p className="dept-card-description">{department.description}</p>
        )}
      </div>

      <button
        type="button"
        className="dept-card-link"
        onClick={() => onViewRoadmap(department)}
      >
        <span>View Roadmap</span>

        <ArrowRight size={17} strokeWidth={2} />
      </button>
    </article>
  );
};

const CardSkeleton = () => {
  return (
    <div className="dept-skeleton">
      <div className="dept-skeleton-top">
        <div className="dept-skeleton-block dept-skeleton-icon" />
      </div>

      <div className="dept-skeleton-content">
        <div className="dept-skeleton-block dept-skeleton-line-lg" />

        <div className="dept-skeleton-block dept-skeleton-line-sm" />

        <div className="dept-skeleton-block dept-skeleton-line-description" />
      </div>

      <div className="dept-skeleton-block dept-skeleton-line-xs" />
    </div>
  );
};

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="dept-state">
      <div className="dept-state-icon">
        <RotateCcw size={22} />
      </div>

      <h3 className="dept-state-title">Unable to load departments</h3>

      <p className="dept-state-message">{message}</p>

      <button type="button" className="dept-retry-btn" onClick={onRetry}>
        <RotateCcw size={16} />
        <span>Try again</span>
      </button>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="dept-state">
      <div className="dept-state-icon">
        <GraduationCap size={24} />
      </div>

      <h3 className="dept-state-title">No departments available</h3>

      <p className="dept-state-message">
        Departments will appear here once they are added.
      </p>
    </div>
  );
};

const DepartmentRoadmaps = ({ onViewRoadmap, onViewAll }) => {
  const [departments, setDepartments] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const loadDepartments = useCallback(async () => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const data = await fetchAllDepartments();

      setDepartments(Array.isArray(data) ? data : []);
      setStatus("success");
    } catch (error) {
      console.error("Department loading error:", error);

      setErrorMessage(
        error?.message === "Failed to fetch"
          ? "Couldn't reach the server. Please make sure your backend is running."
          : error?.message || "Something went wrong while loading departments."
      );

      setStatus("error");
    }
  }, []);

  useEffect(() => {
    loadDepartments();
  }, [loadDepartments]);

  const handleViewRoadmap = (department) => {
    if (typeof onViewRoadmap === "function") {
      onViewRoadmap(department);
      return;
    }

    if (department?.slug) {
      window.location.href = `/departments/${department.slug}`;
    }
  };

  const handleViewAll = () => {
    if (typeof onViewAll === "function") {
      onViewAll();
    }
  };

  return (
    <section className="dept-section">
      <div className="dept-container">
        {/* Header */}
        <div className="dept-header">
          <div className="dept-header-content">
            <span className="dept-eyebrow">Explore Your Options</span>

            <h1 className="dept-title">Department &amp; Career Roadmaps</h1>

            <p className="dept-subtitle">
              Explore college departments, understand career opportunities, and
              follow a clear roadmap toward your dream career.
            </p>
          </div>

          <button
            type="button"
            className="dept-view-all"
            onClick={handleViewAll}
          >
            <span>View All Departments</span>

            <ArrowRight size={17} strokeWidth={2} />
          </button>
        </div>

        {/* Loading */}
        {status === "loading" && (
          <div className="dept-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="dept-grid">
            <ErrorState message={errorMessage} onRetry={loadDepartments} />
          </div>
        )}

        {/* Empty */}
        {status === "success" && departments.length === 0 && (
          <div className="dept-grid">
            <EmptyState />
          </div>
        )}

        {/* Departments */}
        {status === "success" && departments.length > 0 && (
          <div className="dept-grid">
            {departments.map((department) => (
              <DepartmentCard
                key={department?._id || department?.slug || department?.name}
                department={department}
                onViewRoadmap={handleViewRoadmap}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DepartmentRoadmaps;
