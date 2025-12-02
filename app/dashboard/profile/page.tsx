"use client";

import { ChangeEvent, useState } from "react";
import styles from "./Profile.module.sass";

const Profile = () => {
  const [name, setName] = useState<string>("Ankit");
  const [email, setEmail] = useState<string>("ankit@mail.com");
  const [oldPass, setOldPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");

  const handle =
    (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        {/* Left panel */}
        <aside className={styles.sidebar}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>{name.charAt(0)}</div>

            <h3 className={styles.username}>{name}</h3>
            <p className={styles.userEmail}>{email}</p>

            <button className={styles.secondaryBtn}>Change Photo</button>

            <div className={styles.infoList}>
              <div>
                <span>Membership</span>
                <p>Standard User</p>
              </div>
              <div>
                <span>Joined</span>
                <p>Jan 2025</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Panel */}
        <main className={styles.content}>
          {/* Profile Info */}
          <div className={styles.section}>
            <h2>Profile Information</h2>

            <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={handle(setName)}
              placeholder="Enter your name"
            />

            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={handle(setEmail)}
              placeholder="Enter email"
            />

            <button className={styles.primaryBtn}>Save Changes</button>
          </div>

          {/* Security */}
          <div className={styles.section}>
            <h2>Security</h2>

            <label className={styles.label}>Old Password</label>
            <input
              className={styles.input}
              type="password"
              value={oldPass}
              onChange={handle(setOldPass)}
            />

            <label className={styles.label}>New Password</label>
            <input
              className={styles.input}
              type="password"
              value={newPass}
              onChange={handle(setNewPass)}
              placeholder="Enter new password"
            />

            <button className={styles.primaryBtn}>Update Password</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
