import { FaUsers } from "react-icons/fa";

const EmptyPatients = () => {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
        <FaUsers className="text-2xl" />
      </div>

      <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
        No Patients Found
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-slate-400">
        Patients who have booked appointments with you will appear here.
      </p>
    </div>
  );
};

export default EmptyPatients;