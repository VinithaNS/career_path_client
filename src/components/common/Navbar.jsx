// import React from "react";

import { NavLink } from "react-router-dom";

import { ChevronDown, Search, Bell, GraduationCap } from "lucide-react";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <NavLink to="/" className="logo-section">
        <div className="logo-icon">
          <GraduationCap size={34} />
        </div>

        <div className="logo-text">
          <h2>CareerPath</h2>
          <p>Guiding Your Future</p>
        </div>
      </NavLink>

      {/* Navigation */}
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
          <ChevronDown size={15} />
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
          to="/colleges"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Colleges
          <ChevronDown size={15} />
        </NavLink>

        <NavLink
          to="/exams"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Exams
          <ChevronDown size={15} />
        </NavLink>

        <NavLink
          to="/resources"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Resources
          <ChevronDown size={15} />
        </NavLink>

        <NavLink
          to="/ai-tools"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          AI Tools
          <ChevronDown size={15} />
        </NavLink>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        {/* Search */}
        <div className="search-box">
          <input type="text" placeholder="Search careers, courses..." />

          <Search size={21} />
        </div>

        {/* Notification */}
        <div className="notification">
          <Bell size={24} />

          <span className="notification-count">3</span>
        </div>

        {/* Profile */}
        <div className="profile">
          <div className="profile-image">
            <img src="https://i.pravatar.cc/100?img=12" alt="profile" />
          </div>

          <div className="profile-details">
            <strong>Hi, Arjun</strong>
            <span>12th Grade</span>
          </div>

          <ChevronDown size={17} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
