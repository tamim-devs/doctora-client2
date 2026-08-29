"use client";

import { useEffect, useState } from "react";
import DoctorCard from "@/components/doctors/DoctorCard";
import DoctorFilterPanel from "@/components/doctors/DoctorFilterPanel";
import EmptyDoctors from "@/components/doctors/EmptyDoctors";
import { GetAllDoctors } from "@/lib/api/doctor";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDoctors = async (filters = {}) => {
    try {
      setLoading(true);

      const result = await GetAllDoctors(filters);

      setDoctors(result);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleFilter = (filters) => {
    loadDoctors(filters);
  };

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Find a Doctor
          </h1>

          <p className="mt-2 text-gray-500 dark:text-slate-400">
            Find the right doctor for your healthcare needs.
          </p>
        </div>

        {/* এখানে onFilter pass করতে হবে */}
        <DoctorFilterPanel onFilter={handleFilter} />

        {loading ? (
          <div className="mt-8">
            <p className="text-gray-500 dark:text-slate-400">
              Loading doctors...
            </p>
          </div>
        ) : doctors.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor._id}
                doctor={doctor}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <EmptyDoctors />
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorsPage;