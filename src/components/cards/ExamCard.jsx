import { ArrowRight, Building2, ClipboardList } from "lucide-react";

const ExamCard = ({ exam, onViewDetails }) => {
  return (
    <article className="exam-card">
      <div className="exam-card-top">
        <div className="exam-card-icon">
          <ClipboardList size={22} />
        </div>
        <span className="exam-type-badge">{exam.examType}</span>
      </div>

      <span className="exam-code">{exam.examCode}</span>
      <h3>{exam.examName}</h3>

      <div className="exam-card-authority">
        <Building2 size={14} />
        <span>{exam.conductingAuthority}</span>
      </div>

      <p>{exam.description || "Explore eligibility and syllabus details."}</p>

      <div className="exam-card-meta">
        <div>
          <span>Mode</span>
          <strong>{exam.examMode}</strong>
        </div>
        <div>
          <span>Frequency</span>
          <strong>{exam.examFrequency || "N/A"}</strong>
        </div>
      </div>

      <button
        type="button"
        className="exam-view-button"
        onClick={() => onViewDetails(exam._id)}
      >
        <span>View Details</span>
        <ArrowRight size={16} />
      </button>
    </article>
  );
};

export default ExamCard;
