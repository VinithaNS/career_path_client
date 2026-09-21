import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { ArrowLeft, Briefcase, CheckCircle2, Award } from "lucide-react";

import { getDiplomaById } from "../../services/educationService";

import "./CourseDetails.css";

const DiplomaCourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diploma, setDiploma] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchDiploma = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getDiplomaById(id);
        if (isMounted) setDiploma(res?.data || res);
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Failed to load diploma details"
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDiploma();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="course-details-state">
        <div className="pure-css-loader"></div>
        <p>Loading Polytechnic Course Details...</p>
      </div>
    );
  }

  if (error || !diploma) {
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

  const lateralDegrees = diploma.lateralEntryScope?.degreeBranches || [
    "B.E Mechanical Engineering",
    "B.Tech Mechatronics",
    "B.E Robotics & Automation"
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
          <span>Back</span>
        </button>

        <div className="course-hero-banner">
          <div className="course-badge-row">
            <span className="course-type-pill">POLYTECHNIC DIPLOMA</span>
            <span className="course-code-pill">
              {diploma.courseCode || "DIPLOMA"}
            </span>
          </div>
          <h1>{diploma.courseName}</h1>
          <p>{diploma.shortDescription || diploma.description}</p>
        </div>

        <div className="course-details-grid">
          <div className="course-main-column">
            <div className="details-card">
              <h3>About This Program</h3>
              <p>{diploma.description || diploma.shortDescription}</p>
            </div>

            <div className="details-card">
              <div className="card-header-icon-wrap">
                <Award size={20} color="#059669" />
                <h3>Direct Lateral Entry (2nd Year B.E/B.Tech)</h3>
              </div>
              <p className="card-sub-hint">
                Diploma holders can join directly in the 2nd year (3rd semester)
                of the following B.E/B.Tech programs without writing 12th exams:
              </p>
              <div className="lateral-degrees-grid">
                {lateralDegrees.map((deg, i) => (
                  <div key={i} className="lateral-degree-item">
                    <CheckCircle2 size={16} color="#059669" />
                    <span>{deg}</span>
                  </div>
                ))}
              </div>
            </div>

            {diploma.skills && diploma.skills.length > 0 && (
              <div className="details-card">
                <h3>Technical Skills You Will Develop</h3>
                <div className="skills-chip-row">
                  {diploma.skills.map((sk, i) => (
                    <span key={i} className="skill-chip-tag">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {diploma.directJobRoles && diploma.directJobRoles.length > 0 && (
              <div className="details-card">
                <h3>Immediate Career Opportunities</h3>
                <div className="lateral-degrees-grid">
                  {diploma.directJobRoles.map((role, i) => (
                    <div key={i} className="lateral-degree-item">
                      <Briefcase size={16} color="#9333ea" />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="course-sidebar-column">
            <div className="side-metric-card">
              <span className="metric-label">Course Duration</span>
              <h4>{diploma.duration || "3 Years (6 Semesters)"}</h4>
            </div>

            <div className="side-metric-card">
              <span className="metric-label">Entry Salary Projection</span>
              <h4>{diploma.averageSalary || "₹2.5 - 4.5 LPA"}</h4>
            </div>

            <div className="side-metric-card">
              <span className="metric-label">Eligibility</span>
              <p className="eligibility-note">
                {diploma.eligibility ||
                  "Pass in 10th Standard (SSLC) with minimum required marks."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiplomaCourseDetails;
