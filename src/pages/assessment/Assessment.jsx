// src/pages/assessments/Assessments.jsx

import { useEffect, useMemo, useState } from "react";

import {
  ArrowRight,
  Brain,
  CheckCircle2,
  RefreshCw,
  Sparkles
} from "lucide-react";

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

    const loadAssessments = async () => {
      try {
        setLoading(true);
        setError("");

        const [categoryResponse, assessmentResponse] = await Promise.all([
          getActiveAssessmentCategories(),
          getActiveAssessments()
        ]);

        if (!isMounted) {
          return;
        }

        if (categoryResponse?.success) {
          setCategories(
            Array.isArray(categoryResponse.data) ? categoryResponse.data : []
          );
        } else {
          setCategories([]);
        }

        if (assessmentResponse?.success) {
          setAssessments(
            Array.isArray(assessmentResponse.data)
              ? assessmentResponse.data
              : []
          );
        } else {
          setAssessments([]);
          setError(
            assessmentResponse?.message ||
              "Unable to load assessments right now."
          );
        }
      } catch (err) {
        console.error("Assessments API Error:", err);

        if (!isMounted) {
          return;
        }

        setError(
          err?.response?.data?.message ||
            "Unable to load assessments right now."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadAssessments();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredAssessments = useMemo(() => {
    if (activeCategory === "All") {
      return assessments;
    }

    return assessments.filter(
      (assessment) => assessment.category?._id === activeCategory
    );
  }, [assessments, activeCategory]);

  const handleStart = (assessmentId) => {
    navigate(`/assessments/${assessmentId}`);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <section className="assessments-page">
        <div className="assessments-loading">
          <div className="assessments-loading-icon">
            <RefreshCw className="spin" size={30} />
          </div>

          <h2>Loading assessments...</h2>

          <p>Preparing assessments to help you discover your strengths.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="assessments-page">
      <div className="assessments-container">
        <div className="assessments-hero">
          <div className="assessments-hero-content">
            <div className="assessments-hero-icon">
              <Brain size={31} strokeWidth={2.2} />
            </div>

            <span className="assessments-eyebrow">KNOW YOURSELF</span>

            <h1>
              Discover your strengths with <span>Assessments</span>
            </h1>

            <p>
              Take skill and aptitude assessments to understand your strengths,
              discover suitable careers, and get personalized recommendations.
            </p>

            <div className="assessments-hero-actions">
              <button
                type="button"
                className="assessments-primary-button"
                onClick={() =>
                  document
                    .getElementById("available-assessments")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start"
                    })
                }
              >
                Explore Assessments
                <ArrowRight size={17} />
              </button>

              <div className="assessments-hero-note">
                <CheckCircle2 size={17} />
                <span>Find the right path for you</span>
              </div>
            </div>
          </div>

          <div className="assessments-hero-decoration">
            <div className="assessment-decoration-circle circle-one" />
            <div className="assessment-decoration-circle circle-two" />
            <div className="assessment-decoration-circle circle-three" />

            <div className="assessment-floating-card floating-card-one">
              <Sparkles size={19} />
              <div>
                <strong>Discover</strong>
                <span>Your strengths</span>
              </div>
            </div>

            <div className="assessment-floating-card floating-card-two">
              <Brain size={19} />
              <div>
                <strong>Personalized</strong>
                <span>Career insights</span>
              </div>
            </div>

            <div className="assessment-hero-brain">
              <Brain size={82} strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="assessments-category-wrapper">
          <div className="assessments-category-heading">
            <div>
              <span>EXPLORE</span>
              <h2>Assessment Categories</h2>
            </div>

            <p>
              Choose a category and find an assessment that matches your goals.
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

            {categories.map((category) => (
              <button
                type="button"
                key={category._id}
                className={activeCategory === category._id ? "active" : ""}
                onClick={() => setActiveCategory(category._id)}
              >
                {category.categoryName}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="assessments-error">
            <div className="assessments-error-icon">
              <Brain size={24} />
            </div>

            <div className="assessments-error-content">
              <h3>Unable to load assessments</h3>
              <p>{error}</p>
            </div>

            <button
              type="button"
              className="assessments-retry-button"
              onClick={handleRetry}
            >
              <RefreshCw size={15} />
              Retry
            </button>
          </div>
        )}

        <div className="assessments-section-heading" id="available-assessments">
          <div>
            <div className="assessments-section-label">
              <Sparkles size={15} />
              <span>AVAILABLE</span>
            </div>

            <h2>Choose an Assessment</h2>

            <p>
              Complete an assessment and get insights tailored to your interests
              and strengths.
            </p>
          </div>

          <div className="assessments-count">
            <strong>{filteredAssessments.length}</strong>
            <span>
              {filteredAssessments.length === 1 ? "Assessment" : "Assessments"}
            </span>
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
            <div className="assessments-empty-icon">
              <Brain size={30} />
            </div>

            <h3>No assessments found</h3>

            <p>
              There are no assessments available in this category. Try selecting
              another category.
            </p>

            {activeCategory !== "All" && (
              <button type="button" onClick={() => setActiveCategory("All")}>
                View All Assessments
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Assessments;
