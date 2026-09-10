import { useNavigate } from "react-router-dom";

import {
  MessageCircle,
  Sparkles,
  Bot,
  LifeBuoy,
  ArrowRight,
  Brain,
  TrendingUp,
  ShieldCheck
} from "lucide-react";

import "./AIHub.css";

const AIHub = () => {
  const navigate = useNavigate();

  const tools = [
    {
      title: "AI Career Chat",
      description:
        "Talk with your AI career assistant about careers, courses, skills and your future.",
      icon: MessageCircle,
      path: "/student/ai/chat",
      tag: "Ask anything",
      className: "chat"
    },
    {
      title: "AI Recommendation",
      description:
        "Get personalized career recommendations based on your assessment results.",
      icon: Sparkles,
      path: "/student/ai/recommendation",
      tag: "Personalized",
      className: "recommendation"
    },
    {
      title: "AI Impact Tracker",
      description:
        "Understand how AI and automation may affect jobs and what skills you should build.",
      icon: TrendingUp,
      path: "/student/ai/impact",
      tag: "Future skills",
      className: "impact"
    },
    {
      title: "AI Support",
      description:
        "Create and track support requests when you need help with your CareerPath journey.",
      icon: LifeBuoy,
      path: "/student/ai/support",
      tag: "Get help",
      className: "support"
    }
  ];

  return (
    <div className="ai-hub">
      <section className="ai-hero">
        <div className="ai-hero-content">
          <div className="ai-badge">
            <Brain size={16} />
            CareerPath AI
          </div>

          <h1>
            Your Intelligent
            <span> Career Companion</span>
          </h1>

          <p>
            Discover careers, understand your strengths, explore future
            opportunities and get guidance whenever you need it.
          </p>

          <button
            className="ai-primary-btn"
            onClick={() => navigate("/student/ai/chat")}
          >
            Start AI Conversation
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="ai-hero-visual">
          <div className="ai-orbit orbit-one"></div>
          <div className="ai-orbit orbit-two"></div>

          <div className="ai-brain-card">
            <Bot size={48} />
            <span>AI</span>
          </div>
        </div>
      </section>

      <section className="ai-tools-section">
        <div className="section-heading">
          <div>
            <span>EXPLORE AI TOOLS</span>
            <h2>Everything you need for your career journey</h2>
          </div>
        </div>

        <div className="ai-tools-grid">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <div
                key={tool.title}
                className={`ai-tool-card ${tool.className}`}
                onClick={() => navigate(tool.path)}
              >
                <div className="tool-top">
                  <div className="tool-icon">
                    <Icon size={24} />
                  </div>

                  <span>{tool.tag}</span>
                </div>

                <h3>{tool.title}</h3>

                <p>{tool.description}</p>

                <div className="tool-link">
                  Explore
                  <ArrowRight size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="ai-trust">
        <ShieldCheck size={22} />

        <div>
          <strong>Designed for student guidance</strong>
          <p>
            Use AI as a guidance companion while making informed career
            decisions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AIHub;
