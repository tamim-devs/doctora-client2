"use client";

import { useEffect, useState } from "react";
import EmptyPatients from "@/components/dashboard/doctor/EmptyPatients";
import PatientCard from "@/components/dashboard/doctor/PatientCard";
import { GetDoctorAppointments } from "@/lib/appoinment";

const DoctorPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        setLoading(true);

        const result = await GetDoctorAppointments();

        console.log("DOCTOR APPOINTMENTS:", result);

        const appointments = Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result)
            ? result
            : [];

        const completedAppointments = appointments.filter(
          (appointment) =>
            appointment.status?.toLowerCase() === "completed"
        );

        const patientsMap = {};

        completedAppointments.forEach((appointment) => {
          const patientId = appointment.patientId;

          if (!patientId) return;

          if (!patientsMap[patientId]) {
            patientsMap[patientId] = {
              _id: patientId,
              name: appointment.patientName || "Unknown Patient",
              email: appointment.patientEmail || "",
              phone: appointment.patientPhone || "",
              image: appointment.patientImage || "",
              age: appointment.patientAge || "",
              gender: appointment.patientGender || "",
              totalAppointments: 0,
              lastAppointment: appointment.createdAt,
            };
          }

          patientsMap[patientId].totalAppointments += 1;

          const currentLastAppointment =
            new Date(patientsMap[patientId].lastAppointment);

          const appointmentDate = new Date(
            appointment.createdAt
          );

          if (appointmentDate > currentLastAppointment) {
            patientsMap[patientId].lastAppointment =
              appointment.createdAt;
          }
        });

        setPatients(Object.values(patientsMap));
      } catch (error) {
        console.error("Failed to load patients:", error);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  if (loading) {
    return (
      <section className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          My Patients
        </h1>

        <p className="mt-4 text-gray-500 dark:text-slate-400">
          Loading patients...
        </p>
      </section>
    );
  }

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
          My Patients
        </h1>

        <p className="mt-2 text-gray-500 dark:text-slate-400">
          View patients whose appointments have been completed.
        </p>
      </div>

      {patients.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {patients.map((patient) => (
            <PatientCard
              key={patient._id}
              patient={patient}
            />
          ))}
        </div>
      ) : (
        <EmptyPatients />
      )}
    </section>
  );
};

export default DoctorPatients;