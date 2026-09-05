import { useEffect, useState } from "react";

import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  BookOpen,
  Target,
  Briefcase,
  GraduationCap
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { getCareerRoadmapById } from "../../services/roadmapService";

import "./CareerRoadmap.css";

const CareerRoadmap = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRoadmap = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Loading Roadmap ID:", id);

        const response = await getCareerRoadmapById(id);

        console.log("Career Roadmap Details API Response:", response);

        const data = response?.data || response;

        setRoadmap(data);
      } catch (err) {
        console.error("Career Roadmap Details Error:", err);

        setError(
          err.response?.data?.message || err.message || "Failed to load roadmap"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadRoadmap();
    }
  }, [id]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="career-roadmap-page">
        <div className="career-roadmap-status">
          <BookOpen size={40} />
          <h2>Loading roadmap...</h2>
          <p>Please wait while we load the career roadmap.</p>
        </div>
      </main>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <main className="career-roadmap-page">
        <div className="career-roadmap-status error">
          <h2>Unable to load roadmap</h2>
          <p>{error}</p>

          <button onClick={() => navigate("/roadmap")}>Back to Roadmaps</button>
        </div>
      </main>
    );
  }

  // ==========================================
  // NOT FOUND
  // ==========================================

  if (!roadmap) {
    return (
      <main className="career-roadmap-page">
        <div className="career-roadmap-status">
          <h2>Roadmap not found</h2>

          <button onClick={() => navigate("/roadmap")}>Back to Roadmaps</button>
        </div>
      </main>
    );
  }

  const title =
    roadmap.title ||
    roadmap.roadmapName ||
    roadmap.careerName ||
    roadmap.career?.careerName ||
    "Career Roadmap";

  const description =
    roadmap.description ||
    roadmap.shortDescription ||
    roadmap.overview ||
    "Follow this structured career roadmap.";

  const duration = roadmap.duration || roadmap.totalDuration || "12-18 Months";

  const steps = roadmap.steps || [];

  const skills = roadmap.skills || roadmap.requiredSkills || [];

  const category =
    roadmap.category ||
    roadmap.categoryName ||
    roadmap.careerCategory ||
    "Career Path";

  return (
    <main className="career-roadmap-page">
      {/* ==========================================
          BACK
      ========================================== */}

      <button
        className="roadmap-back-button"
        onClick={() => navigate("/roadmap")}
      >
        <ArrowLeft size={18} />
        Back to Roadmaps
      </button>

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="career-roadmap-hero">
        <div className="career-roadmap-hero-icon">
          <BookOpen size={36} />
        </div>

        <span className="career-roadmap-category">{category}</span>

        <h1>{title}</h1>

        <p>{description}</p>

        <div className="career-roadmap-meta">
          <span>
            <Clock size={18} />
            {duration}
          </span>

          <span>
            <CheckCircle2 size={18} />
            {steps.length || "Multiple"} Steps
          </span>
        </div>
      </section>

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <section className="career-roadmap-content">
        {/* ROADMAP STEPS */}

        <div className="roadmap-steps-section">
          <div className="details-section-heading">
            <span>YOUR JOURNEY</span>

            <h2>Career Roadmap</h2>

            <p>
              Follow these steps to build the skills and experience needed for
              this career.
            </p>
          </div>

          {steps.length > 0 ? (
            <div className="roadmap-timeline">
              {steps.map((step, index) => {
                const stepTitle =
                  step.title ||
                  step.stepName ||
                  step.name ||
                  `Step ${index + 1}`;

                const stepDescription =
                  step.description || step.shortDescription || "";

                const stepSkills = step.skills || step.requiredSkills || [];

                return (
                  <div
                    className="roadmap-timeline-item"
                    key={step._id || index}
                  >
                    <div className="timeline-number">{index + 1}</div>

                    <div className="timeline-line" />

                    <div className="timeline-content">
                      <div className="timeline-step-label">
                        STEP {index + 1}
                      </div>

                      <h3>{stepTitle}</h3>

                      {stepDescription && <p>{stepDescription}</p>}

                      {stepSkills.length > 0 && (
                        <div className="timeline-skills">
                          {stepSkills.map((skill, skillIndex) => (
                            <span key={skillIndex}>
                              {typeof skill === "string" ? skill : skill.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="roadmap-empty-steps">
              <Target size={35} />

              <h3>Roadmap steps coming soon</h3>

              <p>Detailed roadmap steps have not been added yet.</p>
            </div>
          )}
        </div>

        {/* SIDEBAR */}

        <aside className="career-roadmap-sidebar">
          {/* Skills */}

          <div className="roadmap-sidebar-card">
            <div className="sidebar-icon">
              <Target size={22} />
            </div>

            <h3>Skills to Build</h3>

            {skills.length > 0 ? (
              <div className="sidebar-list">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <CheckCircle2 size={16} />

                    <span>
                      {typeof skill === "string" ? skill : skill.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p>Skills information will be available soon.</p>
            )}
          </div>

          {/* Career */}

          <div className="roadmap-sidebar-card">
            <div className="sidebar-icon">
              <Briefcase size={22} />
            </div>

            <h3>Career Opportunities</h3>

            <p>
              Explore job roles and opportunities related to this career path.
            </p>

            <button onClick={() => navigate("/careers")}>
              Explore Careers
            </button>
          </div>

          {/* Education */}

          <div className="roadmap-sidebar-card">
            <div className="sidebar-icon">
              <GraduationCap size={22} />
            </div>

            <h3>Recommended Education</h3>

            <p>
              Discover courses and education paths that can help you reach this
              career.
            </p>

            <button onClick={() => navigate("/education")}>
              Explore Courses
            </button>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default CareerRoadmap;
