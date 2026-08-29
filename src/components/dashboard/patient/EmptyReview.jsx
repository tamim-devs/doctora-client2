"use client";

import Link from "next/link";
import { FaStar, FaPlus } from "react-icons/fa";

const EmptyReview = ({ onAdd }) => {
  return (
    <div className="flex min-h-[350px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="max-w-md">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-500 dark:bg-yellow-500/10 dark:text-yellow-400">
          <FaStar className="text-2xl" />
        </div>

        {/* Title */}
        <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
          No Reviews Yet
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-slate-400">
          You haven't written any reviews yet. Share your experience after
          visiting a doctor.
        </p>

       
      </div>
    </div>
  );
};

export default EmptyReview;