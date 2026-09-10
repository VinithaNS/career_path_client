// src/pages/assessments/TakeAssessment.jsx

import { useCallback, useEffect, useRef, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  HelpCircle,
  RefreshCw
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import {
  completeAttempt,
  getAttemptById,
  submitAnswer
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
        setLoading(true);
        setError("");

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

        (fetchedAttempt.answers || []).forEach((answer) => {
          const questionId = answer.question?._id || answer.question;

          if (questionId) {
            existingAnswers[questionId] = answer.selectedAnswer;
          }
        });

        setAnswers(existingAnswers);

        const startedAt = new Date(fetchedAttempt.startedAt).getTime();

        const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);

        const durationMinutes =
          Number(fetchedAttempt.assessment?.duration) || 0;

        const totalSeconds = durationMinutes * 60;

        setSecondsLeft(Math.max(totalSeconds - elapsedSeconds, 0));

        const assessmentId =
          fetchedAttempt.assessment?._id || fetchedAttempt.assessment;

        if (!assessmentId) {
          setError("Assessment information is unavailable.");
          return;
        }

        const questionsRes = await getQuestionsByAssessment(assessmentId);

        if (!isMounted) return;

        if (questionsRes?.success) {
          setQuestions(
            Array.isArray(questionsRes.data) ? questionsRes.data : []
          );
        } else {
          setError(
            questionsRes?.message || "Unable to load assessment questions."
          );
        }
      } catch (err) {
        if (!isMounted) return;

        setError(err?.response?.data?.message || "Unable to load assessment.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [attemptId]);

  const handleFinish = useCallback(async () => {
    if (submittingRef.current) {
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    setError("");

    try {
      const completeResponse = await completeAttempt(attemptId);

      if (completeResponse && completeResponse.success === false) {
        setError(completeResponse.message || "Unable to complete assessment.");
        return;
      }

      const resultResponse = await createAssessmentResult(attemptId);

      if (resultResponse?.success) {
        navigate(`/assessments/results/${resultResponse.data._id}`, {
          replace: true
        });
        return;
      }

      setError(
        resultResponse?.message || "Unable to generate assessment result."
      );
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to submit assessment.");
    } finally {
      setSubmitting(false);
      submittingRef.current = false;
    }
  }, [attemptId, navigate]);

  useEffect(() => {
    if (loading || secondsLeft <= 0 || submitting) {
      return undefined;
    }

    const timer = setInterval(() => {
      setSecondsLeft((previousSeconds) => {
        if (previousSeconds <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }

        return previousSeconds - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [loading, secondsLeft, submitting, handleFinish]);

  const handleSelect = async (questionId, optionValue) => {
    if (submitting) {
      return;
    }

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [questionId]: optionValue
    }));

    try {
      await submitAnswer(attemptId, questionId, optionValue);
    } catch (err) {
      console.error("Submit answer error:", err);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((previousIndex) => Math.max(previousIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((previousIndex) =>
      Math.min(previousIndex + 1, questions.length - 1)
    );
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <section className="take-assessment-page">
        <div className="take-assessment-loading">
          <div className="take-assessment-loading-icon">
            <RefreshCw className="spin" size={28} />
          </div>

          <h2>Loading assessment...</h2>

          <p>Preparing your questions for you.</p>
        </div>
      </section>
    );
  }

  if (error && questions.length === 0) {
    return (
      <section className="take-assessment-page">
        <div className="take-assessment-error">
          <div className="take-assessment-error-icon">
            <HelpCircle size={30} />
          </div>

          <h2>Something went wrong</h2>

          <p>{error}</p>

          <button type="button" onClick={() => navigate("/assessments")}>
            <ArrowLeft size={17} />
            <span>Back to Assessments</span>
          </button>
        </div>
      </section>
    );
  }

  if (!questions.length) {
    return (
      <section className="take-assessment-page">
        <div className="take-assessment-error">
          <div className="take-assessment-error-icon">
            <HelpCircle size={30} />
          </div>

          <h2>No questions available</h2>

          <p>This assessment does not have any questions yet.</p>

          <button type="button" onClick={() => navigate("/assessments")}>
            <ArrowLeft size={17} />
            <span>Back to Assessments</span>
          </button>
        </div>
      </section>
    );
  }

  const currentQuestion = questions[currentIndex];

  const isFirst = currentIndex === 0;

  const isLast = currentIndex === questions.length - 1;

  const answeredCount = Object.keys(answers).length;

  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;

  const isUrgent = secondsLeft < 60;

  const assessmentTitle = attempt?.assessment?.title || "Assessment";

  return (
    <section className="take-assessment-page">
      <div className="take-assessment-container">
        <header className="take-assessment-topbar">
          <button
            type="button"
            className="take-assessment-back"
            onClick={() => navigate("/assessments")}
            disabled={submitting}
          >
            <ArrowLeft size={17} />
            <span>Assessments</span>
          </button>

          <div className="take-assessment-brand">
            <span className="take-assessment-brand-dot" />
            <span>{assessmentTitle}</span>
          </div>
        </header>

        <div className="take-assessment-heading">
          <div>
            <span className="take-assessment-eyebrow">KNOW YOURSELF</span>

            <h1>Assessment in progress</h1>

            <p>
              Answer each question carefully and choose the option that best
              represents you.
            </p>
          </div>

          <div className={`take-assessment-timer ${isUrgent ? "urgent" : ""}`}>
            <Clock3 size={17} />

            <div>
              <span className="timer-label">TIME LEFT</span>

              <strong>{formatTime(secondsLeft)}</strong>
            </div>
          </div>
        </div>

        <div className="take-assessment-progress-card">
          <div className="take-assessment-progress-top">
            <div>
              <span className="progress-question">
                Question <strong>{currentIndex + 1}</strong> of{" "}
                {questions.length}
              </span>

              <span className="progress-answered">
                {answeredCount} answered
              </span>
            </div>

            <span className="progress-percentage">
              {Math.round(progressPercentage)}%
            </span>
          </div>

          <div className="take-assessment-progress-bar">
            <div
              className="take-assessment-progress-fill"
              style={{
                width: `${progressPercentage}%`
              }}
            />
          </div>
        </div>

        {error && (
          <div className="take-assessment-inline-error">
            <HelpCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <main className="take-assessment-question-card">
          <div className="question-card-header">
            <div className="question-number">
              <span>{String(currentIndex + 1).padStart(2, "0")}</span>
            </div>

            <div>
              <span className="question-label">
                QUESTION {currentIndex + 1}
              </span>

              <span className="question-helper">Select one answer</span>
            </div>
          </div>

          <h2>{currentQuestion.questionText}</h2>

          <div className="take-assessment-options">
            {currentQuestion.options?.map((option, optionIndex) => {
              const isSelected =
                answers[currentQuestion._id] === option.optionValue;

              return (
                <button
                  type="button"
                  key={option.optionValue}
                  className={`assessment-option ${
                    isSelected ? "option-selected" : ""
                  }`}
                  onClick={() =>
                    handleSelect(currentQuestion._id, option.optionValue)
                  }
                  disabled={submitting}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + optionIndex)}
                  </span>

                  <span className="option-text">{option.optionText}</span>

                  <span className="option-check">
                    {isSelected && <CheckCircle2 size={20} />}
                  </span>
                </button>
              );
            })}
          </div>
        </main>

        <footer className="take-assessment-navigation">
          <button
            type="button"
            className="assessment-nav-button secondary"
            onClick={handlePrevious}
            disabled={isFirst || submitting}
          >
            <ArrowLeft size={17} />
            <span>Previous</span>
          </button>

          <div className="navigation-status">
            <span>
              {answeredCount} of {questions.length} answered
            </span>
          </div>

          {isLast ? (
            <button
              type="button"
              className="assessment-nav-button primary"
              onClick={handleFinish}
              disabled={submitting}
            >
              <span>{submitting ? "Submitting..." : "Submit Assessment"}</span>

              {!submitting && <CheckCircle2 size={18} />}
            </button>
          ) : (
            <button
              type="button"
              className="assessment-nav-button primary"
              onClick={handleNext}
              disabled={submitting}
            >
              <span>Next Question</span>
              <ArrowRight size={18} />
            </button>
          )}
        </footer>
      </div>
    </section>
  );
};

export default TakeAssessment;
