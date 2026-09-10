import { useCallback, useEffect, useState } from "react";

import {
  Search,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Briefcase,
  Brain,
  ArrowUpRight
} from "lucide-react";

import { getAllAIReplacements } from "../../services/aiReplaceService";

import "./AIReplaceTracker.css";

const badgeClass = {
  Low: "low",
  Medium: "medium",
  High: "high",
  "Very High": "very-high"
};

const AIReplaceTracker = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [search, setSearch] = useState("");

  const loadJobs = useCallback(async () => {
    try {
      const response = await getAllAIReplacements();
      const jobData = response.data || [];
      setJobs(jobData);
      setSelectedJob(jobData.length > 0 ? jobData[0] : null);
    } catch (error) {
      console.error("Failed to load AI replacement data:", error);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadJobs();
  }, [loadJobs]);

  const filteredJobs = jobs.filter((job) =>
    job.humanRole?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ai-replace-page">
      <header className="ai-replace-header">
        <div className="ai-replace-header-content">
          <div className="ai-replace-title">
            <div className="ai-replace-title-icon">
              <Brain size={26} />
            </div>
            <div>
              <span className="ai-replace-label">AI CAREER IMPACT</span>
              <h1>Understand the future of your career</h1>
              <p>
                Explore how AI and automation may change different jobs and
                which skills can help you stay future-ready.
              </p>
            </div>
          </div>

          <div className="ai-replace-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search a job role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      {selectedJob && (
        <div className="ai-impact-stats">
          <div className="ai-impact-stat">
            <div className="ai-impact-stat-icon impact-gold">
              <TrendingUp size={20} />
            </div>
            <div>
              <span>AI REPLACEMENT</span>
              <strong>{selectedJob.replacementPercentage}%</strong>
            </div>
          </div>
          <div className="ai-impact-stat">
            <div className="ai-impact-stat-icon impact-blue">
              <Briefcase size={20} />
            </div>
            <div>
              <span>CURRENT DEMAND</span>
              <strong>{selectedJob.currentDemand}</strong>
            </div>
          </div>
          <div className="ai-impact-stat">
            <div className="ai-impact-stat-icon impact-green">
              <ArrowUpRight size={20} />
            </div>
            <div>
              <span>FUTURE DEMAND</span>
              <strong>{selectedJob.futureDemand}</strong>
            </div>
          </div>
          <div className="ai-impact-stat">
            <div className="ai-impact-stat-icon impact-purple">
              <Brain size={20} />
            </div>
            <div>
              <span>AUTOMATION LEVEL</span>
              <strong>{selectedJob.automationLevel}</strong>
            </div>
          </div>
        </div>
      )}

      <div className="ai-impact-main">
        <section className="ai-impact-section">
          <div className="ai-impact-section-header">
            <div>
              <h2>Job roles</h2>
              <p>{filteredJobs.length} roles found</p>
            </div>
          </div>

          <div className="ai-impact-role-list">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  className="ai-impact-role-card"
                  key={job._id}
                  onClick={() => setSelectedJob(job)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="ai-role-top">
                    <div className="ai-role-icon">
                      <Briefcase size={18} />
                    </div>
                    <div className="ai-role-info">
                      <h3>{job.humanRole}</h3>
                      <span>{job.domain}</span>
                    </div>
                    <span
                      className={`ai-automation-badge ${badgeClass[job.automationLevel] || "medium"}`}
                    >
                      {job.automationLevel}
                    </span>
                  </div>

                  <div className="ai-automation-progress">
                    <div className="ai-automation-progress-header">
                      <span>AI Replacement</span>
                      <strong>{job.replacementPercentage}%</strong>
                    </div>
                    <div className="ai-automation-bar">
                      <div
                        className="ai-automation-fill"
                        style={{ width: `${job.replacementPercentage}%` }}
                      />
                    </div>
                  </div>

                  {job === selectedJob && (
                    <>
                      <p
                        style={{
                          fontSize: "10px",
                          color: "#7c8592",
                          marginBottom: "13px"
                        }}
                      >
                        {job.jobDescription}
                      </p>
                      <div className="ai-role-details">
                        <div className="ai-role-detail">
                          <span>Sector</span>
                          <strong>{job.sector}</strong>
                        </div>
                        <div className="ai-role-detail">
                          <span>Current Demand</span>
                          <strong>{job.currentDemand}</strong>
                        </div>
                        <div className="ai-role-detail">
                          <span>Future Demand</span>
                          <strong>{job.futureDemand}</strong>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No job roles found.</p>
            )}
          </div>
        </section>

        {selectedJob && (
          <aside className="ai-impact-sidebar">
            <div className="ai-impact-sidebar-card">
              <div className="ai-impact-sidebar-header">
                <div className="ai-impact-sidebar-header-icon">
                  <AlertTriangle size={16} />
                </div>
                <h3>Jobs at risk</h3>
              </div>
              <div className="ai-job-list">
                {selectedJob.jobsAtRisk?.length > 0 ? (
                  selectedJob.jobsAtRisk.map((job, i) => (
                    <div className="ai-job-item" key={`${job}-${i}`}>
                      <span>{job}</span>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: "9px", color: "#8b939f" }}>
                    No jobs listed.
                  </p>
                )}
              </div>
            </div>

            <div className="ai-impact-sidebar-card ai-new-jobs">
              <div className="ai-impact-sidebar-header">
                <div className="ai-impact-sidebar-header-icon">
                  <CheckCircle2 size={16} />
                </div>
                <h3>New opportunities</h3>
              </div>
              <div className="ai-job-list">
                {selectedJob.newJobsCreated?.length > 0 ? (
                  selectedJob.newJobsCreated.map((job, i) => (
                    <div className="ai-job-item" key={`${job}-${i}`}>
                      <span>{job}</span>
                    </div>
                  ))
                ) : (
                  <p style={{ fontSize: "9px", color: "#8b939f" }}>
                    No opportunities listed.
                  </p>
                )}
              </div>
            </div>

            <div className="ai-impact-sidebar-card">
              <div className="ai-impact-sidebar-header">
                <div className="ai-impact-sidebar-header-icon">
                  <Brain size={16} />
                </div>
                <h3>Future skills</h3>
              </div>
              <div className="ai-future-skills">
                {selectedJob.requiredSkills?.length > 0 ? (
                  selectedJob.requiredSkills.map((skill, i) => (
                    <span className="ai-future-skill" key={`${skill}-${i}`}>
                      {skill}
                    </span>
                  ))
                ) : (
                  <span>No skills listed.</span>
                )}
              </div>
            </div>

            <div className="ai-impact-explanation">
              <h3>What does this mean for you?</h3>
              <p>{selectedJob.explanation}</p>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default AIReplaceTracker;
