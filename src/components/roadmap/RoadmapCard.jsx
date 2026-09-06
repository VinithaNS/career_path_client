import {
  BookOpen,
  Clock3,
  CheckCircle2,
  ArrowRight,
  Layers3
} from "lucide-react";

import "./RoadmapCard.css";

const RoadmapCard = ({ roadmap, onViewDetails }) => {
  const title =
    roadmap.title ||
    roadmap.roadmapName ||
    roadmap.name ||
    roadmap.careerName ||
    roadmap.career?.careerName ||
    "Career Roadmap";

  const description =
    roadmap.description ||
    roadmap.shortDescription ||
    roadmap.career?.shortDescription ||
    "Follow a structured path to build the skills required for this career.";

  const category =
    roadmap.category ||
    roadmap.categoryName ||
    roadmap.careerCategory ||
    roadmap.career?.category ||
    "Career Path";

  const duration =
    roadmap.duration ||
    roadmap.timeRequired ||
    roadmap.estimatedDuration ||
    "12–18 Months";

  const steps =
    roadmap.steps?.length ||
    roadmap.roadmapSteps?.length ||
    roadmap.phases?.length ||
    roadmap.totalSteps ||
    6;

  return (
    <article className="roadmap-card">
      {/* ACCENT ICON */}

      <div className="roadmap-card-icon">
        <BookOpen size={24} strokeWidth={1.8} />
      </div>

      {/* CONTENT */}

      <div className="roadmap-card-body">
        <div className="roadmap-card-top-row">
          <span className="roadmap-card-eyebrow">
            <Layers3 size={13} />
            CAREER PATH
          </span>

          <span className="roadmap-card-badge">{category}</span>
        </div>

        <h3>{title}</h3>

        <p className="roadmap-card-description">{description}</p>

        {/* META */}

        <div className="roadmap-card-meta">
          <div className="roadmap-meta-item">
            <Clock3 size={16} />
            <div>
              <span>Duration</span>
              <strong>{duration}</strong>
            </div>
          </div>

          <div className="roadmap-meta-divider"></div>

          <div className="roadmap-meta-item">
            <CheckCircle2 size={16} />
            <div>
              <span>Roadmap</span>
              <strong>{steps} Steps</strong>
            </div>
          </div>
        </div>

        {/* BUTTON */}

        <button
          type="button"
          className="roadmap-card-button"
          onClick={() => onViewDetails(roadmap._id)}
        >
          <span>View Roadmap</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </article>
  );
};

export default RoadmapCard;
