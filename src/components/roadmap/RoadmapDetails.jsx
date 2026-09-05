import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Clock3,
  CheckCircle2,
  BookOpen,
  Target,
  Code2,
  Briefcase,
  GraduationCap
} from "lucide-react";

import { getCareerRoadmapById } from "../../services/roadmapService";

import "./RoadmapDetails.css";

const RoadmapDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadRoadmap = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Loading Roadmap ID:", id);

        const response = await getCareerRoadmapById(id);

        console.log("Roadmap Details API Response:", response);

        const data = response?.data || response;

        if (!cancelled) {
          setRoadmap(data);
        }
      } catch (err) {
        console.error("Roadmap Details API Error:", err);

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to load roadmap"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadRoadmap();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="roadmap-details-status">
        <div className="roadmap-details-loader"></div>
        <h3>Loading roadmap...</h3>
        <p>Please wait while we prepare your career path.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="roadmap-details-status error">
        <h3>Unable to load roadmap</h3>
        <p>{error}</p>

        <button onClick={() => navigate("/roadmap")}>Back to Roadmaps</button>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="roadmap-details-status">
        <h3>Roadmap not found</h3>

        <button onClick={() => navigate("/roadmap")}>Back to Roadmaps</button>
      </div>
    );
  }

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
    "";

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

  const steps = roadmap.steps || roadmap.roadmapSteps || roadmap.phases || [];

  return (
    <main className="roadmap-details-page">
      {/* BACK */}

      <div className="roadmap-details-container">
        <button
          className="roadmap-back-button"
          onClick={() => navigate("/roadmap")}
        >
          <ArrowLeft size={17} />
          Back to Roadmaps
        </button>

        {/* HERO */}

        <section className="roadmap-details-hero">
          <div className="roadmap-details-icon">
            <BookOpen size={34} />
          </div>

          <div className="roadmap-details-content">
            <span className="roadmap-details-category">{category}</span>

            <h1>{title}</h1>

            <p>{description}</p>

            <div className="roadmap-details-meta">
              <div>
                <Clock3 size={18} />
                <span>{duration}</span>
              </div>

              <div>
                <CheckCircle2 size={18} />
                <span>{Array.isArray(steps) ? steps.length : 0} Steps</span>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN */}

        <div className="roadmap-details-layout">
          {/* STEPS */}

          <section className="roadmap-steps-section">
            <div className="details-section-title">
              <span>YOUR JOURNEY</span>
              <h2>Career Roadmap</h2>
              <p>
                Follow each step in order and build the skills required for your
                target career.
              </p>
            </div>

            <div className="roadmap-steps">
              {Array.isArray(steps) && steps.length > 0 ? (
                steps.map((step, index) => (
                  <div className="roadmap-step" key={step._id || index}>
                    <div className="roadmap-step-number">{index + 1}</div>

                    <div className="roadmap-step-content">
                      <span>STEP {String(index + 1).padStart(2, "0")}</span>

                      <h3>
                        {step.title || step.name || `Roadmap Step ${index + 1}`}
                      </h3>

                      <p>
                        {step.description ||
                          step.details ||
                          "Complete this stage and build the required knowledge and skills."}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="roadmap-no-steps">
                  <BookOpen size={30} />

                  <h3>Roadmap steps coming soon</h3>

                  <p>
                    The roadmap has been created, but detailed steps have not
                    been added yet.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* SIDEBAR */}

          <aside className="roadmap-details-sidebar">
            <div className="roadmap-sidebar-card">
              <h3>What you'll build</h3>

              <div className="sidebar-item">
                <div className="sidebar-icon blue">
                  <Target size={18} />
                </div>

                <div>
                  <strong>Clear Direction</strong>
                  <span>Know exactly what to focus on.</span>
                </div>
              </div>

              <div className="sidebar-item">
                <div className="sidebar-icon purple">
                  <Code2 size={18} />
                </div>

                <div>
                  <strong>Practical Skills</strong>
                  <span>Develop career-ready skills.</span>
                </div>
              </div>

              <div className="sidebar-item">
                <div className="sidebar-icon green">
                  <Briefcase size={18} />
                </div>

                <div>
                  <strong>Career Readiness</strong>
                  <span>Prepare for real opportunities.</span>
                </div>
              </div>

              <div className="sidebar-item">
                <div className="sidebar-icon orange">
                  <GraduationCap size={18} />
                </div>

                <div>
                  <strong>Continuous Growth</strong>
                  <span>Keep improving throughout your career.</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default RoadmapDetails;
