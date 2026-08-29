"use client";

import { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaTimes, FaUserMd } from "react-icons/fa";

const RescheduleModal = ({
  appointment,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (appointment) {
      setDate("");
      setTime("");
    }
  }, [appointment]);

  if (!isOpen || !appointment) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !time) return;

    onConfirm({
      id: appointment._id,
      date,
      time,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-slate-800 sm:px-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Reschedule Appointment
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              Choose a new date and time.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          {/* Doctor */}
          <div className="flex items-center gap-3 rounded-xl bg-cyan-50 p-4 dark:bg-cyan-500/10">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400">
              <FaUserMd />
            </div>

            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {appointment.doctorName}
              </p>

              <p className="text-sm text-cyan-600">
                {appointment.specialization}
              </p>
            </div>
          </div>

          {/* Current Appointment */}
          <div className="rounded-xl border border-gray-200 p-4 dark:border-slate-700">
            <p className="mb-3 text-sm font-semibold text-gray-700 dark:text-slate-300">
              Current Appointment
            </p>

            <div className="flex flex-col gap-3 text-sm sm:flex-row sm:gap-6">
              <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
                <FaCalendarAlt className="text-cyan-600" />
                {appointment.date}
              </div>

              <div className="flex items-center gap-2 text-gray-500 dark:text-slate-400">
                <FaClock className="text-cyan-600" />
                {appointment.time}
              </div>
            </div>
          </div>

          {/* New Date */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
              New Date
            </label>

            <div className="relative">
              <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600" />

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* New Time */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-slate-300">
              New Time
            </label>

            <div className="relative">
              <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600" />

              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
            >
              Confirm Reschedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RescheduleModal;