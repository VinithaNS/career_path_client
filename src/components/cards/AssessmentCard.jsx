import { ArrowRight, Clock3, HelpCircle, Brain } from "lucide-react";

const difficultyColor = {
  Easy: "green",
  Medium: "orange",
  Hard: "red"
};

const AssessmentCard = ({ assessment, onStart }) => {
  const categoryName =
    typeof assessment.category === "object"
      ? assessment.category?.categoryName
      : "Assessment";

  return (
    <article className="assessment-card">
      <div className="assessment-card-top">
        <div className="assessment-card-icon">
          <Brain size={22} />
        </div>
        <span
          className={`assessment-difficulty-badge ${
            difficultyColor[assessment.difficulty] || "orange"
          }`}
        >
          {assessment.difficulty}
        </span>
      </div>

      <span className="assessment-category">{categoryName}</span>
      <h3>{assessment.title}</h3>
      <p>
        {assessment.description || "Test your knowledge with this assessment."}
      </p>

      <div className="assessment-card-meta">
        <div>
          <Clock3 size={15} />
          <span>{assessment.duration} min</span>
        </div>
        <div>
          <HelpCircle size={15} />
          <span>{assessment.totalQuestions} questions</span>
        </div>
      </div>

      <button
        type="button"
        className="assessment-start-button"
        onClick={() => onStart(assessment._id)}
      >
        <span>View & Start</span>
        <ArrowRight size={16} />
      </button>
    </article>
  );
};

export default AssessmentCard;
