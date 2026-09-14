import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { ArrowRight, RefreshCw } from "lucide-react";

import { getActiveEleventhGroups } from "../../services/eleventhGroupService";

import "./eleventhGroup.css";

// Fallback theme colors cycled per card (matches homepage purple/pink palette)
const CARD_THEMES = [
  "theme-purple",
  "theme-green",
  "theme-orange",
  "theme-blue",
  "theme-pink"
];

const EleventhGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchGroups = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getActiveEleventhGroups();

      if (response?.success && Array.isArray(response?.data)) {
        setGroups(response.data);
      } else {
        setError(response?.message || "Failed to load 11th grade groups.");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="eleventh-group-loading">
        <div className="loading-spinner"></div>
        <p>Loading 11th grade groups...</p>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="eleventh-group-error">
        <p>{error}</p>
        <button type="button" className="btn-retry" onClick={fetchGroups}>
          Try Again
          <RefreshCw size={16} />
        </button>
      </div>
    );
  }

  // =========================================================
  // EMPTY STATE
  // =========================================================

  if (!groups.length) {
    return (
      <div className="eleventh-group-empty">
        <p>No 11th grade groups available right now.</p>
      </div>
    );
  }

  // =========================================================
  // MAIN GRID
  // =========================================================

  return (
    <div className="eleventh-group-grid">
      {groups.map((group, index) => {
        const theme = CARD_THEMES[index % CARD_THEMES.length];

        return (
          <div key={group._id} className={`eleventh-group-card ${theme}`}>
            <div className="eleventh-group-image-wrap">
              {group.imageUrl ? (
                <img
                  src={group.imageUrl}
                  alt={group.groupName}
                  className="eleventh-group-image"
                  loading="lazy"
                />
              ) : (
                <div className="eleventh-group-image-placeholder">
                  {group.groupName?.charAt(0)}
                </div>
              )}
            </div>

            <h4 className="eleventh-group-name">{group.groupName}</h4>

            <p className="eleventh-group-subjects">
              {Array.isArray(group.subjects) && group.subjects.length > 0
                ? group.subjects.join(" • ")
                : group.description}
            </p>

            <Link
              to={`/eleventh-groups/${group._id}`}
              className="eleventh-group-explore-btn"
            >
              Explore
              <ArrowRight size={16} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default EleventhGroups;
