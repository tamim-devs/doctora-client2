"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaSave,
  FaUserEdit,
  FaCamera,
} from "react-icons/fa";

import toast from "react-hot-toast";
import { imageUpload } from "@/utils/imgUpload";
import { verifiedPatients } from "@/lib/api/patient";
import { authClient } from "@/lib/auth-client";

const PatientForm = () => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
    const { data: session } = authClient.useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }

          return prev + 10;
        });
      }, 200);

      
      const imageFile = data.image[0];

     
      const imageUrl = await imageUpload(imageFile);

      clearInterval(interval);
      setUploadProgress(100);

      
      const patientData = {
        ...data,
        image: imageUrl,
        email: session?.user?.email,
      };

      console.log("Patient Data:", patientData);

      
      await verifiedPatients(patientData)
      toast.success("Patient information saved successfully!");
     

    } catch (error) {
      console.error(error);

      toast.error(
        error.message || "Failed to save patient information"
      );
    } finally {
      setTimeout(() => {
        setLoading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">

      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 dark:bg-cyan-950">
          <FaUserEdit className="text-xl text-cyan-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Patient Information
          </h2>

          <p className="text-sm text-gray-500 dark:text-slate-400">
            Complete your personal information
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-5 md:grid-cols-2"
      >

        {/* Profile Image */}
        <div className="md:col-span-2">
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-slate-200">
            <FaCamera />
            Profile Image
          </label>

          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            {...register("image", {
              required: "Profile image is required",
            })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />

          {errors.image && (
            <p className="mt-1 text-sm text-red-500">
              {errors.image.message}
            </p>
          )}

          <p className="mt-2 text-xs text-gray-400">
            JPG, JPEG, PNG or WEBP
          </p>
        </div>

        {/* Phone Number */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200">
            Phone Number
          </label>

          <input
            type="tel"
            placeholder="01XXXXXXXXX"
            {...register("phone", {
              required: "Phone number is required",
            })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />

          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200">
            Date of Birth
          </label>

          <input
            type="date"
            {...register("dateOfBirth", {
              required: "Date of birth is required",
            })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />

          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-500">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200">
            Gender
          </label>

          <select
            {...register("gender", {
              required: "Gender is required",
            })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {errors.gender && (
            <p className="mt-1 text-sm text-red-500">
              {errors.gender.message}
            </p>
          )}
        </div>

        {/* Blood Group */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200">
            Blood Group
          </label>

          <select
            {...register("bloodGroup", {
              required: "Blood group is required",
            })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          {errors.bloodGroup && (
            <p className="mt-1 text-sm text-red-500">
              {errors.bloodGroup.message}
            </p>
          )}
        </div>

        {/* Emergency Contact */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200">
            Emergency Contact Name
          </label>

          <input
            type="text"
            placeholder="Emergency contact name"
            {...register("emergencyContact", {
              required: "Emergency contact is required",
            })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />

          {errors.emergencyContact && (
            <p className="mt-1 text-sm text-red-500">
              {errors.emergencyContact.message}
            </p>
          )}
        </div>

        {/* Emergency Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200">
            Emergency Phone Number
          </label>

          <input
            type="tel"
            placeholder="01XXXXXXXXX"
            {...register("emergencyPhone", {
              required: "Emergency phone is required",
            })}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />

          {errors.emergencyPhone && (
            <p className="mt-1 text-sm text-red-500">
              {errors.emergencyPhone.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-slate-200">
            Address
          </label>

          <textarea
            rows={4}
            placeholder="Enter your full address"
            {...register("address", {
              required: "Address is required",
            })}
            className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />

          {errors.address && (
            <p className="mt-1 text-sm text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            <FaSave />

            {loading
              ? `Uploading... ${uploadProgress}%`
              : "Save Information"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default PatientForm;