"use client";

import Image from "next/image";
import { useState } from "react";

import {
  FaUserMd,
  FaEnvelope,
  FaBriefcaseMedical,
  FaGraduationCap,
  FaHospital,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaClock,
  FaIdCard,
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";

import EditProfile from "@/components/dashboard/doctor/EditProfile";

const DoctorProfile = ({ doctor }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <section className="p-4 sm:p-6 lg:p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              My Profile
            </h1>

            <p className="mt-2 text-gray-500">
              View and update your professional information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
            className="rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white"
          >
            Update Profile
          </button>
        </div>

        {/* তোমার profile information box */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">
            Professional Information
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <InfoItem
              label="Specialization"
              value={doctor.specialization}
            />

            <InfoItem
              label="Experience"
              value={`${doctor.experience} Years`}
            />

            <InfoItem
              label="Qualification"
              value={doctor.qualification}
            />

            <InfoItem
              label="Hospital"
              value={doctor.hospital}
            />

            <InfoItem
              label="Consultation Fee"
              value={`৳ ${doctor.consultationFee}`}
            />

            <InfoItem
              label="Available Days"
              value={doctor.availableDays?.join(", ")}
            />

            <InfoItem
              label="Available Time"
              value={doctor.availableTime}
            />

            <InfoItem
              label="License Number"
              value={doctor.licenseNumber}
            />

          </div>

          <div className="mt-6 border-t pt-6">
            <h3 className="font-bold">
              About Me
            </h3>

            <p className="mt-2 text-gray-600">
              {doctor.about}
            </p>
          </div>

        </div>
      </section>

      {/* Update modal/form */}
      {isEditOpen && (
        <EditProfile
          doctor={doctor}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
};;

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

          <p className="mt-1 truncate text-sm font-semibold text-gray-800 dark:text-slate-200">
            {value || "Not provided"}
          </p>

        </div>

      </div>

    </div>
  );
};

export default DoctorProfile;