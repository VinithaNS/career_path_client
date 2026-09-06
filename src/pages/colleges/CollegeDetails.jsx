import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Star
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { getReviewsByCollege } from "../../services/collegeReviewService";
import { getCollegeById } from "../../services/collegeService";

import "./CollegeDetails.css";

const CollegeDetails = () => {
  const { id } = useParams();

  if (!id) {
    return <CollegeDetailsError message="College ID is missing." />;
  }

  return <CollegeDetailsContent key={id} collegeId={id} />;
};

const CollegeDetailsContent = ({ collegeId }) => {
  const navigate = useNavigate();

  const [college, setCollege] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCollege = async () => {
      try {
        const response = await getCollegeById(collegeId);

        if (!isMounted) return;

        if (response?.success && response?.data) {
          setCollege(response.data);
          setError("");

          try {
            const reviewResponse = await getReviewsByCollege(collegeId);
            if (isMounted && reviewResponse?.success) {
              setReviews(
                Array.isArray(reviewResponse.data) ? reviewResponse.data : []
              );
            }
          } catch (reviewErr) {
            console.error("Reviews fetch error:", reviewErr);
          }
        } else {
          setCollege(null);
          setError(response?.message || "College not found.");
        }
      } catch (err) {
        console.error("College Details API Error:", err);

        if (!isMounted) return;

        setCollege(null);
        setError(
          err?.response?.data?.message || "Unable to load college details."
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadCollege();

    return () => {
      isMounted = false;
    };
  }, [collegeId]);

  if (loading) {
    return (
      <section className="college-details-page">
        <div className="college-details-loading">
          <div className="college-loading-icon">
            <RefreshCw size={32} className="spin" />
          </div>
          <h2>Loading college details...</h2>
          <p>Please wait while we fetch the college information.</p>
        </div>
      </section>
    );
  }

  if (error || !college) {
    return <CollegeDetailsError message={error} />;
  }

  const courses = Array.isArray(college.courses) ? college.courses : [];
  const facilities = Array.isArray(college.facilities)
    ? college.facilities
    : [];
  const entranceExams = Array.isArray(college.entranceExams)
    ? college.entranceExams
    : [];
  const location = [college.city, college.state].filter(Boolean).join(", ");

  return (
    <section className="college-details-page">
      <div className="college-details-container">
        <button
          type="button"
          className="back-college-btn"
          onClick={() => navigate("/colleges")}
        >
          <ArrowLeft size={18} />
          <span>Back to Colleges</span>
        </button>

        {/* HERO */}
        <div className="college-details-hero">
          <div className="college-details-hero-content">
            <div className="college-details-icon">
              {college.logoUrl ? (
                <img src={college.logoUrl} alt={college.collegeName} />
              ) : (
                <GraduationCap size={34} />
              )}
            </div>

            <div className="college-details-heading">
              <div className="college-meta">
                <span className="college-type-badge">
                  {college.collegeType}
                </span>
                {college.affiliation && (
                  <span className="college-affiliation-badge">
                    {college.affiliation}
                  </span>
                )}
                {location && (
                  <span className="college-location-badge">
                    <MapPin size={12} />
                    {location}
                  </span>
                )}
              </div>

              <h1>{college.collegeName}</h1>

              <p>
                {college.description ||
                  "Explore courses, admissions and reviews for this college."}
              </p>
            </div>
          </div>
        </div>

        {/* QUICK INFO */}
        <div className="college-quick-info">
          <div className="college-info-item">
            <div className="college-info-icon blue">
              <Building2 size={21} />
            </div>
            <div>
              <span>Established</span>
              <strong>{college.establishedYear || "Not available"}</strong>
            </div>
          </div>

          <div className="college-info-item">
            <div className="college-info-icon purple">
              <GraduationCap size={21} />
            </div>
            <div>
              <span>Courses Offered</span>
              <strong>{courses.length}</strong>
            </div>
          </div>

          <div className="college-info-item">
            <div className="college-info-icon orange">
              <Star size={21} />
            </div>
            <div>
              <span>Average Rating</span>
              <strong>
                {college.averageRating?.toFixed(1) || "0.0"} / 5 (
                {college.totalReviews || 0})
              </strong>
            </div>
          </div>

          <div className="college-info-item">
            <div className="college-info-icon green">
              <CheckCircle2 size={21} />
            </div>
            <div>
              <span>Accreditation</span>
              <strong>{college.accreditation || "Not available"}</strong>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="college-tabs">
          {["overview", "courses", "reviews", "contact"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="college-tab-content">
          {activeTab === "overview" && (
            <div className="college-details-card">
              <h2>About This College</h2>
              <p className="college-description">
                {college.description || "No description available."}
              </p>

              {facilities.length > 0 && (
                <div className="college-detail-block">
                  <h3>Facilities</h3>
                  <div className="college-facilities-list">
                    {facilities.map((facility, i) => (
                      <span key={i}>
                        <CheckCircle2 size={14} />
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {entranceExams.length > 0 && (
                <div className="college-detail-block">
                  <h3>Accepted Entrance Exams</h3>
                  <div className="college-facilities-list">
                    {entranceExams.map((exam, i) => (
                      <span key={i}>{exam}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "courses" && (
            <div className="college-details-card">
              <h2>Courses Offered</h2>

              {courses.length > 0 ? (
                <div className="college-courses-grid">
                  {courses.map((course) => (
                    <div className="college-course-item" key={course._id}>
                      <div>
                        <h4>{course.courseName}</h4>
                        <span>
                          {course.courseType} • {course.duration}
                        </span>
                      </div>
                      {course.annualFees > 0 && (
                        <strong>
                          ₹{course.annualFees.toLocaleString()}/yr
                        </strong>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-college-detail">No courses listed yet.</p>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="college-details-card">
              <h2>Student Reviews</h2>

              {reviews.length > 0 ? (
                <div className="college-reviews-list">
                  {reviews.map((review) => (
                    <div className="college-review-item" key={review._id}>
                      <div className="college-review-header">
                        <strong>{review.studentName}</strong>
                        <div className="review-stars">
                          <Star size={14} fill="#f59e0b" stroke="#f59e0b" />
                          <span>{review.rating}/5</span>
                        </div>
                      </div>
                      <h4>{review.title}</h4>
                      <p>{review.review}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="empty-college-detail">No reviews yet.</p>
              )}
            </div>
          )}

          {activeTab === "contact" && (
            <div className="college-details-card">
              <h2>Contact Information</h2>
              <div className="college-contact-list">
                {college.address && (
                  <div>
                    <MapPin size={17} />
                    <span>
                      {college.address}, {location} {college.pincode}
                    </span>
                  </div>
                )}
                {college.phone && (
                  <div>
                    <Phone size={17} />
                    <span>{college.phone}</span>
                  </div>
                )}
                {college.email && (
                  <div>
                    <Mail size={17} />
                    <span>{college.email}</span>
                  </div>
                )}
                {college.website && (
                  <div>
                    <Globe size={17} />
                    <a href={college.website} target="_blank" rel="noreferrer">
                      {college.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const CollegeDetailsError = ({ message }) => {
  const navigate = useNavigate();

  return (
    <section className="college-details-page">
      <div className="college-details-error">
        <div className="college-error-icon">
          <GraduationCap size={38} />
        </div>
        <h2>College Not Found</h2>
        <p>{message || "The requested college could not be found."}</p>
        <button type="button" onClick={() => navigate("/colleges")}>
          <ArrowLeft size={18} />
          <span>Back to Colleges</span>
        </button>
      </div>
    </section>
  );
};

export default CollegeDetails;
