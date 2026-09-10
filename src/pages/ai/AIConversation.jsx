// src/pages/ai/AIConversation.jsx

import { useEffect, useState } from "react";

import {
  Bot,
  Send,
  Plus,
  MessageCircle,
  MoreVertical,
  ShieldCheck
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import {
  createConversation,
  sendMessage,
  getStudentConversations,
  getConversationById
} from "../../services/aiConversationService";

import "./AIConversation.css";

const AIConversation = () => {
  const { studentProfile } = useAuth();
  const studentId = studentProfile?._id;

  // ==========================================
  // STATES
  // ==========================================

  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // LOAD CONVERSATIONS WHEN PAGE LOADS
  // ==========================================

  useEffect(() => {
    let cancelled = false;

    const fetchConversations = async () => {
      if (!studentId) return;

      try {
        const response = await getStudentConversations(studentId);
        if (!cancelled) {
          setConversations(response.data || []);
        }
      } catch (error) {
        console.error("Failed to load conversations:", error);
      }
    };

    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchConversations();

    return () => {
      cancelled = true;
    };
  }, [studentId]);

  // ==========================================
  // REFRESH CONVERSATIONS
  // ==========================================

  const refreshConversations = async () => {
    if (!studentId) return;

    try {
      const response = await getStudentConversations(studentId);
      setConversations(response.data || []);
    } catch (error) {
      console.error("Failed to refresh conversations:", error);
    }
  };

  // ==========================================
  // CREATE NEW CHAT (manual button)
  // ==========================================

  const handleNewChat = async () => {
    if (!studentId) return;

    try {
      const response = await createConversation({
        studentId,
        topic: "Career Guidance"
      });

      setActiveConversation(response.data);
      await refreshConversations();
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  // ==========================================
  // OPEN EXISTING CONVERSATION
  // ==========================================

  const openConversation = async (id) => {
    if (!studentId) return;

    try {
      const response = await getConversationById(id, studentId);
      setActiveConversation(response.data);
    } catch (error) {
      console.error("Failed to open conversation:", error);
    }
  };

  // ==========================================
  // SEND MESSAGE (auto-creates a conversation if none active)
  // ==========================================

  const handleSend = async () => {
    if (!message.trim() || loading || !studentId) return;

    const currentMessage = message.trim();
    setMessage("");
    setLoading(true);

    try {
      let conversation = activeConversation;

      // Auto-create a conversation if the student hasn't started one yet
      if (!conversation) {
        const createResponse = await createConversation({
          studentId,
          topic: "Career Guidance"
        });
        conversation = createResponse.data;
        setActiveConversation(conversation);
      }

      const response = await sendMessage(conversation._id, {
        studentId,
        message: currentMessage
      });

      setActiveConversation(response.data);
      await refreshConversations();
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessage(currentMessage);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // COMPONENT UI
  // ==========================================

  return (
    <div className="ai-conversation-page">
      <div className="ai-conversation-layout">
        {/* ======================================
            SIDEBAR
        ======================================= */}

        <aside className="ai-conversation-sidebar">
          <div className="ai-sidebar-header">
            <div className="ai-sidebar-brand">
              <div className="ai-sidebar-brand-icon">
                <Bot size={20} />
              </div>
              <div>
                <h3>CareerPath AI</h3>
                <span>AI Career Assistant</span>
              </div>
            </div>

            <button
              type="button"
              className="new-conversation-btn"
              onClick={handleNewChat}
            >
              <Plus size={15} />
              New conversation
            </button>
          </div>

          <div className="ai-conversation-list">
            <div className="conversation-list-title">CONVERSATIONS</div>

            {conversations.length === 0 ? (
              <div className="conversation-item">
                <MessageCircle size={17} className="conversation-item-icon" />
                <div className="conversation-item-content">
                  <strong>No conversations yet</strong>
                </div>
              </div>
            ) : (
              conversations.map((conversation) => (
                <button
                  type="button"
                  key={conversation._id}
                  className={`conversation-item ${
                    activeConversation?._id === conversation._id ? "active" : ""
                  }`}
                  onClick={() => openConversation(conversation._id)}
                >
                  <MessageCircle size={17} className="conversation-item-icon" />
                  <div className="conversation-item-content">
                    <strong>{conversation.topic || "Career Guidance"}</strong>
                    <span>{conversation.messages?.length || 0} messages</span>
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="ai-sidebar-footer">
            <div className="ai-sidebar-footer-content">
              <ShieldCheck size={14} />
              <span>
                AI guidance supports, not replaces, your own research and
                decisions.
              </span>
            </div>
          </div>
        </aside>

        {/* ======================================
            CHAT AREA
        ======================================= */}

        <main className="ai-chat-area">
          <header className="ai-chat-header">
            <div className="ai-chat-header-left">
              <div className="ai-avatar">
                <Bot size={20} />
              </div>
              <div className="ai-chat-title">
                <h2>CareerPath AI</h2>
                <p>AI Career Assistant</p>
              </div>
            </div>

            <div className="ai-chat-header-left">
              <div className="ai-status">
                <span className="ai-status-dot" />
                Online
              </div>
              <MoreVertical size={18} />
            </div>
          </header>

          {!activeConversation ? (
            <div className="ai-chat-empty">
              <div className="ai-chat-empty-content">
                <div className="ai-chat-empty-icon">
                  <Bot size={34} />
                </div>
                <h2>How can I help with your career?</h2>
                <p>
                  Ask me about careers, courses, skills, colleges, assessments
                  or your future path.
                </p>
              </div>
            </div>
          ) : (
            <div className="ai-messages">
              {activeConversation.messages?.map((item, index) => (
                <div
                  key={`${item.timestamp}-${index}`}
                  className={`ai-message-row ${item.role}`}
                >
                  <div
                    className={`message-avatar ${item.role === "assistant" ? "ai" : "user"}`}
                  >
                    {item.role === "assistant" ? <Bot size={16} /> : null}
                  </div>
                  <div className="message-content">
                    <div className="message-bubble">{item.message}</div>
                    <span className="message-time">
                      {item.timestamp
                        ? new Date(item.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                          })
                        : ""}
                    </span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="ai-typing">
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>
          )}

          <div className="ai-suggestions">
            <div className="ai-suggestions-label">SUGGESTIONS</div>
            <div className="ai-suggestion-list">
              <button
                className="ai-suggestion"
                onClick={() =>
                  setMessage("Which career is best for my interests?")
                }
              >
                🎯 Find my career
              </button>
              <button
                className="ai-suggestion"
                onClick={() => setMessage("What skills should I develop?")}
              >
                🧠 Skills to learn
              </button>
              <button
                className="ai-suggestion"
                onClick={() => setMessage("Which course should I choose?")}
              >
                📚 Course guidance
              </button>
              <button
                className="ai-suggestion"
                onClick={() =>
                  setMessage("What careers will grow in the future?")
                }
              >
                🚀 Future careers
              </button>
            </div>
          </div>

          <div className="ai-composer">
            <div className="ai-composer-box">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask your career question..."
                disabled={loading}
              />
              <button
                type="button"
                className="ai-send-btn"
                disabled={!message.trim() || loading}
                onClick={handleSend}
              >
                <Send size={16} />
              </button>
            </div>
            <p className="ai-composer-note">
              AI guidance is for educational support and should be combined with
              your own research and decisions.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIConversation;
