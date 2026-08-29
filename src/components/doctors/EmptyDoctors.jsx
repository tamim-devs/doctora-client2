import { FaUserMd } from "react-icons/fa";

const EmptyDoctors = () => {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center dark:border-slate-700 dark:bg-slate-900">
      <FaUserMd className="mx-auto text-5xl text-gray-300 dark:text-slate-700" />

      <h2 className="mt-5 text-lg font-bold text-gray-800 dark:text-white">
        No Doctors Found
      </h2>

      <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
        Try changing your search or specialization filter.
      </p>
    </div>
  );
};

export default EmptyDoctors;