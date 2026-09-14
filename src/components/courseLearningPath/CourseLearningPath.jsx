import React, { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Search,
  PlayCircle,
  CheckCircle2,
  BarChart3,
  Tag,
  ArrowUpRight,
  Code2,
  Video,
  Loader2,
  Inbox
} from "lucide-react";

import {
  getActiveSkills,
  searchSkills,
  getSkillById,
  getSkillVideos
} from "../../services/skillService";

import "./CourseLearningPath.css";

/**
 * CourseLearningPath
 * -------------------
 * Left panel   -> getActiveSkills() / searchSkills(query)
 * Middle panel -> getSkillById(id)     (skillName, description, level,
 *                                        skillType, skillCode,
 *                                        learningTopics, prerequisites,
 *                                        imageUrl)
 * Right panel  -> getSkillVideos(id)   ({ primary, recommended })
 *
 * Every service call resolves to the raw backend payload
 * { success, message, data } (same shape as your careerService),
 * so each response is unwrapped here with `.data`.
 *
 * NOTE: Skill has no `duration` field yet, so that badge is omitted
 *   (level/skillType/skillCode are shown instead).
 * "View Full Roadmap" navigates to /roadmap/:id using `detail.roadmapId`
 *   (see the skillModel/skillService edits below — add a `roadmapId`
 *   ref on Skill and populate it in getSkillById). If a course has no
 *   roadmapId yet, the button shows "Roadmap coming soon" and is disabled.
 *
 * Pass `embedded` when dropping this into another page's section
 * (e.g. Home.jsx) — it hides this component's own title block and
 * full-bleed background so it sits inside the host page's own header.
 */

function formatDuration(totalSeconds) {
  if (!totalSeconds && totalSeconds !== 0) return "";
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`;
}

/**
 * Defensive normalizer: the backend should always store a clean 11-char
 * YouTube ID in `youtubeVideoId`, but if a full URL ever slips in
 * (watch?v=, youtu.be/, embed/, or even a URL-encoded one) this pulls
 * the real ID back out instead of building a broken nested link.
 * Falls back to whatever was passed in if nothing recognizable is found.
 */
function extractYoutubeId(value) {
  if (!value) return "";
  const raw = String(value).trim();

  // already looks like a bare 11-char YouTube ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) return raw;

  // decode in case it was pasted URL-encoded (e.g. https%3A%2F%2F...)
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    // ignore malformed encoding, fall through with the raw value
  }

  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/, // watch?v=ID
    /youtu\.be\/([a-zA-Z0-9_-]{11})/, // youtu.be/ID
    /embed\/([a-zA-Z0-9_-]{11})/, // embed/ID
    /shorts\/([a-zA-Z0-9_-]{11})/ // shorts/ID
  ];

  for (const pattern of patterns) {
    const match = decoded.match(pattern);
    if (match) return match[1];
  }

  return raw;
}

function youtubeWatchUrl(value) {
  const id = extractYoutubeId(value);
  return id ? `https://www.youtube.com/watch?v=${id}` : "";
}

export default function CourseLearningPath({ embedded = false }) {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [query, setQuery] = useState("");

  const [activeId, setActiveId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const [videos, setVideos] = useState({ primary: null, recommended: [] });
  const [videosLoading, setVideosLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");

  // ---- left-hand list: active skills, or search results ----
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setListLoading(true);
      setErrorMsg("");
      try {
        const res = query.trim()
          ? await searchSkills(query.trim(), controller.signal)
          : await getActiveSkills(controller.signal);

        if (!res.success)
          throw new Error(res.message || "Failed to load skills");

        const data = res.data || [];
        setSkills(data);
        if (!activeId && data.length > 0) {
          setActiveId(data[0]._id);
        }
      } catch (err) {
        if (err.code !== "ERR_CANCELED") setErrorMsg(err.message);
      } finally {
        setListLoading(false);
      }
    }, 300); // debounce typing

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // ---- selected skill's detail + videos ----
  useEffect(() => {
    if (!activeId) return;
    const controller = new AbortController();

    (async () => {
      setDetailLoading(true);
      setErrorMsg("");
      try {
        const res = await getSkillById(activeId, controller.signal);
        if (!res.success)
          throw new Error(res.message || "Failed to load skill");
        setDetail(res.data);
      } catch (err) {
        if (err.code !== "ERR_CANCELED") setErrorMsg(err.message);
      } finally {
        setDetailLoading(false);
      }
    })();

    (async () => {
      setVideosLoading(true);
      try {
        const res = await getSkillVideos(activeId, controller.signal);
        if (res.success) {
          setVideos({
            primary: res.data.primary,
            recommended: res.data.recommended || []
          });
        }
      } catch (err) {
        // videos are supplementary — fail quietly, detail card still renders
      } finally {
        setVideosLoading(false);
      }
    })();

    return () => controller.abort();
  }, [activeId]);

  const filteredSkills = useMemo(() => skills, [skills]);

  return (
    <div className={`clp${embedded ? " clp--embedded" : ""}`}>
      <div className="clp-inner">
        {!embedded && (
          <div className="clp-header">
            <p className="clp-eyebrow">Learn 11th Skills</p>
            <h1 className="clp-title">
              Course Details &amp;{" "}
              <span className="clp-title-gradient">Learning Path</span>
            </h1>
            <p className="clp-subtitle">
              Get detailed fundamentals, real-world examples and handpicked
              YouTube videos for each course.
            </p>
          </div>
        )}

        {errorMsg && (
          <div className="clp-error">
            {errorMsg} — check that the API is running at
            http://localhost:5000/api.
          </div>
        )}

        <div className="clp-grid">
          {/* LEFT: search + skill list */}
          <div className="clp-card clp-list-card">
            <div className="clp-search">
              <Search size={16} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Example: MERN Developer"
              />
            </div>

            <div className="clp-list">
              {listLoading && (
                <div className="clp-loading">
                  <Loader2 size={16} className="clp-spin" /> Loading courses...
                </div>
              )}

              {!listLoading && filteredSkills.length === 0 && (
                <div className="clp-empty">
                  <Inbox size={18} />
                  No matching courses.
                </div>
              )}

              {!listLoading &&
                filteredSkills.map((s) => (
                  <button
                    key={s._id}
                    onClick={() => setActiveId(s._id)}
                    className={`clp-skill-row${s._id === activeId ? " is-active" : ""}`}
                  >
                    <span className="clp-skill-icon">
                      <Code2 size={16} />
                    </span>
                    <span className="clp-skill-name">{s.skillName}</span>
                  </button>
                ))}
            </div>
          </div>

          {/* MIDDLE: course detail card */}
          <div className="clp-card clp-detail-card">
            {detailLoading || !detail ? (
              <div className="clp-loading" style={{ padding: "64px 0" }}>
                <Loader2 size={16} className="clp-spin" /> Loading details...
              </div>
            ) : (
              <>
                <div className="clp-detail-head">
                  <span className="clp-detail-icon">
                    {detail.imageUrl ? (
                      <img src={detail.imageUrl} alt="" />
                    ) : (
                      <Code2 size={20} />
                    )}
                  </span>
                  <div>
                    <h2 className="clp-detail-name">{detail.skillName}</h2>
                    <p className="clp-detail-desc">{detail.description}</p>
                  </div>
                </div>

                <div className="clp-badges">
                  <span className="clp-badge clp-badge--violet">
                    <BarChart3 size={14} />
                    {detail.level}
                  </span>
                  <span className="clp-badge clp-badge--magenta">
                    <Tag size={14} />
                    {detail.skillType}
                  </span>
                  <span className="clp-badge clp-badge--mint">
                    {detail.skillCode}
                  </span>
                </div>

                <hr className="clp-divider" />

                {detail.learningTopics?.length > 0 && (
                  <>
                    <p className="clp-section-label">Fundamentals</p>
                    <ul className="clp-checklist">
                      {detail.learningTopics.map((topic, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {detail.prerequisites?.length > 0 && (
                  <>
                    <p
                      className="clp-section-label"
                      style={{ marginTop: "16px" }}
                    >
                      Prerequisites
                    </p>
                    <div className="clp-tags">
                      {detail.prerequisites.map((p, i) => (
                        <span key={i} className="clp-tag">
                          {p}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                {(() => {
                  // roadmapId may arrive populated ({ _id, ... }) or as a bare id string
                  const roadmapId =
                    detail.roadmapId?._id || detail.roadmapId || null;
                  return (
                    <button
                      className="clp-roadmap-btn"
                      disabled={!roadmapId}
                      onClick={() =>
                        roadmapId && navigate(`/roadmap/${roadmapId}`)
                      }
                      title={
                        roadmapId
                          ? undefined
                          : "No roadmap linked to this course yet"
                      }
                    >
                      {roadmapId ? "View Full Roadmap" : "Roadmap coming soon"}
                      <ArrowUpRight size={16} />
                    </button>
                  );
                })()}
              </>
            )}
          </div>

          {/* RIGHT: video player + recommended list */}
          <div className="clp-card clp-video-card">
            <div className="clp-video-player">
              {videosLoading ? (
                <Loader2
                  size={24}
                  className="clp-spin"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                />
              ) : videos.primary ? (
                <>
                  <div className="clp-video-player-inner">
                    <a
                      href={youtubeWatchUrl(videos.primary.youtubeVideoId)}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Play video"
                      className="clp-play-btn"
                    >
                      <PlayCircle size={30} />
                    </a>
                    <p className="clp-video-title">{videos.primary.title}</p>
                  </div>
                  <span className="clp-duration-badge">
                    {formatDuration(videos.primary.durationSeconds)}
                  </span>
                </>
              ) : (
                <p className="clp-video-empty">No primary video yet</p>
              )}
            </div>

            <div className="clp-video-list-wrap">
              <p className="clp-video-list-label">
                <Video size={16} />
                Recommended Videos
              </p>

              <div className="clp-video-list">
                {videos.recommended.length === 0 && !videosLoading && (
                  <p className="clp-video-empty-list">
                    No recommended videos yet.
                  </p>
                )}
                {videos.recommended.map((v) => (
                  <a
                    key={v._id}
                    href={youtubeWatchUrl(v.youtubeVideoId)}
                    target="_blank"
                    rel="noreferrer"
                    className="clp-video-row"
                  >
                    <span className="clp-video-row-main">
                      <span className="clp-video-thumb">
                        <PlayCircle size={14} />
                      </span>
                      <span className="clp-video-text">
                        <span className="clp-video-name">{v.title}</span>
                        <span className="clp-video-channel">
                          {v.channelName}
                        </span>
                      </span>
                    </span>
                    <span className="clp-video-duration">
                      {formatDuration(v.durationSeconds)}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
