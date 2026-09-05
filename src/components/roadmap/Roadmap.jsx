import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Map,
  Search,
  Target,
  Code2,
  Briefcase,
  Sparkles,
  ArrowRight,
  BookOpen
} from "lucide-react";

import { getCareerRoadmaps } from "../../services/roadmapService";

import "./Roadmap.css";
import RoadmapCard from "./RoadmapCard";

const Roadmap = () => {
  const navigate = useNavigate();

  const [roadmaps, setRoadmaps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     LOAD ROADMAPS
  ===================================================== */

  useEffect(() => {
    let cancelled = false;

    const fetchRoadmaps = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getCareerRoadmaps();

        console.log("Roadmap API Response:", response);

        const data = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : [];

        if (!cancelled) {
          setRoadmaps(data);
          setError("");
          setLoading(false);
        }
      } catch (err) {
        console.error("Roadmap API Error:", err);

        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to load career roadmaps"
          );

          setLoading(false);
        }
      }
    };

    fetchRoadmaps();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =====================================================
     RETRY
  ===================================================== */

  const loadRoadmaps = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCareerRoadmaps();

      console.log("Retry Roadmap API Response:", response);

      const data = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];

      setRoadmaps(data);
    } catch (err) {
      console.error("Roadmap API Error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load career roadmaps"
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     CATEGORIES
  ===================================================== */

  const categories = useMemo(() => {
    const values = roadmaps
      .map(
        (item) =>
          item.category ||
          item.categoryName ||
          item.careerCategory ||
          item.career?.category ||
          item.career?.categoryName
      )
      .filter(Boolean);

    return ["All", ...new Set(values)];
  }, [roadmaps]);

  /* =====================================================
     FILTER
  ===================================================== */

  const filteredRoadmaps = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return roadmaps.filter((roadmap) => {
      const category =
        roadmap.category ||
        roadmap.categoryName ||
        roadmap.careerCategory ||
        roadmap.career?.category ||
        roadmap.career?.categoryName ||
        "";

      const title =
        roadmap.title ||
        roadmap.roadmapName ||
        roadmap.name ||
        roadmap.careerName ||
        roadmap.career?.careerName ||
        "";

      const description =
        roadmap.description ||
        roadmap.shortDescription ||
        roadmap.career?.shortDescription ||
        "";

      const matchesCategory =
        selectedCategory === "All" || category === selectedCategory;

      const matchesSearch =
        !search ||
        title.toLowerCase().includes(search) ||
        description.toLowerCase().includes(search) ||
        category.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [roadmaps, searchTerm, selectedCategory]);

  /* =====================================================
     NAVIGATION
  ===================================================== */

  const handleViewDetails = (id) => {
    console.log("Selected Roadmap:", id);

    navigate(`/roadmap/${id}`);
  };

  /* =====================================================
     CLEAR SEARCH
  ===================================================== */

  const handleClearSearch = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main className="roadmap-page">
      {/* =================================================
          HERO
      ================================================= */}

      <section className="roadmap-hero">
        <div className="roadmap-hero-glow glow-one"></div>
        <div className="roadmap-hero-glow glow-two"></div>

        <div className="roadmap-hero-content">
          <div className="roadmap-hero-icon">
            <Map size={30} strokeWidth={1.8} />
          </div>

          <span className="roadmap-label">CAREER ROADMAPS</span>

          <h1>
            Build Your Career
            <br />
            <span>Step by Step</span>
          </h1>

          <p>
            Follow a clear career path, develop the right skills, and understand
            what it takes to reach your goals.
          </p>

          <div className="roadmap-search">
            <Search size={21} />

            <input
              type="text"
              placeholder="Search career roadmaps..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSelectedCategory("All");
              }}
            />

            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="roadmap-search-clear"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =================================================
          QUICK FEATURES
      ================================================= */}

      <section className="roadmap-features-wrapper">
        <div className="roadmap-features">
          <div className="roadmap-feature">
            <div className="feature-icon blue">
              <Target size={21} />
            </div>

            <div>
              <strong>Clear Goals</strong>
              <span>Know what to learn</span>
            </div>
          </div>

          <div className="feature-divider"></div>

          <div className="roadmap-feature">
            <div className="feature-icon purple">
              <Code2 size={21} />
            </div>

            <div>
              <strong>Build Skills</strong>
              <span>Learn step by step</span>
            </div>
          </div>

          <div className="feature-divider"></div>

          <div className="roadmap-feature">
            <div className="feature-icon green">
              <Briefcase size={21} />
            </div>

            <div>
              <strong>Get Career Ready</strong>
              <span>Prepare for opportunities</span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="roadmap-content">
        {/* FILTER */}

        <div className="roadmap-filter-row">
          <div className="roadmap-categories">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={
                  selectedCategory === category
                    ? "roadmap-category active"
                    : "roadmap-category"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="roadmap-total">
            <strong>{filteredRoadmaps.length}</strong>

            <span>
              {filteredRoadmaps.length === 1 ? " roadmap" : " roadmaps"}
            </span>
          </div>
        </div>

        {/* SECTION TITLE */}

        <div className="roadmap-section-header">
          <div>
            <div className="section-eyebrow">
              <Sparkles size={14} />
              <span>EXPLORE</span>
            </div>

            <h2>{searchTerm ? "Search Results" : "Popular Career Roadmaps"}</h2>

            <p>Choose a roadmap and start building your future.</p>
          </div>
        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div className="roadmap-grid">
            {[1, 2, 3].map((item) => (
              <div className="roadmap-skeleton" key={item}>
                <div className="skeleton-icon"></div>

                <div className="skeleton-line large"></div>

                <div className="skeleton-line"></div>

                <div className="skeleton-line short"></div>

                <div className="skeleton-footer"></div>
              </div>
            ))}
          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {!loading && error && (
          <div className="roadmap-status error">
            <div className="status-icon">
              <Map size={30} />
            </div>

            <h3>Unable to load roadmaps</h3>

            <p>{error}</p>

            <button
              type="button"
              className="roadmap-retry-button"
              onClick={loadRoadmaps}
            >
              Try Again
              <ArrowRight size={17} />
            </button>
          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading && !error && filteredRoadmaps.length === 0 && (
          <div className="roadmap-status">
            <div className="status-icon">
              <Search size={28} />
            </div>

            <h3>No roadmaps found</h3>

            <p>Try another career name or choose a different category.</p>

            <button
              type="button"
              className="roadmap-reset-button"
              onClick={handleClearSearch}
            >
              View All Roadmaps
            </button>
          </div>
        )}

        {/* =================================================
            ROADMAP CARDS
        ================================================= */}

        {!loading && !error && filteredRoadmaps.length > 0 && (
          <div className="roadmap-grid">
            {filteredRoadmaps.map((roadmap) => (
              <RoadmapCard
                key={roadmap._id}
                roadmap={roadmap}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </section>

      {/* =================================================
          BOTTOM CTA
      ================================================= */}

      {!loading && !error && roadmaps.length > 0 && (
        <section className="roadmap-bottom-cta">
          <div className="roadmap-bottom-icon">
            <BookOpen size={25} />
          </div>

          <div className="roadmap-bottom-content">
            <span>PLAN YOUR FUTURE</span>

            <h2>Not sure which career path is right for you?</h2>

            <p>
              Explore careers, understand required skills, and create a clear
              plan for your future.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/careers")}
            className="roadmap-cta-button"
          >
            Explore Careers
            <ArrowRight size={18} />
          </button>
        </section>
      )}
    </main>
  );
};

export default Roadmap;
