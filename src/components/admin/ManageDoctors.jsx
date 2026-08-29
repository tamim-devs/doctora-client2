
"use client";

import { useState } from "react";
import {
  FaUserMd,
  FaEye,
  FaSearch,
} from "react-icons/fa";

import DoctorActions from "@/components/admin/DoctorActions";

const ManageDoctors = ({ doctors }) => {
  const [doctorList, setDoctorList] = useState(doctors || []);
  const [search, setSearch] = useState("");

  // ==============================
  // SEARCH DOCTORS
  // ==============================
  const filteredDoctors = doctorList.filter((doctor) => {
    const searchText = search.toLowerCase();

    return (
      doctor.name?.toLowerCase().includes(searchText) ||
      doctor.specialization?.toLowerCase().includes(searchText) ||
      doctor.email?.toLowerCase().includes(searchText)
    );
  });

  // ==============================
  // DOCTOR UPDATE
  // ==============================
  const handleDoctorUpdate = (doctorId, action) => {
    // Doctor delete
    if (action === "deleted") {
      setDoctorList((prev) =>
        prev.filter((doctor) => doctor._id !== doctorId)
      );
    }

    // Doctor approve
    if (action === "approved") {
      setDoctorList((prev) =>
        prev.map((doctor) =>
          doctor._id === doctorId
            ? {
                ...doctor,
                approvalStatus: "approved",
                status: "approved",
              }
            : doctor
        )
      );
    }
  };

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* ==============================
          HEADER
      ============================== */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Manage Doctors
        </h1>

        <p className="mt-2 text-gray-500 dark:text-slate-400">
          View, approve and manage registered doctors.
        </p>
      </div>

      {/* ==============================
          SEARCH
      ============================== */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-cyan-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* ==============================
          DOCTORS TABLE
      ============================== */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            {/* ==============================
                TABLE HEADER
            ============================== */}
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left dark:border-slate-800 dark:bg-slate-800/50">
                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Doctor
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Specialization
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Experience
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Hospital
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Status
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>

            {/* ==============================
                TABLE BODY
            ============================== */}
            <tbody>
              {filteredDoctors.map((doctor) => (
                <tr
                  key={doctor._id}
                  className="border-b border-gray-100 last:border-0 dark:border-slate-800"
                >
                  {/* ==============================
                      DOCTOR
                  ============================== */}
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      {/* Doctor Icon */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                        <FaUserMd />
                      </div>

                      {/* Doctor Info */}
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {doctor.name || "Unknown Doctor"}
                        </p>

                        <p className="text-sm text-gray-500 dark:text-slate-400">
                          {doctor.email || "No email"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* ==============================
                      SPECIALIZATION
                  ============================== */}
                  <td className="px-5 py-5 text-sm text-gray-600 dark:text-slate-300">
                    {doctor.specialization || "General Medicine"}
                  </td>

                  {/* ==============================
                      EXPERIENCE
                  ============================== */}
                  <td className="px-5 py-5 text-sm text-gray-600 dark:text-slate-300">
                    {doctor.experience || 0} Years
                  </td>

                  {/* ==============================
                      HOSPITAL
                  ============================== */}
                  <td className="px-5 py-5 text-sm text-gray-600 dark:text-slate-300">
                    {doctor.hospital || "N/A"}
                  </td>

                  {/* ==============================
                      STATUS
                  ============================== */}
                  <td className="px-5 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        doctor.approvalStatus === "approved"
                          ? "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                          : doctor.approvalStatus === "pending"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400"
                            : "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                      }`}
                    >
                      {doctor.approvalStatus || "pending"}
                    </span>
                  </td>

                  {/* ==============================
                      ACTIONS
                  ============================== */}
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2">
                      {/* View Button */}
                      <button
                        type="button"
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100 hover:text-cyan-600 dark:border-slate-700 dark:hover:bg-slate-800"
                        title="View Doctor"
                      >
                        <FaEye />
                      </button>

                      {/* Approve + Delete */}
                      <DoctorActions
                        doctor={doctor}
                        onUpdate={handleDoctorUpdate}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ==============================
            EMPTY STATE
        ============================== */}
        {filteredDoctors.length === 0 && (
          <div className="px-5 py-16 text-center">
            <FaUserMd className="mx-auto text-4xl text-gray-300" />

            <h2 className="mt-4 font-semibold text-gray-800 dark:text-white">
              No Doctors Found
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
              {search
                ? "No doctors match your search."
                : "No doctors are registered yet."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageDoctors;

