import { useEffect, useRef, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import {
  ChevronDown,
  Search,
  User,
  LogOut,
  UserCircle,
  GraduationCap,
  Menu,
  X
} from "lucide-react";

import { useAuth } from "../../pages/context/AuthContext";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change / resize back to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/careers", label: "Careers" },
    { to: "/education", label: "Education" },
    { to: "/roadmap", label: "Roadmap" },
    { to: "/assessments", label: "Assessments" },
    { to: "/colleges", label: "Colleges" },
    { to: "/exams", label: "Exams" },
    { to: "/resources", label: "Resources" },
    { to: "/ai-tools", label: "AI Tools" }
  ];

  return (
    <nav className="navbar">
      {/* ==================== LOGO ==================== */}
      <NavLink to="/" className="logo-section">
        <div className="logo-icon">
          <GraduationCap size={34} />
        </div>

        <div className="logo-text">
          <h2>CareerPath</h2>
          <p>Guiding Your Future</p>
        </div>
      </NavLink>

      {/* ==================== DESKTOP NAV ==================== */}
      <div className="nav-links">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* ==================== RIGHT SECTION ==================== */}
      <div className="navbar-right">
        <div className="search-box">
          <input type="text" placeholder="Search careers, courses..." />
          <Search size={21} />
        </div>

        {user ? (
          <div className="profile-menu" ref={menuRef}>
            <button
              type="button"
              className="profile-trigger"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <div className="profile-icon">
                <User size={19} />
              </div>
              <ChevronDown
                size={16}
                className={menuOpen ? "chevron-open" : ""}
              />
            </button>

            {menuOpen && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-header">
                  <strong>
                    {user.firstName} {user.lastName}
                  </strong>
                  <span>{user.email}</span>
                </div>

                <NavLink
                  to="/profile"
                  className="profile-dropdown-item"
                  onClick={() => setMenuOpen(false)}
                >
                  <UserCircle size={17} />
                  <span>My Profile</span>
                </NavLink>

                <button
                  type="button"
                  className="profile-dropdown-item logout"
                  onClick={handleLogout}
                >
                  <LogOut size={17} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login" className="login-button">
            Log In
          </NavLink>
        )}

        {/* ==================== MOBILE HAMBURGER ==================== */}
        <button
          type="button"
          className="mobile-toggle"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ==================== MOBILE MENU PANEL ==================== */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-search-box">
          <input type="text" placeholder="Search careers, courses..." />
          <Search size={19} />
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              isActive ? "mobile-nav-item active" : "mobile-nav-item"
            }
          >
            {item.label}
          </NavLink>
        ))}

        <div className="mobile-menu-footer">
          {user ? (
            <>
              <NavLink
                to="/profile"
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserCircle size={18} />
                <span>My Profile</span>
              </NavLink>
              <button
                type="button"
                className="mobile-nav-item logout"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="login-button mobile-login-button"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log In
            </NavLink>
          )}
        </div>
      </div>

      {/* Overlay behind mobile menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
