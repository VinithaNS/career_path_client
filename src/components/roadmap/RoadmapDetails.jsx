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

// Client-side fallback dictionary if database records only have basic fields
const FALLBACK_STEP_DETAILS = {
  0: {
    topics: [
      "Variables & Data Types",
      "Control Flow (if/else, loops)",
      "Functions & Scope",
      "Arrays, Strings & Objects",
      "Time & Space Complexity Basics"
    ],
    tools: ["VS Code", "Node.js REPL", "Git & GitHub Basics"],
    practicePlatforms: ["HackerRank", "LeetCode (Easy)", "freeCodeCamp"],
    miniProject:
      "Build a CLI Calculator or Interactive Todo Application in vanilla JavaScript.",
    estimatedDuration: "3 - 4 Weeks"
  },
  1: {
    topics: [
      "Semantic HTML5",
      "Modern CSS (Flexbox, Grid)",
      "JavaScript (ES6+, DOM, Fetch API)",
      "React Components, Props & State",
      "Tailwind CSS"
    ],
    tools: ["VS Code", "Vite", "Chrome DevTools", "Figma"],
    practicePlatforms: ["Frontend Mentor", "CSSBattle", "Codewars"],
    miniProject:
      "Build a Responsive Product Catalog with filtering, cart state, and localStorage.",
    estimatedDuration: "6 - 8 Weeks"
  },
  2: {
    topics: [
      "Node.js Architecture & Event Loop",
      "Express.js REST APIs",
      "Middleware & Routing",
      "JWT Authentication & bcrypt",
      "Input Validation & Error Handling"
    ],
    tools: ["Postman", "Thunder Client", "Linux Terminal"],
    practicePlatforms: ["Exercism (Node.js)", "Postman API Network"],
    miniProject:
      "Build a Secure User Authentication and Note Management REST API.",
    estimatedDuration: "5 - 6 Weeks"
  },
  3: {
    topics: [
      "NoSQL vs Relational Concepts",
      "MongoDB CRUD Operations",
      "Mongoose Schemas & Validation",
      "Aggregation Pipelines & Indexes",
      "Referenced vs Embedded Documents"
    ],
    tools: ["MongoDB Compass", "MongoDB Atlas", "DBeaver"],
    practicePlatforms: ["MongoDB University", "SQLBolt"],
    miniProject:
      "Design and implement database models with relational schemas for an E-Commerce store.",
    estimatedDuration: "3 - 4 Weeks"
  },
  4: {
    topics: [
      "Full Stack REST Integration",
      "Global State Management",
      "File Uploads (Multer/Cloudinary)",
      "Deployment (Vercel, Render)",
      "Environment Variables & Security"
    ],
    tools: ["GitHub Actions", "Vercel", "Render", "Docker Basics"],
    practicePlatforms: ["GitHub Open Source", "Devpost Hackathons"],
    miniProject:
      "Deploy a production-ready MERN Stack application with authentication and media upload.",
    estimatedDuration: "4 - 6 Weeks"
  },
  5: {
    topics: [
      "ATS-Friendly Resume Preparation",
      "System Design & DSA Fundamentals",
      "STAR Method for Behavioral Rounds",
      "GitHub README Polish",
      "Mock Technical Interviews"
    ],
    tools: ["LinkedIn", "GitHub", "LeetCode", "Pramp"],
    practicePlatforms: ["InterviewBit", "Glassdoor Reviews"],
    miniProject:
      "Launch a live personal portfolio website showcasing 2-3 production-level projects.",
    estimatedDuration: "4 Weeks"
  }
};

const RoadmapDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedStep, setExpandedStep] = useState(0); // Step 01 open by default

  useEffect(() => {
    let isMounted = true;
    const fetchRoadmap = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getCareerRoadmapById(id);
        if (isMounted) {
          setRoadmap(res?.data || res);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Failed to load roadmap"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
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
        {/* Top Back Navigation */}
        <button
          type="button"
          className="roadmap-back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        {/* Hero Section */}
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

        {/* 2-Column Main Section */}
        <div className="roadmap-layout-grid">
          {/* Timeline Column */}
          <div className="roadmap-steps-column">
            {stepsList.map((step, idx) => {
              const isExpanded = expandedStep === idx;
              const fallback =
                FALLBACK_STEP_DETAILS[idx] || FALLBACK_STEP_DETAILS[0];

              // Merge DB fields with fallback defaults
              const topics =
                step.topics && step.topics.length > 0
                  ? step.topics
                  : fallback.topics;
              const tools =
                step.tools && step.tools.length > 0
                  ? step.tools
                  : fallback.tools;
              const platforms =
                step.practicePlatforms && step.practicePlatforms.length > 0
                  ? step.practicePlatforms
                  : fallback.practicePlatforms;
              const miniProject = step.miniProject || fallback.miniProject;
              const estimatedDuration =
                step.estimatedDuration || fallback.estimatedDuration;

              return (
                <div key={step._id || idx} className="roadmap-step-wrapper">
                  {/* Step Timeline Indicator & Row Card */}
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

                  {/* Expandable Step Details Panel */}
                  {isExpanded && (
                    <div className="step-expanded-drawer">
                      {/* Topics */}
                      <div className="drawer-section">
                        <h4>
                          <Code2 size={16} color="#9333ea" />
                          <span>Key Topics to Master</span>
                        </h4>
                        <div className="drawer-chips-wrap">
                          {topics.map((top, tIdx) => (
                            <span key={tIdx} className="topic-tag-chip">
                              <CheckCircle size={13} color="#059669" />
                              <span>{top}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Tools & Platforms */}
                      <div className="drawer-dual-grid">
                        <div className="drawer-mini-card">
                          <h4>
                            <Wrench size={15} color="#db2777" />
                            <span>Tools & Tech Stack</span>
                          </h4>
                          <div className="drawer-mini-chips">
                            {tools.map((tl, tlIdx) => (
                              <span key={tlIdx} className="tool-tag-chip">
                                {tl}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="drawer-mini-card">
                          <h4>
                            <Clock size={15} color="#ea580c" />
                            <span>Estimated Duration</span>
                          </h4>
                          <p className="duration-highlight">
                            {estimatedDuration}
                          </p>
                          {platforms && platforms.length > 0 && (
                            <p className="platforms-sub-note">
                              <strong>Platforms:</strong> {platforms.join(", ")}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Mini Project */}
                      {miniProject && (
                        <div className="drawer-project-card">
                          <h4>
                            <BookOpen size={16} color="#047857" />
                            <span>Recommended Practical Project</span>
                          </h4>
                          <p>{miniProject}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Sidebar */}
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
