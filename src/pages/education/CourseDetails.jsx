import { useEffect, useState } from "react";

import { ArrowLeft, Clock, GraduationCap } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { getCourseById } from "../../services/educationService";

import "./CourseDetails.css";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Course ID:", id);

        const response = await getCourseById(id);

        console.log("Course Details API Response:", response);

        const courseData = response?.data || response;

        setCourse(courseData);
      } catch (err) {
        console.error("Course Details Error:", err);

        setError(
          err.response?.data?.message || "Failed to load course details"
        );
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="course-details-status">Loading course details...</div>
    );
  }

  if (error) {
    return <div className="course-details-status error">{error}</div>;
  }

  if (!course) {
    return <div className="course-details-status">Course not found.</div>;
  }

  return (
    <div className="course-details-page">
      <div className="course-details-container">
        <button className="back-button" onClick={() => navigate("/education")}>
          <ArrowLeft size={18} />
          Back to Education
        </button>

        {/* HERO */}

        <section className="course-details-hero">
          <div className="course-details-hero-content">
            <div className="course-details-icon">
              <GraduationCap size={30} />
            </div>

            <span className="course-code">{course.courseCode}</span>

            <h1>{course.courseName}</h1>

            <p>{course.shortDescription || course.description}</p>

            <div className="course-meta">
              <span>
                <GraduationCap size={17} />
                {course.degreeType}
              </span>

              <span>
                <Clock size={17} />
                {course.duration}
              </span>

              <span>{course.categoryId?.name || "Education"}</span>
            </div>
          </div>

          {course.imageUrl && (
            <div className="course-details-image">
              <img src={course.imageUrl} alt={course.courseName} />
            </div>
          )}
        </section>

        {/* CONTENT */}

        <div className="course-details-layout">
          <main className="course-details-main">
            <section className="details-section">
              <h2>About the Course</h2>

              <p>
                {course.description ||
                  course.shortDescription ||
                  "Course information is not available."}
              </p>
            </section>

            <section className="details-section">
              <h2>Eligibility</h2>

              <p>
                {course.eligibility ||
                  "Eligibility information is not available."}
              </p>
            </section>

            <section className="details-section">
              <h2>Admission Process</h2>

              <p>
                {course.admissionProcess ||
                  "Admission process information is not available."}
              </p>
            </section>

            {course.subjects?.length > 0 && (
              <section className="details-section">
                <h2>Subjects</h2>

                <div className="details-list">
                  {course.subjects.map((subject, index) => (
                    <div key={index}>{subject}</div>
                  ))}
                </div>
              </section>
            )}

            {course.skills?.length > 0 && (
              <section className="details-section">
                <h2>Skills You Can Develop</h2>

                <div className="details-tags">
                  {course.skills.map((skill, index) => (
                    <span key={index}>{skill}</span>
                  ))}
                </div>
              </section>
            )}

            {course.jobRoles?.length > 0 && (
              <section className="details-section">
                <h2>Job Roles</h2>

                <div className="details-list">
                  {course.jobRoles.map((role, index) => (
                    <div key={index}>{role}</div>
                  ))}
                </div>
              </section>
            )}
          </main>

          <aside className="course-details-sidebar">
            <div className="sidebar-card">
              <h3>Course Information</h3>

              <div className="sidebar-item">
                <span>Degree Type</span>
                <strong>{course.degreeType}</strong>
              </div>

              <div className="sidebar-item">
                <span>Duration</span>
                <strong>{course.duration}</strong>
              </div>

              <div className="sidebar-item">
                <span>Average Salary</span>
                <strong>{course.averageSalary || "Not available"}</strong>
              </div>
            </div>

            {course.higherStudies?.length > 0 && (
              <div className="sidebar-card">
                <h3>Higher Studies</h3>

                {course.higherStudies.map((study, index) => (
                  <div className="sidebar-list-item" key={index}>
                    {study}
                  </div>
                ))}
              </div>
            )}

            {course.careerOptions?.length > 0 && (
              <div className="sidebar-card">
                <h3>Career Options</h3>

                {course.careerOptions.map((career) => (
                  <button
                    className="career-link"
                    key={career._id}
                    onClick={() => navigate(`/careers/${career._id}`)}
                  >
                    {career.careerName}
                  </button>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
