// src/components/cards/AssessmentCard.jsx

import { ArrowRight, Clock3, HelpCircle, Brain } from "lucide-react";

import "./AssessmentCard.css";

const getDifficultyClass = (difficulty) => {
  const value = String(difficulty || "").toLowerCase();

  if (value.includes("easy") || value.includes("beginner")) {
    return "green";
  }

  if (value.includes("hard") || value.includes("advanced")) {
    return "red";
  }

  return "orange";
};

const getDifficultyLabel = (difficulty) => {
  if (!difficulty) {
    return "Intermediate";
  }

  return difficulty;
};

const AssessmentCard = ({ assessment, onStart }) => {
  if (!assessment) {
    return null;
  }

  const {
    _id,
    title,
    description,
    duration,
    totalQuestions,
    difficulty,
    category
  } = assessment;

  const categoryName = category?.categoryName || "Assessment";
  const difficultyLabel = getDifficultyLabel(difficulty);
  const difficultyClass = getDifficultyClass(difficulty);

  const questionLabel = Number(totalQuestions) === 1 ? "Question" : "Questions";

  const handleStart = () => {
    if (_id && typeof onStart === "function") {
      onStart(_id);
    }
  };

  return (
    <article className="assessment-card">
      <div className="assessment-card-top">
        <div className="assessment-card-icon">
          <Brain size={21} strokeWidth={2.2} />
        </div>

        <span className={`assessment-difficulty-badge ${difficultyClass}`}>
          {difficultyLabel}
        </span>
      </div>

      <span className="assessment-category">{categoryName}</span>

      <h3 className="assessment-card-title">
        {title || "Untitled Assessment"}
      </h3>

      <p className="assessment-card-description">
        {description ||
          "Test your knowledge and discover your strengths with this assessment."}
      </p>

      <div className="assessment-card-meta">
        <div className="assessment-card-meta-item">
          <Clock3 size={16} strokeWidth={2} />
          <span>{duration || 0} min</span>
        </div>

        <div className="assessment-card-meta-divider" />

        <div className="assessment-card-meta-item">
          <HelpCircle size={16} strokeWidth={2} />
          <span>
            {totalQuestions || 0} {questionLabel}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="assessment-start-button"
        onClick={handleStart}
        disabled={!_id}
      >
        <span>Start Assessment</span>

        <span className="assessment-start-icon">
          <ArrowRight size={17} strokeWidth={2.4} />
        </span>
      </button>
    </article>
  );
};

export default AssessmentCard;
