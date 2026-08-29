import Link from "next/link";
import { FaCalendarAlt, FaUserMd } from "react-icons/fa";

const EmptyDoctorAppointment = () => {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
        <FaCalendarAlt className="text-2xl" />
      </div>

      <h2 className="mt-5 text-xl font-bold text-gray-800 dark:text-white">
        No Appointments Found
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-slate-400">
        You don't have any appointments scheduled yet. Your upcoming patient
        appointments will appear here.
      </p>

      <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400">
        <FaUserMd />
        New appointments will appear here
      </div>
    </div>
  );
};

export default EmptyDoctorAppointment;