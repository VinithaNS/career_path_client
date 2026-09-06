import { useEffect, useMemo, useState } from "react";

import { ClipboardList, Search, RefreshCw, Sparkles } from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  getActiveGovernmentExams,
  searchGovernmentExams
} from "../../services/governmentExamService";
import ExamCard from "../../components/cards/ExamCard";

import "./Exams.css";

const Exams = () => {
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getActiveGovernmentExams();

        if (!isMounted) return;

        if (response?.success) {
          setExams(Array.isArray(response.data) ? response.data : []);
        } else {
          setError(response?.message || "Unable to load exams.");
        }
      } catch (err) {
        console.error("Exams API Error:", err);
        if (!isMounted) return;
        setError(err?.response?.data?.message || "Unable to load exams.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const examTypes = useMemo(() => {
    const types = exams.map((e) => e.examType).filter(Boolean);
    return ["All", ...new Set(types)];
  }, [exams]);

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      try {
        const response = await getActiveGovernmentExams();
        if (response?.success) setExams(response.data || []);
      } catch (err) {
        console.error(err);
      }
      return;
    }

    try {
      setSearching(true);
      const response = await searchGovernmentExams(value);
      if (response?.success) setExams(response.data || []);
    } catch (err) {
      console.error("Exam Search Error:", err);
    } finally {
      setSearching(false);
    }
  };

  const filteredExams = useMemo(() => {
    if (activeType === "All") return exams;
    return exams.filter((e) => e.examType === activeType);
  }, [exams, activeType]);

  const handleViewDetails = (id) => navigate(`/exams/${id}`);

  if (loading) {
    return (
      <section className="exams-page">
        <div className="exams-loading">
          <RefreshCw className="spin" size={32} />
          <h2>Loading exams...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="exams-page">
      <div className="exams-container">
        <div className="exams-hero">
          <div className="exams-hero-icon">
            <ClipboardList size={32} />
          </div>
          <span className="exams-eyebrow">PREPARE BETTER</span>
          <h1>
            Government exams, <span>simplified</span>
          </h1>
          <p>
            Explore eligibility criteria, syllabus and exam patterns for top
            government exams.
          </p>
        </div>

        <div className="exams-search-section">
          <div className="exams-search-box">
            <Search size={21} />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search exams, codes or authorities..."
            />
            {searching && (
              <RefreshCw size={19} className="search-spinner spin" />
            )}
          </div>
        </div>

        <div className="exams-type-tabs">
          {examTypes.map((type) => (
            <button
              type="button"
              key={type}
              className={activeType === type ? "active" : ""}
              onClick={() => setActiveType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {error && (
          <div className="exams-error">
            <ClipboardList size={25} />
            <div>
              <h3>Unable to load exams</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="exams-section-heading">
          <div>
            <div className="exams-section-label">
              <Sparkles size={16} />
              <span>ALL EXAMS</span>
            </div>
            <h2>Explore Exams</h2>
          </div>
          <div className="exams-count">
            {filteredExams.length}{" "}
            {filteredExams.length === 1 ? "Exam" : "Exams"}
          </div>
        </div>

        {filteredExams.length > 0 ? (
          <div className="exams-grid">
            {filteredExams.map((exam) => (
              <ExamCard
                key={exam._id}
                exam={exam}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="exams-empty">
            <h3>No exams found</h3>
            <p>Try a different search term or category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Exams;
