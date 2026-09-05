import { useEffect, useState } from "react";

import {
  ArrowRight,
  ClipboardList,
  Briefcase,
  Building2,
  Compass,
  Map,
  GraduationCap,
  Brain,
  Bot,
  FolderOpen,
  RefreshCw
} from "lucide-react";

import { getHomeData } from "../../services/homeService";
import heroImage from "../../assets/images/heroImage.png";

import "./home.css";

const Home = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [stats, setStats] = useState({
    careers: 0,
    colleges: 0,
    exams: 0
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =========================================================
  // FETCH HOME DATA
  // =========================================================

  const fetchHomeData = async () => {
    try {
      const response = await getHomeData();

      console.log("Home API Response:", response);

      if (response?.success && response?.data?.stats) {
        setStats({
          careers: response.data.stats.careers ?? 0,
          colleges: response.data.stats.colleges ?? 0,
          exams: response.data.stats.exams ?? 0
        });

        setError("");
      } else {
        setError(response?.message || "Failed to load home page data.");
      }
    } catch (err) {
      console.error("Home API Error:", err);

      setError(
        err?.response?.data?.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOAD HOME DATA
  // =========================================================

  useEffect(() => {
    let isMounted = true;

    const loadHomeData = async () => {
      try {
        const response = await getHomeData();

        console.log("Home API Response:", response);

        if (!isMounted) {
          return;
        }

        if (response?.success && response?.data?.stats) {
          setStats({
            careers: response.data.stats.careers ?? 0,
            colleges: response.data.stats.colleges ?? 0,
            exams: response.data.stats.exams ?? 0
          });

          setError("");
        } else {
          setError(response?.message || "Failed to load home page data.");
        }
      } catch (err) {
        if (!isMounted) {
          return;
        }

        console.error("Home API Error:", err);

        setError(
          err?.response?.data?.message ||
            "Unable to connect to the server. Please try again."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  // =========================================================
  // LOADING SCREEN
  // =========================================================

  if (loading) {
    return (
      <section className="page">
        <div className="home-loading">
          <div className="loading-spinner"></div>

          <h3>Loading CareerPath...</h3>

          <p>Loading careers, colleges and exam information...</p>
        </div>
      </section>
    );
  }

  // =========================================================
  // ERROR SCREEN
  // =========================================================

  if (error) {
    return (
      <section className="page">
        <div className="home-error">
          <div className="error-icon">
            <RefreshCw size={32} />
          </div>

          <h3>Unable to Load Home Page</h3>

          <p>{error}</p>

          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setLoading(true);
              setError("");
              fetchHomeData();
            }}
          >
            Try Again
            <RefreshCw size={18} />
          </button>
        </div>
      </section>
    );
  }

  // =========================================================
  // MAIN HOME PAGE
  // =========================================================

  return (
    <section className="page">
      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <div className="page-wrapper">
        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="page-content">
          <span className="badge">FIND YOUR PERFECT CAREER PATH</span>

          <h1>
            Discover, Learn & <br />
            Build Your <span>Bright Future</span>
          </h1>

          <p>
            Explore 500+ career options, find the right courses, top colleges,
            prepare for exams and build the skills you need to succeed.
          </p>

          <div className="hero-buttons">
            {/* EXPLORE CAREERS */}

            <button type="button" className="btn-primary">
              Explore Careers
              <ArrowRight size={18} />
            </button>

            {/* TAKE ASSESSMENT */}

            <button type="button" className="btn-secondary">
              Take Assessment
              <ClipboardList size={18} />
            </button>
          </div>
        </div>

        {/* =================================================
            RIGHT HERO
        ================================================= */}

        <div className="hero-section">
          {/* =================================================
              STUDENT IMAGE
          ================================================= */}

          <div className="hero-visual">
            <div className="hero-blob"></div>

            <img
              src={heroImage}
              alt="Student using laptop"
              className="hero-img"
            />
          </div>

          {/* =================================================
              STAT CARDS
          ================================================= */}

          <div className="stat-cards-container">
            {/* =================================================
                CAREERS
            ================================================= */}

            <div className="stat-card">
              <div className="stat-icon blue">
                <Briefcase size={22} />
              </div>

              <div className="stat-info">
                <h4>{stats.careers}+</h4>

                <p>Career Options</p>
              </div>
            </div>

            {/* =================================================
                COLLEGES
            ================================================= */}

            <div className="stat-card">
              <div className="stat-icon green">
                <Building2 size={22} />
              </div>

              <div className="stat-info">
                <h4>{stats.colleges}+</h4>

                <p>Top Colleges</p>
              </div>
            </div>

            {/* =================================================
                EXAMS
            ================================================= */}

            <div className="stat-card">
              <div className="stat-icon purple">
                <ClipboardList size={22} />
              </div>

              <div className="stat-info">
                <h4>{stats.exams}+</h4>

                <p>Exams Covered</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          QUICK ACCESS BAR
      ===================================================== */}

      <div className="quick-access-wrapper">
        <div className="quick-access">
          {/* =================================================
              CAREERS
          ================================================= */}

          <div className="quick-item">
            <div className="quick-icon blue-icon">
              <Compass size={22} />
            </div>

            <div>
              <h4>Careers</h4>

              <p>Explore Options</p>
            </div>
          </div>

          {/* =================================================
              ROADMAPS
          ================================================= */}

          <div className="quick-item">
            <div className="quick-icon purple-icon">
              <Map size={22} />
            </div>

            <div>
              <h4>Roadmaps</h4>

              <p>Step by Step</p>
            </div>
          </div>

          {/* =================================================
              COLLEGES
          ================================================= */}

          <div className="quick-item">
            <div className="quick-icon green-icon">
              <GraduationCap size={22} />
            </div>

            <div>
              <h4>Colleges</h4>

              <p>Find Best Fit</p>
            </div>
          </div>

          {/* =================================================
              EXAMS
          ================================================= */}

          <div className="quick-item">
            <div className="quick-icon orange-icon">
              <ClipboardList size={22} />
            </div>

            <div>
              <h4>Exams</h4>

              <p>Prepare Better</p>
            </div>
          </div>

          {/* =================================================
              ASSESSMENTS
          ================================================= */}

          <div className="quick-item">
            <div className="quick-icon cyan-icon">
              <Brain size={22} />
            </div>

            <div>
              <h4>Assessments</h4>

              <p>Know Yourself</p>
            </div>
          </div>

          {/* =================================================
              AI TOOLS
          ================================================= */}

          <div className="quick-item">
            <div className="quick-icon pink-icon">
              <Bot size={22} />
            </div>

            <div>
              <h4>AI Tools</h4>

              <p>Smart Guidance</p>
            </div>
          </div>

          {/* =================================================
              RESOURCES
          ================================================= */}

          <div className="quick-item">
            <div className="quick-icon folder-icon">
              <FolderOpen size={22} />
            </div>

            <div>
              <h4>Resources</h4>

              <p>Learn More</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
