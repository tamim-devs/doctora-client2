
"use client";

import { deleteDoctor, verifyDoctor } from "@/lib/api/admin";
import { useState } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";

const DoctorActions = ({ doctor, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  // DB তে status যদি pending হয়
  const isPending =
    doctor.status?.toLowerCase() === "pending";

  // ==============================
  // APPROVE DOCTOR
  // ==============================
  const handleApprove = async () => {
    const confirmApprove = window.confirm(
      `Are you sure you want to approve ${doctor.name}?`
    );

    if (!confirmApprove) return;

    try {
      setLoading(true);

      await verifyDoctor(doctor._id);

      alert("Doctor approved successfully!");

      if (onUpdate) {
        onUpdate(doctor._id, "approved");
      }
    } catch (error) {
      console.error("Approve doctor error:", error);

      alert(error.message || "Failed to approve doctor");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // DELETE DOCTOR
  // ==============================
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${doctor.name}?`
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await deleteDoctor(doctor._id);

      alert("Doctor deleted successfully!");

      if (onUpdate) {
        onUpdate(doctor._id, "deleted");
      }
    } catch (error) {
      console.error("Delete doctor error:", error);

      alert(error.message || "Failed to delete doctor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* ==============================
          APPROVE BUTTON
      ============================== */}
      {isPending && (
        <button
          type="button"
          onClick={handleApprove}
          disabled={loading}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-green-100 text-green-600 transition hover:bg-green-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-green-500/10 dark:text-green-400"
          title="Approve Doctor"
        >
          <FaCheck />
        </button>
      )}

      {/* ==============================
          DELETE BUTTON
      ============================== */}
      {isPending && (
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-red-100 text-red-500 transition hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-500/10 dark:text-red-400"
          title="Delete Doctor"
        >
          <FaTrash />
        </button>
      )}

      {/* ==============================
          APPROVED
      ============================== */}
      {!isPending && (
        <span className="text-xs font-semibold text-green-600 dark:text-green-400">
          Verified
        </span>
      )}
    </div>
  );
};

export default DoctorActions;

