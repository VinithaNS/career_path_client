import { useEffect, useRef, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import {
  ChevronDown,
  Search,
  User,
  LogOut,
  UserCircle,
  GraduationCap
} from "lucide-react";

import { useAuth } from "../../pages/context/AuthContext";

import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
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

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

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

      {/* ==================== NAVIGATION ==================== */}
      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/careers"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Careers
        </NavLink>
        <NavLink
          to="/education"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Education
        </NavLink>
        <NavLink
          to="/roadmap"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Roadmap
        </NavLink>
        <NavLink
          to="/assessments"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Assessments
        </NavLink>
        <NavLink
          to="/colleges"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Colleges
        </NavLink>
        <NavLink
          to="/exams"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Exams
        </NavLink>
        <NavLink
          to="/resources"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Resources
        </NavLink>
        <NavLink
          to="/ai-tools"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          AI Tools
        </NavLink>
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
      </div>
    </nav>
  );
};

export default Navbar;
