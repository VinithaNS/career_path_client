import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Code2,
  Wrench,
  Clock,
  Target,
  Layers,
  Award,
  BookOpen
} from "lucide-react";

import { getCareerRoadmapById } from "../../services/roadmapService";

import "./RoadmapDetails.css";

const RoadmapDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedStep, setExpandedStep] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getCareerRoadmapById(id);
        if (isMounted) setRoadmap(res?.data || res);
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Failed to load roadmap"
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRoadmap();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const toggleStep = (idx) => {
    setExpandedStep(expandedStep === idx ? null : idx);
  };

  if (loading) {
    return (
      <div className="roadmap-details-state">
        <div className="pure-css-loader"></div>
        <p>Loading Career Roadmap...</p>
      </div>
    );
  }

  if (error || !roadmap) {
    return (
      <div className="roadmap-details-state error">
        <h2>Roadmap Not Found</h2>
        <p>{error}</p>
        <button type="button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const stepsList = roadmap.steps || [];

  return (
    <div className="roadmap-details-page">
      <div className="roadmap-details-container">
        <button
          type="button"
          className="roadmap-back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="roadmap-hero-card">
          <div className="roadmap-hero-top">
            <span className="roadmap-badge-chip">CAREER ROADMAP</span>
            <span className="roadmap-count-chip">
              {stepsList.length} MILESTONES
            </span>
          </div>
          <h1>{roadmap.title}</h1>
          <p>
            {roadmap.description ||
              "Follow each step in order and build the skills required for your target career."}
          </p>
        </div>

        <div className="roadmap-layout-grid">
          <div className="roadmap-steps-column">
            {stepsList.map((step, idx) => {
              const isExpanded = expandedStep === idx;

              return (
                <div key={step._id || idx} className="roadmap-step-wrapper">
                  <div
                    className={`roadmap-step-row ${isExpanded ? "active" : ""}`}
                    onClick={() => toggleStep(idx)}
                  >
                    <div className="step-number-indicator">
                      <span>{step.stepNumber || idx + 1}</span>
                    </div>

                    <div className="step-info-block">
                      <span className="step-pre-label">
                        STEP 0{step.stepNumber || idx + 1}
                      </span>
                      <h3 className="step-title-text">{step.title}</h3>
                      <p className="step-description-text">
                        {step.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="step-chevron-btn"
                      aria-label="Toggle step details"
                    >
                      {isExpanded ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="step-expanded-drawer">
                      {step.topics && step.topics.length > 0 && (
                        <div className="drawer-section">
                          <h4>
                            <Code2 size={16} color="#9333ea" />
                            <span>Key Topics to Master</span>
                          </h4>
                          <div className="drawer-chips-wrap">
                            {step.topics.map((top, tIdx) => (
                              <span key={tIdx} className="topic-tag-chip">
                                <CheckCircle size={13} color="#059669" />
                                <span>{top}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="drawer-dual-grid">
                        {step.tools && step.tools.length > 0 && (
                          <div className="drawer-mini-card">
                            <h4>
                              <Wrench size={15} color="#db2777" />
                              <span>Tools &amp; Tech Stack</span>
                            </h4>
                            <div className="drawer-mini-chips">
                              {step.tools.map((tl, tlIdx) => (
                                <span key={tlIdx} className="tool-tag-chip">
                                  {tl}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {step.estimatedDuration && (
                          <div className="drawer-mini-card">
                            <h4>
                              <Clock size={15} color="#ea580c" />
                              <span>Estimated Duration</span>
                            </h4>
                            <p className="duration-highlight">
                              {step.estimatedDuration}
                            </p>
                            {step.practicePlatforms &&
                              step.practicePlatforms.length > 0 && (
                                <p className="platforms-sub-note">
                                  <strong>Platforms:</strong>{" "}
                                  {step.practicePlatforms.join(", ")}
                                </p>
                              )}
                          </div>
                        )}
                      </div>

                      {step.miniProject && (
                        <div className="drawer-project-card">
                          <h4>
                            <BookOpen size={16} color="#047857" />
                            <span>Recommended Practical Project</span>
                          </h4>
                          <p>{step.miniProject}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="roadmap-sidebar-column">
            <div className="roadmap-sidebar-card">
              <div
                className="sidebar-icon-wrap"
                style={{ background: "#F3E8FF", color: "#9333EA" }}
              >
                <Target size={20} />
              </div>
              <div>
                <h4>Clear Direction</h4>
                <p>
                  Know exactly what technologies to focus on at each milestone.
                </p>
              </div>
            </div>

            <div className="roadmap-sidebar-card">
              <div
                className="sidebar-icon-wrap"
                style={{ background: "#FDF2F8", color: "#DB2777" }}
              >
                <Layers size={20} />
              </div>
              <div>
                <h4>Practical Skills</h4>
                <p>Build job-ready capability with portfolio mini-projects.</p>
              </div>
            </div>

            <div className="roadmap-sidebar-card">
              <div
                className="sidebar-icon-wrap"
                style={{ background: "#ECFDF5", color: "#059669" }}
              >
                <Award size={20} />
              </div>
              <div>
                <h4>Career Readiness</h4>
                <p>
                  Graduate from fundamentals straight into production workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapDetails;
