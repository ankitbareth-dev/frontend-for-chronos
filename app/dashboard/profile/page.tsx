"use client";

import { ChangeEvent, useState } from "react";
import { FiCamera, FiUser, FiShield } from "react-icons/fi";
import styles from "./Profile.module.sass";

const Profile = () => {
  const [name, setName] = useState("Ankit");
  const [email, setEmail] = useState("ankit@mail.com");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const handle = (setter: any) => (e: ChangeEvent<HTMLInputElement>) =>
    setter(e.target.value);

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        {/* TOP PROFILE CARD (FULL WIDTH) */}
        <section className={styles.profileTop}>
          <div className={styles.avatarLarge}>{name.charAt(0)}</div>

          <div className={styles.topInfo}>
            <h2>{name}</h2>
            <p>{email}</p>

            <button className={styles.secondaryBtn}>
              <FiCamera size={16} />
              Change Photo
            </button>
          </div>

          <div className={styles.metaGrid}>
            <div>
              <span>Membership</span>
              <p>Standard User</p>
            </div>

            <div>
              <span>Joined</span>
              <p>Jan 2025</p>
            </div>
          </div>
        </section>

        {/* BOTTOM GRID */}
        <div className={styles.bottomGrid}>
          {/* LEFT → PROFILE INFO */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <FiUser className={styles.icon} />
              <h2>Profile Information</h2>
            </div>

            <div className={styles.field}>
              <label>Name</label>
              <input type="text" value={name} onChange={handle(setName)} />
            </div>

            <div className={styles.field}>
              <label>Email</label>
              <input type="email" value={email} onChange={handle(setEmail)} />
            </div>

            <button className={styles.primaryBtn}>Save Changes</button>
          </section>

          {/* RIGHT → SECURITY */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <FiShield className={styles.icon} />
              <h2>Security</h2>
            </div>

            <div className={styles.field}>
              <label>Old Password</label>
              <input
                type="password"
                value={oldPass}
                onChange={handle(setOldPass)}
              />
            </div>

            <div className={styles.field}>
              <label>New Password</label>
              <input
                type="password"
                value={newPass}
                onChange={handle(setNewPass)}
              />
            </div>

            <button className={styles.primaryBtn}>Update Password</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
