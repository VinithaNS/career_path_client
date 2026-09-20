import { useEffect, useState, useMemo } from "react";

import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  Briefcase,
  TrendingUp,
  RefreshCw,
  Compass
} from "lucide-react";

import { getAllCareers } from "../../services/careerService";
import PageHeader from "../../components/common/PageHeader";

import "./careers.css";

const Careers = () => {
  const navigate = useNavigate();
  const [careers, setCareers] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchCareers = async () => {
      try {
        setLoading(true);
        const res = await getAllCareers();
        if (isMounted) {
          const list = Array.isArray(res?.data)
            ? res.data
            : Array.isArray(res)
              ? res
              : [];
          setCareers(list);
        }
      } catch (err) {
        if (isMounted) setError(err.message || "Unable to fetch careers.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchCareers();
    return () => {
      isMounted = false;
    };
  }, []);

  const tags = useMemo(() => {
    const set = new Set();
    careers.forEach((c) => {
      if (c.industry) set.add(c.industry);
    });
    return ["All", ...Array.from(set)];
  }, [careers]);

  const filtered = useMemo(() => {
    if (selectedTag === "All") return careers;
    return careers.filter((c) => c.industry === selectedTag);
  }, [careers, selectedTag]);

  return (
    <div className="catalog-layout-container">
      <PageHeader
        badge="EXPLORE YOUR PASSION"
        title="Discover the Right"
        highlightTitle="Career for You"
        description="Browse career paths, estimated salary projections, and industry requirements to find your ideal direction."
        breadcrumbs={[{ label: "Careers" }]}
      />

      {/* Modern Filter Pills */}
      <div className="catalog-filter-bar">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`catalog-filter-pill ${selectedTag === tag ? "active" : ""}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="catalog-status-box">
          <RefreshCw size={24} className="spin" />
          <span>Loading Career Opportunities...</span>
        </div>
      ) : error ? (
        <div className="catalog-status-box error">{error}</div>
      ) : (
        <div className="careers-responsive-grid">
          {filtered.map((career) => (
            <div key={career._id} className="career-modern-card">
              <div className="career-card-header">
                <div className="career-icon-box">
                  <Briefcase size={20} />
                </div>
                <span className="career-code-chip">
                  {career.careerCode || "CAREER"}
                </span>
              </div>

              <h3>{career.careerName}</h3>
              <p>{career.description}</p>

              <div className="career-meta-box">
                <div className="meta-salary">
                  <TrendingUp size={15} />
                  <span>
                    {career.averageSalary ||
                      career.salaryRange ||
                      "₹4 - 12 LPA"}
                  </span>
                </div>
                {career.demandLevel && (
                  <span
                    className={`demand-tag ${career.demandLevel.toLowerCase()}`}
                  >
                    {career.demandLevel} Demand
                  </span>
                )}
              </div>

              <button
                type="button"
                className="career-card-btn"
                onClick={() => navigate(`/careers/${career._id}`)}
              >
                <span>View Details</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Careers;
