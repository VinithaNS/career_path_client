import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  GraduationCap,
  Clock,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  BookOpen,
  ArrowRight
} from "lucide-react";

import { getCourseById } from "../../services/educationService";
import { getRoadmapByTitle } from "../../services/roadmapService";

import "./CourseDetails.css";

const formatSalary = (val, fallback = "₹3 - ₹8 LPA") => {
  if (!val) return fallback;
  if (typeof val === "string") return val;
  if (typeof val === "object") {
    if (val.min !== undefined && val.max !== undefined) {
      const minLakh =
        val.min >= 100000 ? (val.min / 100000).toFixed(1) : val.min;
      const maxLakh =
        val.max >= 100000 ? (val.max / 100000).toFixed(1) : val.max;
      return `₹${minLakh} - ₹${maxLakh} LPA`;
    }
    if (val.min !== undefined) return `₹${val.min} LPA`;
    if (val.max !== undefined) return `Up to ₹${val.max} LPA`;
  }
  return fallback;
};

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getCourseById(id);
        if (isMounted) setCourse(res?.data || res);
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Failed to load course details"
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCourse();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleRoleClick = async (roleTitle) => {
    try {
      const res = await getRoadmapByTitle(roleTitle);
      if (res?.data?._id) {
        navigate(`/roadmap/${res.data._id}`);
      } else {
        navigate("/roadmap");
      }
    } catch {
      navigate("/roadmap");
    }
  };

  if (loading) {
    return (
      <div className="course-details-state">
        <div className="pure-css-loader"></div>
        <p>Loading Degree Program...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-details-state error">
        <h2>Course Not Found</h2>
        <p>{error}</p>
        <button type="button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const subjectsList = course.subjects || [
    "Programming in C",
    "Data Structures",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
    "Web Development"
  ];

  const skillsList = course.skills || [
    "Programming",
    "Problem Solving",
    "Database Management",
    "Web Development",
    "Computer Networking"
  ];

  const jobRolesList = course.jobRoles || [
    "Software Developer",
    "Web Developer",
    "Database Administrator",
    "System Administrator"
  ];

  const higherStudiesList = course.higherStudies || [
    "M.Sc Computer Science",
    "MCA (Master of Computer Applications)",
    "MBA in Information Technology"
  ];

  return (
    <div className="course-details-page">
      <div className="course-details-container">
        <button
          type="button"
          className="details-back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          <span>Back to Education</span>
        </button>

        <div className="course-hero-banner">
          <div className="course-badge-row">
            <span className="course-type-pill">
              {course.degreeType || "UG DEGREE"}
            </span>
            <span className="course-code-pill">
              {course.courseCode || "DEGREE"}
            </span>
          </div>
          <h1>{course.courseName}</h1>
          <p>{course.shortDescription || course.description}</p>
        </div>

        <div className="course-details-grid">
          <div className="course-main-column">
            <div className="details-card">
              <h3>About the Course</h3>
              <p>{course.about || course.description}</p>
            </div>

            <div className="details-card">
              <h3>Eligibility &amp; Admission</h3>
              <div className="eligibility-highlight-box">
                <strong>Prerequisite:</strong>{" "}
                {course.eligibility ||
                  "12th standard pass with Mathematics or Science."}
              </div>
              <h4 className="details-sub-heading">Admission Process</h4>
              <p className="card-plain-text">
                {course.admissionProcess ||
                  "Admission based on qualifying examination cut-off marks and university counseling."}
              </p>
            </div>

            <div className="details-card">
              <div className="card-header-icon-wrap">
                <BookOpen size={20} color="#9333ea" />
                <h3>Core Subjects &amp; Curriculum</h3>
              </div>
              <div className="subjects-tags-grid">
                {subjectsList.map((sub, i) => (
                  <div key={i} className="subject-chip-item">
                    <CheckCircle2 size={16} color="#059669" />
                    <span>
                      {typeof sub === "string" ? sub : sub.name || sub.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="details-card">
              <h3>Skills You Can Develop</h3>
              <div className="skills-chip-row">
                {skillsList.map((sk, i) => (
                  <span key={i} className="skill-chip-tag">
                    {typeof sk === "string" ? sk : sk.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="details-card">
              <div className="card-header-icon-wrap">
                <Briefcase size={20} color="#db2777" />
                <div>
                  <h3>Job Roles &amp; Opportunities</h3>
                  <p className="card-sub-hint">
                    Click any role to explore its roadmap
                  </p>
                </div>
              </div>
              <div className="lateral-degrees-grid">
                {jobRolesList.map((role, i) => {
                  const roleName =
                    typeof role === "string"
                      ? role
                      : role.title || role.roleName;
                  return (
                    <div
                      key={i}
                      className="interactive-role-item"
                      onClick={() => handleRoleClick(roleName)}
                    >
                      <span>{roleName}</span>
                      <ArrowRight size={15} className="role-arrow" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="course-sidebar-column">
            <div className="side-metric-card side-highlight-card">
              <span className="metric-label">Course Overview</span>
              <div className="side-spec-row">
                <Clock size={16} color="#9333ea" />
                <span>
                  <strong>Duration:</strong> {course.duration || "3 Years"}
                </span>
              </div>
              <div className="side-spec-row">
                <GraduationCap size={16} color="#9333ea" />
                <span>
                  <strong>Degree Type:</strong> {course.degreeType || "UG"}
                </span>
              </div>
              <div className="side-spec-row">
                <TrendingUp size={16} color="#059669" />
                <span>
                  <strong>Salary Projection:</strong>{" "}
                  {formatSalary(course.averageSalary)}
                </span>
              </div>
            </div>

            <div className="side-metric-card">
              <span className="metric-label">Higher Studies Progression</span>
              <p className="card-plain-text">
                Postgraduate degrees recommended after graduation:
              </p>
              <div className="higher-studies-list">
                {higherStudiesList.map((deg, i) => (
                  <div key={i} className="higher-study-item">
                    <GraduationCap size={14} color="#7e22ce" />
                    <span>{typeof deg === "string" ? deg : deg.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
