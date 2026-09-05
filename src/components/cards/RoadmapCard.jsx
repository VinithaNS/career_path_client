import { ArrowRight, Clock, Layers3, CheckCircle2 } from "lucide-react";

const RoadmapCard = ({ roadmap, onView }) => {
  const title =
    roadmap.careerId?.careerName ||
    roadmap.careerName ||
    roadmap.title ||
    "Career Roadmap";

  const description =
    roadmap.description ||
    roadmap.shortDescription ||
    "Follow a structured path and build the skills required for this career.";

  const steps = roadmap.steps || roadmap.roadmapSteps || [];

  const duration = roadmap.duration || "6 - 12 Months";

  return (
    <article className="roadmap-card">
      <div className="roadmap-card-top">
        <div className="roadmap-card-icon">
          <Layers3 size={25} />
        </div>

        <span className="roadmap-level">Career Path</span>
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <div className="roadmap-card-meta">
        <span>
          <Clock size={16} />
          {duration}
        </span>

        <span>
          <CheckCircle2 size={16} />
          {steps.length || 0} Steps
        </span>
      </div>

      <button className="roadmap-view-btn" onClick={() => onView(roadmap._id)}>
        View Roadmap
        <ArrowRight size={17} />
      </button>
    </article>
  );
};

export default RoadmapCard;
