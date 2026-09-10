// src/pages/assessments/AssessmentDetails.jsx

import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Brain,
  CheckCircle2,
  Clock3,
  HelpCircle,
  RefreshCw,
  Sparkles,
  Target
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { startAssessment } from "../../services/assessmentAttemptService";
import { getAssessmentById } from "../../services/assessmentService";
import { getCurrentStudentId } from "../../utils/auth";

import "./AssessmentDetails.css";

const AssessmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadAssessment = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAssessmentById(id);

        if (!isMounted) {
          return;
        }

        if (response?.success) {
          setAssessment(response.data);
        } else {
          setError(response?.message || "Assessment not found.");
        }
      } catch (err) {
        if (!isMounted) {
          return;
        }

        setError(err?.response?.data?.message || "Unable to load assessment.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAssessment();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleStart = async () => {
    const studentId = getCurrentStudentId();

    if (!studentId) {
      setError("Please log in to take this assessment.");
      return;
    }

    try {
      setStarting(true);
      setError("");

      const response = await startAssessment(studentId, id);

      if (response?.success) {
        navigate(`/assessments/attempt/${response.data._id}`);
      } else {
        setError(response?.message || "Unable to start assessment.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to start assessment.");
    } finally {
      setStarting(false);
    }
  };

  if (loading) {
    return (
      <section className="assessment-details-page">
        <div className="assessment-details-loading">
          <div className="assessment-details-loading-icon">
            <RefreshCw className="spin" size={30} />
          </div>

          <h2>Loading assessment...</h2>

          <p>Preparing everything you need to get started.</p>
        </div>
      </section>
    );
  }

  if (error && !assessment) {
    return (
      <section className="assessment-details-page">
        <div className="assessment-details-error">
          <div className="assessment-details-error-icon">
            <Brain size={30} />
          </div>

          <h2>Assessment Not Found</h2>

          <p>{error}</p>

          <button type="button" onClick={() => navigate("/assessments")}>
            <ArrowLeft size={17} />
            <span>Back to Assessments</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="assessment-details-page">
      <div className="assessment-details-container">
        <button
          type="button"
          className="back-assessment-btn"
          onClick={() => navigate("/assessments")}
        >
          <ArrowLeft size={17} />
          <span>Back to Assessments</span>
        </button>

        <div className="assessment-details-layout">
          <div className="assessment-details-main">
            <div className="assessment-details-card">
              <div className="assessment-details-top">
                <span className="assessment-details-category">
                  {assessment.category?.categoryName || "Assessment"}
                </span>

                <div className="assessment-details-sparkle">
                  <Sparkles size={17} />
                </div>
              </div>

              <h1>{assessment.title}</h1>

              <p className="assessment-details-desc">
                {assessment.description}
              </p>

              <div className="assessment-details-stats">
                <div className="assessment-stat">
                  <div className="assessment-stat-icon purple">
                    <Clock3 size={18} />
                  </div>

                  <div>
                    <span>Duration</span>
                    <strong>{assessment.duration} minutes</strong>
                  </div>
                </div>

                <div className="assessment-stat">
                  <div className="assessment-stat-icon pink">
                    <HelpCircle size={18} />
                  </div>

                  <div>
                    <span>Questions</span>
                    <strong>{assessment.totalQuestions}</strong>
                  </div>
                </div>

                <div className="assessment-stat">
                  <div className="assessment-stat-icon violet">
                    <Target size={18} />
                  </div>

                  <div>
                    <span>Passing Score</span>
                    <strong>{assessment.passingScore}%</strong>
                  </div>
                </div>
              </div>

              {assessment.instructions && (
                <div className="assessment-instructions-box">
                  <div className="assessment-instructions-icon">
                    <CheckCircle2 size={19} />
                  </div>

                  <div>
                    <h3>Instructions</h3>
                    <p>{assessment.instructions}</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="assessment-inline-error">
                  <Brain size={17} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="button"
                className="assessment-begin-button"
                onClick={handleStart}
                disabled={starting}
              >
                {starting ? (
                  <>
                    <RefreshCw className="spin" size={17} />
                    Starting Assessment...
                  </>
                ) : (
                  <>
                    Start Assessment
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <p className="assessment-start-note">
                Make sure you have enough uninterrupted time before starting.
              </p>
            </div>
          </div>

          <aside className="assessment-details-sidebar">
            <div className="assessment-sidebar-card">
              <div className="assessment-sidebar-icon">
                <Brain size={27} />
              </div>

              <span className="assessment-sidebar-label">KNOW YOURSELF</span>

              <h2>Understand your strengths</h2>

              <p>
                This assessment is designed to help you understand yourself
                better and make more confident career decisions.
              </p>

              <div className="assessment-sidebar-list">
                <div>
                  <CheckCircle2 size={16} />
                  <span>Discover your strengths</span>
                </div>

                <div>
                  <CheckCircle2 size={16} />
                  <span>Identify suitable career paths</span>
                </div>

                <div>
                  <CheckCircle2 size={16} />
                  <span>Get personalized insights</span>
                </div>
              </div>
            </div>

            <div className="assessment-sidebar-tip">
              <Sparkles size={18} />

              <div>
                <strong>Quick Tip</strong>
                <p>
                  Answer each question honestly for the most useful results.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default AssessmentDetails;
