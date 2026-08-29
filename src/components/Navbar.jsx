"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaCalendarCheck,
  FaChevronDown,
} from "react-icons/fa";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Server/prerender time এ useSession চালাবে না
  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-wide text-cyan-600"
          >
            DOCTORA
          </Link>

          <div className="hidden h-9 w-24 rounded-lg bg-gray-100 lg:block dark:bg-slate-800" />

          <div className="h-9 w-9 rounded-full bg-gray-100 lg:hidden dark:bg-slate-800" />
        </div>
      </nav>
    );
  }

  return <NavbarContent />;
};

const NavbarContent = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = session?.user?.role;

  const isLoggedIn = !!session?.user;

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      setDropdownOpen(false);
      setMobileOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Find Doctors",
      href: "/find-doctors",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="shrink-0 text-2xl font-extrabold tracking-wide text-cyan-600"
        >
          DOCTORA
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-semibold transition ${
                  isActive
                    ? "text-cyan-600"
                    : "text-gray-600 hover:text-cyan-600 dark:text-gray-300 dark:hover:text-cyan-400"
                }`}
              >
                {link.name}

                {isActive && (
                  <span className="absolute -bottom-5 left-0 h-0.5 w-full rounded-full bg-cyan-600" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 lg:flex">

          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-100 dark:bg-slate-800" />
          ) : isLoggedIn ? (
            <div className="relative">

              {/* Profile Button */}
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <Image
                  src={
                    session?.user?.image ||
                    "https://ui-avatars.com/api/?name=User"
                  }
                  width={38}
                  height={38}
                  alt="Profile"
                  className="h-9 w-9 rounded-full border-2 border-cyan-500 object-cover"
                />

                <div className="hidden text-left xl:block">
                  <p className="max-w-28 truncate text-sm font-semibold text-gray-800 dark:text-white">
                    {session?.user?.name || "User"}
                  </p>

                  <p className="text-xs font-medium capitalize text-cyan-600">
                    {role || "user"}
                  </p>
                </div>

                <FaChevronDown
                  className={`text-xs text-gray-500 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-14 w-60 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">

                  {/* User Info */}
                  <div className="border-b border-gray-200 px-4 py-4 dark:border-slate-700">
                    <p className="truncate font-semibold text-gray-800 dark:text-white">
                      {session?.user?.name || "User"}
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                      {session?.user?.email}
                    </p>

                    <span className="mt-2 inline-block rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold capitalize text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                      {role || "user"}
                    </span>
                  </div>

                  {/* Dashboard */}
                  <Link
                    href={
                      role === "admin"
                        ? "/dashboard/admin"
                        : role === "doctor"
                          ? "/dashboard/doctor"
                          : "/dashboard/patient"
                    }
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-cyan-600 dark:text-gray-300 dark:hover:bg-slate-800"
                  >
                    <FaTachometerAlt />
                    Dashboard
                  </Link>

                  {/* Profile */}
                  <Link
                    href={
                      role === "doctor"
                        ? "/dashboard/doctor/profile"
                        : role === "patient"
                          ? "/dashboard/patient/profile"
                          : "/dashboard/admin/profile"
                    }
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-cyan-600 dark:text-gray-300 dark:hover:bg-slate-800"
                  >
                    <FaUser />
                    My Profile
                  </Link>

                  {/* Appointments */}
                  {(role === "doctor" || role === "patient") && (
                    <Link
                      href={
                        role === "doctor"
                          ? "/dashboard/doctor/appointments"
                          : "/dashboard/patient/appointments"
                      }
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-cyan-600 dark:text-gray-300 dark:hover:bg-slate-800"
                    >
                      <FaCalendarCheck />
                      Appointments
                    </Link>
                  )}

                  {/* Logout */}
                  <div className="border-t border-gray-200 dark:border-slate-700">
                    <button
                      onClick={handleLogout}
                      className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      <FaSignOutAlt />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:text-cyan-600 dark:text-gray-300"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-lg p-2 text-xl text-gray-700 transition hover:bg-gray-100 dark:text-white dark:hover:bg-slate-800 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white lg:hidden dark:border-slate-800 dark:bg-slate-950">

          <div className="space-y-1 px-4 py-4">

            {/* Mobile Links */}
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`block rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Auth */}
            <div className="mt-3 border-t border-gray-200 pt-3 dark:border-slate-800">

              {isPending ? (
                <div className="h-10 animate-pulse rounded-lg bg-gray-100 dark:bg-slate-800" />
              ) : isLoggedIn ? (
                <>
                  {/* User */}
                  <div className="mb-3 flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-slate-900">
                    <Image
                      src={
                        session?.user?.image ||
                        "https://ui-avatars.com/api/?name=User"
                      }
                      width={42}
                      height={42}
                      alt="Profile"
                      className="h-10 w-10 rounded-full border-2 border-cyan-500 object-cover"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-800 dark:text-white">
                        {session?.user?.name || "User"}
                      </p>

                      <p className="text-xs capitalize text-cyan-600">
                        {role || "user"}
                      </p>
                    </div>
                  </div>

                  {/* Dashboard */}
                  <Link
                    href={
                      role === "admin"
                        ? "/dashboard/admin"
                        : role === "doctor"
                          ? "/dashboard/doctor"
                          : "/dashboard/patient"
                    }
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
                  >
                    <FaTachometerAlt />
                    Dashboard
                  </Link>

                  {/* Profile */}
                  <Link
                    href={
                      role === "doctor"
                        ? "/dashboard/doctor/profile"
                        : role === "patient"
                          ? "/dashboard/patient/profile"
                          : "/dashboard/admin/profile"
                    }
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
                  >
                    <FaUser />
                    My Profile
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="mt-1 flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                  >
                    <FaSignOutAlt />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="rounded-lg border border-gray-200 px-4 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:border-cyan-500 hover:text-cyan-600 dark:border-slate-700 dark:text-gray-300"
                  >
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={closeMobileMenu}
                    className="rounded-lg bg-cyan-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-cyan-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;