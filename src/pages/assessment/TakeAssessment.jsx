import { useCallback, useEffect, useRef, useState } from "react";

import { Clock3, RefreshCw } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import {
  getAttemptById,
  submitAnswer,
  completeAttempt
} from "../../services/assessmentAttemptService";
import { getQuestionsByAssessment } from "../../services/assessmentQuestionService";
import { createAssessmentResult } from "../../services/assessmentResultService";

import "./TakeAssessment.css";

const TakeAssessment = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const [attempt, setAttempt] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submittingRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const attemptRes = await getAttemptById(attemptId);

        if (!isMounted) return;

        if (!attemptRes?.success) {
          setError(attemptRes?.message || "Attempt not found.");
          setLoading(false);
          return;
        }

        const fetchedAttempt = attemptRes.data;
        setAttempt(fetchedAttempt);

        const existingAnswers = {};
        (fetchedAttempt.answers || []).forEach((a) => {
          existingAnswers[a.question._id || a.question] = a.selectedAnswer;
        });
        setAnswers(existingAnswers);

        const elapsedSeconds = Math.floor(
          (Date.now() - new Date(fetchedAttempt.startedAt).getTime()) / 1000
        );
        const totalSeconds = fetchedAttempt.assessment.duration * 60;
        setSecondsLeft(Math.max(totalSeconds - elapsedSeconds, 0));

        const questionsRes = await getQuestionsByAssessment(
          fetchedAttempt.assessment._id
        );

        if (isMounted && questionsRes?.success) {
          setQuestions(questionsRes.data);
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
  }, [attemptId]);

  const handleFinish = useCallback(async () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);

    try {
      await completeAttempt(attemptId);
      const resultRes = await createAssessmentResult(attemptId);

      if (resultRes?.success) {
        navigate(`/assessments/results/${resultRes.data._id}`, {
          replace: true
        });
      } else {
        setError(resultRes?.message || "Unable to generate result.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to submit assessment.");
    } finally {
      setSubmitting(false);
      submittingRef.current = false;
    }
  }, [attemptId, navigate]);

  useEffect(() => {
    if (loading || secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, secondsLeft <= 0, handleFinish]);

  const handleSelect = async (questionId, optionValue) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionValue }));

    try {
      await submitAnswer(attemptId, questionId, optionValue);
    } catch (err) {
      console.error("Submit answer error:", err);
    }
  };

  if (loading) {
    return (
      <section className="take-assessment-page">
        <div className="take-assessment-loading">
          <RefreshCw className="spin" size={32} />
          <h2>Loading questions...</h2>
        </div>
      </section>
    );
  }

  if (error && questions.length === 0) {
    return (
      <section className="take-assessment-page">
        <div className="take-assessment-error">
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button type="button" onClick={() => navigate("/assessments")}>
            Back to Assessments
          </button>
        </div>
      </section>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const answeredCount = Object.keys(answers).length;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <section className="take-assessment-page">
      <div className="take-assessment-container">
        <div className="take-assessment-header">
          <div className="take-assessment-progress-info">
            <span>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="answered-count">{answeredCount} answered</span>
          </div>

          <div
            className={`take-assessment-timer ${secondsLeft < 60 ? "urgent" : ""}`}
          >
            <Clock3 size={16} />
            <span>
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="take-assessment-progress-bar">
          <div
            className="take-assessment-progress-fill"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`
            }}
          />
        </div>

        {currentQuestion && (
          <div className="take-assessment-question-card">
            <h2>{currentQuestion.questionText}</h2>

            <div className="take-assessment-options">
              {currentQuestion.options.map((option) => (
                <button
                  type="button"
                  key={option.optionValue}
                  className={
                    answers[currentQuestion._id] === option.optionValue
                      ? "option-selected"
                      : ""
                  }
                  onClick={() =>
                    handleSelect(currentQuestion._id, option.optionValue)
                  }
                >
                  {option.optionText}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="take-assessment-nav">
          <button
            type="button"
            className="nav-btn secondary"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
          >
            Previous
          </button>

          {isLast ? (
            <button
              type="button"
              className="nav-btn primary"
              onClick={handleFinish}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Assessment"}
            </button>
          ) : (
            <button
              type="button"
              className="nav-btn primary"
              onClick={() => setCurrentIndex((prev) => prev + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default TakeAssessment;
