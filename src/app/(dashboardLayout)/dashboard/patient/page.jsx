"use client";

import { getPatientAppointments } from "@/lib/appoinment";
import { useEffect, useState } from "react";
import {
  FaCalendarCheck,
  FaHistory,
  FaMoneyBillWave,
  FaUserMd,
} from "react-icons/fa";

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const result = await getPatientAppointments();

        console.log("Dashboard appointments:", result);

        setAppointments(result.data || []);
      } catch (error) {
        console.error("Dashboard appointment error:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  // ==============================
  // Upcoming appointments
  // ==============================

  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.status?.toLowerCase() === "pending"
  );

  // ==============================
  // Pending appointments
  // ==============================

  const pendingAppointments = appointments.filter(
    (appointment) =>
      appointment.status?.toLowerCase() === "pending"
  );

  // ==============================
  // Completed appointments
  // ==============================

  const completedAppointments = appointments.filter(
    (appointment) =>
      appointment.status?.toLowerCase() === "completed"
  );

  // ==============================
  // Total payment
  // ==============================

  const totalPayments = appointments.reduce(
    (total, appointment) =>
      total + Number(appointment.consultationFee || 0),
    0
  );

  // ==============================
  // Dashboard stats
  // ==============================

  const dashboardStats = [
    {
      title: "Upcoming Appointments",
      value: upcomingAppointments.length,
      icon: FaCalendarCheck,
      description: "Appointments scheduled",
    },
    {
      title: "Appointment Pending",
      value: pendingAppointments.length,
      icon: FaHistory,
      description: "Pending appointments",
    },
    {
      title: "Total Payments",
      value: `৳ ${totalPayments.toLocaleString()}`,
      icon: FaMoneyBillWave,
      description: "Total amount paid",
    },
    {
      title: "Favorite Doctors",
      value: 0,
      icon: FaUserMd,
      description: "Doctors you follow",
    },
  ];

  // ==============================
  // Date formatter
  // ==============================

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  // ==============================
  // Loading
  // ==============================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-5 dark:bg-slate-950 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Patient Overview
        </h1>

        <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
          Loading your healthcare activities...
        </p>

        <div className="mt-10 flex justify-center">
          <span className="loading loading-spinner loading-lg text-cyan-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-5 dark:bg-slate-950 sm:p-8">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Patient Overview
        </h1>

        <p className="mt-2 text-sm text-gray-600 dark:text-slate-400 sm:text-base">
          Welcome back! Here's an overview of your healthcare activities.
        </p>
      </div>

      {/* Statistics */}

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map(
          ({ title, value, icon: Icon, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-slate-400">
                    {title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {value}
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-xl text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                  <Icon />
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-500 dark:text-slate-500">
                {description}
              </p>
            </div>
          )
        )}
      </div>

      {/* Upcoming Appointment */}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Upcoming Appointments
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
            Your upcoming doctor appointments
          </p>
        </div>

        {upcomingAppointments.length > 0 ? (
          <div className="mt-5 space-y-3">
            {upcomingAppointments.slice(0, 3).map((appointment) => (
              <div
                key={appointment._id}
                className="rounded-xl bg-cyan-50 p-4 dark:bg-cyan-500/10"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {appointment.doctorName || "Doctor"}
                    </h3>

                    <p className="text-sm text-cyan-600 dark:text-cyan-400">
                      {appointment.specialization || "Specialist"}
                    </p>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-slate-400">
                    <p>{formatDate(appointment.createdAt)}</p>

                    {appointment.appointmentTime && (
                      <p>{appointment.appointmentTime}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-xl bg-gray-50 p-6 text-center dark:bg-slate-800">
            <p className="text-sm text-gray-500 dark:text-slate-400">
              No upcoming appointments.
            </p>
          </div>
        )}
      </section>

      {/* Recent Appointment History */}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Recent Appointment History
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
          Your recently completed appointments
        </p>

        {completedAppointments.length > 0 ? (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-800">
                  <th className="px-4 py-3 text-gray-500 dark:text-slate-400">
                    Doctor
                  </th>

                  <th className="px-4 py-3 text-gray-500 dark:text-slate-400">
                    Date
                  </th>

                  <th className="px-4 py-3 text-gray-500 dark:text-slate-400">
                    Fee
                  </th>

                  <th className="px-4 py-3 text-gray-500 dark:text-slate-400">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {completedAppointments
                  .slice(0, 5)
                  .map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="border-b border-gray-100 dark:border-slate-800"
                    >
                      <td className="px-4 py-4 font-medium text-gray-800 dark:text-white">
                        {appointment.doctorName || "Doctor"}
                      </td>

                      <td className="px-4 py-4 text-gray-500 dark:text-slate-400">
                        {formatDate(appointment.createdAt)}
                      </td>

                      <td className="px-4 py-4 text-gray-500 dark:text-slate-400">
                        ৳{" "}
                        {Number(
                          appointment.consultationFee || 0
                        ).toLocaleString()}
                      </td>

                      <td className="px-4 py-4">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600 dark:bg-green-500/10 dark:text-green-400">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-5 rounded-xl bg-gray-50 p-6 text-center dark:bg-slate-800">
            <p className="text-sm text-gray-500 dark:text-slate-400">
              No completed appointments yet.
            </p>
          </div>
        )}
      </section>

      {/* Favorite Doctors */}

      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Favorite Doctors
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
          Doctors you have added to your favorites
        </p>

        <div className="mt-5 rounded-xl bg-gray-50 p-6 text-center dark:bg-slate-800">
          <FaUserMd className="mx-auto text-3xl text-cyan-500" />

          <p className="mt-3 text-sm text-gray-500 dark:text-slate-400">
            You haven't added any favorite doctors yet.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PatientDashboard;