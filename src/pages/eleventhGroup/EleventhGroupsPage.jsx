import { GraduationCap } from "lucide-react";

import EleventhGroups from "../../components/eleventhGroup/EleventhGroups";

import "./eleventhGroupsPage.css";

const EleventhGroupsPage = () => {
  return (
    <section className="page eleventh-groups-page">
      <div className="eleventh-groups-page-header">
        <div className="eleventh-groups-page-icon">
          <GraduationCap size={28} />
        </div>

        <div>
          <span className="eleventh-groups-page-eyebrow">
            START WITH YOUR 11TH GRADE
          </span>

          <h1>Explore 11th Grade Groups</h1>

          <p>
            Choose your group based on your interests and strengths. Each group
            opens up different career opportunities.
          </p>
        </div>
      </div>

      <EleventhGroups />
    </section>
  );
};

export default EleventhGroupsPage;
