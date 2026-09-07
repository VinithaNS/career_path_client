import { useEffect, useRef, useState } from "react";

import { Camera, Save, User } from "lucide-react";

import { SERVER_BASE_URL } from "../../services/api";
import {
  getCurrentUser,
  updateUserProfile,
  uploadAvatar
} from "../../services/authService";
import { updateStudentProfile } from "../../services/studentService";
import { useAuth } from "../../pages/context/AuthContext";

import "./MyProfile.css";

const MyProfile = () => {
  const {
    loading: authLoading,
    studentProfile,
    updateLocalUser,
    refreshStudentProfile
  } = useAuth();

  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const response = await getCurrentUser();
        if (!isMounted) return;

        if (response?.success) {
          setUserData(response.data);
        } else {
          setError(response?.message || "Unable to load your profile.");
        }
      } catch (err) {
        if (!isMounted) return;
        setError(
          err?.response?.data?.message || "Unable to load your profile."
        );
      } finally {
        if (isMounted) setLoadingUser(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  if (authLoading || loadingUser) {
    return (
      <section className="my-profile-page">
        <div className="my-profile-container">
          <p>Loading your profile...</p>
        </div>
      </section>
    );
  }

  if (error && !userData) {
    return (
      <section className="my-profile-page">
        <div className="my-profile-container">
          <p className="profile-error">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <ProfileForm
      user={userData}
      studentProfile={studentProfile}
      updateLocalUser={updateLocalUser}
      refreshStudentProfile={refreshStudentProfile}
    />
  );
};

const ProfileForm = ({
  user,
  studentProfile,
  updateLocalUser,
  refreshStudentProfile
}) => {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    address: studentProfile?.address || "",
    city: studentProfile?.city || "",
    state: studentProfile?.state || "",
    schoolName: studentProfile?.schoolName || "",
    currentClass: studentProfile?.currentClass || "",
    stream: studentProfile?.stream || ""
  });

  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setMessage("");

    try {
      setUploading(true);
      const response = await uploadAvatar(file);

      if (response?.success) {
        setAvatarUrl(response.data.avatarUrl);
        updateLocalUser({ avatarUrl: response.data.avatarUrl });
        setMessage("Profile photo updated.");
      } else {
        setError(response?.message || "Upload failed.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      setSaving(true);

      const userResponse = await updateUserProfile({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        mobile: form.mobile
      });

      if (!userResponse?.success) {
        setError(userResponse?.message || "Unable to update profile.");
        return;
      }

      updateLocalUser({
        firstName: userResponse.data.firstName,
        lastName: userResponse.data.lastName,
        email: userResponse.data.email,
        mobile: userResponse.data.mobile
      });

      if (studentProfile?._id) {
        const studentResponse = await updateStudentProfile(studentProfile._id, {
          address: form.address,
          city: form.city,
          state: form.state,
          schoolName: form.schoolName,
          currentClass: form.currentClass,
          stream: form.stream
        });

        if (studentResponse?.success) {
          await refreshStudentProfile();
        }
      }

      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="my-profile-page">
      <div className="my-profile-container">
        <h1>My Profile</h1>
        <p className="my-profile-subtitle">
          Update your personal and academic details.
        </p>

        <div className="my-profile-card">
          <div className="avatar-section">
            <div className="avatar-wrapper" onClick={handleAvatarClick}>
              {avatarUrl ? (
                <img src={`${SERVER_BASE_URL}${avatarUrl}`} alt="Profile" />
              ) : (
                <User size={36} />
              )}
              <div className="avatar-overlay">
                <Camera size={18} />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp"
              onChange={handleAvatarChange}
              hidden
            />
            <span className="avatar-hint">
              {uploading ? "Uploading..." : "Click to change photo"}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="my-profile-form">
            <h3>Account Details</h3>
            <div className="form-row">
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
            <div className="form-row">
              <input
                type="email"
                name="email"
                placeholder="Email"
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
            </div>

            <h3>Address</h3>
            <input
              name="address"
              placeholder="Street address"
              value={form.address}
              onChange={handleChange}
            />
            <div className="form-row">
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

            <h3>Academic Details</h3>
            <input
              name="schoolName"
              placeholder="School name"
              value={form.schoolName}
              onChange={handleChange}
            />
            <div className="form-row">
              <input
                name="currentClass"
                placeholder="Current class"
                value={form.currentClass}
                onChange={handleChange}
              />
              <input
                name="stream"
                placeholder="Stream"
                value={form.stream}
                onChange={handleChange}
              />
            </div>

            {error && <p className="profile-error">{error}</p>}
            {message && <p className="profile-success">{message}</p>}

            <button type="submit" className="save-button" disabled={saving}>
              <Save size={17} />
              <span>{saving ? "Saving..." : "Save Changes"}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
