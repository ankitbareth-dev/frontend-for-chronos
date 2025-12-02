"use client";

import { ChangeEvent, useState } from "react";
import { FiCamera, FiMail, FiUser, FiShield } from "react-icons/fi";
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
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>{name.charAt(0)}</div>

            <h3 className={styles.username}>{name}</h3>
            <p className={styles.userEmail}>{email}</p>

            <button className={styles.secondaryBtn}>
              <FiCamera size={16} />
              Change Photo
            </button>

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

        {/* Main Content */}
        <main className={styles.content}>
          {/* Profile Information */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FiUser className={styles.icon} size={20} />
              <h2>Profile Information</h2>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Name</label>
              <input
                className={styles.input}
                type="text"
                value={name}
                onChange={handle(setName)}
                placeholder="Enter your name"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={handle(setEmail)}
                placeholder="Enter email"
              />
            </div>

            <button className={styles.primaryBtn}>Save Changes</button>
          </div>

          {/* Security Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FiShield className={styles.icon} size={20} />
              <h2>Security</h2>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Old Password</label>
              <input
                className={styles.input}
                type="password"
                value={oldPass}
                onChange={handle(setOldPass)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>New Password</label>
              <input
                className={styles.input}
                type="password"
                value={newPass}
                onChange={handle(setNewPass)}
                placeholder="Enter new password"
              />
            </div>

            <button className={styles.primaryBtn}>Update Password</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
