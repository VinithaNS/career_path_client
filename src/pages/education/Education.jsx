import { useEffect, useMemo, useState } from "react";

import {
  BookOpen,
  GraduationCap,
  Search,
  RefreshCw,
  SlidersHorizontal,
  Sparkles
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  getActiveCourses,
  searchCourses
} from "../../services/educationService";
import CourseCard from "../../components/cards/CourseCard";

import "./Education.css";

const Education = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD COURSES
  // =====================================================

  useEffect(() => {
    let isMounted = true;

    const loadCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getActiveCourses();

        console.log("Education API Response:", response);

        if (!isMounted) return;

        if (response?.success) {
          setCourses(Array.isArray(response.data) ? response.data : []);
        } else {
          setCourses([]);
          setError(response?.message || "Unable to load courses.");
        }
      } catch (err) {
        console.error("Education API Error:", err);

        if (!isMounted) return;

        setCourses([]);
        setError(
          err?.response?.data?.message || "Unable to load education courses."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  // =====================================================
  // CATEGORY LIST
  // =====================================================

  const categories = useMemo(() => {
    const categoryNames = courses
      .map((course) => {
        if (course.categoryId && typeof course.categoryId === "object") {
          return course.categoryId.name;
        }

        return null;
      })
      .filter(Boolean);

    return ["All", ...new Set(categoryNames)];
  }, [courses]);

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      try {
        const response = await getActiveCourses();

        if (response?.success) {
          setCourses(Array.isArray(response.data) ? response.data : []);
        }
      } catch (err) {
        console.error(err);
      }

      return;
    }

    try {
      setSearching(true);

      const response = await searchCourses(value);

      if (response?.success) {
        setCourses(Array.isArray(response.data) ? response.data : []);
      }
    } catch (err) {
      console.error("Course Search Error:", err);
    } finally {
      setSearching(false);
    }
  };

  // =====================================================
  // CATEGORY FILTER
  // =====================================================

  const filteredCourses = useMemo(() => {
    if (activeCategory === "All") {
      return courses;
    }

    return courses.filter((course) => {
      const category =
        typeof course.categoryId === "object" ? course.categoryId?.name : "";

      return category === activeCategory;
    });
  }, [courses, activeCategory]);

  // =====================================================
  // FEATURED COURSES
  // =====================================================

  const featuredCourses = useMemo(() => {
    return [...filteredCourses]
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
      .slice(0, 3);
  }, [filteredCourses]);

  // =====================================================
  // VIEW DETAILS
  // =====================================================

  const handleViewDetails = (courseId) => {
    navigate(`/education/${courseId}`);
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <section className="education-page">
        <div className="education-loading">
          <div className="education-loading-icon">
            <RefreshCw className="spin" size={32} />
          </div>

          <h2>Loading courses...</h2>

          <p>Please wait while we fetch the latest education information.</p>
        </div>
      </section>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <section className="education-page">
      <div className="education-container">
        {/* ============================================= */}
        {/* HERO */}
        {/* ============================================= */}

        <div className="education-hero">
          <div className="education-hero-content">
            <div className="education-hero-icon">
              <GraduationCap size={32} />
            </div>

            <span className="education-eyebrow">EDUCATION & COURSES</span>

            <h1>
              Find the right course for your
              <span> future</span>
            </h1>

            <p>
              Explore degree courses, understand eligibility and discover the
              career opportunities waiting for you.
            </p>
          </div>

          <div className="education-hero-decoration">
            <div className="education-circle circle-one" />
            <div className="education-circle circle-two" />
            <GraduationCap size={110} />
          </div>
        </div>

        {/* ============================================= */}
        {/* SEARCH */}
        {/* ============================================= */}

        <div className="education-search-section">
          <div className="education-search-box">
            <Search size={21} />

            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search courses, degrees or course codes..."
            />

            {searching && (
              <RefreshCw size={19} className="search-spinner spin" />
            )}
          </div>

          <div className="education-filter-label">
            <SlidersHorizontal size={17} />
            <span>Filter by field</span>
          </div>
        </div>

        {/* ============================================= */}
        {/* CATEGORY TABS */}
        {/* ============================================= */}

        <div className="education-category-tabs">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={activeCategory === category ? "active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* ============================================= */}
        {/* ERROR */}
        {/* ============================================= */}

        {error && (
          <div className="education-error">
            <BookOpen size={25} />

            <div>
              <h3>Unable to load courses</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* ============================================= */}
        {/* FEATURED */}
        {/* ============================================= */}

        {!error && featuredCourses.length > 0 && (
          <section className="education-featured-section">
            <div className="education-section-heading">
              <div>
                <div className="education-section-label">
                  <Sparkles size={16} />
                  <span>EXPLORE</span>
                </div>

                <h2>Popular Courses</h2>

                <p>
                  Discover courses that can help you move closer to your career
                  goals.
                </p>
              </div>
            </div>

            <div className="course-grid">
              {featuredCourses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </section>
        )}

        {/* ============================================= */}
        {/* ALL COURSES */}
        {/* ============================================= */}

        <section className="education-all-section">
          <div className="education-section-heading">
            <div>
              <div className="education-section-label">
                <BookOpen size={16} />
                <span>ALL COURSES</span>
              </div>

              <h2>Explore Education Paths</h2>

              <p>
                Compare courses and choose a path that matches your interests.
              </p>
            </div>

            <div className="course-count">
              {filteredCourses.length}{" "}
              {filteredCourses.length === 1 ? "Course" : "Courses"}
            </div>
          </div>

          {filteredCourses.length > 0 ? (
            <div className="course-grid">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="education-empty">
              <div className="education-empty-icon">
                <Search size={28} />
              </div>

              <h3>No courses found</h3>

              <p>
                Try searching for a different course or choose another category.
              </p>
            </div>
          )}
        </section>
      </div>
    </section>
  );
};

export default Education;
