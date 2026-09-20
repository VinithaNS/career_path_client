import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Building2,
  GraduationCap,
  Briefcase,
  Map,
  ArrowRight,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  BookOpen
} from "lucide-react";

import { fetchDepartmentBySlug } from "../../services/departmentService";
import { getCourseByName } from "../../services/educationService";
import { getRoadmapByTitle } from "../../services/roadmapService";

import "./DepartmentDetails.css";

const DepartmentDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [dept, setDept] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchDepartmentBySlug(slug);
        if (isMounted) {
          setDept(data?.data || data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || "Failed to load department details.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/departments");
    }
  };

  const handleCourseClick = async (courseItem) => {
    const courseName =
      typeof courseItem === "string" ? courseItem : courseItem.courseName;
    const courseId = courseItem?._id;

    if (courseId) {
      navigate(`/education/${courseId}`);
      return;
    }

    try {
      setActionLoading(courseName);
      const res = await getCourseByName(courseName);
      if (res?.data?._id) {
        navigate(`/education/${res.data._id}`);
      } else {
        navigate("/education");
      }
    } catch {
      navigate("/education");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRoadmapClick = async (roadmapItem) => {
    const title =
      typeof roadmapItem === "string" ? roadmapItem : roadmapItem.title;
    const roadmapId = roadmapItem?._id;

    if (roadmapId) {
      navigate(`/roadmap/${roadmapId}`);
      return;
    }

    try {
      setActionLoading(title);
      const res = await getRoadmapByTitle(title);
      if (res?.data?._id) {
        navigate(`/roadmap/${res.data._id}`);
      } else {
        navigate("/roadmap");
      }
    } catch {
      navigate("/roadmap");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="dept-loading-screen">
        <RefreshCw size={32} className="spin" />
        <p>Loading Department Roadmap & Curriculum...</p>
      </div>
    );
  }

  if (error || !dept) {
    return (
      <div className="dept-error-screen">
        <h2>Department Not Found</h2>
        <p>{error || "The department information could not be retrieved."}</p>
        <button type="button" className="btn-dept-back" onClick={handleBack}>
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  // Gracefully handles all schema variations (degreesOffered, degreeCoursesOffered, degrees)
  const degrees =
    dept.degreeCoursesOffered || dept.degreesOffered || dept.degrees || [];
  const roadmaps = dept.careerRoadmaps || dept.roadmaps || [];
  const groups =
    dept.eligibleEleventhGroups || dept.suitableEleventhGroups || [];

  return (
    <div className="dept-details-viewport">
      <div className="dept-details-wrapper">
        {/* Navigation Breadcrumb Bar */}
        <div className="dept-nav-header">
          <button type="button" className="dept-back-pill" onClick={handleBack}>
            <ArrowLeft size={15} />
            <span>Back</span>
          </button>
          <span className="dept-crumb-divider">/</span>
          <button
            type="button"
            className="dept-crumb-link"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <span className="dept-crumb-divider">/</span>
          <button
            type="button"
            className="dept-crumb-link"
            onClick={() => navigate("/departments")}
          >
            Departments
          </button>
          <span className="dept-crumb-divider">/</span>
          <span className="dept-crumb-active">{dept.departmentName}</span>
        </div>

        {/* Hero Banner */}
        <div className="dept-hero-card">
          <div className="dept-hero-topline">
            <span className="dept-tag-badge">COLLEGE DEPARTMENT</span>
            <span className="dept-code-pill">{dept.code || "ENGG"}</span>
          </div>

          <h1>
            {dept.departmentName} <span>Roadmap</span>
          </h1>
          <p className="dept-hero-summary">
            {dept.description ||
              "Explore specialized degrees, foundational subjects, and industry career pathways."}
          </p>
        </div>

        {/* Section 1: Eligible 11th Grade Streams */}
        {groups.length > 0 && (
          <div className="dept-section-card">
            <div className="dept-card-heading">
              <div className="dept-icon-bubble purple">
                <BookOpen size={20} />
              </div>
              <div>
                <h3>Eligible 11th Grade Streams</h3>
                <p>
                  High school subject streams leading directly to this
                  department
                </p>
              </div>
            </div>

            <div className="dept-chips-container">
              {groups.map((grp) => (
                <button
                  key={grp._id || grp}
                  type="button"
                  className="dept-stream-tag"
                  onClick={() => navigate(`/eleventh-groups/${grp._id || grp}`)}
                >
                  <CheckCircle2 size={16} />
                  <span>{grp.groupName || grp}</span>
                  <ArrowRight size={14} className="tag-arrow" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Degree Programs Under This Department */}
        <div className="dept-section-card">
          <div className="dept-card-heading">
            <div className="dept-icon-bubble green">
              <GraduationCap size={20} />
            </div>
            <div>
              <div className="heading-with-count">
                <h3>Degree Programs Under This Department</h3>
                <span className="count-pill green">
                  {degrees.length} Programs
                </span>
              </div>
              <p>
                Undergraduate and postgraduate degrees offered within this
                domain
              </p>
            </div>
          </div>

          {degrees.length > 0 ? (
            <div className="dept-cards-grid">
              {degrees.map((course, idx) => {
                const name =
                  typeof course === "string"
                    ? course
                    : course.courseName || course.name;
                const duration = course?.duration || "3-4 Years";
                const isLoading = actionLoading === name;

                return (
                  <div
                    key={course._id || idx}
                    className={`dept-interactive-card degree ${isLoading ? "loading" : ""}`}
                    onClick={() => handleCourseClick(course)}
                  >
                    <div className="item-icon-box green">
                      <GraduationCap size={18} />
                    </div>
                    <div className="item-content">
                      <h4>{name}</h4>
                      <span className="item-subtext">
                        {duration} • Bachelor / Specialization
                      </span>
                    </div>
                    <ArrowRight size={16} className="item-chevron" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="dept-empty-box">
              <p>
                No specialized degrees listed directly under this department
                code yet.
              </p>
              <button
                type="button"
                className="btn-link-action"
                onClick={() => navigate("/education")}
              >
                <span>Explore All Degree Programs</span>
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>

        {/* Section 3: Career Roadmaps */}
        <div className="dept-section-card">
          <div className="dept-card-heading">
            <div className="dept-icon-bubble orange">
              <Map size={20} />
            </div>
            <div>
              <div className="heading-with-count">
                <h3>Career Roadmaps</h3>
                <span className="count-pill orange">
                  {roadmaps.length} Roadmaps
                </span>
              </div>
              <p>Follow structured skill milestones to become industry-ready</p>
            </div>
          </div>

          {roadmaps.length > 0 ? (
            <div className="dept-cards-grid">
              {roadmaps.map((mapItem, idx) => {
                const title =
                  typeof mapItem === "string" ? mapItem : mapItem.title;
                const duration = mapItem?.duration || "12-18 Months";
                const isLoading = actionLoading === title;

                return (
                  <div
                    key={mapItem._id || idx}
                    className={`dept-interactive-card roadmap ${isLoading ? "loading" : ""}`}
                    onClick={() => handleRoadmapClick(mapItem)}
                  >
                    <div className="item-icon-box orange">
                      <Briefcase size={18} />
                    </div>
                    <div className="item-content">
                      <h4>{title}</h4>
                      <span className="item-subtext">
                        {duration} • Step-by-Step Milestones
                      </span>
                    </div>
                    <ArrowRight size={16} className="item-chevron" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="dept-empty-box">
              <p>
                Career roadmaps for this domain are curated in the Central
                Roadmap Hub.
              </p>
              <button
                type="button"
                className="btn-primary-action"
                onClick={() => navigate("/roadmap")}
              >
                <span>Browse All Career Roadmaps</span>
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
