import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { ArrowRight, RefreshCw, Sparkles } from "lucide-react";

import { getActiveEleventhGroups } from "../../services/eleventhGroupService";

import "./eleventhGroup.css";

const GROUP_THEMES = {
  SCIENCE: {
    badge: "Science",
    gradient: "linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)",
    iconBg: "#dbeafe",
    color: "#2563eb",
    icon: "🔬"
  },
  COMMERCE: {
    badge: "Commerce",
    gradient: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)",
    iconBg: "#a7f3d0",
    color: "#059669",
    icon: "🪙"
  },
  ARTS: {
    badge: "Humanities",
    gradient: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)",
    iconBg: "#fde68a",
    color: "#d97706",
    icon: "📚"
  },
  VOCATIONAL: {
    badge: "Vocational",
    gradient: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)",
    iconBg: "#99f6e4",
    color: "#0d9488",
    icon: "⚙️"
  },
  DEFAULT: {
    badge: "General",
    gradient: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)",
    iconBg: "#fbcfe8",
    color: "#db2777",
    icon: "🧬"
  }
};

const getTheme = (code = "", name = "") => {
  const key = (code + " " + name).toUpperCase();
  if (key.includes("BIO") || key.includes("MATH"))
    return GROUP_THEMES["DEFAULT"];
  if (key.includes("SCI") || key.includes("COMP"))
    return GROUP_THEMES["SCIENCE"];
  if (key.includes("COMMERCE") || key.includes("ACC"))
    return GROUP_THEMES["COMMERCE"];
  if (key.includes("ARTS") || key.includes("HUMAN"))
    return GROUP_THEMES["ARTS"];
  if (key.includes("VOC") || key.includes("SKILL"))
    return GROUP_THEMES["VOCATIONAL"];
  return GROUP_THEMES["DEFAULT"];
};

const EleventhGroups = () => {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await getActiveEleventhGroups();
        if (isMounted) setGroups(res?.data || res || []);
      } catch (err) {
        if (isMounted)
          setError(err.message || "Failed to load 11th grade groups.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="eleventh-loading-box">
        <RefreshCw size={24} className="spin" />
        <span>Loading Streams...</span>
      </div>
    );
  }

  if (error) {
    return <div className="eleventh-error-box">{error}</div>;
  }

  return (
    <div className="eleventh-showcase-grid">
      {groups.map((group) => {
        const theme = getTheme(group.groupCode, group.groupName);
        return (
          <div
            key={group._id}
            className="eleventh-modern-card"
            style={{ "--card-accent": theme.color }}
          >
            <div
              className="card-ambient-glow"
              style={{ background: theme.gradient }}
            ></div>

            <div
              className="card-illustration-wrap"
              style={{ background: theme.iconBg }}
            >
              <span className="card-emoji-visual">{theme.icon}</span>
            </div>

            <h3 className="card-group-title">{group.groupName}</h3>

            <div className="card-subject-pill-row">
              {group.coreSubjects?.slice(0, 4).map((sub, i) => (
                <span key={i} className="card-subject-dot">
                  {sub}
                </span>
              ))}
            </div>

            <button
              type="button"
              className="card-explore-action"
              onClick={() => navigate(`/eleventh-groups/${group._id}`)}
            >
              <span>Explore</span>
              <ArrowRight size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default EleventhGroups;
