"use client";

import {
  FaCalendarAlt,
  FaClock,
  FaEye,
  FaCheck,
  FaTimes,
  FaUser,
  FaMoneyBillWave,
} from "react-icons/fa";

const DoctorAppointmentCard = ({
  appointment,
  onView,
  onComplete,
  onCancel,
}) => {
  const {
    _id,
    patientName,
    patientEmail,
    date,
    time,
    consultationFee,
    status,
  } = appointment;

  const normalizedStatus = status?.toLowerCase();

  const isPending = normalizedStatus === "pending";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      {/* Top Section */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Patient */}

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
            <FaUser size={20} />
          </div>

          <div className="min-w-0">
            <h2 className="truncate font-bold text-gray-900 dark:text-white">
              {patientName || "Patient"}
            </h2>

            <p className="truncate text-sm text-gray-500 dark:text-slate-400">
              {patientEmail || "No email"}
            </p>
          </div>
        </div>

        {/* Status */}

        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
            normalizedStatus === "pending"
              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400"
              : normalizedStatus === "completed"
                ? "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                : "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400"
          }`}
        >
          {normalizedStatus === "pending"
            ? "Pending"
            : normalizedStatus === "completed"
              ? "Completed"
              : "Rejected"}
        </span>
      </div>

      {/* Appointment Details */}

      <div className="mt-5 grid gap-4 border-t border-gray-100 pt-5 dark:border-slate-800 sm:grid-cols-3">
        {/* Date */}

        <div className="flex items-center gap-3">
          <FaCalendarAlt className="shrink-0 text-cyan-600" />

          <div>
            <p className="text-xs text-gray-400">
              Date
            </p>

            <p className="text-sm font-medium text-gray-700 dark:text-slate-300">
              {date || "N/A"}
            </p>
          </div>
        </div>

        {/* Time */}

        <div className="flex items-center gap-3">
          <FaClock className="shrink-0 text-cyan-600" />

          <div>
            <p className="text-xs text-gray-400">
              Time
            </p>

            <p className="text-sm font-medium text-gray-700 dark:text-slate-300">
              {time || "N/A"}
            </p>
          </div>
        </div>

        {/* Fee */}

        <div className="flex items-center gap-3">
          <FaMoneyBillWave className="shrink-0 text-cyan-600" />

          <div>
            <p className="text-xs text-gray-400">
              Consultation Fee
            </p>

            <p className="text-sm font-semibold text-gray-800 dark:text-white">
              ৳ {consultationFee || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}

      <div className="mt-5 flex flex-wrap gap-3 border-t border-gray-100 pt-5 dark:border-slate-800">
        {/* View */}

        <button
          type="button"
          onClick={() => onView?.(appointment)}
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <FaEye />
          View
        </button>

        {/* Pending Actions */}

        {isPending && (
          <>
            <button
              type="button"
              onClick={() => onComplete?.(_id)}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
            >
              <FaCheck />
              Complete
            </button>

            <button
              type="button"
              onClick={() => onCancel?.(_id)}
              className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:border-red-500/20 dark:hover:bg-red-500/10"
            >
              <FaTimes />
              Reject
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorAppointmentCard;