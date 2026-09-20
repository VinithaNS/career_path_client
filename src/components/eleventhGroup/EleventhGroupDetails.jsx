import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Check,
  RefreshCw,
  Sparkles,
  Award
} from "lucide-react";

import { getEleventhGroupById } from "../../services/eleventhGroupService";

import "./eleventhGroupDetails.css";

const EleventhGroupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchGroupData = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getEleventhGroupById(id);
        if (isMounted) {
          // Supports both response.data and response directly
          setGroup(res?.data || res);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Failed to load group details."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchGroupData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="eleventh-detail-state">
        <RefreshCw size={32} className="spin" />
        <p>Loading 11th Grade Stream Details...</p>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="eleventh-detail-state error">
        <h2>Stream Not Found</h2>
        <p>{error || "Unable to find the requested 11th grade group."}</p>
        <button type="button" className="btn-back-action" onClick={handleBack}>
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  // Graceful fallback for field names matching your MongoDB Document
  const subjectList = group.subjects || group.coreSubjects || [];
  const careerList = group.careerOptions || group.careerPathways || [];
  const courseList =
    group.courseOptions || group.higherStudyDegreeOptions || [];
  const eligibilityText =
    group.eligibility ||
    group.eligibilityCriteria10th ||
    "Students who have completed 10th standard with required qualifying cut-off marks.";

  return (
    <div className="eleventh-detail-page">
      <div className="eleventh-detail-container">
        {/* Navigation Back Bar */}
        <button
          type="button"
          className="detail-back-button"
          onClick={handleBack}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        {/* Hero Banner */}
        <div className="stream-detail-hero">
          <div className="stream-hero-badge">
            <Sparkles size={14} />
            <span>{group.groupCode || "11TH STREAM"}</span>
          </div>

          <h1>{group.groupName}</h1>
          <p className="stream-hero-desc">{group.description}</p>
        </div>

        {/* ================= SECTION 1: CORE SUBJECTS ================= */}
        <div className="stream-card-section">
          <div className="section-title-wrap">
            <div className="section-icon-pill purple">
              <BookOpen size={18} />
            </div>
            <div>
              <h3>Subjects Taught in 11th & 12th</h3>
              <p>Core curriculum subjects you will study under this group</p>
            </div>
          </div>

          <div className="subjects-chips-grid">
            {subjectList.map((subject, idx) => (
              <div key={idx} className="subject-chip">
                <CheckCircle2 size={16} className="check-icon" />
                <span>{subject}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SECTION 2: ELIGIBILITY ================= */}
        <div className="stream-card-section">
          <div className="section-title-wrap">
            <div className="section-icon-pill pink">
              <Award size={18} />
            </div>
            <div>
              <h3>Eligibility Criteria</h3>
              <p>Minimum requirements after 10th standard board exams</p>
            </div>
          </div>

          <div className="eligibility-content-box">
            <p>{eligibilityText}</p>
          </div>
        </div>

        {/* ================= SECTION 3: COURSE & DEGREE OPTIONS ================= */}
        {courseList.length > 0 && (
          <div className="stream-card-section">
            <div className="section-title-wrap">
              <div className="section-icon-pill green">
                <GraduationCap size={18} />
              </div>
              <div>
                <h3>College Course & Degree Options</h3>
                <p>Degrees you are eligible to pursue in higher education</p>
              </div>
            </div>

            <div className="options-cards-grid">
              {courseList.map((course, idx) => (
                <div key={idx} className="option-pill-card degree">
                  <div className="option-circle-check">
                    <Check size={14} />
                  </div>
                  <span className="option-name">
                    {typeof course === "string"
                      ? course
                      : course.courseName || course}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= SECTION 4: CAREER OPTIONS ================= */}
        {careerList.length > 0 && (
          <div className="stream-card-section">
            <div className="section-title-wrap">
              <div className="section-icon-pill orange">
                <Briefcase size={18} />
              </div>
              <div>
                <h3>Career Opportunities</h3>
                <p>Popular industry careers and professional job roles</p>
              </div>
            </div>

            <div className="options-cards-grid">
              {careerList.map((career, idx) => (
                <div key={idx} className="option-pill-card career">
                  <div className="option-circle-check orange">
                    <Check size={14} />
                  </div>
                  <span className="option-name">
                    {typeof career === "string"
                      ? career
                      : career.careerName || career}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EleventhGroupDetails;
