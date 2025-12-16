"use client";

import { useState, useEffect } from "react";
import styles from "./MatrixCategories.module.sass";
import { FiTrash2, FiEdit2, FiPlus } from "react-icons/fi";

interface MatrixCategoriesProps {
  matrixId: string;
  selectedCategoryId: string | null;
  onSelectCategory: (cat: any | null) => void;
}

/* ---------------- API ---------------- */
async function fetchMatrixCategoriesAPI(matrixId: string) {
  const res = await fetch(`http://localhost:5000/api/categories/${matrixId}`, {
    credentials: "include",
  });
  return res.json();
}

async function createCategoryAPI(matrixId: string, newCat: any) {
  const res = await fetch("http://localhost:5000/api/categories/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ matrixId, ...newCat }),
  });
  return res.json();
}

async function deleteCategoryAPI(data: any) {
  const res = await fetch("http://localhost:5000/api/categories/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res.json();
}

async function editCategoryAPI(cat: any) {
  const res = await fetch("http://localhost:5000/api/categories/edit", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(cat),
  });
  return res.json();
}

/* ---------------- COMPONENT ---------------- */

export default function MatrixCategories({
  matrixId,
  selectedCategoryId,
  onSelectCategory,
}: MatrixCategoriesProps) {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [current, setCurrent] = useState<any>(null);

  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  /* ---------------- FETCH ---------------- */
  const loadCategories = async () => {
    setIsLoading(true);
    const res = await fetchMatrixCategoriesAPI(matrixId);
    setCategories(res.data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, [matrixId]);

  /* ---------------- MODAL HANDLERS ---------------- */
  const openAddModal = () => {
    setEditMode(false);
    setName("");
    setColor("#000000");
    setShowModal(true);
  };

  const openEditModal = (cat: any) => {
    setEditMode(true);
    setCurrent(cat);
    setName(cat.name);
    setColor(cat.color);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (editMode) {
      await editCategoryAPI({
        matrixId: matrixId,
        categoryId: current.id,
        name,
        color,
      });
    } else {
      await createCategoryAPI(matrixId, { name, color });
    }

    await loadCategories();
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    await deleteCategoryAPI({ matrixId: matrixId, categoryId: id });
    await loadCategories();

    if (selectedCategoryId === id) {
      onSelectCategory(null);
    }
  };

  const selectCategory = (cat: any) => {
    onSelectCategory(cat);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>Categories</h2>
        <button className={styles.addBtn} onClick={openAddModal}>
          <FiPlus />
        </button>
      </div>

      {isLoading && <div className={styles.empty}>Loading...</div>}
      {!isLoading && categories.length === 0 && (
        <div className={styles.empty}>No categories yet</div>
      )}

      <div className={styles.list}>
        {categories.map((cat) => {
          const isActive = cat.id === selectedCategoryId;

          return (
            <div
              key={cat.id}
              className={`${styles.category} ${isActive ? styles.active : ""}`}
              onClick={() => selectCategory(cat)}
            >
              <div className={styles.left}>
                <div
                  className={styles.colorDot}
                  style={{ backgroundColor: cat.color }}
                />
                <span className={styles.name}>{cat.name}</span>
              </div>

              <div
                className={styles.actions}
                onClick={(e) => e.stopPropagation()}
              >
                <FiEdit2
                  className={styles.icon}
                  onClick={() => openEditModal(cat)}
                />
                <FiTrash2
                  className={styles.iconDelete}
                  onClick={() => handleDelete(cat.id)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>{editMode ? "Edit Category" : "Add Category"}</h3>

            <label>Name</label>
            <input
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Color</label>
            <input
              className={styles.input}
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />

            <div className={styles.buttonRow}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button className={styles.saveBtn} onClick={handleSubmit}>
                {editMode ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
