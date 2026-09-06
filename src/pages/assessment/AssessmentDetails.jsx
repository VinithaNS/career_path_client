import { useEffect, useState } from "react";

import { ArrowLeft, Clock3, HelpCircle, Target, RefreshCw } from "lucide-react";

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

    const load = async () => {
      try {
        const response = await getAssessmentById(id);
        if (!isMounted) return;

        if (response?.success) {
          setAssessment(response.data);
        } else {
          setError(response?.message || "Assessment not found.");
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err?.response?.data?.message || "Unable to load assessment.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
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
          <RefreshCw className="spin" size={32} />
          <h2>Loading assessment...</h2>
        </div>
      </section>
    );
  }

  if (error && !assessment) {
    return (
      <section className="assessment-details-page">
        <div className="assessment-details-error">
          <h2>Assessment Not Found</h2>
          <p>{error}</p>
          <button type="button" onClick={() => navigate("/assessments")}>
            <ArrowLeft size={18} />
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
          <ArrowLeft size={18} />
          <span>Back to Assessments</span>
        </button>

        <div className="assessment-details-card">
          <span className="assessment-details-category">
            {assessment.category?.categoryName}
          </span>
          <h1>{assessment.title}</h1>
          <p className="assessment-details-desc">{assessment.description}</p>

          <div className="assessment-details-stats">
            <div>
              <Clock3 size={20} />
              <span>{assessment.duration} minutes</span>
            </div>
            <div>
              <HelpCircle size={20} />
              <span>{assessment.totalQuestions} questions</span>
            </div>
            <div>
              <Target size={20} />
              <span>Pass at {assessment.passingScore}%</span>
            </div>
          </div>

          {assessment.instructions && (
            <div className="assessment-instructions-box">
              <h3>Instructions</h3>
              <p>{assessment.instructions}</p>
            </div>
          )}

          {error && <p className="assessment-inline-error">{error}</p>}

          <button
            type="button"
            className="assessment-begin-button"
            onClick={handleStart}
            disabled={starting}
          >
            {starting ? "Starting..." : "Start Assessment"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AssessmentDetails;
