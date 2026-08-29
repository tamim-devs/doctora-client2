"use client";

import {
  FaCalendarCheck,
  FaUsers,
  FaMoneyBillWave,
  FaClock,
  FaUserMd,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { GetDoctorAppointments } from "@/lib/appoinment";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const result = await GetDoctorAppointments();

        setAppointments(result.data || []);
      } catch (error) {
        console.error("Failed to load doctor appointments:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  // Today's date
  const today = new Date();

  const isToday = (date) => {
    if (!date) return false;

    const appointmentDate = new Date(date);

    return (
      appointmentDate.getDate() === today.getDate() &&
      appointmentDate.getMonth() === today.getMonth() &&
      appointmentDate.getFullYear() === today.getFullYear()
    );
  };

  // Today's appointments
  const todayAppointments = appointments.filter((appointment) =>
    isToday(appointment.date)
  );

  // Completed appointments
  const completedAppointments = appointments.filter(
    (appointment) =>
      appointment.status?.toLowerCase() === "completed"
  );

  // Unique patients
  const uniquePatients = [
    ...new Set(
      appointments
        .map((appointment) => appointment.patientId)
        .filter(Boolean)
    ),
  ];

  // Total earnings
  const totalEarnings = completedAppointments.reduce(
    (total, appointment) => {
      return total + Number(appointment.consultationFee || 0);
    },
    0
  );

  // Upcoming appointments
  const upcomingAppointments = appointments
    .filter((appointment) => {
      const appointmentDate = new Date(appointment.date);

      return (
        appointmentDate >= today &&
        appointment.status?.toLowerCase() !== "completed" &&
        appointment.status?.toLowerCase() !== "cancelled"
      );
    })
    .sort(
      (a, b) =>
        new Date(a.date) - new Date(b.date)
    )
    .slice(0, 3);

  const stats = [
    {
      title: "Today's Appointments",
      value: todayAppointments.length,
      icon: FaCalendarCheck,
      description: "Appointments scheduled today",
    },
    {
      title: "Total Patients",
      value: uniquePatients.length,
      icon: FaUsers,
      description: "Patients under your care",
    },
    {
      title: "Completed Appointments",
      value: completedAppointments.length,
      icon: FaClock,
      description: "Successfully completed",
    },
    {
      title: "Total Earnings",
      value: `৳ ${totalEarnings.toLocaleString()}`,
      icon: FaMoneyBillWave,
      description: "Total consultation earnings",
    },
  ];

  if (loading) {
    return (
      <section className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Doctor Dashboard
        </h1>

        <p className="mt-4 text-gray-500 dark:text-slate-400">
          Loading dashboard...
        </p>
      </section>
    );
  }

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Doctor Dashboard
        </h1>

        <p className="mt-2 text-gray-500 dark:text-slate-400">
          Welcome back, Doctor. Here is your practice overview.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                  <Icon />
                </div>

                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </span>
              </div>

              <h2 className="mt-5 font-semibold text-gray-800 dark:text-white">
                {stat.title}
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Upcoming Appointments */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-gray-100 p-5 dark:border-slate-800 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
              <FaCalendarCheck />
            </div>

            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">
                Upcoming Appointments
              </h2>

              <p className="text-sm text-gray-500 dark:text-slate-400">
                Your next scheduled appointments
              </p>
            </div>
          </div>
        </div>

        {upcomingAppointments.length > 0 ? (
          <div className="divide-y divide-gray-100 dark:divide-slate-800">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                    <FaUserMd />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {appointment.patientName || "Unknown Patient"}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                      {appointment.date
                        ? new Date(
                            appointment.date
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : "Date not available"}{" "}
                      • {appointment.time || "Time not available"}
                    </p>
                  </div>
                </div>

                <span className="w-fit rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold capitalize text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  {appointment.status || "pending"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-gray-500 dark:text-slate-400">
              No upcoming appointments.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDashboard;