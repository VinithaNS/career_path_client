// src/pages/ai/AIRecommendation.jsx

import { useCallback, useEffect, useState } from "react";

import {
  Sparkles,
  Target,
  BookOpen,
  TrendingUp,
  Award,
  Brain,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  Lightbulb,
  GraduationCap
} from "lucide-react";

import {
  getLatestRecommendation,
  getStudentRecommendations,
  createRecommendation
} from "../../services/aiRecommendationService";

import "./AIRecommendation.css";

const AIRecommendation = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const getStudentId = () => {
    return localStorage.getItem("studentId") || localStorage.getItem("userId");
  };

  const fetchRecommendation = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const studentId = getStudentId();

      if (!studentId) {
        setError("Student information not found.");
        return;
      }

      const response = await getLatestRecommendation(studentId);

      if (response.success) {
        setRecommendation(response.data || null);
      } else {
        setRecommendation(null);
        setError(response.message || "No recommendation found.");
      }

      const historyResponse = await getStudentRecommendations(studentId);

      if (historyResponse.success) {
        setRecommendations(historyResponse.data || []);
      }
    } catch (err) {
      console.error("AI Recommendation Error:", err);

      setError(
        err?.response?.data?.message || "Unable to load AI recommendations."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGenerateRecommendation = async () => {
    try {
      setGenerating(true);
      setError("");

      const studentId = getStudentId();

      if (!studentId) {
        setError("Student information not found.");
        return;
      }

      const assessmentResultId = localStorage.getItem("assessmentResultId");

      if (!assessmentResultId) {
        setError(
          "Please complete your career assessment before generating a recommendation."
        );
        return;
      }

      const response = await createRecommendation({
        studentId,
        assessmentResultId
      });

      if (response.success) {
        setRecommendation(response.data);

        const historyResponse = await getStudentRecommendations(studentId);

        if (historyResponse.success) {
          setRecommendations(historyResponse.data || []);
        }
      } else {
        setError(response.message || "Unable to generate recommendation.");
      }
    } catch (err) {
      console.error("Generate Recommendation Error:", err);

      setError(
        err?.response?.data?.message ||
          "Something went wrong while generating your recommendation."
      );
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    // The API request synchronizes server data when this page mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRecommendation();
  }, [fetchRecommendation]);

  if (loading) {
    return (
      <div className="ai-recommendation-page">
        <div className="ai-recommendation-loading">
          <div className="recommendation-loader">
            <Sparkles size={30} />
          </div>

          <h3>Preparing your recommendations...</h3>

          <p>We're reviewing your assessment results and career preferences.</p>
        </div>
      </div>
    );
  }

  if (!recommendation && !error) {
    return (
      <div className="ai-recommendation-page">
        <div className="recommendation-empty-card">
          <div className="empty-icon">
            <Brain size={42} />
          </div>

          <h2>Discover Your Career Path</h2>

          <p>
            Complete your career assessment to receive personalized career
            recommendations based on your strengths, interests, and skills.
          </p>

          <button
            type="button"
            className="primary-recommendation-btn"
            onClick={handleGenerateRecommendation}
            disabled={generating}
          >
            {generating ? (
              <>
                <RefreshCw className="spin" size={18} />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Recommendation
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  const recommendedCareers = recommendation?.recommendedCareers || [];
  const strengths = recommendation?.studentStrengths || [];
  const recommendedSkills = recommendation?.recommendedSkills || [];
  const learningPath = recommendation?.suggestedLearningPath || [];

  return (
    <div className="ai-recommendation-page">
      <section className="recommendation-header">
        <div className="recommendation-header-content">
          <div className="recommendation-title-area">
            <div className="recommendation-icon">
              <Sparkles size={25} />
            </div>

            <div>
              <span className="recommendation-label">CAREER GUIDANCE</span>

              <h1>AI Career Recommendation</h1>

              <p>
                Personalized career guidance based on your assessment results,
                strengths, and skills.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="refresh-recommendation-btn"
            onClick={handleGenerateRecommendation}
            disabled={generating}
          >
            <RefreshCw size={17} className={generating ? "spin" : ""} />
            {generating ? "Generating..." : "Refresh Recommendation"}
          </button>
        </div>
      </section>

      {error && (
        <div className="recommendation-error">
          <AlertCircle size={20} />

          <span>{error}</span>

          <button type="button" onClick={fetchRecommendation}>
            Try Again
          </button>
        </div>
      )}

      <section className="recommendation-stats">
        <div className="recommendation-stat-card">
          <div className="stat-card-icon career-icon">
            <Target size={23} />
          </div>

          <div>
            <span>Career Matches</span>
            <strong>{recommendedCareers.length}</strong>
          </div>
        </div>

        <div className="recommendation-stat-card">
          <div className="stat-card-icon strength-icon">
            <Award size={23} />
          </div>

          <div>
            <span>Your Strengths</span>
            <strong>{strengths.length}</strong>
          </div>
        </div>

        <div className="recommendation-stat-card">
          <div className="stat-card-icon skill-icon">
            <Brain size={23} />
          </div>

          <div>
            <span>Skills to Develop</span>
            <strong>{recommendedSkills.length}</strong>
          </div>
        </div>

        <div className="recommendation-stat-card">
          <div className="stat-card-icon learning-icon">
            <BookOpen size={23} />
          </div>

          <div>
            <span>Learning Steps</span>
            <strong>{learningPath.length}</strong>
          </div>
        </div>
      </section>

      {recommendation?.overallRecommendation && (
        <section className="overall-recommendation-card">
          <div className="overall-icon">
            <Lightbulb size={25} />
          </div>

          <div className="overall-content">
            <span>AI INSIGHT</span>

            <h2>Your Career Direction</h2>

            <p>{recommendation.overallRecommendation}</p>
          </div>
        </section>
      )}

      <div className="recommendation-main-grid">
        <section className="career-matches-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">PERSONALIZED FOR YOU</span>

              <h2>Recommended Careers</h2>

              <p>Career paths that align with your profile.</p>
            </div>

            <Target size={24} />
          </div>

          <div className="career-list">
            {recommendedCareers.length > 0 ? (
              recommendedCareers.map((career, index) => {
                const percentage = career.matchPercentage || 0;

                return (
                  <div className="career-match-card" key={career._id || index}>
                    <div className="career-card-top">
                      <div className="career-number">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="career-info">
                        <h3>
                          {career.career?.careerName ||
                            career.career?.name ||
                            career.careerName ||
                            "Career Path"}
                        </h3>

                        <p>
                          {career.reason ||
                            "This career aligns with your profile."}
                        </p>
                      </div>

                      <div className="match-percentage">
                        <strong>{percentage}%</strong>
                        <span>Match</span>
                      </div>
                    </div>

                    <div className="match-progress-container">
                      <div className="match-progress-bar">
                        <div
                          className="match-progress-fill"
                          style={{
                            width: `${percentage}%`
                          }}
                        />
                      </div>
                    </div>

                    <div className="career-card-details">
                      {career.strengths?.length > 0 && (
                        <div className="career-detail-column">
                          <h4>
                            <CheckCircle2 size={16} />
                            Your Strengths
                          </h4>

                          <div className="career-chip-list">
                            {career.strengths.map((strength, strengthIndex) => (
                              <span
                                className="career-chip strength-chip"
                                key={strengthIndex}
                              >
                                {strength}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {career.skillsToDevelop?.length > 0 && (
                        <div className="career-detail-column">
                          <h4>
                            <TrendingUp size={16} />
                            Skills to Develop
                          </h4>

                          <div className="career-chip-list">
                            {career.skillsToDevelop.map((skill, skillIndex) => (
                              <span
                                className="career-chip skill-chip"
                                key={skillIndex}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <button type="button" className="career-explore-btn">
                      Explore Career
                      <ArrowRight size={17} />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="no-careers">
                <Target size={35} />

                <h3>No career matches available</h3>

                <p>
                  Generate a new recommendation to discover suitable career
                  paths.
                </p>
              </div>
            )}
          </div>
        </section>

        <aside className="recommendation-sidebar">
          <div className="sidebar-card">
            <div className="sidebar-card-header">
              <div className="sidebar-card-icon">
                <Award size={19} />
              </div>

              <div>
                <h3>Your Strengths</h3>
                <span>What you already do well</span>
              </div>
            </div>

            <div className="strength-list">
              {strengths.length > 0 ? (
                strengths.map((strength, index) => (
                  <div className="strength-item" key={index}>
                    <CheckCircle2 size={17} />
                    <span>{strength}</span>
                  </div>
                ))
              ) : (
                <p className="sidebar-empty">No strengths available.</p>
              )}
            </div>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-card-header">
              <div className="sidebar-card-icon skill-sidebar-icon">
                <Brain size={19} />
              </div>

              <div>
                <h3>Skills to Develop</h3>
                <span>Recommended for your growth</span>
              </div>
            </div>

            <div className="skills-list">
              {recommendedSkills.length > 0 ? (
                recommendedSkills.map((skill, index) => (
                  <span className="recommended-skill" key={index}>
                    {skill}
                  </span>
                ))
              ) : (
                <p className="sidebar-empty">No skills available.</p>
              )}
            </div>
          </div>

          <div className="sidebar-card learning-path-card">
            <div className="sidebar-card-header">
              <div className="sidebar-card-icon learning-sidebar-icon">
                <GraduationCap size={19} />
              </div>

              <div>
                <h3>Suggested Learning Path</h3>
                <span>Your next learning steps</span>
              </div>
            </div>

            <div className="learning-path">
              {learningPath.length > 0 ? (
                learningPath.map((step, index) => (
                  <div className="learning-step" key={index}>
                    <div className="learning-step-number">{index + 1}</div>

                    <div className="learning-step-content">
                      <p>
                        {typeof step === "string"
                          ? step
                          : step.title ||
                            step.name ||
                            step.description ||
                            "Learning step"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="sidebar-empty">No learning path available.</p>
              )}
            </div>
          </div>
        </aside>
      </div>

      {recommendations.length > 1 && (
        <section className="recommendation-history">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">YOUR JOURNEY</span>

              <h2>Recommendation History</h2>
            </div>

            <RefreshCw size={22} />
          </div>

          <div className="history-list">
            {recommendations.map((item, index) => (
              <div className="history-card" key={item._id || index}>
                <div className="history-icon">
                  <Sparkles size={18} />
                </div>

                <div className="history-content">
                  <h4>Career Recommendation #{index + 1}</h4>

                  <span>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "Recent"}
                  </span>
                </div>

                <div
                  className={`history-status ${
                    item.status?.toLowerCase() || ""
                  }`}
                >
                  {item.status || "Generated"}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="ai-recommendation-disclaimer">
        <Sparkles size={16} />

        <p>
          AI recommendations are designed to support your career exploration.
          They should be considered guidance rather than a final career
          decision.
        </p>
      </div>
    </div>
  );
};

export default AIRecommendation;
