import { useEffect, useMemo, useState } from "react";

import {
  School,
  Search,
  RefreshCw,
  SlidersHorizontal,
  Sparkles
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  getActiveColleges,
  searchColleges
} from "../../services/collegeService";
import CollegeCard from "../../components/cards/CollegeCard";

import "./Colleges.css";

const Colleges = () => {
  const navigate = useNavigate();

  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [activeState, setActiveState] = useState("All");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadColleges = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getActiveColleges();

        if (!isMounted) return;

        if (response?.success) {
          setColleges(Array.isArray(response.data) ? response.data : []);
        } else {
          setColleges([]);
          setError(response?.message || "Unable to load colleges.");
        }
      } catch (err) {
        console.error("Colleges API Error:", err);

        if (!isMounted) return;

        setColleges([]);
        setError(err?.response?.data?.message || "Unable to load colleges.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadColleges();

    return () => {
      isMounted = false;
    };
  }, []);

  const states = useMemo(() => {
    const stateNames = colleges.map((c) => c.state).filter(Boolean);
    return ["All", ...new Set(stateNames)];
  }, [colleges]);

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      try {
        const response = await getActiveColleges();
        if (response?.success) {
          setColleges(Array.isArray(response.data) ? response.data : []);
        }
      } catch (err) {
        console.error(err);
      }
      return;
    }

    try {
      setSearching(true);
      const response = await searchColleges(value);
      if (response?.success) {
        setColleges(Array.isArray(response.data) ? response.data : []);
      }
    } catch (err) {
      console.error("College Search Error:", err);
    } finally {
      setSearching(false);
    }
  };

  const filteredColleges = useMemo(() => {
    if (activeState === "All") return colleges;
    return colleges.filter((c) => c.state === activeState);
  }, [colleges, activeState]);

  const handleViewDetails = (id) => navigate(`/colleges/${id}`);

  if (loading) {
    return (
      <section className="colleges-page">
        <div className="colleges-loading">
          <div className="colleges-loading-icon">
            <RefreshCw className="spin" size={32} />
          </div>
          <h2>Loading colleges...</h2>
          <p>Please wait while we fetch the latest college information.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="colleges-page">
      <div className="colleges-container">
        <div className="colleges-hero">
          <div className="colleges-hero-content">
            <div className="colleges-hero-icon">
              <School size={32} />
            </div>
            <span className="colleges-eyebrow">COLLEGES & UNIVERSITIES</span>
            <h1>
              Find the right college for your
              <span> journey</span>
            </h1>
            <p>
              Compare courses, fees, ratings and admissions across top colleges.
            </p>
          </div>

          <div className="colleges-hero-decoration">
            <div className="colleges-circle circle-one" />
            <div className="colleges-circle circle-two" />
            <School size={110} />
          </div>
        </div>

        <div className="colleges-search-section">
          <div className="colleges-search-box">
            <Search size={21} />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search colleges, cities or affiliations..."
            />
            {searching && (
              <RefreshCw size={19} className="search-spinner spin" />
            )}
          </div>

          <div className="colleges-filter-label">
            <SlidersHorizontal size={17} />
            <span>Filter by state</span>
          </div>
        </div>

        <div className="colleges-state-tabs">
          {states.map((state) => (
            <button
              type="button"
              key={state}
              className={activeState === state ? "active" : ""}
              onClick={() => setActiveState(state)}
            >
              {state}
            </button>
          ))}
        </div>

        {error && (
          <div className="colleges-error">
            <School size={25} />
            <div>
              <h3>Unable to load colleges</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        <section className="colleges-all-section">
          <div className="colleges-section-heading">
            <div>
              <div className="colleges-section-label">
                <Sparkles size={16} />
                <span>ALL COLLEGES</span>
              </div>
              <h2>Explore Colleges</h2>
              <p>Browse and compare colleges that match your goals.</p>
            </div>

            <div className="colleges-count">
              {filteredColleges.length}{" "}
              {filteredColleges.length === 1 ? "College" : "Colleges"}
            </div>
          </div>

          {filteredColleges.length > 0 ? (
            <div className="colleges-grid">
              {filteredColleges.map((college) => (
                <CollegeCard
                  key={college._id}
                  college={college}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="colleges-empty">
              <div className="colleges-empty-icon">
                <Search size={28} />
              </div>
              <h3>No colleges found</h3>
              <p>Try a different search term or state filter.</p>
            </div>
          )}
        </section>
      </div>
    </section>
  );
};

export default Colleges;
