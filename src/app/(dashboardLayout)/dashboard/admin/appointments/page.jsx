"use client";

import { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaUser,
  FaSearch,
  FaEye,
} from "react-icons/fa";

const appointmentsData = [
  {
    _id: "APT-001",
    patientName: "Tamim Ahmed",
    doctorName: "Dr. Sarah Ahmed",
    specialization: "Cardiologist",
    date: "12 August 2026",
    time: "5:30 PM",
    fee: 1000,
    status: "Upcoming",
  },
  {
    _id: "APT-002",
    patientName: "Nusrat Jahan",
    doctorName: "Dr. Tanvir Hasan",
    specialization: "Neurologist",
    date: "12 August 2026",
    time: "6:30 PM",
    fee: 1200,
    status: "Completed",
  },
  {
    _id: "APT-003",
    patientName: "Rahim Hasan",
    doctorName: "Dr. Nusrat Jahan",
    specialization: "Dermatologist",
    date: "13 August 2026",
    time: "7:00 PM",
    fee: 700,
    status: "Cancelled",
  },
];

const Appointments = () => {
  const [appointments] = useState(appointmentsData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      appointment.doctorName
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      appointment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Appointments
        </h1>

        <p className="mt-2 text-gray-500 dark:text-slate-400">
          Monitor and manage all patient appointments.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        {/* Search */}
        <div className="relative w-full sm:max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search patient or doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-cyan-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>

        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        >
          <option value="All">All Status</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Appointment Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left dark:border-slate-800 dark:bg-slate-800/50">
                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Patient
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Doctor
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Date & Time
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Fee
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Status
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-gray-600 dark:text-slate-300">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr
                  key={appointment._id}
                  className="border-b border-gray-100 last:border-0 dark:border-slate-800"
                >
                  {/* Patient */}
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                        <FaUser />
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {appointment.patientName}
                        </p>

                        <p className="text-xs text-gray-400">
                          {appointment._id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Doctor */}
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <FaUserMd className="text-cyan-600" />

                      <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-slate-200">
                          {appointment.doctorName}
                        </p>

                        <p className="text-xs text-cyan-600">
                          {appointment.specialization}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-cyan-600" />

                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-slate-300">
                          {appointment.date}
                        </p>

                        <p className="flex items-center gap-1 text-xs text-gray-400">
                          <FaClock />
                          {appointment.time}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Fee */}
                  <td className="px-5 py-5 text-sm font-semibold text-gray-800 dark:text-white">
                    ৳ {appointment.fee}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        appointment.status === "Upcoming"
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                          : appointment.status === "Completed"
                            ? "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                            : "bg-red-100 text-red-500 dark:bg-red-500/10 dark:text-red-400"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-5 py-5">
                    <button
                      type="button"
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-100 hover:text-cyan-600 dark:border-slate-700 dark:hover:bg-slate-800"
                      title="View Appointment"
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
        {filteredAppointments.length === 0 && (
          <div className="px-5 py-16 text-center">
            <FaCalendarAlt className="mx-auto text-4xl text-gray-300" />

            <h2 className="mt-4 font-semibold text-gray-800 dark:text-white">
              No Appointments Found
            </h2>

            <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
              No appointments match your search or filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Appointments;