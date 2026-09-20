import { useNavigate, useLocation } from "react-router-dom";

import { ArrowLeft, Home, ChevronRight } from "lucide-react";

import "./PageHeader.css";

const PageHeader = ({
  badge,
  title,
  highlightTitle,
  description,
  breadcrumbs = []
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="page-header-wrapper">
      <div className="page-header-nav">
        <button type="button" className="header-back-btn" onClick={handleBack}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="header-breadcrumbs">
          <button
            type="button"
            className="crumb-btn"
            onClick={() => navigate("/")}
          >
            <Home size={14} />
            <span>Home</span>
          </button>

          {breadcrumbs.map((crumb, idx) => (
            <div key={idx} className="crumb-step">
              <ChevronRight size={13} className="crumb-divider" />
              {crumb.path ? (
                <button
                  type="button"
                  className="crumb-btn"
                  onClick={() => navigate(crumb.path)}
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="crumb-current">{crumb.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="page-header-body">
        {badge && <span className="header-badge">{badge}</span>}
        <h1>
          {title} {highlightTitle && <span>{highlightTitle}</span>}
        </h1>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
