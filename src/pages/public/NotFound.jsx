import { useNavigate } from "react-router-dom";

import { AlertCircle, Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 20px"
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          background: "#fce7f3",
          color: "#db2777",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px"
        }}
      >
        <AlertCircle size={36} />
      </div>
      <h1 style={{ fontSize: "36px", color: "#1e1b2e", margin: "0 0 10px" }}>
        404 - Page Not Found
      </h1>
      <p
        style={{
          fontSize: "15px",
          color: "#64748b",
          maxWidth: "460px",
          margin: "0 0 24px",
          lineHeight: "1.6"
        }}
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <button
        type="button"
        onClick={() => navigate("/")}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 22px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #9333ea 0%, #ec1c8d 100%)",
          color: "#ffffff",
          border: "none",
          fontWeight: 700,
          cursor: "pointer"
        }}
      >
        <Home size={18} />
        Back to Home
      </button>
    </main>
  );
};

export default NotFound;
