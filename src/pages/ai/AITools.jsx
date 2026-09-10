import { useNavigate } from "react-router-dom";

import {
  MessageCircle,
  Sparkles,
  TrendingUp,
  Headphones,
  ArrowRight,
  Brain
} from "lucide-react";

import "./AITools.css";

const AITools = () => {
  const navigate = useNavigate();

  const aiTools = [
    {
      id: 1,
      title: "Career Conversation",
      description:
        "Ask questions about careers, courses, skills, and your future career path.",
      icon: MessageCircle,
      buttonText: "Start Conversation",
      path: "/ai-tools/conversation",
      type: "conversation"
    },
    {
      id: 2,
      title: "Career Recommendation",
      description:
        "Get career recommendations based on your assessment results, strengths, and skills.",
      icon: Sparkles,
      buttonText: "View Recommendation",
      path: "/ai-tools/recommendation",
      type: "recommendation"
    },
    {
      id: 3,
      title: "Career Impact Tracker",
      description:
        "Understand how technology and automation may affect different careers and skills.",
      icon: TrendingUp,
      buttonText: "Explore Impact",
      path: "/ai-tools/impact-tracker",
      type: "impact"
    },
    {
      id: 4,
      title: "AI Support",
      description:
        "Get help with career guidance, course guidance, assessments, and technical questions.",
      icon: Headphones,
      buttonText: "Get Support",
      path: "/ai-tools/support",
      type: "support"
    }
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="ai-tools-page">
      {/* ================= HEADER ================= */}

      <section className="ai-tools-header">
        <div className="ai-tools-header-content">
          <div className="ai-tools-header-icon">
            <Brain size={30} />
          </div>

          <div>
            <span className="ai-tools-label">CAREERPATH AI</span>

            <h1>AI Tools</h1>

            <p>Use AI-powered tools to improve your career journey.</p>
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <main className="ai-tools-container">
        <div className="ai-tools-intro">
          <h2>Explore Career Guidance Tools</h2>

          <p>
            Get personalized guidance, explore career opportunities, understand
            technology impact, and receive support throughout your educational
            journey.
          </p>
        </div>

        {/* ================= TOOL CARDS ================= */}

        <div className="ai-tools-grid">
          {aiTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <div className={`ai-tool-card ${tool.type}`} key={tool.id}>
                <div className="ai-tool-card-top">
                  <div className="ai-tool-icon">
                    <Icon size={28} />
                  </div>

                  <span className="ai-tool-badge">AI Powered</span>
                </div>

                <div className="ai-tool-card-content">
                  <h3>{tool.title}</h3>

                  <p>{tool.description}</p>
                </div>

                <button
                  type="button"
                  className="ai-tool-button"
                  onClick={() => handleNavigate(tool.path)}
                >
                  <span>{tool.buttonText}</span>

                  <ArrowRight size={18} />
                </button>
              </div>
            );
          })}
        </div>

        {/* ================= INFORMATION ================= */}

        <section className="ai-tools-info">
          <div className="ai-tools-info-icon">
            <Brain size={24} />
          </div>

          <div>
            <h3>Make Better Career Decisions</h3>

            <p>
              CareerPath AI tools are designed to help students understand their
              strengths, explore suitable careers, develop the right skills, and
              make informed education decisions.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AITools;
