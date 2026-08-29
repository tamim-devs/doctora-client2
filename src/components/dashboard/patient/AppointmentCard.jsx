"use client";

import Image from "next/image";
import {
  FaCalendarAlt,
  FaUserMd,
  FaMoneyBillWave,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaCreditCard,
  FaStar,
} from "react-icons/fa";

const AppointmentCard = ({ appointment, onReview }) => {
  const {
    doctorName,
    doctorImage,
    specialization,
    consultationFee,
    status,
    paymentStatus,
    createdAt,
  } = appointment;

  const bookedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  const getStatusInfo = () => {
    switch (status?.toLowerCase()) {
      case "completed":
        return {
          text: "Completed",
          icon: <FaCheckCircle />,
          className:
            "bg-green-50 text-green-600 border-green-200 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-400",
        };

      case "cancelled":
        return {
          text: "Cancelled",
          icon: <FaTimesCircle />,
          className:
            "bg-red-50 text-red-600 border-red-200 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400",
        };

      default:
        return {
          text: "Pending",
          icon: <FaHourglassHalf />,
          className:
            "bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-500/10 dark:border-yellow-500/20 dark:text-yellow-400",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      {/* Top Bar */}

      <div className="flex flex-col gap-3 border-b border-gray-100 bg-gray-50/80 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/30 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
            <FaCalendarAlt />
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Appointment booked
            </p>

            <p className="font-medium text-gray-700 dark:text-slate-300">
              {bookedDate}
            </p>
          </div>
        </div>

        <span
          className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold ${statusInfo.className}`}
        >
          {statusInfo.icon}
          {statusInfo.text}
        </span>
      </div>

      <div className="p-5 sm:p-6">
        {/* Doctor */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-cyan-100 bg-cyan-50 shadow-sm dark:border-cyan-500/20">
            {doctorImage ? (
              <Image
                src={doctorImage}
                alt={doctorName || "Doctor"}
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-cyan-600">
                <FaUserMd size={30} />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-cyan-600">
              Your Doctor
            </p>

            <h2 className="mt-1 truncate text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
              Dr. {doctorName}
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              {specialization}
            </p>
          </div>
        </div>

        {/* Details */}

        <div className="mt-6 grid gap-3 border-t border-gray-100 pt-5 dark:border-slate-800 sm:grid-cols-3">
          {/* Fee */}

          <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 dark:bg-slate-800/60">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
              <FaMoneyBillWave />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Consultation Fee
              </p>

              <p className="mt-1 text-sm font-bold text-gray-800 dark:text-white">
                ৳ {consultationFee}
              </p>
            </div>
          </div>

          {/* Payment */}

          <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 dark:bg-slate-800/60">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
              <FaCreditCard />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Payment Status
              </p>

              <p
                className={`mt-1 text-sm font-bold capitalize ${
                  paymentStatus?.toLowerCase() === "paid"
                    ? "text-green-600"
                    : "text-orange-500"
                }`}
              >
                {paymentStatus || "Pending"}
              </p>
            </div>
          </div>

          {/* Appointment Status */}

          <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4 dark:bg-slate-800/60">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
              <FaUserMd />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Appointment Status
              </p>

              <p className="mt-1 text-sm font-bold capitalize text-gray-800 dark:text-white">
                {status || "Pending"}
              </p>
            </div>
          </div>
        </div>

        {/* Completed Review Section */}

        {status?.toLowerCase() === "completed" && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:border-yellow-500/20 dark:from-yellow-500/10 dark:via-slate-900 dark:to-orange-500/5">
            <div className="p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-500 dark:bg-yellow-500/10">
                    <FaStar className="text-xl" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Share Your Experience
                    </h3>

                    <p className="mt-1 max-w-lg text-sm leading-6 text-gray-500 dark:text-slate-400">
                      Your appointment with Dr. {doctorName} has been
                      completed. Tell other patients about your experience.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onReview?.(appointment)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-cyan-700 hover:shadow-md active:scale-[0.98] sm:w-auto"
                >
                  <FaStar />
                  Write Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default AppointmentCard;