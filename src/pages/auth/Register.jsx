import { useState } from "react";

import { UserPlus, GraduationCap } from "lucide-react";

import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../../pages/context/AuthContext";

import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    role: "student"
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
      const response = await register(form);

      if (response?.success) {
        if (response.data.user.role === "student") {
          navigate("/complete-profile");
        } else {
          navigate("/");
        }
      } else {
        setError(response?.message || "Registration failed.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">
          <GraduationCap size={30} />
        </div>
        <h1>Create your account</h1>
        <p>Start exploring careers, courses and colleges.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-row">
            <input
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="mobile"
            placeholder="Mobile number"
            value={form.mobile}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={handleChange}
            minLength={6}
            required
          />

          <select name="role" value={form.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="parent">Parent</option>
            <option value="teacher">Teacher</option>
            <option value="counselor">Counselor</option>
          </select>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            <UserPlus size={18} />
            <span>{loading ? "Creating account..." : "Create Account"}</span>
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
