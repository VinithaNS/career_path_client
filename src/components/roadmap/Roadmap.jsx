import { useEffect, useState, useMemo } from "react";

import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Home,
  Search,
  Map,
  Compass,
  Briefcase,
  Target,
  ArrowRight,
  RefreshCw
} from "lucide-react";

import { getCareerRoadmaps } from "../../services/roadmapService";

import "./Roadmap.css";

const Roadmap = () => {
  const navigate = useNavigate();
  const [roadmaps, setRoadmaps] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const loadRoadmaps = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getCareerRoadmaps();
        if (isMounted) {
          const list = Array.isArray(response?.data)
            ? response.data
            : Array.isArray(response)
              ? response
              : [];
          setRoadmaps(list);
        }
      } catch (err) {
        if (isMounted) {
          setError(err?.message || "Failed to load career roadmaps.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadRoadmaps();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const filteredRoadmaps = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return roadmaps;
    return roadmaps.filter((item) => {
      const title = item.title || item.roadmapName || item.careerName || "";
      return title.toLowerCase().includes(term);
    });
  }, [roadmaps, search]);

  return (
    <main className="roadmap-page-container">
      {/* ================= NAVIGATION BAR ================= */}
      <div className="roadmap-top-nav">
        <button type="button" className="roadmap-nav-btn" onClick={handleBack}>
          <ArrowLeft size={17} />
          <span>Back</span>
        </button>

        <span className="roadmap-nav-divider">/</span>

        <button
          type="button"
          className="roadmap-nav-btn home-link"
          onClick={() => navigate("/")}
        >
          <Home size={16} />
          <span>Home</span>
        </button>

        <span className="roadmap-nav-divider">/</span>

        <button
          type="button"
          className="roadmap-nav-btn"
          onClick={() => navigate("/departments")}
        >
          <span>All Departments</span>
        </button>
      </div>

      {/* ================= HERO HEADER ================= */}
      <section className="roadmap-hero-banner">
        <div className="roadmap-hero-badge">
          <Map size={18} />
          <span>CAREER ROADMAPS</span>
        </div>
        <h1>
          Build Your Career <span>Step by Step</span>
        </h1>
        <p>
          Follow structured career paths, develop targeted technical skills, and
          understand milestones from school to industry readiness.
        </p>

        <div className="roadmap-search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search career roadmaps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* ================= HIGHLIGHT PILLS ================= */}
      <div className="roadmap-features-row">
        <div className="roadmap-feature-card">
          <div className="feature-icon purple">
            <Target size={20} />
          </div>
          <div>
            <strong>Clear Goals</strong>
            <span>Know what to learn next</span>
          </div>
        </div>

        <div className="roadmap-feature-card">
          <div className="feature-icon pink">
            <Compass size={20} />
          </div>
          <div>
            <strong>Build Skills</strong>
            <span>Learn step by step</span>
          </div>
        </div>

        <div className="roadmap-feature-card">
          <div className="feature-icon orange">
            <Briefcase size={20} />
          </div>
          <div>
            <strong>Get Career Ready</strong>
            <span>Prepare for real opportunities</span>
          </div>
        </div>
      </div>

      {/* ================= ROADMAP LIST ================= */}
      <section className="roadmap-catalog-section">
        <div className="catalog-header">
          <div>
            <span className="catalog-tag">EXPLORE</span>
            <h2>Popular Career Roadmaps</h2>
          </div>
          <span className="catalog-count">
            {filteredRoadmaps.length} roadmaps
          </span>
        </div>

        {loading ? (
          <div className="roadmap-loading-state">
            <RefreshCw className="spin" size={26} />
            <span>Loading career roadmaps...</span>
          </div>
        ) : error ? (
          <div className="roadmap-error-state">
            <p>{error}</p>
            <button type="button" onClick={() => window.location.reload()}>
              Retry
            </button>
          </div>
        ) : filteredRoadmaps.length === 0 ? (
          <div className="roadmap-empty-state">
            <p>No roadmaps match your search.</p>
          </div>
        ) : (
          <div className="roadmap-cards-grid">
            {filteredRoadmaps.map((mapItem) => {
              const title =
                mapItem.title ||
                mapItem.roadmapName ||
                mapItem.careerName ||
                "Career Roadmap";
              const desc =
                mapItem.description ||
                mapItem.shortDescription ||
                "Step-by-step roadmap to become a professional.";

              return (
                <article key={mapItem._id} className="roadmap-catalog-card">
                  <div className="roadmap-card-top">
                    <div className="roadmap-card-icon">
                      <Map size={20} />
                    </div>
                    <span className="roadmap-type-tag">Career Path</span>
                  </div>

                  <h3>{title}</h3>
                  <p>{desc}</p>

                  <div className="roadmap-card-meta">
                    <span>
                      Duration:{" "}
                      <strong>{mapItem.duration || "12-18 Months"}</strong>
                    </span>
                    <span>
                      Steps: <strong>{mapItem.steps?.length || 6} Steps</strong>
                    </span>
                  </div>

                  <button
                    type="button"
                    className="roadmap-action-btn"
                    onClick={() => navigate(`/roadmap/${mapItem._id}`)}
                  >
                    <span>View Roadmap</span>
                    <ArrowRight size={16} />
                  </button>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default Roadmap;
