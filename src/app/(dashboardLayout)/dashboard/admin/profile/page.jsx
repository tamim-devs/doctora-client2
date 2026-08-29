"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaShieldAlt,
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";

const AdminProfile = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const admin = {
    name: "Admin User",
    email: "admin@doctora.com",
    phone: "01712345678",
    role: "Administrator",
    status: "Active",
    image: "/admin.png",
  };

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500 dark:text-slate-400">
            View and manage your administrator profile.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsEditOpen(true)}
          className="flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700"
        >
          <FaEdit />
          Edit Profile
        </button>
      </div>

      {/* Profile Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Profile Header */}
        <div className="bg-linear-to-r from-cyan-600 to-blue-600 px-5 py-8 sm:px-8">
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            <Image
              src={admin.image}
              alt={admin.name}
              width={110}
              height={110}
              className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
            />

            <div className="text-center sm:text-left">
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <h2 className="text-2xl font-bold text-white">
                  {admin.name}
                </h2>

                <span className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
                  <FaCheckCircle />
                  {admin.status}
                </span>
              </div>

              <p className="mt-1 text-cyan-50">{admin.role}</p>

              <p className="mt-1 text-sm text-cyan-100">
                DOCTORA Administrator
              </p>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="p-5 sm:p-8">
          <h3 className="text-lg font-bold text-black dark:text-white">
            Account Information
          </h3>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem
              icon={FaUser}
              label="Full Name"
              value={admin.name}
            />

            <InfoItem
              icon={FaEnvelope}
              label="Email"
              value={admin.email}
            />

            <InfoItem
              icon={FaPhone}
              label="Phone Number"
              value={admin.phone}
            />

            <InfoItem
              icon={FaShieldAlt}
              label="Role"
              value={admin.role}
            />

            <InfoItem
              icon={FaCheckCircle}
              label="Account Status"
              value={admin.status}
            />
          </div>

          {/* Security */}
          <div className="mt-8 border-t border-gray-100 pt-6 dark:border-slate-800">
            <h3 className="font-bold text-black dark:text-white">
              Account Security
            </h3>

            <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                  <FaShieldAlt />
                </div>

                <div>
                  <p className="font-semibold text-black dark:text-white">
                    Administrator Account
                  </p>

                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    Your account has administrator privileges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <EditProfileModal
          admin={admin}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </section>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
          <Icon />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-gray-400 dark:text-slate-500">
            {label}
          </p>

          <p className="mt-1 truncate text-sm font-semibold text-black dark:text-slate-200">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

const EditProfileModal = ({ admin, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
        <h2 className="text-xl font-bold text-black dark:text-white">
          Edit Profile
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
          Update your administrator information.
        </p>

        <form className="mt-6 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200">
              Full Name
            </label>

            <input
              type="text"
              defaultValue={admin.name}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200">
              Phone Number
            </label>

            <input
              type="tel"
              defaultValue={admin.phone}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-black outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200">
              Email
            </label>

            <input
              type="email"
              defaultValue={admin.email}
              disabled
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-600 hover:bg-gray-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white hover:bg-cyan-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;