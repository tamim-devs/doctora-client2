"use client";


import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { completeDoctorProfile } from "@/lib/api/doctor";
import { imageUpload } from "@/utils/imgUpload";
import toast from "react-hot-toast";
const CompleteDoctorProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
const [uploadProgress, setUploadProgress] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ==========================================
  // FORM SUBMIT
  // ==========================================

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

    
    const licenseFile = data.licenseDocument[0];

    
    const licenseDocumentUrl = await imageUpload(licenseFile);

    clearInterval(interval);
    setUploadProgress(100);

    // Remove file object and send URL
    const doctorData = {
      ...data,
      licenseDocument: licenseDocumentUrl,
    };

    console.log("Doctor Data:", doctorData);

    const result = await completeDoctorProfile(doctorData);

    console.log(result);

    toast.success("Profile submitted for admin approval!");

    router.refresh();

  } catch (error) {
    console.error(error);
    toast.error(
      error.message || "Failed to submit doctor profile"
    );
  } finally {
    setTimeout(() => {
      setLoading(false);
      setUploadProgress(0);
    }, 1000);
  }
};

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Complete Your Doctor Profile
          </h1>

          <p className="mt-2 text-gray-500 dark:text-slate-400">
            Complete your professional information before submitting your
            profile for admin approval.
          </p>
        </div>

        {/* ==========================================
            FORM CARD
        ========================================== */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-6 md:grid-cols-2"
          >

            {/* ==========================================
                SPECIALIZATION
            ========================================== */}

            <div>
              <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
                Specialization
              </label>

              <select
                {...register("specialization", {
                  required: "Specialization is required",
                })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="">
                  Select Specialization
                </option>

                <option value="Cardiology">
                  Cardiology
                </option>

                <option value="Neurology">
                  Neurology
                </option>

                <option value="Dermatology">
                  Dermatology
                </option>

                <option value="Orthopedics">
                  Orthopedics
                </option>

                <option value="Pediatrics">
                  Pediatrics
                </option>

                <option value="Psychiatry">
                  Psychiatry
                </option>

                <option value="Gynecology">
                  Gynecology
                </option>

                <option value="ENT">
                  ENT
                </option>

                <option value="General Medicine">
                  General Medicine
                </option>
              </select>

              {errors.specialization && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.specialization.message}
                </p>
              )}
            </div>

            {/* ==========================================
                EXPERIENCE
            ========================================== */}

            <div>
              <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
                Experience (Years)
              </label>

              <input
                type="number"
                min="0"
                placeholder="e.g. 5"
                {...register("experience", {
                  required: "Experience is required",
                  min: {
                    value: 0,
                    message: "Experience cannot be negative",
                  },
                })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />

              {errors.experience && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* ==========================================
                QUALIFICATION
            ========================================== */}

            <div>
              <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
                Qualification
              </label>

              <input
                type="text"
                placeholder="MBBS, FCPS"
                {...register("qualification", {
                  required: "Qualification is required",
                })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />

              {errors.qualification && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.qualification.message}
                </p>
              )}
            </div>

            {/* ==========================================
                HOSPITAL
            ========================================== */}

            <div>
              <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
                Hospital / Clinic
              </label>

              <input
                type="text"
                placeholder="Hospital name"
                {...register("hospital", {
                  required: "Hospital is required",
                })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />

              {errors.hospital && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.hospital.message}
                </p>
              )}
            </div>

            {/* ==========================================
                CONSULTATION FEE
            ========================================== */}

            <div>
              <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
                Consultation Fee
              </label>

              <input
                type="number"
                min="0"
                placeholder="e.g. 1000"
                {...register("consultationFee", {
                  required: "Consultation fee is required",
                  min: {
                    value: 0,
                    message: "Fee cannot be negative",
                  },
                })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />

              {errors.consultationFee && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.consultationFee.message}
                </p>
              )}
            </div>

            {/* ==========================================
                AVAILABLE DAYS
            ========================================== */}

            <div>
              <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
                Available Days
              </label>

              <input
                type="text"
                placeholder="Sunday, Tuesday, Thursday"
                {...register("availableDays", {
                  required: "Available days are required",
                })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />

              {errors.availableDays && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.availableDays.message}
                </p>
              )}
            </div>

            {/* ==========================================
                AVAILABLE TIME
            ========================================== */}

            <div>
              <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
                Available Time
              </label>

              <input
                type="text"
                placeholder="5 PM - 9 PM"
                {...register("availableTime", {
                  required: "Available time is required",
                })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />

              {errors.availableTime && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.availableTime.message}
                </p>
              )}
            </div>

            {/* ==========================================
                LICENSE NUMBER
            ========================================== */}

            <div>
              <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
                License Number
              </label>

              <input
                type="text"
                placeholder="BMDC-123456"
                {...register("licenseNumber", {
                  required: "License number is required",
                })}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />

              {errors.licenseNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.licenseNumber.message}
                </p>
              )}
            </div>

            {/* ==========================================
                LICENSE DOCUMENT
            ========================================== */}

            <div>
              <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
                License Document
              </label>

             <input
  type="file"
  accept=".jpg,.jpeg,.png"
  {...register("licenseDocument", {
    required: "License document is required",
  })}
  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
/>

<p className="mt-2 text-xs text-gray-400">
  JPG, JPEG or PNG
</p>

              {errors.licenseDocument && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.licenseDocument.message}
                </p>
              )}

              <p className="mt-2 text-xs text-gray-400">
                PDF, JPG, JPEG or PNG
              </p>
            </div>

            {/* ==========================================
                ABOUT
            ========================================== */}

            <div className="md:col-span-2">
              <label className="mb-2 block font-medium text-gray-700 dark:text-slate-200">
                About Yourself
              </label>

              <textarea
                rows={5}
                placeholder="Tell patients about yourself and your experience..."
                {...register("about", {
                  required: "About section is required",
                  minLength: {
                    value: 20,
                    message: "About section must contain at least 20 characters",
                  },
                })}
                className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />

              {errors.about && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.about.message}
                </p>
              )}
            </div>

            {/* ==========================================
                BUTTONS
            ========================================== */}

            <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row sm:justify-end">

              {/* Cancel */}

              <button
                type="button"
                onClick={() =>
                  router.push("/dashboard/doctor/profile")
                }
                className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              {/* Submit */}

              <button
  type="submit"
  disabled={loading}
  className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70"
>
  {loading
    ? `Uploading... ${uploadProgress}%`
    : "Submit Profile for Approval"}
</button>

            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default CompleteDoctorProfile;