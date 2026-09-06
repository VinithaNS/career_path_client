export const getCurrentStudentId = () => {
  const stored = localStorage.getItem("studentProfile");
  const profile = stored ? JSON.parse(stored) : null;
  return profile?._id || null;
};

export const isLoggedIn = () => {
  return Boolean(localStorage.getItem("token"));
};
