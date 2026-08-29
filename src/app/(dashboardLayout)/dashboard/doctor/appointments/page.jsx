"use client";

import { useEffect, useState } from "react";
import DoctorAppointmentCard from "@/components/dashboard/doctor/DoctorAppointmentCard";
import { GetDoctorAppointments } from "@/lib/api/doctor";
import EmptyDoctorAppointment from "@/components/dashboard/doctor/EmptyDoctorAppointment ";
import { updateDoctorAppointmentStatus } from "@/lib/appoinment";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    try {
      setLoading(true);

      const data = await GetDoctorAppointments();

      setAppointments(data?.data || data || []);
    } catch (error) {
      console.error("GetDoctorAppointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleStatusChange = async (id, status) => {
  try {
    const result = await updateDoctorAppointmentStatus(id, status);

    console.log("STATUS UPDATE RESULT:", result);

    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment._id === id
          ? {
              ...appointment,
              status: status,
            }
          : appointment
      )
    );
  } catch (error) {
    console.error("Status update error:", error);
    alert(error.message);
  }
};

  const handleComplete = (id) => {
    handleStatusChange(id, "completed");
  };

  const handleCancel = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this appointment?"
    );

    if (!confirmed) return;

    handleStatusChange(id, "cancelled");
  };

  const handleView = (appointment) => {
    alert(
      `Patient: ${appointment.patientName}\nDate: ${appointment.date}\nTime: ${appointment.time}`
    );
  };

  if (loading) {
    return (
      <section className="p-4 sm:p-6 lg:p-8">
        <p className="text-gray-500">Loading appointments...</p>
      </section>
    );
  }

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          My Appointments
        </h1>

        <p className="mt-2 text-gray-500 dark:text-slate-400">
          View and manage your patient appointments.
        </p>
      </div>

      {appointments.length > 0 ? (
        <div className="space-y-5">
          {appointments.map((appointment) => (
            <DoctorAppointmentCard
              key={appointment._id}
              appointment={appointment}
              onView={handleView}
              onComplete={handleComplete}
              onCancel={handleCancel}
            />
          ))}
        </div>
      ) : (
        <EmptyDoctorAppointment />
      )}
    </section>
  );
};

export default DoctorAppointments;