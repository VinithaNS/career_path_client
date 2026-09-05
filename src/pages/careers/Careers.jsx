import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Search,
  ArrowRight,
  RefreshCw,
  Briefcase,
  SlidersHorizontal,
  X,
  Compass
} from "lucide-react";

import { getAllCareers, searchCareers } from "../../services/careerService";

import "./careers.css";

/* =====================================================
   SALARY FORMATTING
   Values from the API are annual rupee amounts
   (e.g. 400000) — display them in lakhs per annum.
===================================================== */

const formatLPA = (value) => {
  if (!value || value <= 0) return null;

  const lakhs = value / 100000;
  const rounded = Math.round(lakhs * 10) / 10;

  return Number.isInteger(rounded) ? `${rounded}` : rounded.toFixed(1);
};

const Careers = () => {
  const navigate = useNavigate();

  const [careers, setCareers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  /* =====================================================
     LOAD ALL CAREERS
  ===================================================== */

  useEffect(() => {
    let isMounted = true;

    const loadCareers = async () => {
      try {
        const response = await getAllCareers();

        console.log("Careers API Response:", response);

        if (!isMounted) return;

        if (response?.success) {
          setCareers(response?.data || []);
          setError("");
        } else {
          setCareers([]);
          setError(response?.message || "Failed to load careers.");
        }
      } catch (err) {
        console.error("Careers API Error:", err);

        if (!isMounted) return;

        setCareers([]);

        setError(
          err?.response?.data?.message || "Unable to connect to the server."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCareers();

    return () => {
      isMounted = false;
    };
  }, []);

  /* =====================================================
     REFRESH CAREERS
  ===================================================== */

  const fetchCareers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllCareers();

      console.log("Careers API Response:", response);

      if (response?.success) {
        setCareers(response?.data || []);
      } else {
        setCareers([]);
        setError(response?.message || "Failed to load careers.");
      }
    } catch (err) {
      console.error("Careers API Error:", err);

      setCareers([]);

      setError(
        err?.response?.data?.message || "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearch = async (e) => {
    e.preventDefault();

    const keyword = search.trim();

    if (!keyword) {
      await fetchCareers();
      return;
    }

    try {
      setSearchLoading(true);
      setError("");

      const response = await searchCareers(keyword);

      console.log("Career Search Response:", response);

      if (response?.success) {
        setCareers(response?.data || []);
      } else {
        setCareers([]);
        setError(response?.message || "No careers found.");
      }
    } catch (err) {
      console.error("Career Search Error:", err);

      setCareers([]);

      setError(err?.response?.data?.message || "Career search failed.");
    } finally {
      setSearchLoading(false);
    }
  };

  /* =====================================================
     CLEAR SEARCH
  ===================================================== */

  const clearSearch = async () => {
    setSearch("");

    try {
      setLoading(true);
      setError("");

      const response = await getAllCareers();

      if (response?.success) {
        setCareers(response?.data || []);
      } else {
        setCareers([]);
        setError(response?.message || "Failed to load careers.");
      }
    } catch (err) {
      console.error("Clear Search Error:", err);

      setCareers([]);

      setError(err?.response?.data?.message || "Unable to load careers.");
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     VIEW DETAILS
  ===================================================== */

  const handleViewDetails = (careerId) => {
    if (!careerId) {
      console.error("Career ID is missing.");
      return;
    }

    navigate(`/careers/${careerId}`);
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <section className="careers-page">
        <div className="careers-loading">
          <div className="loading-spinner"></div>

          <h3>Loading careers</h3>

          <p>Please wait while we load available career opportunities.</p>
        </div>
      </section>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error && careers.length === 0) {
    return (
      <section className="careers-page">
        <div className="careers-error">
          <div className="error-icon">
            <Briefcase size={26} />
          </div>

          <h3>Unable to load careers</h3>

          <p>{error}</p>

          <button type="button" className="retry-btn" onClick={fetchCareers}>
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      </section>
    );
  }

  /* =====================================================
     MAIN PAGE
  ===================================================== */

  return (
    <section className="careers-page">
      {/* =================================================
          HERO
      ================================================= */}

      <div className="careers-hero">
        <div className="careers-hero-inner">
          <div className="careers-hero-content">
            <span className="careers-eyebrow">
              <Compass size={16} />
              Explore your future
            </span>

            <h1>
              Discover the right <em>career for you</em>
            </h1>

            <p>
              Explore career opportunities, understand the skills you need,
              discover education paths and find the right direction for your
              future.
            </p>
          </div>

          <div className="careers-hero-graphic" aria-hidden="true">
            <svg
              viewBox="0 0 260 260"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 220C90 220 60 150 110 140C160 130 130 60 200 40"
                stroke="var(--cp-hairline-strong)"
                strokeWidth="2"
                strokeDasharray="1 10"
                strokeLinecap="round"
              />
              <circle
                cx="30"
                cy="220"
                r="7"
                fill="var(--cp-paper)"
                stroke="var(--cp-teal)"
                strokeWidth="2.5"
              />
              <circle
                cx="110"
                cy="140"
                r="7"
                fill="var(--cp-paper)"
                stroke="var(--cp-amber)"
                strokeWidth="2.5"
              />
              <circle cx="200" cy="40" r="10" fill="var(--cp-amber)" />
              <path
                d="M195 40h10M200 35v10"
                stroke="var(--cp-paper-raised)"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div className="careers-container">
        {/* =================================================
            SEARCH
        ================================================= */}

        <form className="career-search-section" onSubmit={handleSearch}>
          <div className="career-search">
            <Search size={20} />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search careers by name, code or keyword..."
              aria-label="Search careers"
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}

            <button
              type="submit"
              className="search-btn"
              disabled={searchLoading}
            >
              {searchLoading ? (
                <>
                  <RefreshCw size={16} className="button-spinner" />
                  Searching...
                </>
              ) : (
                <>
                  <Search size={16} />
                  Search
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            className="filter-btn"
            onClick={() => {
              setSearch("");
              fetchCareers();
            }}
          >
            <SlidersHorizontal size={17} />
            Reset
          </button>
        </form>

        {/* =================================================
            SEARCH MESSAGE
        ================================================= */}

        {search.trim() && !searchLoading && (
          <div className="search-message">
            <span>
              Showing results for <strong>"{search.trim()}"</strong>
            </span>
          </div>
        )}

        {/* =================================================
            CAREERS HEADER
        ================================================= */}

        <div className="careers-header">
          <div>
            <h2>All careers</h2>

            <p>
              {careers.length === 1
                ? "Showing 1 career"
                : `Showing ${careers.length} careers`}
            </p>
          </div>

          <div className="career-count">
            <strong>{careers.length}</strong>
            <span>{careers.length === 1 ? "career" : "careers"}</span>
          </div>
        </div>

        {/* =================================================
            CAREER GRID
        ================================================= */}

        {careers.length > 0 ? (
          <div className="career-grid">
            {careers.map((career) => {
              const salaryMin = formatLPA(career?.salaryRange?.min);
              const salaryMax = formatLPA(career?.salaryRange?.max);

              const hasSalary = salaryMin || salaryMax;

              return (
                <article className="career-card" key={career._id}>
                  {/* Top row */}

                  <div className="career-card-top">
                    <div className="career-card-icon">
                      <Briefcase size={20} />
                    </div>

                    <span className="career-code">
                      {career.careerCode || "CAREER"}
                    </span>
                  </div>

                  {/* Career Name */}

                  <h3>{career.careerName || "Career Name"}</h3>

                  {/* Description */}

                  <p className="career-description">
                    {career.shortDescription ||
                      career.description ||
                      "Explore this career opportunity and discover the skills, education and career path required."}
                  </p>

                  {/* Meta: demand + salary */}

                  <div className="career-meta">
                    <div className="career-demand high-demand">
                      <span className="demand-dot"></span>
                      High demand
                    </div>

                    <div className="career-salary">
                      {hasSalary ? (
                        <>
                          ₹{salaryMin || salaryMax}
                          {salaryMin && salaryMax && (
                            <span className="salary-separator">–</span>
                          )}
                          {salaryMin && salaryMax && `₹${salaryMax}`}
                          <span className="salary-unit">LPA</span>
                        </>
                      ) : (
                        career.averageSalary || "Salary information unavailable"
                      )}
                    </div>
                  </div>

                  {/* Button */}

                  <button
                    type="button"
                    className="career-details-btn"
                    onClick={() => handleViewDetails(career._id)}
                  >
                    View details
                    <ArrowRight size={16} />
                  </button>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-careers">
            <div className="empty-icon">
              <Briefcase size={26} />
            </div>

            <h3>No careers found</h3>

            <p>We couldn't find any careers matching your search.</p>

            <button type="button" className="retry-btn" onClick={clearSearch}>
              View all careers
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Careers;
