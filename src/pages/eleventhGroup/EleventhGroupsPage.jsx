import { Link } from "react-router-dom";

import { Sparkles, ArrowLeft } from "lucide-react";

import EleventhGroups from "../../components/eleventhGroup/EleventhGroups";

import "./eleventhGroupsPage.css";

const EleventhGroupsPage = () => {
  return (
    <section className="page eleventh-groups-page">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="eleventh-groups-page-header">
        <Link to="/" className="eleventh-groups-back">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <span className="eleventh-groups-page-badge">
          <Sparkles size={14} />
          START WITH YOUR 11TH GRADE
        </span>

        <h1>
          Explore 11th Grade <span>Groups</span>
        </h1>

        <p>
          Choose your group based on your interests and strengths. Each group
          opens up different subjects, courses and career opportunities — browse
          all available options below.
        </p>
      </div>

      {/* =====================================================
          GROUPS GRID
      ===================================================== */}

      <div className="eleventh-groups-page-content">
        <EleventhGroups />
      </div>
    </section>
  );
};

export default EleventhGroupsPage;
