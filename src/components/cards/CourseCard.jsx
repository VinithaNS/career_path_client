import { ArrowRight, BookOpen, Clock3, GraduationCap } from "lucide-react";

const CourseCard = ({ course, onViewDetails }) => {
  const categoryName =
    typeof course.categoryId === "object"
      ? course.categoryId?.name
      : "Education";

  return (
    <article className="course-card">
      <div className="course-card-image-wrapper">
        {course.imageUrl ? (
          <img
            src={course.imageUrl}
            alt={course.courseName}
            className="course-card-image"
          />
        ) : (
          <div className="course-card-image-placeholder">
            <GraduationCap size={42} />
          </div>
        )}
        <span className="course-degree-badge">{course.degreeType || "UG"}</span>
      </div>

      <div className="course-card-content">
        <div className="course-card-category">
          <BookOpen size={15} />
          <span>{categoryName || "Education"}</span>
        </div>

        <h3>{course.courseName}</h3>

        <p>
          {course.shortDescription ||
            course.description ||
            "Explore this course and discover the opportunities it can offer."}
        </p>

        <div className="course-card-meta">
          <div>
            <Clock3 size={16} />
            <span>{course.duration || "Duration varies"}</span>
          </div>
          <span className="course-code">{course.courseCode}</span>
        </div>

        <button
          type="button"
          className="course-view-button"
          onClick={() => onViewDetails(course._id)}
        >
          <span>View Course</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </article>
  );
};

export default CourseCard;
