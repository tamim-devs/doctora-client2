"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CreateAppointment } from "@/lib/appoinment";

const AppointmentSuccessClient = ({ appointmentData }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const createAppointment = async () => {
      try {
        await CreateAppointment(appointmentData);
      } catch (error) {
        console.error("Appointment error:", error);
        setError(error.message || "Failed to create appointment");
      } finally {
        setLoading(false);
      }
    };

    createAppointment();
  }, [appointmentData]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Creating your appointment...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-red-500">
          Something went wrong
        </h1>

        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-slate-900">
        <h1 className="text-3xl font-bold text-green-500">
          Payment Successful!
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Your appointment with Dr.{" "}
          {appointmentData.doctorName} has been created successfully.
        </p>

        <p className="mt-3 font-semibold">
          Paid: ${appointmentData.consultationFee}
        </p>

        <Link
          href="/dashboard/patient/appointments"
          className="mt-6 inline-block rounded-xl bg-cyan-600 px-6 py-3 text-white"
        >
          View My Appointments
        </Link>
      </div>
    </div>
  );
};

export default AppointmentSuccessClient;