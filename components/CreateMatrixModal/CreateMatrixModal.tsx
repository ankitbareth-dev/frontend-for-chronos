"use client";

import { useState } from "react";
import styles from "./CreateMatrixModal.module.sass";
import { useMatricesActions } from "@/hooks/useMatricesActions";

interface Props {
  onClose: () => void;
}

const CreateMatrixModal = ({ onClose }: Props) => {
  const { createMatrixMutation } = useMatricesActions();

  const [form, setForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    interval: 60,
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {
    createMatrixMutation.mutate(form, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Create Matrix</h2>

        <div className={styles.formGroup}>
          <label>Name</label>
          <input
            className={styles.input}
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Start Date</label>
            <input
              className={styles.input}
              type="date"
              name="startDate"
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>End Date</label>
            <input
              className={styles.input}
              type="date"
              name="endDate"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Start Time</label>
            <input
              className={styles.input}
              type="time"
              name="startTime"
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>End Time</label>
            <input
              className={styles.input}
              type="time"
              name="endTime"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Interval (minutes)</label>
          <input
            className={styles.input}
            type="number"
            name="interval"
            value={form.interval}
            onChange={handleChange}
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.create} onClick={submit}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateMatrixModal;
