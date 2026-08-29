"use client";

import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

const EditProfile = ({ doctor, onClose }) => {
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: doctor,
  });

  const onSubmit = (data) => {
    console.log(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900 sm:p-8">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
              Edit Profile
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              Update your professional information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500 dark:bg-slate-800"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-5 md:grid-cols-2"
        >
          {/* Specialization */}
          <div>
            <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
              Specialization
            </label>

            <select
              {...register("specialization")}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="">Select</option>
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Dermatology</option>
              <option>Orthopedics</option>
              <option>Pediatrics</option>
            </select>
          </div>

     
          <div>
            <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
              Experience (Years)
            </label>

            <input
              type="number"
              {...register("experience")}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
              Qualification
            </label>

            <input
              type="text"
              {...register("qualification")}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
              Hospital
            </label>

            <input
              type="text"
              {...register("hospital")}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

    
          <div>
            <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
              Consultation Fee
            </label>

            <input
              type="number"
              {...register("consultationFee")}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          {/* Available Time */}
          <div>
            <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
              Available Time
            </label>

            <input
              type="text"
              {...register("availableTime")}
              placeholder="5 PM - 9 PM"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          {/* License Number */}
          <div>
            <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
              License Number
            </label>

            <input
              type="text"
              {...register("licenseNumber")}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          {/* About */}
          <div className="md:col-span-2">
            <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
              About Me
            </label>

            <textarea
              rows={4}
              {...register("about")}
              className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-5 py-3 font-medium text-gray-600 hover:bg-gray-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
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

export default EditProfile;