import { Clock, ArrowRight, GraduationCap } from "lucide-react";

const CourseCard = ({ course, onViewDetails }) => {
  return (
    <div className="course-card">
      <div className="course-card-image">
        {course.imageUrl ? (
          <img src={course.imageUrl} alt={course.courseName} />
        ) : (
          <div className="course-image-placeholder">
            <GraduationCap size={42} />
          </div>
        )}

        <span className="course-degree-badge">{course.degreeType}</span>
      </div>

      <div className="course-card-content">
        <div className="course-category">
          {course.categoryId?.name || "Education"}
        </div>

        <h3>{course.courseName}</h3>

        <p className="course-description">
          {course.shortDescription ||
            course.description ||
            "Explore this course and discover the opportunities it offers."}
        </p>

        <div className="course-info">
          <span>
            <Clock size={16} />
            {course.duration}
          </span>

          <span>{course.courseCode}</span>
        </div>

        <button
          className="course-details-button"
          onClick={() => onViewDetails(course._id)}
        >
          View Course
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
