import { useState, useRef, useEffect } from "react";

import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

import {
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Wrench,
  Building2,
  BookOpen,
  Briefcase,
  Map,
  ClipboardList,
  Brain,
  Bot,
  FolderOpen
} from "lucide-react";

import { useAuth } from "../../pages/context/AuthContext";

import CareerLogo from "./CareerLogo";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Veliya click pannum pothu desktop dropdown close aagum
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Route maari navigate aagum pothu dropdown mattrum drawer close aagum
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    document.body.style.overflow = "unset";
  }, [location.pathname]);

  // Mobile menu open la irukum pothu background scroll lock seiyya
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => {
      const nextState = !prev;
      document.body.style.overflow = nextState ? "hidden" : "unset";
      return nextState;
    });
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <header className="navbar" ref={navRef}>
      <div className="navbar-container">
        {/* Pudhiya Unique CareerPath Logo & Brand Section */}
        <Link to="/" className="brand" onClick={closeMobileMenu}>
          <div className="brand-mark-clean">
            <CareerLogo size={42} />
          </div>
          <div className="brand-text-wrap">
            <span className="brand-name">CareerPath</span>
            <span className="brand-tag">Guiding Your Future</span>
          </div>
        </Link>

        {/* Desktop Categorized Navigation */}
        <nav className="nav-links">
          <NavLink to="/" end className="nav-item-link">
            Home
          </NavLink>

          {/* 1. Post-10th Pathways */}
          <div className="nav-dropdown-wrapper">
            <button
              type="button"
              className={`nav-dropdown-trigger ${
                ["/eleventh-groups", "/diploma-courses"].some((p) =>
                  location.pathname.startsWith(p)
                )
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveDropdown((prev) =>
                  prev === "pathways" ? null : "pathways"
                )
              }
            >
              <span>10th Next Steps</span>
              <ChevronDown
                size={14}
                className={`chevron ${activeDropdown === "pathways" ? "rotate" : ""}`}
              />
            </button>

            {activeDropdown === "pathways" && (
              <div className="dropdown-menu">
                <Link to="/eleventh-groups" className="dropdown-item">
                  <div className="dropdown-icon purple">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <strong>11th & 12th Streams</strong>
                    <p>Bio-Maths, CS, Commerce & Arts</p>
                  </div>
                </Link>
                <Link to="/diploma-courses" className="dropdown-item">
                  <div className="dropdown-icon pink">
                    <Wrench size={18} />
                  </div>
                  <div>
                    <strong>Polytechnic Diplomas</strong>
                    <p>3-Year technical hands-on routes</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* 2. Colleges & Degrees */}
          <div className="nav-dropdown-wrapper">
            <button
              type="button"
              className={`nav-dropdown-trigger ${
                ["/departments", "/education", "/colleges"].some((p) =>
                  location.pathname.startsWith(p)
                )
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveDropdown((prev) =>
                  prev === "colleges" ? null : "colleges"
                )
              }
            >
              <span>Colleges & Degrees</span>
              <ChevronDown
                size={14}
                className={`chevron ${activeDropdown === "colleges" ? "rotate" : ""}`}
              />
            </button>

            {activeDropdown === "colleges" && (
              <div className="dropdown-menu">
                <Link to="/departments" className="dropdown-item">
                  <div className="dropdown-icon purple">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <strong>College Departments</strong>
                    <p>B.E, B.Tech, Arts & Science departments</p>
                  </div>
                </Link>
                <Link to="/education" className="dropdown-item">
                  <div className="dropdown-icon green">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <strong>Degree Programs</strong>
                    <p>Undergraduate degree courses & eligibility</p>
                  </div>
                </Link>
                <Link to="/colleges" className="dropdown-item">
                  <div className="dropdown-icon orange">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <strong>Top Colleges</strong>
                    <p>Compare colleges, rankings & fees</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* 3. Career Hub */}
          <div className="nav-dropdown-wrapper">
            <button
              type="button"
              className={`nav-dropdown-trigger ${
                ["/careers", "/roadmap", "/exams"].some((p) =>
                  location.pathname.startsWith(p)
                )
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveDropdown((prev) =>
                  prev === "careers" ? null : "careers"
                )
              }
            >
              <span>Career Hub</span>
              <ChevronDown
                size={14}
                className={`chevron ${activeDropdown === "careers" ? "rotate" : ""}`}
              />
            </button>

            {activeDropdown === "careers" && (
              <div className="dropdown-menu">
                <Link to="/careers" className="dropdown-item">
                  <div className="dropdown-icon blue">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <strong>Explore Careers</strong>
                    <p>500+ career roles, salaries & scope</p>
                  </div>
                </Link>
                <Link to="/roadmap" className="dropdown-item">
                  <div className="dropdown-icon purple">
                    <Map size={18} />
                  </div>
                  <div>
                    <strong>Career Roadmaps</strong>
                    <p>Milestones from school to job readiness</p>
                  </div>
                </Link>
                <Link to="/exams" className="dropdown-item">
                  <div className="dropdown-icon orange">
                    <ClipboardList size={18} />
                  </div>
                  <div>
                    <strong>Competitive & Govt Exams</strong>
                    <p>Entrance eligibilities and patterns</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* 4. Prep & Tools */}
          <div className="nav-dropdown-wrapper">
            <button
              type="button"
              className={`nav-dropdown-trigger ${
                ["/assessments", "/ai-tools", "/resources"].some((p) =>
                  location.pathname.startsWith(p)
                )
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveDropdown((prev) => (prev === "tools" ? null : "tools"))
              }
            >
              <span>Prep & Tools</span>
              <ChevronDown
                size={14}
                className={`chevron ${activeDropdown === "tools" ? "rotate" : ""}`}
              />
            </button>

            {activeDropdown === "tools" && (
              <div className="dropdown-menu">
                <Link to="/assessments" className="dropdown-item">
                  <div className="dropdown-icon pink">
                    <Brain size={18} />
                  </div>
                  <div>
                    <strong>Skill Assessments</strong>
                    <p>Test aptitude, interests & core strengths</p>
                  </div>
                </Link>
                <Link to="/ai-tools" className="dropdown-item">
                  <div className="dropdown-icon purple">
                    <Bot size={18} />
                  </div>
                  <div>
                    <strong>AI Guidance</strong>
                    <p>Smart conversational assistant</p>
                  </div>
                </Link>
                <Link to="/resources" className="dropdown-item">
                  <div className="dropdown-icon green">
                    <FolderOpen size={18} />
                  </div>
                  <div>
                    <strong>Learning Resources</strong>
                    <p>Curated guides, videos & materials</p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Profile / Auth Section */}
        <div className="nav-right desktop-auth">
          {user ? (
            <div className="user-profile-actions">
              <Link to="/profile" className="profile-pill">
                <User size={15} />
                <span>{user.firstName || "Profile"}</span>
              </Link>
              <button
                type="button"
                className="logout-button"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-link">
                Log In
              </Link>
              <Link to="/register" className="register-button">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dark Backdrop Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu} />
      )}

      {/* Slide-over Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-drawer-header">
          <div className="brand">
            <div className="brand-mark-clean">
              <CareerLogo size={36} />
            </div>
            <div className="brand-text-wrap">
              <span className="brand-name">CareerPath</span>
              <span className="brand-tag">Guiding Your Future</span>
            </div>
          </div>
          <button
            type="button"
            className="mobile-close-btn"
            onClick={closeMobileMenu}
          >
            <X size={20} />
          </button>
        </div>

        <div className="mobile-drawer-body">
          <NavLink
            to="/"
            end
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>

          <div className="mobile-group">
            <span className="mobile-group-title">10th Next Steps</span>
            <Link
              to="/eleventh-groups"
              className="mobile-sub-link"
              onClick={closeMobileMenu}
            >
              <GraduationCap size={17} className="icon-purple" />
              <span>11th & 12th Streams</span>
            </Link>
            <Link
              to="/diploma-courses"
              className="mobile-sub-link"
              onClick={closeMobileMenu}
            >
              <Wrench size={17} className="icon-pink" />
              <span>Polytechnic Diplomas</span>
            </Link>
          </div>

          <div className="mobile-group">
            <span className="mobile-group-title">Colleges & Degrees</span>
            <Link
              to="/departments"
              className="mobile-sub-link"
              onClick={closeMobileMenu}
            >
              <Building2 size={17} className="icon-purple" />
              <span>College Departments</span>
            </Link>
            <Link
              to="/education"
              className="mobile-sub-link"
              onClick={closeMobileMenu}
            >
              <BookOpen size={17} className="icon-green" />
              <span>Degree Programs</span>
            </Link>
            <Link
              to="/colleges"
              className="mobile-sub-link"
              onClick={closeMobileMenu}
            >
              <Building2 size={17} className="icon-orange" />
              <span>Top Colleges</span>
            </Link>
          </div>

          <div className="mobile-group">
            <span className="mobile-group-title">Career Hub</span>
            <Link
              to="/careers"
              className="mobile-sub-link"
              onClick={closeMobileMenu}
            >
              <Briefcase size={17} className="icon-blue" />
              <span>Explore Careers</span>
            </Link>
            <Link
              to="/roadmap"
              className="mobile-sub-link"
              onClick={closeMobileMenu}
            >
              <Map size={17} className="icon-purple" />
              <span>Step-by-Step Roadmaps</span>
            </Link>
            <Link
              to="/exams"
              className="mobile-sub-link"
              onClick={closeMobileMenu}
            >
              <ClipboardList size={17} className="icon-orange" />
              <span>Competitive & Govt Exams</span>
            </Link>
          </div>

          <div className="mobile-group">
            <span className="mobile-group-title">Prep & Tools</span>
            <Link
              to="/assessments"
              className="mobile-sub-link"
              onClick={closeMobileMenu}
            >
              <Brain size={17} className="icon-pink" />
              <span>Skill Assessments</span>
            </Link>
            <Link
              to="/ai-tools"
              className="mobile-sub-link"
              onClick={closeMobileMenu}
            >
              <Bot size={17} className="icon-purple" />
              <span>AI Guidance</span>
            </Link>
            <Link
              to="/resources"
              className="mobile-sub-link"
              onClick={closeMobileMenu}
            >
              <FolderOpen size={17} className="icon-green" />
              <span>Study Resources</span>
            </Link>
          </div>
        </div>

        {/* Mobile Drawer Auth Footer */}
        <div className="mobile-drawer-footer">
          {user ? (
            <div className="mobile-user-card">
              <Link
                to="/profile"
                className="mobile-user-info"
                onClick={closeMobileMenu}
              >
                <div className="mobile-user-avatar">
                  <User size={18} />
                </div>
                <div>
                  <strong>{user.firstName || "Account"}</strong>
                  <span>{user.email || "View Profile"}</span>
                </div>
              </Link>
              <button
                type="button"
                className="mobile-logout-btn"
                onClick={() => {
                  closeMobileMenu();
                  handleLogout();
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="mobile-auth-grid">
              <Link
                to="/login"
                className="mobile-login-btn"
                onClick={closeMobileMenu}
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="mobile-register-btn"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
