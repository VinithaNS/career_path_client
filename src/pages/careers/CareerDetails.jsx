import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Lightbulb,
  IndianRupee,
  Users,
  BookOpen,
  Award,
  RefreshCw,
  CheckCircle2
} from "lucide-react";

import { getCareerById } from "../../services/careerService";

import "./CareerDetails.css";

/* =========================================================
   MAIN PAGE
========================================================= */

const CareerDetails = () => {
  const { id } = useParams();

  if (!id) {
    return <CareerDetailsError message="Career ID is missing." />;
  }

  return <CareerDetailsContent key={id} careerId={id} />;
};

/* =========================================================
   CAREER DETAILS CONTENT
========================================================= */

const CareerDetailsContent = ({ careerId }) => {
  const navigate = useNavigate();

  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCareer = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCareerById(careerId);

        if (!isMounted) return;

        if (response?.success && response?.data) {
          setCareer(response.data);
        } else {
          setCareer(null);
          setError(response?.message || "Career not found.");
        }
      } catch (err) {
        console.error("Career Details API Error:", err);

        if (!isMounted) return;

        setCareer(null);
        setError(
          err?.response?.data?.message || "Unable to load career details."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCareer();

    return () => {
      isMounted = false;
    };
  }, [careerId]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <section className="career-details-page">
        <div className="career-details-state">
          <div className="state-icon loading-icon">
            <RefreshCw size={32} className="spin" />
          </div>

          <h2>Loading career details...</h2>

          <p>Please wait while we fetch the career information.</p>
        </div>
      </section>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !career) {
    return <CareerDetailsError message={error} />;
  }

  /* =========================================================
     SAFE DATA
  ========================================================= */

  const education = Array.isArray(career.educationRequired)
    ? career.educationRequired
    : [];

  const skills = Array.isArray(career.requiredSkills)
    ? career.requiredSkills
    : [];

  const jobRoles = Array.isArray(career.jobRoles) ? career.jobRoles : [];

  const relatedCourses = Array.isArray(career.relatedCourses)
    ? career.relatedCourses
    : [];

  const certifications = Array.isArray(career.relatedCertifications)
    ? career.relatedCertifications
    : [];

  const salaryMin = career.salaryRange?.min;
  const salaryMax = career.salaryRange?.max;

  const hasSalaryRange =
    (salaryMin !== undefined && salaryMin > 0) ||
    (salaryMax !== undefined && salaryMax > 0);

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <section className="career-details-page">
      <div className="career-details-container">
        {/* =================================================
            BACK
        ================================================= */}

        <button
          type="button"
          className="back-careers-btn"
          onClick={() => navigate("/careers")}
        >
          <ArrowLeft size={18} />
          <span>Back to Careers</span>
        </button>

        {/* =================================================
            HERO
        ================================================= */}

        <header className="career-details-hero">
          <div className="hero-decoration hero-decoration-one" />
          <div className="hero-decoration hero-decoration-two" />

          <div className="career-details-hero-content">
            <div className="career-details-icon">
              <Briefcase size={34} strokeWidth={2} />
            </div>

            <div className="career-details-heading">
              <div className="career-meta">
                <span className="career-code">
                  {career.careerCode || "CAREER"}
                </span>

                {career.isFeatured && (
                  <span className="featured-badge">Featured Career</span>
                )}
              </div>

              <h1>{career.careerName}</h1>

              <p>
                {career.shortDescription ||
                  "Explore this career opportunity and learn more about the required skills, education and career scope."}
              </p>
            </div>
          </div>

          {career.careerImage && (
            <div className="career-details-image-wrapper">
              <img
                src={career.careerImage}
                alt={career.careerName}
                className="career-details-image"
              />
            </div>
          )}
        </header>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="career-details-layout">
          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <main className="career-details-main">
            {/* ABOUT */}
            <section className="career-details-card">
              <div className="section-title">
                <div className="section-title-icon blue">
                  <BookOpen size={21} />
                </div>

                <div>
                  <span>Overview</span>
                  <h2>About This Career</h2>
                </div>
              </div>

              <p className="career-description">
                {career.description ||
                  career.shortDescription ||
                  "No description available."}
              </p>
            </section>

            {/* ELIGIBILITY */}
            <section className="career-details-card">
              <div className="section-title">
                <div className="section-title-icon green">
                  <GraduationCap size={21} />
                </div>

                <div>
                  <span>Requirements</span>
                  <h2>Eligibility & Education</h2>
                </div>
              </div>

              {career.eligibility && (
                <div className="detail-block">
                  <h3>Eligibility</h3>

                  <p>{career.eligibility}</p>
                </div>
              )}

              {education.length > 0 && (
                <div className="detail-block">
                  <h3>Education Required</h3>

                  <ul className="detail-list">
                    {education.map((item, index) => (
                      <li key={index}>
                        <CheckCircle2 size={17} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!career.eligibility && education.length === 0 && (
                <p className="empty-detail">
                  No eligibility or education information available.
                </p>
              )}
            </section>

            {/* SKILLS */}
            <section className="career-details-card">
              <div className="section-title">
                <div className="section-title-icon purple">
                  <Lightbulb size={21} />
                </div>

                <div>
                  <span>Expertise</span>
                  <h2>Required Skills</h2>
                </div>
              </div>

              {skills.length > 0 ? (
                <div className="skills-list">
                  {skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      <CheckCircle2 size={15} />
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="empty-detail">No skills information available.</p>
              )}
            </section>

            {/* JOB ROLES */}
            <section className="career-details-card">
              <div className="section-title">
                <div className="section-title-icon orange">
                  <Users size={21} />
                </div>

                <div>
                  <span>Opportunities</span>
                  <h2>Job Roles</h2>
                </div>
              </div>

              {jobRoles.length > 0 ? (
                <div className="job-roles-list">
                  {jobRoles.map((role, index) => (
                    <div key={index} className="job-role-item">
                      <span className="job-role-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="job-role-text">{role}</span>

                      <ArrowRight size={17} className="role-arrow" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-detail">
                  No job roles information available.
                </p>
              )}
            </section>

            {/* CAREER SCOPE */}
            <section className="career-details-card">
              <div className="section-title">
                <div className="section-title-icon blue">
                  <Briefcase size={21} />
                </div>

                <div>
                  <span>Future</span>
                  <h2>Career Scope</h2>
                </div>
              </div>

              <p className="career-description">
                {career.careerScope ||
                  "Career scope information is not available."}
              </p>
            </section>
          </main>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="career-details-sidebar">
            {/* SALARY */}
            <section className="career-sidebar-card salary-card">
              <div className="salary-top">
                <div className="sidebar-icon">
                  <IndianRupee size={23} />
                </div>

                <span className="sidebar-label">Earning Potential</span>
              </div>

              <h3>Average Salary</h3>

              <strong>{career.averageSalary || "Not available"}</strong>

              {hasSalaryRange && (
                <div className="salary-range">
                  <span>₹{salaryMin || 0} LPA</span>
                  <span className="salary-dash">–</span>
                  <span>₹{salaryMax || 0} LPA</span>
                </div>
              )}
            </section>

            {/* COURSES */}
            <section className="career-sidebar-card">
              <div className="sidebar-title">
                <GraduationCap size={20} />
                <h3>Related Courses</h3>
              </div>

              {relatedCourses.length > 0 ? (
                <ul className="sidebar-list">
                  {relatedCourses.map((course, index) => (
                    <li key={index}>
                      <CheckCircle2 size={15} />

                      <span>
                        {typeof course === "object"
                          ? course.courseName || course.name || "Course"
                          : course}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-sidebar">No related courses available.</p>
              )}
            </section>

            {/* CERTIFICATIONS */}
            <section className="career-sidebar-card">
              <div className="sidebar-title">
                <Award size={20} />
                <h3>Certifications</h3>
              </div>

              {certifications.length > 0 ? (
                <ul className="sidebar-list">
                  {certifications.map((certification, index) => (
                    <li key={index}>
                      <CheckCircle2 size={15} />

                      <span>
                        {typeof certification === "object"
                          ? certification.certificationName ||
                            certification.name ||
                            "Certification"
                          : certification}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-sidebar">
                  No related certifications available.
                </p>
              )}
            </section>

            {/* QUICK ACTION */}
            <section className="career-sidebar-card quick-action-card">
              <div className="quick-action-icon">
                <Briefcase size={21} />
              </div>

              <h3>Interested in this career?</h3>

              <p>
                Explore more careers and find the path that matches your
                interests and skills.
              </p>

              <button type="button" onClick={() => navigate("/careers")}>
                <span>Explore More Careers</span>
                <ArrowRight size={16} />
              </button>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   ERROR COMPONENT
========================================================= */

const CareerDetailsError = ({ message }) => {
  const navigate = useNavigate();

  return (
    <section className="career-details-page">
      <div className="career-details-state">
        <div className="state-icon error-state-icon">
          <Briefcase size={38} />
        </div>

        <h2>Career Not Found</h2>

        <p>{message || "The requested career could not be found."}</p>

        <button
          type="button"
          className="error-back-button"
          onClick={() => navigate("/careers")}
        >
          <ArrowLeft size={18} />
          <span>Back to Careers</span>
        </button>
      </div>
    </section>
  );
};

export default CareerDetails;
