// src/components/common/Footer.jsx

import { Link } from "react-router-dom";

import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn
} from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        {/* =================================================
            BRAND COLUMN
        ================================================= */}

        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <GraduationCap size={26} />
            </div>
            <div>
              <h3>CareerPath</h3>
              <p>Guiding Your Future</p>
            </div>
          </div>

          <p className="footer-about">
            Helping students discover the right career, courses and colleges
            with personalized guidance and AI-powered tools.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Facebook">
              <FaFacebookF size={15} />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter size={15} />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram size={15} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn size={15} />
            </a>
          </div>
        </div>

        {/* =================================================
            EXPLORE
        ================================================= */}

        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/education">Education</Link>
          <Link to="/roadmap">Roadmap</Link>
        </div>

        {/* =================================================
            RESOURCES
        ================================================= */}

        <div className="footer-col">
          <h4>Resources</h4>
          <Link to="/assessments">Assessments</Link>
          <Link to="/colleges">Colleges</Link>
          <Link to="/exams">Exams</Link>
          <Link to="/resources">Resources</Link>
        </div>

        {/* =================================================
            AI TOOLS + MORE
        ================================================= */}

        <div className="footer-col">
          <h4>More</h4>
          <Link to="/ai-tools">AI Tools</Link>
          <Link to="/profile">My Profile</Link>
        </div>

        {/* =================================================
            CONTACT
        ================================================= */}

        <div className="footer-col footer-contact">
          <h4>Contact Us</h4>
          <span>
            <Mail size={15} /> support@careerpath.com
          </span>
          <span>
            <Phone size={15} /> +91 98765 43210
          </span>
          <span>
            <MapPin size={15} /> Coimbatore, Tamil Nadu, India
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CareerPath. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
