import BookAppointmentButton from "@/components/doctors/BookAppointmentButton";
import { GetDoctorById } from "@/lib/api/doctor";
import {
  FaBriefcaseMedical,
  FaCalendarDays,
  FaClock,
  FaHospital,
  FaMoneyBillWave,
  FaUserDoctor,
} from "react-icons/fa6";

const DoctorDetailsPage = async ({ params }) => {
  const { id } = await params;

  const doctor = await GetDoctorById(id);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Doctor Header */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid lg:grid-cols-[320px_1fr]">
            
            {/* Image */}
            <div className="bg-cyan-50 p-8 dark:bg-cyan-500/10">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="mx-auto h-64 w-64 rounded-2xl object-cover shadow-lg"
              />
            </div>

            {/* Doctor Information */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                    {doctor.specialization || "Specialist Doctor"}
                  </p>

                  <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                    Dr. {doctor.name}
                  </h1>

                  <p className="mt-3 text-gray-600 dark:text-slate-400">
                    {doctor.qualification || "Qualification not provided"}
                  </p>
                </div>

                {/* Price */}
                <div className="rounded-2xl bg-cyan-50 px-6 py-4 text-center dark:bg-cyan-500/10">
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    Consultation Fee
                  </p>

                  <div className="mt-1 flex items-center justify-center gap-2 text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                    <FaMoneyBillWave />
                    ৳ {doctor.consultationFee || 0}
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                
                <div className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 dark:border-slate-700">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                    <FaBriefcaseMedical />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      Experience
                    </p>

                    <p className="font-semibold text-gray-900 dark:text-white">
                      {doctor.experience || 0} Years
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 dark:border-slate-700">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                    <FaHospital />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      Hospital
                    </p>

                    <p className="font-semibold text-gray-900 dark:text-white">
                      {doctor.hospital || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 dark:border-slate-700">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                    <FaCalendarDays />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      Available Days
                    </p>

                    <p className="font-semibold text-gray-900 dark:text-white">
                      {doctor.availableDays || "Not available"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 dark:border-slate-700">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
                    <FaClock />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 dark:text-slate-400">
                      Available Time
                    </p>

                    <p className="font-semibold text-gray-900 dark:text-white">
                      {doctor.availableTime || "Not available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Book Button */}
             <BookAppointmentButton doctor={doctor}/>
            </div>
          </div>
        </div>

        {/* About */}
        <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            About Dr. {doctor.name}
          </h2>

          <p className="mt-4 leading-8 text-gray-600 dark:text-slate-400">
            {doctor.about || "No information available about this doctor."}
          </p>
        </section>

        {/* Qualification */}
        <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Qualification
          </h2>

          <p className="mt-4 text-gray-600 dark:text-slate-400">
            {doctor.qualification || "Not provided"}
          </p>
        </section>
      </div>
    </div>
  );
};

export default DoctorDetailsPage;