import { useState } from "react";

import { School, ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { createStudentProfile } from "../../services/studentService";
import { useAuth } from "../../pages/context/AuthContext";

import "./Auth.css";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const { refreshStudentProfile } = useAuth();

  const [form, setForm] = useState({
    schoolName: "",
    currentClass: "",
    stream: "",
    city: "",
    state: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await createStudentProfile(form);

      if (response?.success) {
        await refreshStudentProfile();
        navigate("/");
      } else {
        setError(response?.message || "Unable to save profile.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to save profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">
          <School size={30} />
        </div>
        <h1>Complete your profile</h1>
        <p>Just a few details to personalize your experience.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            name="schoolName"
            placeholder="School name"
            value={form.schoolName}
            onChange={handleChange}
          />

          <div className="auth-row">
            <input
              name="currentClass"
              placeholder="Current class (e.g. 12th)"
              value={form.currentClass}
              onChange={handleChange}
            />
            <input
              name="stream"
              placeholder="Stream (e.g. Science)"
              value={form.stream}
              onChange={handleChange}
            />
          </div>

          <div className="auth-row">
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
            />
            <input
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            <span>{loading ? "Saving..." : "Finish Setup"}</span>
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default CompleteProfile;
