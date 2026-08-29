"use client";

import { useState } from "react";
import {
  FaUser,
  FaEye,
  FaSearch,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const patientsData = [
  {
    _id: "PAT-001",
    name: "Tamim Ahmed",
    email: "tamim@example.com",
    phone: "01712345678",
    gender: "Male",
    bloodGroup: "B+",
    status: "Active",
  },
  {
    _id: "PAT-002",
    name: "Nusrat Jahan",
    email: "nusrat@example.com",
    phone: "01812345678",
    gender: "Female",
    bloodGroup: "A+",
    status: "Active",
  },
  {
    _id: "PAT-003",
    name: "Rahim Hasan",
    email: "rahim@example.com",
    phone: "01912345678",
    gender: "Male",
    bloodGroup: "O+",
    status: "Inactive",
  },
];

const ManagePatients = () => {
  const [patients] = useState(patientsData);
  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.email.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone.includes(search)
  );

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Manage Patients
        </h1>

        <p className="mt-2 text-gray-500 dark:text-slate-400">
          View and manage registered patients.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-cyan-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Patient Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left dark:border-slate-800 dark:bg-slate-800/50">
                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Patient
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Phone
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Gender
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Blood Group
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Status
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.map((patient) => (
                <tr
                  key={patient._id}
                  className="border-b border-gray-100 last:border-0 dark:border-slate-800"
                >
                  {/* Patient */}
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                        <FaUser />
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {patient.name}
                        </p>

                        <p className="flex items-center gap-1 text-sm text-gray-500 dark:text-slate-400">
                          <FaEnvelope className="text-xs" />
                          {patient.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Phone */}
                  <td className="px-5 py-5">
                    <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                      <FaPhone className="text-cyan-600" />
                      {patient.phone}
                    </p>
                  </td>

                  {/* Gender */}
                  <td className="px-5 py-5 text-sm text-gray-600 dark:text-slate-300">
                    {patient.gender}
                  </td>

                  {/* Blood */}
                  <td className="px-5 py-5">
                    <span className="rounded-lg bg-red-50 px-3 py-1 text-sm font-semibold text-red-500 dark:bg-red-500/10">
                      {patient.bloodGroup}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        patient.status === "Active"
                          ? "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                          : "bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {patient.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-5">
                    <button
                      type="button"
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100 hover:text-cyan-600 dark:border-slate-700 dark:hover:bg-slate-800"
                      title="View Patient"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty */}
        {filteredPatients.length === 0 && (
          <div className="px-5 py-16 text-center">
            <FaUser className="mx-auto text-4xl text-gray-300" />

            <h2 className="mt-4 font-semibold text-gray-800 dark:text-white">
              No Patients Found
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
              No patients match your search.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ManagePatients;