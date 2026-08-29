"use client";

import { GetAdminStats } from "@/lib/api/admin";
import { useEffect, useState } from "react";
import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";


const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const result = await GetAdminStats();

        setDashboardData(result.data);
      } catch (error) {
        console.error("Admin dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <section className="p-4 sm:p-6 lg:p-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-gray-500 dark:text-slate-400">
            Loading dashboard...
          </p>
        </div>
      </section>
    );
  }

  const stats = [
    {
      title: "Total Doctors",
      value: dashboardData?.totalDoctors || 0,
      icon: FaUserMd,
      description: "Registered doctors",
    },
    {
      title: "Total Patients",
      value: dashboardData?.totalPatients || 0,
      icon: FaUsers,
      description: "Registered patients",
    },
    {
      title: "Total Appointments",
      value: dashboardData?.totalAppointments || 0,
      icon: FaCalendarCheck,
      description: "All appointments",
    },
 {
  title: "Total Income",
  value: `$ ${(dashboardData?.totalIncome || 0).toLocaleString()}`,
  icon: FaMoneyBillWave,
  description: "Income from patient bookings",
},
  ];

  const pendingDoctors =
    dashboardData?.pendingDoctors || [];

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-500 dark:text-slate-400">
          Monitor and manage your healthcare platform.
        </p>
      </div>

    
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


      <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-gray-100 p-5 dark:border-slate-800 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400">
              <FaClock />
            </div>

            <div>
              <h2 className="font-bold text-gray-900 dark:text-white">
                Pending Doctor Approvals
              </h2>

              <p className="text-sm text-gray-500 dark:text-slate-400">
                Doctors waiting for approval
              </p>
            </div>
          </div>
        </div>

        {pendingDoctors.length > 0 ? (
          <div className="divide-y divide-gray-100 dark:divide-slate-800">
            {pendingDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="flex items-center justify-between gap-4 p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                    <FaUserMd />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {doctor.name}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      {doctor.specialization ||
                        "General Medicine"}
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400">
                  Pending
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <FaCheckCircle className="mx-auto text-3xl text-green-500" />

            <p className="mt-3 text-sm text-gray-500 dark:text-slate-400">
              No pending doctor approvals
            </p>
          </div>
        )}
      </div>

      {/* Platform Status */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
            <FaCheckCircle />
          </div>

          <div>
            <h2 className="font-bold text-gray-900 dark:text-white">
              Platform Status
            </h2>

            <p className="text-sm text-gray-500 dark:text-slate-400">
              All major services are currently operational.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;