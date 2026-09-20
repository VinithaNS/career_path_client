import { useEffect, useMemo, useState } from "react";

import { Search, Wrench, RefreshCw, ArrowLeft } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { getAllDiplomas } from "../../services/educationService";
import DiplomaCard from "../../components/cards/DiplomaCard";

import "./education.css";

const DiplomaCourse = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStream, setSelectedStream] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getAllDiplomas();
      const list = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response)
          ? response
          : [];
      setCourses(list);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to load polytechnic diploma courses."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const streams = useMemo(() => {
    const rawStreams = courses.map((c) => c.stream).filter(Boolean);
    return ["All", ...new Set(rawStreams)];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((item) => {
      const matchStream =
        selectedStream === "All" || item.stream === selectedStream;
      const term = search.toLowerCase().trim();
      const matchSearch =
        !term ||
        item.courseName?.toLowerCase().includes(term) ||
        item.courseCode?.toLowerCase().includes(term) ||
        item.skills?.some((s) => s.toLowerCase().includes(term));
      return matchStream && matchSearch;
    });
  }, [courses, selectedStream, search]);

  return (
    <div className="education-page">
      {/* ================= HERO SECTION ================= */}
      <section className="education-hero">
        <div className="education-hero-content">
          {/* Direct Home Navigation Button */}
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "#ffffff",
              border: "1px solid #f0dff2",
              padding: "8px 16px",
              borderRadius: "10px",
              color: "#9333ea",
              fontSize: "13.5px",
              fontWeight: 700,
              cursor: "pointer",
              marginBottom: "20px",
              boxShadow: "0 4px 12px rgba(147, 51, 234, 0.06)"
            }}
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>

          <div className="education-icon">
            <Wrench size={30} />
          </div>
          <span className="education-label">
            POST 10TH VOCATIONAL & TECHNICAL PATHS
          </span>
          <h1>Polytechnic Diplomas & Applied Engineering</h1>
          <p>
            Build hands-on industry skills in 3 years. Qualify for direct
            technical jobs or utilize lateral entry straight into 2nd year
            B.E./B.Tech.
          </p>

          <div className="education-search">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by diploma course, skills (e.g. CAD, Circuit Design)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <section className="education-content">
        <div className="category-tabs">
          {streams.map((stream) => (
            <button
              key={stream}
              type="button"
              className={`category-tab ${
                selectedStream === stream ? "active" : ""
              }`}
              onClick={() => setSelectedStream(stream)}
            >
              {stream}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="education-status">
            <RefreshCw className="spin" size={24} style={{ marginRight: 8 }} />
            Loading diploma courses...
          </div>
        ) : error ? (
          <div className="education-status error">{error}</div>
        ) : (
          <section className="courses-section">
            <div className="section-heading">
              <div>
                <span>CURATED CATALOG</span>
                <h2>
                  {selectedStream === "All"
                    ? "All Diploma Courses"
                    : `${selectedStream} Diplomas`}
                </h2>
              </div>
              <p>{filteredCourses.length} programs available</p>
            </div>

            {filteredCourses.length === 0 ? (
              <div className="education-status">
                No matching polytechnic diplomas found.
              </div>
            ) : (
              <div className="courses-grid">
                {filteredCourses.map((diploma) => (
                  <DiplomaCard
                    key={diploma._id}
                    diploma={diploma}
                    onViewDetails={(id) => navigate(`/diploma-courses/${id}`)}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default DiplomaCourse;
