const CareerLogo = ({ size = 36 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="cpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* Modern Rounded Background */}
      <rect width="48" height="48" rx="13" fill="url(#cpGrad)" />

      {/* Graduation Cap Top */}
      <path d="M24 13L37 19.5L24 26L11 19.5L24 13Z" fill="#ffffff" />

      {/* Cap Underneath Base */}
      <path
        d="M16 22.5V28.5C16 31.8 19.6 34.5 24 34.5C28.4 34.5 32 31.8 32 28.5V22.5L24 26.5L16 22.5Z"
        fill="#ffffff"
        fillOpacity="0.88"
      />

      {/* Tassel & Guiding Compass Star Path */}
      <path
        d="M36 21V28.5M36 28.5C34.8 28.5 34 29.5 34 30.5C34 31.5 34.8 32.5 36 32.5C37.2 32.5 38 31.5 38 30.5C38 29.5 37.2 28.5 36 28.5Z"
        stroke="#fdf2f8"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Future Direction Spark */}
      <circle cx="24" cy="21.5" r="1.8" fill="#9333ea" />
    </svg>
  );
};

export default CareerLogo;
