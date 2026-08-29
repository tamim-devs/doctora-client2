"use client";

import { useEffect, useState } from "react";
import AppointmentCard from "@/components/dashboard/patient/AppointmentCard";
import EmptyAppointment from "@/components/dashboard/patient/EmptyAppointment";
import WriteReview from "@/components/dashboard/patient/WriteReview";
import { getPatientAppointments } from "@/lib/appoinment";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const result = await getPatientAppointments();

        console.log("Appointments API:", result);

        setAppointments(result.data || []);
      } catch (error) {
        console.error("Get appointments error:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  const handleReview = (appointment) => {
    setSelectedAppointment(appointment);
    setIsReviewOpen(true);
  };

  const handleCloseReview = () => {
    setSelectedAppointment(null);
    setIsReviewOpen(false);
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold text-cyan-600">
            Patient Dashboard
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            My Appointments
          </h1>

          <p className="mt-2 text-gray-500 dark:text-slate-400">
            Loading your appointments...
          </p>
        </div>

        <div className="flex items-center justify-center py-20">
          <span className="loading loading-spinner loading-lg text-cyan-600"></span>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-cyan-600">
          Patient Dashboard
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          My Appointments
        </h1>

        <p className="mt-2 text-gray-500 dark:text-slate-400">
          View all your booked appointments and their current status.
        </p>
      </div>

      {/* Summary */}
      {appointments.length > 0 && (
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {/* Total */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-500/10 dark:bg-blue-500/5">
            <p className="text-sm text-blue-600">
              Total Appointments
            </p>

            <h3 className="mt-2 text-3xl font-bold text-blue-700 dark:text-blue-400">
              {appointments.length}
            </h3>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-5 dark:border-yellow-500/10 dark:bg-yellow-500/5">
            <p className="text-sm text-yellow-600">
              Pending
            </p>

            <h3 className="mt-2 text-3xl font-bold text-yellow-700 dark:text-yellow-400">
              {
                appointments.filter(
                  (appointment) =>
                    appointment.status?.toLowerCase() === "pending"
                ).length
              }
            </h3>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border border-green-100 bg-green-50 p-5 dark:border-green-500/10 dark:bg-green-500/5">
            <p className="text-sm text-green-600">
              Completed
            </p>

            <h3 className="mt-2 text-3xl font-bold text-green-700 dark:text-green-400">
              {
                appointments.filter(
                  (appointment) =>
                    appointment.status?.toLowerCase() === "completed"
                ).length
              }
            </h3>
          </div>
        </div>
      )}

      {/* Appointment List */}
      {appointments.length > 0 ? (
        <div className="space-y-5">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onReview={handleReview}
            />
          ))}
        </div>
      ) : (
        <EmptyAppointment />
      )}

      {/* Write Review Modal */}
      <WriteReview
        appointment={selectedAppointment}
        isOpen={isReviewOpen}
        onClose={handleCloseReview}
      />
    </section>
  );
};

export default Appointments;