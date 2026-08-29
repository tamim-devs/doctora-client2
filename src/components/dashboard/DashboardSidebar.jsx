
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  FaHome,
  FaUser,
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaTachometerAlt,
  FaStethoscope,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const DashboardSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Better Auth session
  const { data: session, isPending } = authClient.useSession();

  const [mobileOpen, setMobileOpen] = useState(false);

  const role = session?.user?.role;

  const adminMenu = [
    {
      key: "overview",
      label: "Overview",
      icon: FaTachometerAlt,
      href: "/dashboard/admin",
    },
    {
      key: "doctors",
      label: "Manage Doctors",
      icon: FaUserMd,
      href: "/dashboard/admin/doctors",
    },
    {
      key: "patients",
      label: "Manage Patients",
      icon: FaUsers,
      href: "/dashboard/admin/patients",
    },
    {
      key: "appointments",
      label: "Appointments",
      icon: FaCalendarCheck,
      href: "/dashboard/admin/appointments",
    },
  ];

  const doctorMenu = [
    {
      key: "overview",
      label: "Overview",
      icon: FaTachometerAlt,
      href: "/dashboard/doctor",
    },
    {
      key: "appointments",
      label: "Appointments",
      icon: FaCalendarCheck,
      href: "/dashboard/doctor/appointments",
    },
    {
      key: "patients",
      label: "My Patients",
      icon: FaUsers,
      href: "/dashboard/doctor/patients",
    },
    {
      key: "profile",
      label: "My Profile",
      icon: FaUser,
      href: "/dashboard/doctor/profile",
    },
  ];

  const patientMenu = [
    {
      key: "overview",
      label: "Overview",
      icon: FaTachometerAlt,
      href: "/dashboard/patient",
    },
    {
      key: "appointments",
      label: "My Appointments",
      icon: FaCalendarCheck,
      href: "/dashboard/patient/appointments",
    },
    {
      key: "doctors",
      label: "Find Doctors",
      icon: FaStethoscope,
      href: "/find-doctors",
    },
    {
      key: "profile",
      label: "My Profile",
      icon: FaUser,
      href: "/dashboard/patient/profile",
    },
    {
      key: "payments",
      label: "Payment History",
      icon: FaMoneyBillWave,
      href: "/dashboard/patient/payments",
    },
    {
      key: "reviews",
      label: "My Reviews",
      icon: FaEnvelope,
      href: "/dashboard/patient/reviews",
    },
  ];

  const menuItems =
    role === "admin"
      ? adminMenu
      : role === "doctor"
        ? doctorMenu
        : role === "patient"
          ? patientMenu
          : [];

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  // Session loading
  if (isPending) {
    return (
      <aside className="hidden h-screen w-72 border-r border-gray-200 bg-white lg:flex">
        <div className="w-full animate-pulse p-6">
          <div className="mb-8 h-8 w-32 rounded bg-gray-200" />

          <div className="mb-6 flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-gray-200" />
            <div className="flex-1">
              <div className="mb-2 h-4 w-24 rounded bg-gray-200" />
              <div className="h-3 w-16 rounded bg-gray-200" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-12 rounded bg-gray-200" />
            <div className="h-12 rounded bg-gray-200" />
            <div className="h-12 rounded bg-gray-200" />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <>
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide text-cyan-600"
        >
          DOCTORA
        </Link>

        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-xl text-gray-700 transition hover:bg-gray-100 dark:text-white dark:hover:bg-slate-800"
          aria-label="Open menu"
        >
          <FaBars />
        </button>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
          border-r border-gray-200 bg-white
          transition-transform duration-300
          dark:border-slate-800 dark:bg-slate-950
          lg:sticky lg:top-0 lg:z-30 lg:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* ================= LOGO ================= */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-slate-800">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="text-2xl font-extrabold tracking-wide text-cyan-600"
          >
            DOCTORA
          </Link>

          {/* Mobile Close */}
          <button
            onClick={closeMobileMenu}
            className="rounded-lg p-2 text-xl text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800 lg:hidden"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        {/* ================= USER PROFILE ================= */}
        <div className="border-b border-gray-200 px-6 py-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Image
              src={
                session?.user?.image ||
                "https://ui-avatars.com/api/?name=User"
              }
              width={45}
              height={45}
              alt="Profile"
              className="h-11 w-11 rounded-full border-2 border-cyan-500 object-cover"
            />

            <div className="min-w-0">
              <p className="truncate font-semibold text-gray-800 dark:text-white">
                {session?.user?.name || "User"}
              </p>

              <p className="text-xs font-semibold uppercase text-cyan-600">
                {role || "user"}
              </p>
            </div>
          </div>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            Dashboard
          </p>

          <div className="space-y-1">
            {menuItems.map(({ key, label, icon: Icon, href }) => {
              const isActive =
                pathname === href ||
                (href !== `/dashboard/${role}` &&
                  pathname.startsWith(href));

              return (
                <Link
                  key={key}
                  href={href}
                  onClick={closeMobileMenu}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400"
                      : "text-gray-600 hover:bg-gray-100 hover:text-cyan-600 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      isActive
                        ? "bg-cyan-100 dark:bg-cyan-500/20"
                        : "bg-gray-100 dark:bg-slate-800"
                    }`}
                  >
                    <Icon />
                  </span>

                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ================= BOTTOM ================= */}
        <div className="border-t border-gray-200 px-4 py-4 dark:border-slate-800">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-cyan-600 dark:text-gray-300 dark:hover:bg-slate-800"
          >
            <FaHome />
            Back to Home
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
          >
            <FaSignOutAlt />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSideBar;

