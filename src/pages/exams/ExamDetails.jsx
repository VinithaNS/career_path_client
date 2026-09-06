import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  RefreshCw,
  Users
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { getEligibilityByExam } from "../../services/examEligibilityService";
import { getSyllabusByExam } from "../../services/examSyllabusService";
import { getGovernmentExamById } from "../../services/governmentExamService";

import "./ExamDetails.css";

const ExamDetails = () => {
  const { id } = useParams();

  if (!id) {
    return <ExamDetailsError message="Exam ID is missing." />;
  }

  return <ExamDetailsContent key={id} examId={id} />;
};

const ExamDetailsContent = ({ examId }) => {
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [eligibilityList, setEligibilityList] = useState([]);
  const [syllabusList, setSyllabusList] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const response = await getGovernmentExamById(examId);

        if (!isMounted) return;

        if (response?.success && response?.data) {
          setExam(response.data);
          setError("");

          const [eligRes, syllRes] = await Promise.allSettled([
            getEligibilityByExam(examId),
            getSyllabusByExam(examId)
          ]);

          if (
            isMounted &&
            eligRes.status === "fulfilled" &&
            eligRes.value?.success
          ) {
            setEligibilityList(eligRes.value.data || []);
          }
          if (
            isMounted &&
            syllRes.status === "fulfilled" &&
            syllRes.value?.success
          ) {
            setSyllabusList(syllRes.value.data || []);
          }
        } else {
          setExam(null);
          setError(response?.message || "Exam not found.");
        }
      } catch (err) {
        console.error("Exam Details API Error:", err);
        if (!isMounted) return;
        setExam(null);
        setError(
          err?.response?.data?.message || "Unable to load exam details."
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [examId]);

  if (loading) {
    return (
      <section className="exam-details-page">
        <div className="exam-details-loading">
          <RefreshCw size={32} className="spin" />
          <h2>Loading exam details...</h2>
        </div>
      </section>
    );
  }

  if (error || !exam) {
    return <ExamDetailsError message={error} />;
  }

  const eligibility = eligibilityList[0];
  const syllabus = syllabusList[0];

  return (
    <section className="exam-details-page">
      <div className="exam-details-container">
        <button
          type="button"
          className="back-exam-btn"
          onClick={() => navigate("/exams")}
        >
          <ArrowLeft size={18} />
          <span>Back to Exams</span>
        </button>

        <div className="exam-details-hero">
          <div className="exam-details-icon">
            <ClipboardList size={34} />
          </div>

          <div className="exam-details-heading">
            <div className="exam-meta">
              <span className="exam-code-badge">{exam.examCode}</span>
              <span className="exam-type-badge">{exam.examType}</span>
              <span className="exam-mode-badge">{exam.examMode}</span>
            </div>
            <h1>{exam.examName}</h1>
            <p>
              {exam.description || "Explore eligibility and syllabus details."}
            </p>
          </div>
        </div>

        <div className="exam-quick-info">
          <div className="exam-info-item">
            <div className="exam-info-icon blue">
              <Users size={21} />
            </div>
            <div>
              <span>Conducting Authority</span>
              <strong>{exam.conductingAuthority}</strong>
            </div>
          </div>
          <div className="exam-info-item">
            <div className="exam-info-icon green">
              <Award size={21} />
            </div>
            <div>
              <span>Application Fee</span>
              <strong>{exam.applicationFee || "Not available"}</strong>
            </div>
          </div>
          <div className="exam-info-item">
            <div className="exam-info-icon orange">
              <ClipboardList size={21} />
            </div>
            <div>
              <span>Frequency</span>
              <strong>{exam.examFrequency || "Not available"}</strong>
            </div>
          </div>
        </div>

        <div className="exam-tabs">
          {["overview", "eligibility", "syllabus"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="exam-tab-content">
          {activeTab === "overview" && (
            <div className="exam-details-card">
              <h2>About This Exam</h2>
              <p className="exam-description">
                {exam.description || "No description available."}
              </p>

              {exam.eligibility && (
                <div className="exam-detail-block">
                  <h3>General Eligibility</h3>
                  <p>{exam.eligibility}</p>
                </div>
              )}

              {exam.officialWebsite && (
                <div className="exam-detail-block">
                  <h3>Official Website</h3>
                  <a
                    href={exam.officialWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="exam-website-link"
                  >
                    <ExternalLink size={15} />
                    <span>{exam.officialWebsite}</span>
                  </a>
                </div>
              )}
            </div>
          )}

          {activeTab === "eligibility" && (
            <div className="exam-details-card">
              <h2>Eligibility Criteria</h2>

              {eligibility ? (
                <>
                  <div className="exam-detail-block">
                    <h3>{eligibility.eligibilityTitle}</h3>
                    <p>{eligibility.educationalQualification}</p>
                  </div>

                  {(eligibility.ageLimit?.minimum ||
                    eligibility.ageLimit?.maximum) && (
                    <div className="exam-detail-block">
                      <h3>Age Limit</h3>
                      <p>
                        {eligibility.ageLimit?.minimum || "—"} to{" "}
                        {eligibility.ageLimit?.maximum || "—"} years
                        {eligibility.ageRelaxation &&
                          ` (${eligibility.ageRelaxation})`}
                      </p>
                    </div>
                  )}

                  {eligibility.eligibleStreams?.length > 0 && (
                    <div className="exam-detail-block">
                      <h3>Eligible Streams</h3>
                      <div className="exam-tag-list">
                        {eligibility.eligibleStreams.map((s, i) => (
                          <span key={i}>
                            <CheckCircle2 size={14} />
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {eligibility.workExperienceRequired && (
                    <div className="exam-detail-block">
                      <h3>Work Experience</h3>
                      <p>{eligibility.workExperience}</p>
                    </div>
                  )}
                </>
              ) : (
                <p className="empty-exam-detail">
                  No detailed eligibility criteria added yet.
                </p>
              )}
            </div>
          )}

          {activeTab === "syllabus" && (
            <div className="exam-details-card">
              <h2>Syllabus & Exam Pattern</h2>

              {syllabus ? (
                <>
                  {syllabus.examPattern && (
                    <div className="exam-pattern-grid">
                      <div>
                        <span>Total Marks</span>
                        <strong>{syllabus.examPattern.totalMarks}</strong>
                      </div>
                      <div>
                        <span>Total Questions</span>
                        <strong>{syllabus.examPattern.totalQuestions}</strong>
                      </div>
                      <div>
                        <span>Duration</span>
                        <strong>{syllabus.examPattern.duration}</strong>
                      </div>
                      <div>
                        <span>Negative Marking</span>
                        <strong>
                          {syllabus.examPattern.negativeMarking ? "Yes" : "No"}
                        </strong>
                      </div>
                    </div>
                  )}

                  {syllabus.subjects?.length > 0 && (
                    <div className="exam-detail-block">
                      <h3>Subjects</h3>
                      <div className="exam-subjects-list">
                        {syllabus.subjects.map((subj, i) => (
                          <div className="exam-subject-item" key={i}>
                            <div className="exam-subject-header">
                              <BookOpen size={16} />
                              <strong>{subj.subjectName}</strong>
                              {subj.marks > 0 && (
                                <span>{subj.marks} marks</span>
                              )}
                            </div>
                            {subj.topics?.length > 0 && (
                              <p>{subj.topics.join(", ")}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {syllabus.preparationTips?.length > 0 && (
                    <div className="exam-detail-block">
                      <h3>Preparation Tips</h3>
                      <ul className="exam-tips-list">
                        {syllabus.preparationTips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <p className="empty-exam-detail">No syllabus added yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const ExamDetailsError = ({ message }) => {
  const navigate = useNavigate();

  return (
    <section className="exam-details-page">
      <div className="exam-details-error">
        <div className="exam-error-icon">
          <ClipboardList size={38} />
        </div>
        <h2>Exam Not Found</h2>
        <p>{message || "The requested exam could not be found."}</p>
        <button type="button" onClick={() => navigate("/exams")}>
          <ArrowLeft size={18} />
          <span>Back to Exams</span>
        </button>
      </div>
    </section>
  );
};

export default ExamDetails;
