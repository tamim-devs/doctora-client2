import Link from "next/link";
import { FaCalendarAlt, FaUserMd } from "react-icons/fa";

const EmptyAppointment = () => {
  return (
    <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="max-w-md">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
          <FaCalendarAlt className="text-3xl" />
        </div>

        <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
          No Appointments Yet
        </h2>

        <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-slate-400">
          You haven&apos;t booked any appointments yet. Find a qualified
          doctor and schedule your consultation today.
        </p>

        <Link
          href="/find-doctors"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-cyan-700 hover:shadow-lg"
        >
          <FaUserMd />
          Find Doctors
        </Link>
      </div>
    </div>
  );
};

export default EmptyAppointment;