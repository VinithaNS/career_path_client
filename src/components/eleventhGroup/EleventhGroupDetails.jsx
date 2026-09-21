import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  ArrowRight
} from "lucide-react";

import { getCourseByName } from "../../services/educationService";
import { getEleventhGroupById } from "../../services/eleventhGroupService";
import { getRoadmapByTitle } from "../../services/roadmapService";

import "./eleventhGroupDetails.css";

const EleventhGroupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getEleventhGroupById(id);
        if (isMounted) setGroup(res?.data || res);
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              "Failed to load stream details"
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCourseClick = async (courseName) => {
    try {
      const res = await getCourseByName(courseName);
      if (res?.data?._id) {
        navigate(`/education/${res.data._id}`);
      } else {
        navigate("/education");
      }
    } catch {
      navigate("/education");
    }
  };

  const handleCareerClick = async (careerTitle) => {
    try {
      const res = await getRoadmapByTitle(careerTitle);
      if (res?.data?._id) {
        navigate(`/roadmap/${res.data._id}`);
      } else {
        navigate("/roadmap");
      }
    } catch {
      navigate("/roadmap");
    }
  };

  if (loading) {
    return (
      <div className="stream-loading-state">
        <div className="pure-css-loader"></div>
        <p>Loading 11th Grade Stream Details...</p>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="stream-error-state">
        <h2>Stream Not Found</h2>
        <p>{error}</p>
        <button type="button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="eleventh-details-page">
      <div className="eleventh-details-container">
        <button
          type="button"
          className="details-back-btn"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          <span>Back to Streams</span>
        </button>

        <div className="stream-hero-card">
          <div className="stream-badge-row">
            <span className="stream-code-pill">
              {group.groupCode || "STREAM"}
            </span>
            <span className="stream-category-pill">
              {group.streamCategory || "Academic"}
            </span>
          </div>
          <h1>{group.groupName}</h1>
          <p>{group.description}</p>
        </div>

        <div className="stream-content-grid">
          {/* Core Subjects */}
          <div className="stream-panel-card">
            <div className="panel-title-wrap">
              <BookOpen size={20} color="#9333ea" />
              <h3>Subjects Taught in 11th &amp; 12th</h3>
            </div>
            <p className="panel-sub-hint">
              Core curriculum subjects studied under this group
            </p>
            <div className="subject-pills-wrap">
              {group.coreSubjects?.map((sub, i) => (
                <span key={i} className="subject-badge">
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div className="stream-panel-card">
            <h3>Eligibility Criteria</h3>
            <div className="eligibility-highlight-panel">
              {group.eligibility ||
                "Pass in 10th standard with qualifying marks in core subjects."}
            </div>
          </div>

          {/* College Courses */}
          <div className="stream-panel-card">
            <div className="panel-title-wrap">
              <GraduationCap size={20} color="#059669" />
              <div>
                <h3>College Course &amp; Degree Options</h3>
                <p className="panel-sub-hint">
                  Click any degree program to inspect syllabus and requirements
                </p>
              </div>
            </div>
            <div className="interactive-options-grid">
              {group.courseOptions?.map((crs, i) => (
                <div
                  key={i}
                  className="interactive-choice-row"
                  onClick={() => handleCourseClick(crs)}
                >
                  <div className="row-left">
                    <CheckCircle2 size={16} color="#059669" />
                    <span>{crs}</span>
                  </div>
                  <ArrowRight size={15} className="row-arrow" />
                </div>
              ))}
            </div>
          </div>

          {/* Career Opportunities */}
          <div className="stream-panel-card">
            <div className="panel-title-wrap">
              <Briefcase size={20} color="#ea580c" />
              <div>
                <h3>Career Opportunities</h3>
                <p className="panel-sub-hint">
                  Click any career role to view its milestone roadmap
                </p>
              </div>
            </div>
            <div className="interactive-options-grid">
              {group.careerOptions?.map((car, i) => (
                <div
                  key={i}
                  className="interactive-choice-row"
                  onClick={() => handleCareerClick(car)}
                >
                  <div className="row-left">
                    <CheckCircle2 size={16} color="#ea580c" />
                    <span>{car}</span>
                  </div>
                  <ArrowRight size={15} className="row-arrow" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EleventhGroupDetails;
