import { useState } from "react";

import { LogIn, GraduationCap } from "lucide-react";

import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../../pages/context/AuthContext";

import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await login(email, password);

      if (response?.success) {
        navigate("/");
      } else {
        setError(response?.message || "Login failed.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid email or password.");
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
        <h1>Welcome back</h1>
        <p>Log in to continue your journey.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            <LogIn size={18} />
            <span>{loading ? "Logging in..." : "Log In"}</span>
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
