"use client";

import { FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { 
doctorName,
    specialization,
    rating,
    comment,
    createdAt,
  } = review;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      {/* Doctor Info */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {doctorName || "Unknown Doctor"}
          </h2>

          <p className="text-sm text-cyan-600">
            {specialization || "Doctor"}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={
                star <= Number(rating)
                  ? "text-yellow-400"
                  : "text-gray-300 dark:text-slate-700"
              }
            />
          ))}
        </div>
      </div>

      {/* Review */}
      <div className="mt-5 rounded-xl bg-gray-50 p-4 dark:bg-slate-800/70">
        <p className="text-sm leading-7 text-gray-600 dark:text-slate-300">
          "{comment || "No review comment"}"
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5 border-t border-gray-100 pt-4 dark:border-slate-800">
        <p className="text-xs text-gray-400">
          {createdAt
            ? new Date(createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })
            : "Date not available"}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;