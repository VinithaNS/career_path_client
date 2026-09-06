import { ArrowRight, MapPin, Star, GraduationCap } from "lucide-react";

const CollegeCard = ({ college, onViewDetails }) => {
  const location = [college.city, college.state].filter(Boolean).join(", ");

  return (
    <article className="college-card">
      <div className="college-card-image-wrapper">
        {college.logoUrl ? (
          <img
            src={college.logoUrl}
            alt={college.collegeName}
            className="college-card-image"
          />
        ) : (
          <div className="college-card-image-placeholder">
            <GraduationCap size={42} />
          </div>
        )}

        <span className="college-type-badge">{college.collegeType}</span>
      </div>

      <div className="college-card-content">
        {location && (
          <div className="college-card-location">
            <MapPin size={14} />
            <span>{location}</span>
          </div>
        )}

        <h3>{college.collegeName}</h3>

        <p>
          {college.description ||
            "Explore courses, admissions and reviews for this college."}
        </p>

        <div className="college-card-meta">
          <div className="college-rating">
            <Star size={15} fill="#f59e0b" stroke="#f59e0b" />
            <span>{college.averageRating?.toFixed(1) || "0.0"}</span>
            <span className="review-count">
              ({college.totalReviews || 0} reviews)
            </span>
          </div>

          {college.establishedYear && (
            <span className="college-est">Est. {college.establishedYear}</span>
          )}
        </div>

        <button
          type="button"
          className="college-view-button"
          onClick={() => onViewDetails(college._id)}
        >
          <span>View College</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </article>
  );
};

export default CollegeCard;
