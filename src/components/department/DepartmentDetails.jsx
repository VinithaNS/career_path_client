import { useCallback, useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  GraduationCap,
  RotateCcw
} from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { fetchDepartmentBySlug } from "../../services/departmentService";

import "./DepartmentDetails.css";

const DepartmentDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [department, setDepartment] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const loadDepartment = useCallback(async () => {
    if (!slug) {
      setStatus("error");
      setErrorMessage("Department slug is missing.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const data = await fetchDepartmentBySlug(slug);

      setDepartment(data);
      setStatus("success");
    } catch (error) {
      console.error("Department details error:", error);

      if (error?.statusCode === 404) {
        setErrorMessage("That department could not be found.");
      } else if (error?.message === "Failed to fetch") {
        setErrorMessage(
          "Couldn't reach the server. Please check that your API is running."
        );
      } else {
        setErrorMessage(
          error?.message || "Something went wrong while loading the department."
        );
      }

      setStatus("error");
    }
  }, [slug]);

  useEffect(() => {
    loadDepartment();
  }, [loadDepartment]);

  /* ======================================================
     LOADING
  ====================================================== */

  if (status === "loading") {
    return (
      <main className="dept-details-page">
        <div className="dept-details-state">
          <div className="dept-details-loading-icon">
            <GraduationCap size={25} />
          </div>

          <p>Loading department...</p>
        </div>
      </main>
    );
  }

  /* ======================================================
     ERROR
  ====================================================== */

  if (status === "error") {
    return (
      <main className="dept-details-page">
        <div className="dept-details-state">
          <div className="dept-details-loading-icon">
            <RotateCcw size={23} />
          </div>

          <h2>Unable to load department</h2>

          <p>{errorMessage}</p>

          <button
            type="button"
            className="dept-details-retry"
            onClick={loadDepartment}
          >
            <RotateCcw size={16} />
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!department) {
    return null;
  }

  const careerRoadmaps = Array.isArray(department.careerRoadmaps)
    ? department.careerRoadmaps
    : [];

  const degreeCourses = Array.isArray(department.degreeCourses)
    ? department.degreeCourses
    : [];

  const collegeCourses = Array.isArray(department.collegeCourses)
    ? department.collegeCourses
    : [];

  const tags = Array.isArray(department.tags)
    ? department.tags.filter(Boolean)
    : [];

  return (
    <main className="dept-details-page">
      <div className="dept-details-container">
        {/* Back */}
        <button
          type="button"
          className="dept-back-link"
          onClick={() => navigate("/departments")}
        >
          <ArrowLeft size={17} />

          <span>All Departments</span>
        </button>

        {/* Hero */}
        <section className="dept-details-hero">
          <div className="dept-details-hero-icon">
            <GraduationCap size={32} />
          </div>

          <div className="dept-details-hero-content">
            <span className="dept-details-label">Department Roadmap</span>

            <h1 className="dept-details-title">{department.name}</h1>

            {department.shortCode && (
              <span className="dept-details-shortcode">
                {department.shortCode}
              </span>
            )}

            {department.description && (
              <p className="dept-details-description">
                {department.description}
              </p>
            )}

            {tags.length > 0 && (
              <div className="dept-details-tags">
                {tags.map((tag) => (
                  <span key={tag} className="dept-tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Roadmaps */}
        <section className="dept-details-section">
          <div className="dept-section-heading">
            <div className="dept-section-heading-icon">
              <Briefcase size={19} />
            </div>

            <div>
              <h2>Career Roadmaps</h2>

              <p>
                Explore career paths available after choosing this department.
              </p>
            </div>
          </div>

          {careerRoadmaps.length > 0 ? (
            <div className="dept-details-list">
              {careerRoadmaps.map((roadmap) => {
                const roadmapId = roadmap?._id || roadmap?.id;

                const roadmapTitle =
                  roadmap?.title || roadmap?.name || "Career Roadmap";

                return (
                  <Link
                    key={roadmapId || roadmapTitle}
                    to={`/roadmap/${roadmapId}`}
                    className="dept-details-list-link"
                  >
                    <div className="dept-list-item-content">
                      <div className="dept-list-item-icon">
                        <Briefcase size={17} />
                      </div>

                      <div>
                        <span className="dept-list-item-title">
                          {roadmapTitle}
                        </span>

                        {roadmap?.description && (
                          <span className="dept-list-item-description">
                            {roadmap.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <ArrowRight size={18} />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="dept-details-empty">
              <Briefcase size={21} />

              <p>No career roadmaps have been added for this department yet.</p>
            </div>
          )}
        </section>

        {/* Degree Courses */}
        <section className="dept-details-section">
          <div className="dept-section-heading">
            <div className="dept-section-heading-icon">
              <GraduationCap size={19} />
            </div>

            <div>
              <h2>Degree Courses</h2>

              <p>Discover degree programs related to this department.</p>
            </div>
          </div>

          {degreeCourses.length > 0 ? (
            <div className="dept-details-list">
              {degreeCourses.map((course) => {
                const courseId = course?._id || course?.id;

                const courseTitle =
                  course?.title || course?.name || "Degree Course";

                return (
                  <Link
                    key={courseId || courseTitle}
                    to={`/education/${courseId}`}
                    className="dept-details-list-link"
                  >
                    <div className="dept-list-item-content">
                      <div className="dept-list-item-icon">
                        <BookOpen size={17} />
                      </div>

                      <div>
                        <span className="dept-list-item-title">
                          {courseTitle}
                        </span>

                        {course?.description && (
                          <span className="dept-list-item-description">
                            {course.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <ArrowRight size={18} />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="dept-details-empty">
              <BookOpen size={21} />

              <p>No degree courses have been added yet.</p>
            </div>
          )}
        </section>

        {/* College Courses */}
        <section className="dept-details-section">
          <div className="dept-section-heading">
            <div className="dept-section-heading-icon">
              <BookOpen size={19} />
            </div>

            <div>
              <h2>College Courses</h2>

              <p>
                Find additional college-level courses connected to this
                department.
              </p>
            </div>
          </div>

          {collegeCourses.length > 0 ? (
            <div className="dept-details-list">
              {collegeCourses.map((course) => {
                const courseId = course?._id || course?.id;

                const courseTitle =
                  course?.title || course?.name || "College Course";

                return (
                  <Link
                    key={courseId || courseTitle}
                    to={`/education/${courseId}`}
                    className="dept-details-list-link"
                  >
                    <div className="dept-list-item-content">
                      <div className="dept-list-item-icon">
                        <BookOpen size={17} />
                      </div>

                      <div>
                        <span className="dept-list-item-title">
                          {courseTitle}
                        </span>

                        {course?.description && (
                          <span className="dept-list-item-description">
                            {course.description}
                          </span>
                        )}
                      </div>
                    </div>

                    <ArrowRight size={18} />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="dept-details-empty">
              <BookOpen size={21} />

              <p>No college courses have been added yet.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default DepartmentDetails;
