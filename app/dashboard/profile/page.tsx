"use client";

import { useState } from "react";
import { FiCamera, FiUser, FiShield } from "react-icons/fi";
import styles from "./Profile.module.sass";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useProfileActions } from "@/hooks/useProfileActions";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { updateProfileMutation } = useProfileActions();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  if (!user) return <div>Loading...</div>;

  // ---------------- PROFILE INFO ----------------
  const handleProfileSave = () => {
    const payload: { name?: string; email?: string } = {};
    if (name !== user.name) payload.name = name;
    if (email !== user.email) payload.email = email;

    if (Object.keys(payload).length === 0) return; // nothing to update

    updateProfileMutation.mutate(payload);
  };

  // ---------------- PASSWORD ----------------
  const handlePasswordUpdate = () => {
    if (!oldPassword || !newPassword) return; // require both
    const payload = { oldPassword, newPassword };
    updateProfileMutation.mutate(payload);
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        {/* TOP PROFILE CARD */}
        <section className={styles.profileTop}>
          <div className={styles.avatarLarge}>{user.name.charAt(0)}</div>
          <div className={styles.topInfo}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <button className={styles.secondaryBtn}>
              <FiCamera size={16} />
              Change Photo
            </button>
          </div>
        </section>

        {/* BOTTOM GRID */}
        <div className={styles.bottomGrid}>
          {/* PROFILE INFO */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <FiUser className={styles.icon} />
              <h2>Profile Information</h2>
            </div>

            <div className={styles.field}>
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className={styles.primaryBtn} onClick={handleProfileSave}>
              Save Profile
            </button>
          </section>

          {/* SECURITY */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <FiShield className={styles.icon} />
              <h2>Security</h2>
            </div>

            <div className={styles.field}>
              <label>Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button
              className={styles.primaryBtn}
              onClick={handlePasswordUpdate}
            >
              Update Password
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
