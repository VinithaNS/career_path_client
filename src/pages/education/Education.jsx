import { useEffect, useMemo, useState } from "react";

import { Search, GraduationCap } from "lucide-react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getActiveCourses();

        console.log("Education API Response:", response);

        const courseData = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : [];

        setCourses(courseData);
      } catch (err) {
        console.error("Education API Error:", err);

        setError(
          err.response?.data?.message || err.message || "Failed to load courses"
        );
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const categories = useMemo(() => {
    const categoryNames = courses
      .map((course) => course.categoryId?.name)
      .filter(Boolean);

    return ["All", ...new Set(categoryNames)];
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" ||
        course.categoryId?.name === selectedCategory;

      const searchValue = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        course.courseName?.toLowerCase().includes(searchValue) ||
        course.courseCode?.toLowerCase().includes(searchValue) ||
        course.shortDescription?.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [courses, selectedCategory, searchTerm]);

  const popularCourses = useMemo(() => {
    return [...courses]
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
      .slice(0, 3);
  }, [courses]);

  const handleSearch = async (value) => {
    setSearchTerm(value);
    setSelectedCategory("All");

    if (!value.trim()) {
      try {
        const response = await getActiveCourses();

        const courseData = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : [];

        setCourses(courseData);
      } catch (err) {
        console.error("Course reload error:", err);
      }

      return;
    }

    try {
      const response = await searchCourses(value);

      const courseData = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];

      setCourses(courseData);
    } catch (err) {
      console.error("Course search error:", err);
    }
  };

  const handleViewDetails = (courseId) => {
    navigate(`/education/${courseId}`);
  };

  return (
    <div className="education-page">
      {/* ================= HERO ================= */}
      <section className="education-hero">
        <div className="education-hero-content">
          <div className="education-icon">
            <GraduationCap size={30} />
          </div>

          <span className="education-label">EDUCATION & COURSES</span>

          <h1>
            Find the Right Course
            <br />
            for Your Future
          </h1>

          <p>
            Explore degree programs, understand eligibility, discover career
            opportunities, and choose the right educational path.
          </p>

          <div className="education-search">
            <Search size={21} />

            <input
              type="text"
              placeholder="Search courses, degree programs..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="education-content">
        {/* Categories */}
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? "category-tab active"
                  : "category-tab"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="education-status">Loading courses...</div>
        ) : error ? (
          <div className="education-status error">{error}</div>
        ) : (
          <>
            {/* Popular Courses */}
            {!searchTerm &&
              selectedCategory === "All" &&
              popularCourses.length > 0 && (
                <section className="courses-section">
                  <div className="section-heading">
                    <div>
                      <span>POPULAR</span>
                      <h2>Popular Courses</h2>
                    </div>
                  </div>

                  <div className="courses-grid">
                    {popularCourses.map((course) => (
                      <CourseCard
                        key={course._id}
                        course={course}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                </section>
              )}

            {/* All Courses */}
            <section className="courses-section">
              <div className="section-heading">
                <div>
                  <span>EXPLORE</span>

                  <h2>{searchTerm ? "Search Results" : "All Courses"}</h2>
                </div>

                <p>{filteredCourses.length} courses</p>
              </div>

              {filteredCourses.length === 0 ? (
                <div className="education-status">No courses found.</div>
              ) : (
                <div className="courses-grid">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course._id}
                      course={course}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </section>
    </div>
  );
};

export default Education;
