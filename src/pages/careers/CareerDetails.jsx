import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  X,
  Wrench,
  Compass,
  Check
} from "lucide-react";

import { getCareerById } from "../../services/careerService";
import { getRoadmapByTitle } from "../../services/roadmapService";

import "./CareerDetails.css";

// =========================================================================
// HELPER: SAFELY FORMAT SALARY (PREVENTS {min, max} OBJECT CRASH)
// =========================================================================
const formatSalary = (val, fallback = "₹4 LPA - ₹12 LPA") => {
  if (!val) return fallback;
  if (typeof val === "string") return val;
  if (typeof val === "object") {
    if (val.min !== undefined && val.max !== undefined) {
      const minLakh =
        val.min >= 100000 ? (val.min / 100000).toFixed(1) : val.min;
      const maxLakh =
        val.max >= 100000 ? (val.max / 100000).toFixed(1) : val.max;
      return `₹${minLakh} - ₹${maxLakh} LPA`;
    }
    if (val.min !== undefined) return `₹${val.min} LPA`;
    if (val.max !== undefined) return `Up to ₹${val.max} LPA`;
  }
  return fallback;
};

// =========================================================================
// JOB ROLE SPECIFIC DETAILS MAPPING
// =========================================================================
const ROLE_DETAILS_MAP = {
  "frontend developer": {
    title: "Frontend Developer",
    roleCode: "FED-01",
    experienceLevel: "Entry to Mid Level",
    averageSalary: "₹4.5 - 9 LPA",
    description:
      "Builds user-facing interfaces, responsive web applications, and optimizes browser performance.",
    coreSkills: [
      "HTML5 & CSS3",
      "JavaScript (ES6+)",
      "React.js / Vue.js",
      "Tailwind CSS",
      "TypeScript",
      "REST APIs"
    ],
    tools: [
      "VS Code",
      "Git & GitHub",
      "Figma",
      "Chrome DevTools",
      "Webpack / Vite"
    ],
    responsibilities: [
      "Develop responsive and accessible web layouts from design mockups.",
      "Integrate backend APIs and handle complex client-side state.",
      "Optimize website load times and cross-browser compatibility."
    ],
    roadmapQuery: "Frontend Developer"
  },
  "backend developer": {
    title: "Backend Developer",
    roleCode: "BED-02",
    experienceLevel: "Entry to Senior Level",
    averageSalary: "₹5.5 - 12 LPA",
    description:
      "Architects server logic, database schemas, microservices, and secure API gateways.",
    coreSkills: [
      "Node.js / Express",
      "Python (Django/FastAPI)",
      "MongoDB & SQL",
      "REST & GraphQL",
      "Authentication (JWT/OAuth)",
      "Docker Basics"
    ],
    tools: ["Postman", "Docker", "MongoDB Compass", "Redis", "Linux Terminal"],
    responsibilities: [
      "Design database models and build performant backend APIs.",
      "Implement user authentication, data encryption, and authorization layers.",
      "Manage server deployment, scaling, and database indexing."
    ],
    roadmapQuery: "Backend Developer"
  },
  "full stack developer": {
    title: "Full Stack Developer",
    roleCode: "FSD-03",
    experienceLevel: "Mid to Senior Level",
    averageSalary: "₹6 - 15 LPA",
    description:
      "Bridges client and server architectures, mastering end-to-end web application development.",
    coreSkills: [
      "MERN Stack (Mongo, Express, React, Node)",
      "Next.js",
      "State Management (Redux/Zustand)",
      "PostgreSQL",
      "Cloud Deployment (AWS/Vercel)",
      "System Design"
    ],
    tools: ["Git", "Docker", "AWS / Vercel", "Postman", "VS Code"],
    responsibilities: [
      "Design and maintain full-stack web applications from UI to database.",
      "Coordinate database queries and front-end rendering pipelines.",
      "Monitor application performance, logging, and error resolution."
    ],
    roadmapQuery: "Full Stack Developer"
  },
  "software engineer": {
    title: "Software Engineer",
    roleCode: "SWE-04",
    experienceLevel: "Graduate to Senior Engineer",
    averageSalary: "₹6 - 18 LPA",
    description:
      "Focuses on computer science fundamentals, data structures, algorithms, and scalable system engineering.",
    coreSkills: [
      "Data Structures & Algorithms",
      "Java / C++ / Python",
      "Object-Oriented Design",
      "Operating Systems & Networking",
      "CI/CD & DevOps",
      "Design Patterns"
    ],
    tools: [
      "Git",
      "Jenkins / GitHub Actions",
      "Kubernetes",
      "Jira",
      "IntelliJ IDEA"
    ],
    responsibilities: [
      "Write clean, maintainable, and high-performance algorithms.",
      "Conduct unit testing, code reviews, and architectural design documentation.",
      "Solve algorithmic bottlenecks and engineer resilient distributed software."
    ],
    roadmapQuery: "Software Developer Roadmap"
  }
};

const CareerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState(null);
  const [navigatingRoadmap, setNavigatingRoadmap] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchCareer = async () => {
      try {
        setLoading(true);
        const res = await getCareerById(id);
        if (isMounted) setCareer(res?.data || res);
      } catch (err) {
        console.error("Failed to load career:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchCareer();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleRoleClick = (roleName) => {
    const key = roleName.toLowerCase().trim();
    const details = ROLE_DETAILS_MAP[key] || {
      title: roleName,
      roleCode: "ROLE-PRO",
      experienceLevel: "Entry to Mid Level",
      averageSalary: formatSalary(career?.averageSalary, "₹4 - 10 LPA"),
      description: `Specialized job role under ${career?.careerName || "this career stream"}.`,
      coreSkills: career?.skills || [
        "Problem Solving",
        "Core Concepts",
        "Best Practices"
      ],
      tools: ["VS Code", "Git"],
      responsibilities: [
        `Deliver high quality tasks related to ${roleName}.`,
        "Collaborate with engineering teams.",
        "Maintain clean code."
      ],
      roadmapQuery: roleName
    };

    setSelectedRole(details);
  };

  const handleOpenRoadmap = async (queryTitle) => {
    try {
      setNavigatingRoadmap(true);
      const res = await getRoadmapByTitle(queryTitle);
      if (res?.data?._id) {
        navigate(`/roadmap/${res.data._id}`);
      } else {
        navigate("/roadmap");
      }
    } catch {
      navigate("/roadmap");
    } finally {
      setNavigatingRoadmap(false);
    }
  };

  if (loading || !career) {
    return (
      <div className="career-details-loading">Loading Career Overview...</div>
    );
  }

  const jobRolesList = career.jobRoles || [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Software Engineer"
  ];

  const displayAverageSalary = formatSalary(
    career.averageSalary,
    "₹4 LPA - ₹12 LPA"
  );
  const displaySalaryRange = formatSalary(
    career.salaryRange,
    displayAverageSalary
  );

  return (
    <div className="career-details-page">
      <div className="career-details-container">
        {/* Top Back Navigation */}
        <button
          type="button"
          className="career-back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          <span>Back to Careers</span>
        </button>

        {/* Hero Section */}
        <div className="career-hero-card">
          <div className="career-hero-top">
            <span className="career-code-chip">
              {career.careerCode || "SD001"}
            </span>
            <span className="featured-chip">FEATURED CAREER</span>
          </div>
          <h1>{career.careerName}</h1>
          <p>{career.description}</p>
        </div>

        {/* Main Grid Layout */}
        <div className="career-grid-layout">
          <div className="career-left-col">
            {/* Overview */}
            <div className="detail-panel">
              <h3>About This Career</h3>
              <p>{career.about || career.description}</p>
            </div>

            {/* Eligibility & Education */}
            <div className="detail-panel">
              <h3>Eligibility & Education</h3>
              <div className="eligibility-highlight">
                {career.eligibility ||
                  "Bachelor's degree or equivalent qualification in Computer Science or a related field."}
              </div>
              <h4 className="sub-title">Education Required</h4>
              <div className="education-tags-list">
                {career.educationRequired?.map((edu, idx) => (
                  <div key={idx} className="edu-tag-item">
                    <CheckCircle2 size={16} color="#059669" />
                    <span>
                      {typeof edu === "string"
                        ? edu
                        : edu.courseName || edu.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Skills */}
            <div className="detail-panel">
              <h3>Required Skills</h3>
              <div className="skills-pill-wrap">
                {career.skills?.map((skill, idx) => (
                  <span key={idx} className="skill-pill">
                    {typeof skill === "string" ? skill : skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Opportunities: Job Roles */}
            <div className="detail-panel">
              <div className="panel-header-wrap">
                <div>
                  <span className="section-pre-tag">OPPORTUNITIES</span>
                  <h3>Job Roles</h3>
                  <p className="section-hint">
                    Click any role to inspect required skills, tools, and
                    roadmap
                  </p>
                </div>
              </div>

              <div className="job-roles-list">
                {jobRolesList.map((role, idx) => {
                  const roleTitle =
                    typeof role === "string"
                      ? role
                      : role.roleName || role.title;
                  return (
                    <div
                      key={idx}
                      className="job-role-interactive-row"
                      onClick={() => handleRoleClick(roleTitle)}
                    >
                      <span className="role-index">0{idx + 1}</span>
                      <span className="role-title">{roleTitle}</span>
                      <div className="role-action-arrow">
                        <span>Skills & Path</span>
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="career-right-col">
            <div className="side-card earning-card">
              <span className="side-label">Earning Potential</span>
              <h2>{displayAverageSalary}</h2>
              <span className="sub-salary">{displaySalaryRange}</span>
            </div>

            <div className="side-card">
              <h4>Related Courses</h4>
              <p className="muted-text">
                Explore degree programs associated with this path.
              </p>
              <button
                type="button"
                className="side-link-btn"
                onClick={() => navigate("/education")}
              >
                Browse Degree Catalog &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Modal: Job Role Details */}
        {selectedRole && (
          <div
            className="role-modal-backdrop"
            onClick={() => setSelectedRole(null)}
          >
            <div
              className="role-modal-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <span className="modal-badge">{selectedRole.roleCode}</span>
                  <h2>{selectedRole.title}</h2>
                  <span className="modal-level">
                    {selectedRole.experienceLevel} •{" "}
                    {selectedRole.averageSalary}
                  </span>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setSelectedRole(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <p className="modal-description">{selectedRole.description}</p>

              <div className="modal-section">
                <h4>
                  <CheckCircle2 size={16} color="#9333ea" />
                  <span>Required Skills for this Role</span>
                </h4>
                <div className="modal-chips-grid">
                  {selectedRole.coreSkills.map((sk, i) => (
                    <span key={i} className="modal-skill-chip">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h4>
                  <Wrench size={16} color="#db2777" />
                  <span>Common Tools & Tech Stack</span>
                </h4>
                <div className="modal-chips-grid">
                  {selectedRole.tools.map((tl, i) => (
                    <span key={i} className="modal-tool-chip">
                      {tl}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h4>
                  <Compass size={16} color="#059669" />
                  <span>Key Responsibilities</span>
                </h4>
                <ul className="modal-resp-list">
                  {selectedRole.responsibilities.map((resp, i) => (
                    <li key={i}>
                      <Check size={14} className="resp-check" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="modal-action-btn"
                  onClick={() => handleOpenRoadmap(selectedRole.roadmapQuery)}
                  disabled={navigatingRoadmap}
                >
                  <Sparkles size={16} />
                  <span>
                    {navigatingRoadmap
                      ? "Loading Path..."
                      : `View ${selectedRole.title} Roadmap`}
                  </span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerDetails;
