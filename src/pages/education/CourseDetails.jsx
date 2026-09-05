import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  GraduationCap,
  IndianRupee,
  RefreshCw,
  School,
  Sparkles,
  Target,
  TrendingUp
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { getCourseById } from "../../services/educationService";

import "./CourseDetails.css";

const CourseDetails = () => {
  const { id } = useParams();

  if (!id) {
    return <CourseDetailsError message="Course ID is missing." />;
  }

  return <CourseDetailsContent key={id} courseId={id} />;
};

const CourseDetailsContent = ({ courseId }) => {
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCourse = async () => {
      try {
        console.log("Course ID:", courseId);

        const response = await getCourseById(courseId);

        console.log("Course Details API Response:", response);

        if (!isMounted) return;

        if (response?.success && response?.data) {
          setCourse(response.data);
          setError("");
        } else {
          setCourse(null);
          setError(response?.message || "Course not found.");
        }
      } catch (err) {
        console.error("Course Details API Error:", err);

        if (!isMounted) return;

        setCourse(null);

        setError(
          err?.response?.data?.message || "Unable to load course details."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCourse();

    return () => {
      isMounted = false;
    };
  }, [courseId]);

  if (loading) {
    return (
      <section className="course-details-page">
        <div className="course-details-loading">
          <div className="course-loading-icon">
            <RefreshCw size={32} className="spin" />
          </div>

          <h2>Loading course details...</h2>

          <p>Please wait while we fetch the course information.</p>
        </div>
      </section>
    );
  }

  if (error || !course) {
    return <CourseDetailsError message={error} />;
  }

  const subjects = Array.isArray(course.subjects) ? course.subjects : [];

  const skills = Array.isArray(course.skills) ? course.skills : [];

  const jobRoles = Array.isArray(course.jobRoles) ? course.jobRoles : [];

  const higherStudies = Array.isArray(course.higherStudies)
    ? course.higherStudies
    : [];

  const careerOptions = Array.isArray(course.careerOptions)
    ? course.careerOptions
    : [];

  const colleges = Array.isArray(course.colleges) ? course.colleges : [];

  const categoryName =
    typeof course.categoryId === "object"
      ? course.categoryId?.name
      : "Education";

  return (
    <section className="course-details-page">
      <div className="course-details-container">
        {/* ========================================== */}
        {/* BACK */}
        {/* ========================================== */}

        <button
          type="button"
          className="back-education-btn"
          onClick={() => navigate("/education")}
        >
          <ArrowLeft size={18} />
          <span>Back to Education</span>
        </button>

        {/* ========================================== */}
        {/* HERO */}
        {/* ========================================== */}

        <div className="course-details-hero">
          <div className="course-details-hero-content">
            <div className="course-details-icon">
              <GraduationCap size={34} />
            </div>

            <div className="course-details-heading">
              <div className="course-meta">
                <span className="course-code-badge">{course.courseCode}</span>

                <span className="course-type-badge">
                  {course.degreeType || "UG"}
                </span>

                {categoryName && (
                  <span className="course-category-badge">{categoryName}</span>
                )}
              </div>

              <h1>{course.courseName}</h1>

              <p>
                {course.shortDescription ||
                  course.description ||
                  "Explore this course and discover its educational and career opportunities."}
              </p>
            </div>
          </div>

          {course.imageUrl && (
            <div className="course-details-image-wrapper">
              <img
                src={course.imageUrl}
                alt={course.courseName}
                className="course-details-image"
              />
            </div>
          )}
        </div>

        {/* ========================================== */}
        {/* QUICK INFO */}
        {/* ========================================== */}

        <div className="course-quick-info">
          <div className="course-info-item">
            <div className="course-info-icon blue">
              <Clock3 size={21} />
            </div>

            <div>
              <span>Duration</span>
              <strong>{course.duration || "Not available"}</strong>
            </div>
          </div>

          <div className="course-info-item">
            <div className="course-info-icon green">
              <GraduationCap size={21} />
            </div>

            <div>
              <span>Degree Type</span>
              <strong>{course.degreeType || "UG"}</strong>
            </div>
          </div>

          <div className="course-info-item">
            <div className="course-info-icon purple">
              <Target size={21} />
            </div>

            <div>
              <span>Course Code</span>
              <strong>{course.courseCode}</strong>
            </div>
          </div>

          <div className="course-info-item">
            <div className="course-info-icon orange">
              <IndianRupee size={21} />
            </div>

            <div>
              <span>Average Salary</span>
              <strong>{course.averageSalary || "Not available"}</strong>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* MAIN LAYOUT */}
        {/* ========================================== */}

        <div className="course-details-layout">
          <main className="course-details-main">
            {/* ABOUT */}

            <div className="course-details-card">
              <div className="course-section-title">
                <div className="course-section-icon blue">
                  <BookOpen size={21} />
                </div>

                <div>
                  <span>OVERVIEW</span>
                  <h2>About This Course</h2>
                </div>
              </div>

              <p className="course-description">
                {course.description ||
                  course.shortDescription ||
                  "No course description is available."}
              </p>
            </div>

            {/* ELIGIBILITY */}

            <div className="course-details-card">
              <div className="course-section-title">
                <div className="course-section-icon green">
                  <CheckCircle2 size={21} />
                </div>

                <div>
                  <span>ADMISSION</span>
                  <h2>Eligibility</h2>
                </div>
              </div>

              <div className="eligibility-box">
                <p>
                  {course.eligibility ||
                    "Eligibility information is not available."}
                </p>
              </div>

              {course.admissionProcess && (
                <div className="course-detail-block">
                  <h3>Admission Process</h3>

                  <p>{course.admissionProcess}</p>
                </div>
              )}
            </div>

            {/* SUBJECTS */}

            <div className="course-details-card">
              <div className="course-section-title">
                <div className="course-section-icon purple">
                  <BookOpen size={21} />
                </div>

                <div>
                  <span>CURRICULUM</span>
                  <h2>Subjects</h2>
                </div>
              </div>

              {subjects.length > 0 ? (
                <div className="subject-grid">
                  {subjects.map((subject, index) => (
                    <div className="subject-item" key={index}>
                      <span>{String(index + 1).padStart(2, "0")}</span>

                      <p>{subject}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-course-detail">
                  No subject information available.
                </p>
              )}
            </div>

            {/* SKILLS */}

            <div className="course-details-card">
              <div className="course-section-title">
                <div className="course-section-icon orange">
                  <Sparkles size={21} />
                </div>

                <div>
                  <span>DEVELOPMENT</span>
                  <h2>Skills You Can Build</h2>
                </div>
              </div>

              {skills.length > 0 ? (
                <div className="course-skills-list">
                  {skills.map((skill, index) => (
                    <span key={index}>
                      <CheckCircle2 size={15} />
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="empty-course-detail">
                  No skills information available.
                </p>
              )}
            </div>

            {/* CAREER OPTIONS */}

            <div className="course-details-card">
              <div className="course-section-title">
                <div className="course-section-icon blue">
                  <BriefcaseBusiness size={21} />
                </div>

                <div>
                  <span>OPPORTUNITIES</span>
                  <h2>Career Options</h2>
                </div>
              </div>

              {careerOptions.length > 0 ? (
                <div className="career-options-list">
                  {careerOptions.map((career, index) => {
                    const careerId =
                      typeof career === "object" ? career?._id : career;

                    const careerName =
                      typeof career === "object"
                        ? career?.careerName || career?.name || "Career"
                        : career;

                    return (
                      <button
                        type="button"
                        key={careerId || index}
                        onClick={() => {
                          if (careerId) {
                            navigate(`/careers/${careerId}`);
                          }
                        }}
                      >
                        <div>
                          <span>{String(index + 1).padStart(2, "0")}</span>

                          <strong>{careerName}</strong>
                        </div>

                        <ArrowRight size={17} />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="empty-course-detail">
                  No career options available.
                </p>
              )}
            </div>

            {/* JOB ROLES */}

            <div className="course-details-card">
              <div className="course-section-title">
                <div className="course-section-icon green">
                  <TrendingUp size={21} />
                </div>

                <div>
                  <span>CAREER PATH</span>
                  <h2>Job Roles</h2>
                </div>
              </div>

              {jobRoles.length > 0 ? (
                <div className="job-role-grid">
                  {jobRoles.map((role, index) => (
                    <div className="job-role-card" key={index}>
                      <CheckCircle2 size={17} />
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-course-detail">
                  No job role information available.
                </p>
              )}
            </div>
          </main>

          {/* ======================================== */}
          {/* SIDEBAR */}
          {/* ======================================== */}

          <aside className="course-details-sidebar">
            {/* Salary */}

            <div className="course-sidebar-card salary-card">
              <div className="course-sidebar-icon">
                <IndianRupee size={23} />
              </div>

              <span>EARNING POTENTIAL</span>

              <h3>Average Salary</h3>

              <strong>{course.averageSalary || "Not available"}</strong>
            </div>

            {/* Higher Studies */}

            <div className="course-sidebar-card">
              <div className="course-sidebar-title">
                <GraduationCap size={20} />
                <h3>Higher Studies</h3>
              </div>

              {higherStudies.length > 0 ? (
                <ul className="course-sidebar-list">
                  {higherStudies.map((study, index) => (
                    <li key={index}>
                      <CheckCircle2 size={15} />
                      <span>{study}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-sidebar">
                  No higher study information available.
                </p>
              )}
            </div>

            {/* Colleges */}

            <div className="course-sidebar-card">
              <div className="course-sidebar-title">
                <School size={20} />
                <h3>Colleges</h3>
              </div>

              {colleges.length > 0 ? (
                <ul className="course-sidebar-list">
                  {colleges.map((college, index) => (
                    <li key={index}>
                      <CheckCircle2 size={15} />

                      <span>
                        {typeof college === "object"
                          ? college?.collegeName || college?.name || "College"
                          : college}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-sidebar">No colleges linked yet.</p>
              )}
            </div>

            {/* Explore */}

            <div className="course-sidebar-card explore-course-card">
              <div className="explore-course-icon">
                <GraduationCap size={22} />
              </div>

              <h3>Ready to explore your path?</h3>

              <p>
                Explore more courses and find the education path that matches
                your career goals.
              </p>

              <button type="button" onClick={() => navigate("/education")}>
                <span>Explore More Courses</span>

                <ArrowRight size={16} />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

const CourseDetailsError = ({ message }) => {
  const navigate = useNavigate();

  return (
    <section className="course-details-page">
      <div className="course-details-error">
        <div className="course-error-icon">
          <GraduationCap size={38} />
        </div>

        <h2>Course Not Found</h2>

        <p>{message || "The requested course could not be found."}</p>

        <button type="button" onClick={() => navigate("/education")}>
          <ArrowLeft size={18} />
          <span>Back to Education</span>
        </button>
      </div>
    </section>
  );
};

export default CourseDetails;
