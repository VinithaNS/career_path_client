import { ArrowRight, ClipboardList, Briefcase, Building2 } from "lucide-react";

import "./home.css";

const Home = () => {
  return (
    <section className="page">
      <div className="page-wrapper">
        {/* ================= LEFT CONTENT ================= */}
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
            <button className="btn-primary">
              Explore Careers
              <ArrowRight size={20} />
            </button>

            <button className="btn-secondary">
              Take Assessment
              <ClipboardList size={19} />
            </button>
          </div>
        </div>

        {/* ================= RIGHT HERO SECTION ================= */}
        <div className="hero-section">
          {/* Hero Image */}
          <div className="hero-visual">
            <div className="hero-blob"></div>

            <img
              src="../src/assets/images/heroImage.png"
              alt="Student"
              className="hero-img"
            />
          </div>

          {/* ================= STAT CARDS ================= */}
          <div className="stat-cards-container">
            {/* Career Options */}
            <div className="stat-card">
              <div className="stat-icon blue">
                <Briefcase size={23} />
              </div>

              <div className="stat-info">
                <h4>500+</h4>
                <p>Career Options</p>
              </div>
            </div>

            {/* Top Colleges */}
            <div className="stat-card">
              <div className="stat-icon green">
                <Building2 size={23} />
              </div>

              <div className="stat-info">
                <h4>1200+</h4>
                <p>Top Colleges</p>
              </div>
            </div>

            {/* Exams */}
            <div className="stat-card">
              <div className="stat-icon purple">
                <ClipboardList size={23} />
              </div>

              <div className="stat-info">
                <h4>300+</h4>
                <p>Exams Covered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
