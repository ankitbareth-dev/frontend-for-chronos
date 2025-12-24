"use client";

import { useState } from "react";
import styles from "./Profile.module.sass";
import { FiCamera } from "react-icons/fi";


const USER = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatarUrl: null as string | null,
};

export default function Profile() {
  const [name, setName] = useState(USER.name);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(USER.avatarUrl);
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      /* TEMP PLACEHOLDER */
      console.log("Saving profile:", {
        name,
        avatar: avatarFile,
      });

      // simulate API delay
      await new Promise((res) => setTimeout(res, 800));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <section className={styles.profileCard}>
          {/* Avatar */}
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              {preview ? (
                <img src={preview} alt="Avatar" />
              ) : (
                <span>{USER.name.charAt(0).toUpperCase()}</span>
              )}
            </div>

            <label className={styles.avatarBtn}>
              <FiCamera size={16} />
              Change photo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          {/* Info + Form */}
          <div className={styles.info}>
            <h2>{USER.name}</h2>
            <p className={styles.email}>{USER.email}</p>

            <div className={styles.form}>
              <div className={styles.field}>
                <label>Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <button
                className={styles.saveBtn}
                disabled={loading || name === USER.name}
                onClick={handleSave}
              >
                {loading ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
