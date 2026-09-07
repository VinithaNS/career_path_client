import { createContext, useContext, useEffect, useState } from "react";

import { loginUser, registerUser } from "../../services/authService";
import { getMyStudentProfile } from "../../services/studentService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [studentProfile, setStudentProfile] = useState(() => {
    const stored = localStorage.getItem("studentProfile");
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = useState(true);

  const persistUser = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const persistStudentProfile = (profile) => {
    if (profile) {
      localStorage.setItem("studentProfile", JSON.stringify(profile));
    } else {
      localStorage.removeItem("studentProfile");
    }
    setStudentProfile(profile);
  };

  const refreshStudentProfile = async () => {
    try {
      const response = await getMyStudentProfile();
      if (response?.success) {
        persistStudentProfile(response.data);
        return response.data;
      }
    } catch {
      persistStudentProfile(null);
    }
    return null;
  };

  const updateLocalUser = (updatedFields) => {
    setUser((prev) => {
      const merged = { ...prev, ...updatedFields };
      localStorage.setItem("user", JSON.stringify(merged));
      return merged;
    });
  };

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("token");
      if (token && user?.role === "student") {
        await refreshStudentProfile();
      }
      setLoading(false);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const register = async (data) => {
    const response = await registerUser(data);
    if (response?.success) {
      persistUser(response.data.user, response.data.token);
      if (response.data.user.role === "student") {
        await refreshStudentProfile();
      }
    }
    return response;
  };

  const login = async (email, password) => {
    const response = await loginUser(email, password);
    if (response?.success) {
      persistUser(response.data.user, response.data.token);
      if (response.data.user.role === "student") {
        await refreshStudentProfile();
      }
    }
    return response;
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("studentProfile");
    setUser(null);
    setStudentProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        studentProfile,
        loading,
        register,
        login,
        logout,
        refreshStudentProfile,
        updateLocalUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
