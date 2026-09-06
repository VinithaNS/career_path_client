import { useEffect, useMemo, useState } from "react";

import { Brain, RefreshCw, Sparkles } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { getActiveAssessmentCategories } from "../../services/assessmentCategoryService";
import { getActiveAssessments } from "../../services/assessmentService";
import AssessmentCard from "../../components/cards/AssessmentCard";

import "./Assessments.css";

const Assessments = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [assessments, setAssessments] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const [catRes, assessRes] = await Promise.all([
          getActiveAssessmentCategories(),
          getActiveAssessments()
        ]);

        if (!isMounted) return;

        setCategories(catRes?.success ? catRes.data : []);

        if (assessRes?.success) {
          setAssessments(Array.isArray(assessRes.data) ? assessRes.data : []);
        } else {
          setError(assessRes?.message || "Unable to load assessments.");
        }
      } catch (err) {
        console.error("Assessments API Error:", err);
        if (!isMounted) return;
        setError(err?.response?.data?.message || "Unable to load assessments.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredAssessments = useMemo(() => {
    if (activeCategory === "All") return assessments;
    return assessments.filter((a) => a.category?._id === activeCategory);
  }, [assessments, activeCategory]);

  const handleStart = (id) => navigate(`/assessments/${id}`);

  if (loading) {
    return (
      <section className="assessments-page">
        <div className="assessments-loading">
          <RefreshCw className="spin" size={32} />
          <h2>Loading assessments...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="assessments-page">
      <div className="assessments-container">
        <div className="assessments-hero">
          <div className="assessments-hero-icon">
            <Brain size={32} />
          </div>
          <span className="assessments-eyebrow">KNOW YOURSELF</span>
          <h1>
            Discover your strengths with <span>Assessments</span>
          </h1>
          <p>
            Take skill and aptitude assessments to get personalized career and
            course recommendations.
          </p>
        </div>

        <div className="assessments-category-tabs">
          <button
            type="button"
            className={activeCategory === "All" ? "active" : ""}
            onClick={() => setActiveCategory("All")}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              type="button"
              key={cat._id}
              className={activeCategory === cat._id ? "active" : ""}
              onClick={() => setActiveCategory(cat._id)}
            >
              {cat.categoryName}
            </button>
          ))}
        </div>

        {error && (
          <div className="assessments-error">
            <Brain size={25} />
            <div>
              <h3>Unable to load assessments</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        <div className="assessments-section-heading">
          <div>
            <div className="assessments-section-label">
              <Sparkles size={16} />
              <span>AVAILABLE</span>
            </div>
            <h2>Choose an Assessment</h2>
          </div>
          <div className="assessments-count">
            {filteredAssessments.length}{" "}
            {filteredAssessments.length === 1 ? "Assessment" : "Assessments"}
          </div>
        </div>

        {filteredAssessments.length > 0 ? (
          <div className="assessments-grid">
            {filteredAssessments.map((assessment) => (
              <AssessmentCard
                key={assessment._id}
                assessment={assessment}
                onStart={handleStart}
              />
            ))}
          </div>
        ) : (
          <div className="assessments-empty">
            <h3>No assessments found</h3>
            <p>Try a different category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Assessments;
