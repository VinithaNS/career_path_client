import { useCallback, useEffect, useState } from "react";

import { Plus, LifeBuoy, Clock, CheckCircle2, AlertCircle, X } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import {
  createSupport,
  getStudentSupports
} from "../../services/aiSupportService";

import "./AISupport.css";

const AISupport = () => {
  const { studentProfile } = useAuth();
  const studentId = studentProfile?._id;

  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    category: "General",
    subject: "",
    message: "",
    priority: "Medium"
  });

  const loadTickets = useCallback(async () => {
    if (!studentId) return;

    try {
      const response = await getStudentSupports(studentId);
      setTickets(response.data || []);
    } catch (error) {
      console.error("Failed to load support requests:", error);
    }
  }, [studentId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTickets();
  }, [loadTickets]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!studentId) return;

    try {
      await createSupport({ studentId, ...form });
      setForm({
        category: "General",
        subject: "",
        message: "",
        priority: "Medium"
      });
      setShowModal(false);
      await loadTickets();
    } catch (error) {
      console.error("Failed to create support request:", error);
    }
  };

  const statusIcon = (status) => {
    if (status === "Resolved") return <CheckCircle2 size={14} />;
    if (status === "Pending") return <Clock size={14} />;
    return <AlertCircle size={14} />;
  };

  return (
    <div className="ai-support-page">
      <header className="ai-support-header">
        <div className="ai-support-header-content">
          <div className="ai-support-title">
            <div className="ai-support-title-icon">
              <LifeBuoy size={24} />
            </div>
            <div>
              <span className="ai-support-label">CAREERPATH SUPPORT</span>
              <h1>How can we help?</h1>
              <p>
                Create a support request and our team will help you with your
                CareerPath journey.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="create-support-btn"
            onClick={() => setShowModal(true)}
          >
            <Plus size={16} />
            New Support Request
          </button>
        </div>
      </header>

      <div className="support-stats">
        <div className="support-stat-card">
          <div className="support-stat-icon support-total-icon">
            <LifeBuoy size={20} />
          </div>
          <div>
            <span>TOTAL REQUESTS</span>
            <strong>{tickets.length}</strong>
          </div>
        </div>
        <div className="support-stat-card">
          <div className="support-stat-icon support-open-icon">
            <AlertCircle size={20} />
          </div>
          <div>
            <span>OPEN</span>
            <strong>{tickets.filter((t) => t.status === "Open").length}</strong>
          </div>
        </div>
        <div className="support-stat-card">
          <div className="support-stat-icon support-pending-icon">
            <Clock size={20} />
          </div>
          <div>
            <span>PENDING</span>
            <strong>
              {tickets.filter((t) => t.status === "Pending").length}
            </strong>
          </div>
        </div>
        <div className="support-stat-card">
          <div className="support-stat-icon support-resolved-icon">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span>RESOLVED</span>
            <strong>
              {tickets.filter((t) => t.status === "Resolved").length}
            </strong>
          </div>
        </div>
      </div>

      <div className="support-main-grid">
        <section className="support-tickets-section">
          <div className="support-section-header">
            <div>
              <h2>Your support requests</h2>
              <p>{tickets.length} requests</p>
            </div>
          </div>

          {tickets.length === 0 ? (
            <div className="support-empty">
              <div className="support-empty-icon">
                <LifeBuoy size={26} />
              </div>
              <h3>No support requests yet</h3>
              <p>Need help? Create your first request.</p>
            </div>
          ) : (
            <div className="support-ticket-list">
              {tickets.map((ticket) => (
                <div className="support-ticket-card" key={ticket._id}>
                  <div className="support-ticket-top">
                    <div className="support-ticket-icon">
                      <LifeBuoy size={18} />
                    </div>
                    <div className="support-ticket-content">
                      <h3>{ticket.subject}</h3>
                      <p>{ticket.message}</p>
                    </div>
                    <span className="support-ticket-date">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="support-ticket-meta">
                    <span
                      className={`support-status ${ticket.status?.toLowerCase()}`}
                    >
                      {statusIcon(ticket.status)} {ticket.status}
                    </span>
                    <span
                      className={`support-priority ${ticket.priority?.toLowerCase()}`}
                    >
                      {ticket.priority}
                    </span>
                    <span className="support-category">{ticket.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="support-sidebar">
          <div className="support-info-card">
            <div className="support-info-icon">
              <LifeBuoy size={18} />
            </div>
            <h3>Need urgent help?</h3>
            <p>
              Our team typically responds within 24 hours for career and course
              guidance requests.
            </p>
          </div>
        </aside>
      </div>

      {showModal && (
        <div className="support-modal-overlay">
          <div className="support-modal">
            <div className="support-modal-header">
              <h2>Create support request</h2>
              <button
                type="button"
                className="support-modal-close"
                onClick={() => setShowModal(false)}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="support-modal-body">
                <div className="support-form-row">
                  <div className="support-form-group">
                    <label>Category</label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, category: e.target.value }))
                      }
                    >
                      <option>Career Guidance</option>
                      <option>Course Guidance</option>
                      <option>Skill Guidance</option>
                      <option>Assessment Help</option>
                      <option>Technical Support</option>
                      <option>General</option>
                    </select>
                  </div>
                  <div className="support-form-group">
                    <label>Priority</label>
                    <select
                      value={form.priority}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, priority: e.target.value }))
                      }
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>

                <div className="support-form-group">
                  <label>Subject</label>
                  <input
                    value={form.subject}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, subject: e.target.value }))
                    }
                    placeholder="What do you need help with?"
                    required
                  />
                </div>

                <div className="support-form-group">
                  <label>Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Explain your issue..."
                    required
                  />
                </div>
              </div>

              <div className="support-modal-footer">
                <button
                  type="button"
                  className="support-cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="support-submit-btn">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AISupport;