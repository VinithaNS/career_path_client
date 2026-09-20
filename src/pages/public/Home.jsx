import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  ArrowRight,
  ClipboardList,
  Briefcase,
  Building2,
  RefreshCw,
  ChevronRight
} from "lucide-react";

import { getHomeData } from "../../services/homeService";
import heroImage from "../../assets/images/heroImage.png";
import CourseLearningPath from "../../components/courseLearningPath/CourseLearningPath";
import DepartmentRoadmaps from "../../components/department/DepartmentRoadmap";
import EleventhGroups from "../../components/eleventhGroup/EleventhGroups";

import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    careers: 0,
    colleges: 0,
    exams: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHomeData = async (isMounted = true) => {
    try {
      setLoading(true);
      setError("");

      const response = await getHomeData();

      if (!isMounted) return;

      if (response?.success && response?.data?.stats) {
        setStats({
          careers: response.data.stats.careers ?? 0,
          colleges: response.data.stats.colleges ?? 0,
          exams: response.data.stats.exams ?? 0
        });
      } else {
        setError(response?.message || "Failed to load platform data.");
      }
    } catch (err) {
      if (!isMounted) return;
      setError(
        err?.response?.data?.message ||
          "Unable to connect to the server. Please check your backend connection."
      );
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchHomeData(isMounted);

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="page">
        <div className="home-loading">
          <div className="loading-spinner"></div>
          <h3>Loading CareerPath...</h3>
          <p>Preparing careers, courses, and educational pathways...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="page">
        <div className="home-error">
          <div className="error-icon">
            <RefreshCw size={32} />
          </div>
          <h3>Unable to Load Content</h3>
          <p>{error}</p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => fetchHomeData(true)}
          >
            Try Again
            <RefreshCw size={18} />
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <div className="page-wrapper">
        <div className="page-content">
          <span className="badge">FIND YOUR PERFECT CAREER PATH</span>
          <h1>
            Discover, Learn &
            <br />
            Build Your
            <span>Bright Future</span>
          </h1>
          <p>
            Explore 500+ career options, find the right courses, top colleges,
            prepare for exams and build the skills you need to succeed.
          </p>

          <div className="hero-buttons">
            <Link to="/careers" className="btn-primary">
              Explore Careers
              <ArrowRight size={18} />
            </Link>
            <Link to="/assessments" className="btn-secondary">
              Take Assessment
              <ClipboardList size={18} />
            </Link>
          </div>
        </div>

        <div className="hero-section">
          <div className="hero-visual">
            <div className="hero-blob"></div>
            <img
              src={heroImage}
              alt="Student planning career"
              className="hero-img"
            />
          </div>

          <div className="stat-cards-container">
            <Link to="/careers" className="stat-card">
              <div className="stat-icon blue">
                <Briefcase size={22} />
              </div>
              <div className="stat-info">
                <h4>{stats.careers}+</h4>
                <p>Career Options</p>
              </div>
            </Link>

            <Link to="/colleges" className="stat-card">
              <div className="stat-icon green">
                <Building2 size={22} />
              </div>
              <div className="stat-info">
                <h4>{stats.colleges}+</h4>
                <p>Top Colleges</p>
              </div>
            </Link>

            <Link to="/exams" className="stat-card">
              <div className="stat-icon purple">
                <ClipboardList size={22} />
              </div>
              <div className="stat-info">
                <h4>{stats.exams}+</h4>
                <p>Exams Covered</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* =====================================================
          11TH GRADE GROUPS SECTION
      ===================================================== */}
      <section
        id="home-eleventh-groups"
        className="home-content-section eleventh-groups-section"
      >
        <div className="home-section-header">
          <div className="home-section-title">
            <span className="section-badge groups-badge">
              START WITH YOUR 11TH GRADE
            </span>
            <h2>
              Explore 11th Grade <span>Groups</span>
            </h2>
            <p>
              Choose your group based on your interests and strengths. Each
              group opens up different career opportunities.
            </p>
          </div>

          <Link to="/eleventh-groups" className="section-view-all">
            View All Groups
            <ChevronRight size={18} />
          </Link>
        </div>

        <div className="home-page-content">
          <EleventhGroups />
        </div>
      </section>

      {/* =====================================================
          COLLEGE DEPARTMENTS & CAREER ROADMAPS SECTION
      ===================================================== */}
      <section
        id="home-departments"
        className="home-content-section department-roadmaps-section"
      >
        <div className="home-section-header">
          <div className="home-section-title">
            <span className="section-badge department-badge">
              COLLEGE DEPARTMENTS
            </span>
            <h2>
              Department & Career <span>Roadmaps</span>
            </h2>
            <p>
              Explore the top college departments, degree courses, and industry
              career paths.
            </p>
          </div>

          <Link to="/departments" className="section-view-all">
            View All Roadmaps
            <ChevronRight size={18} />
          </Link>
        </div>

        <div className="home-page-content">
          <DepartmentRoadmaps
            embedded={true}
            onViewRoadmap={(department) => {
              navigate(`/departments/${department.slug}`);
            }}
            onViewAll={() => {
              navigate("/departments");
            }}
          />
        </div>
      </section>

      {/* =====================================================
          COURSE DETAILS & LEARNING PATH
      ===================================================== */}
      <section
        id="home-learning-path"
        className="home-content-section learning-path-section"
      >
        <div className="home-section-header">
          <div className="home-section-title">
            <span className="section-badge learning-badge">
              LEARN PRACTICAL SKILLS
            </span>
            <h2>
              Course Details & <span>Learning Path</span>
            </h2>
            <p>
              Get detailed fundamentals, real-world examples and handpicked
              YouTube videos for each course.
            </p>
          </div>

          <Link to="/education/learning-path" className="section-view-all">
            View All Courses
            <ChevronRight size={18} />
          </Link>
        </div>

        <div className="home-page-content">
          <CourseLearningPath embedded={true} />
        </div>
      </section>
    </section>
  );
};

export default Home;
