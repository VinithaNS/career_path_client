import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import { ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react";

import { getEleventhGroupById } from "../../services/eleventhGroupService";

import "./eleventhGroupDetails.css";

const EleventhGroupDetails = () => {
  // =========================================================
  // STATE
  // =========================================================

  const { id } = useParams();

  const [group, setGroup] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =========================================================
  // FETCH GROUP
  // =========================================================

  const fetchGroup = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getEleventhGroupById(id);

      if (response?.success && response?.data) {
        setGroup(response.data);
      } else {
        setError(response?.message || "Failed to load group details.");
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
    fetchGroup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <section className="page">
        <div className="group-details-loading">
          <div className="loading-spinner"></div>
          <p>Loading group details...</p>
        </div>
      </section>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <section className="page">
        <div className="group-details-error">
          <p>{error}</p>

          <button type="button" className="btn-retry" onClick={fetchGroup}>
            Try Again
            <RefreshCw size={16} />
          </button>
        </div>
      </section>
    );
  }

  if (!group) {
    return null;
  }

  // =========================================================
  // MAIN
  // =========================================================

  return (
    <section className="page group-details-page">
      <Link to="/eleventh-groups" className="group-details-back">
        <ArrowLeft size={16} />
        Back to Groups
      </Link>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="group-details-header">
        {group.imageUrl && (
          <img
            src={group.imageUrl}
            alt={group.groupName}
            className="group-details-image"
          />
        )}

        <div>
          <h1>{group.groupName}</h1>

          <p className="group-details-code">Group Code: {group.groupCode}</p>

          {group.description && (
            <p className="group-details-description">{group.description}</p>
          )}
        </div>
      </div>

      {/* =====================================================
          SUBJECTS
      ===================================================== */}

      {Array.isArray(group.subjects) && group.subjects.length > 0 && (
        <div className="group-details-section">
          <h3>Subjects</h3>

          <div className="group-details-tags">
            {group.subjects.map((subject, index) => (
              <span key={index} className="group-details-tag">
                {subject}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================
          ELIGIBILITY
      ===================================================== */}

      {group.eligibility && (
        <div className="group-details-section">
          <h3>Eligibility</h3>

          <p>{group.eligibility}</p>
        </div>
      )}

      {/* =====================================================
          CAREER OPTIONS
      ===================================================== */}

      {Array.isArray(group.careerOptions) && group.careerOptions.length > 0 && (
        <div className="group-details-section">
          <h3>Career Options</h3>

          <ul className="group-details-list">
            {group.careerOptions.map((career, index) => (
              <li key={index}>
                <CheckCircle2 size={16} />
                {career}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* =====================================================
          COURSE OPTIONS
      ===================================================== */}

      {Array.isArray(group.courseOptions) && group.courseOptions.length > 0 && (
        <div className="group-details-section">
          <h3>Course Options</h3>

          <ul className="group-details-list">
            {group.courseOptions.map((course, index) => (
              <li key={index}>
                <CheckCircle2 size={16} />
                {course}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default EleventhGroupDetails;
