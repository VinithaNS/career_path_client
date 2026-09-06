import { useEffect, useState } from "react";

import { CheckCircle2, XCircle, RefreshCw, ArrowLeft } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { getAssessmentResultById } from "../../services/assessmentResultService";

import "./AssessmentResult.css";

const AssessmentResult = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const response = await getAssessmentResultById(resultId);

        if (!isMounted) return;

        if (response?.success) {
          setResult(response.data);
        } else {
          setError(response?.message || "Result not found.");
        }
      } catch (err) {
        if (!isMounted) return;
        setError(err?.response?.data?.message || "Unable to load result.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [resultId]);

  if (loading) {
    return (
      <section className="assessment-result-page">
        <div className="assessment-result-loading">
          <RefreshCw className="spin" size={32} />
          <h2>Calculating your result...</h2>
        </div>
      </section>
    );
  }

  if (error || !result) {
    return (
      <section className="assessment-result-page">
        <div className="assessment-result-error">
          <h2>Result Not Found</h2>
          <p>{error}</p>
          <button type="button" onClick={() => navigate("/assessments")}>
            <ArrowLeft size={18} />
            <span>Back to Assessments</span>
          </button>
        </div>
      </section>
    );
  }

  const passed = result.resultStatus === "Passed";

  return (
    <section className="assessment-result-page">
      <div className="assessment-result-container">
        <div className={`result-status-badge ${passed ? "passed" : "failed"}`}>
          {passed ? <CheckCircle2 size={40} /> : <XCircle size={40} />}
        </div>

        <h1>{passed ? "Congratulations!" : "Keep Practicing!"}</h1>
        <p className="result-assessment-name">{result.assessment?.title}</p>

        <div className="result-percentage-circle">
          <span>{result.percentage}%</span>
        </div>

        <p className={`result-status-text ${passed ? "passed" : "failed"}`}>
          {result.resultStatus} • Passing score: {result.passingScore}%
        </p>

        <div className="result-stats-grid">
          <div className="result-stat">
            <span>{result.totalQuestions}</span>
            <label>Total</label>
          </div>
          <div className="result-stat correct">
            <span>{result.correctAnswers}</span>
            <label>Correct</label>
          </div>
          <div className="result-stat wrong">
            <span>{result.wrongAnswers}</span>
            <label>Wrong</label>
          </div>
          <div className="result-stat skipped">
            <span>{result.skippedQuestions}</span>
            <label>Skipped</label>
          </div>
        </div>

        <div className="result-actions">
          <button
            type="button"
            className="result-btn secondary"
            onClick={() => navigate("/assessments")}
          >
            Back to Assessments
          </button>
          <button
            type="button"
            className="result-btn primary"
            onClick={() => navigate(`/assessments/${result.assessment?._id}`)}
          >
            Retake Assessment
          </button>
        </div>
      </div>
    </section>
  );
};

export default AssessmentResult;
