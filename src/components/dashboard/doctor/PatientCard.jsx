import Image from "next/image";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";

const PatientCard = ({ patient }) => {
  const {
    name,
    email,
    phone,
    image,
    age,
    gender,
    totalAppointments,
    lastAppointment,
  } = patient;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6">
   
      <div className="flex items-center gap-4">
        {image ? (
          <Image
            src={image}
            alt={name}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400">
            <FaUser size={22} />
          </div>
        )}

        <div className="min-w-0">
          <h2 className="truncate font-bold text-gray-900 dark:text-white">
            {name}
          </h2>

          <p className="text-sm text-gray-500 dark:text-slate-400">
            {age} years • {gender}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="mt-5 space-y-3 border-t border-gray-100 pt-5 dark:border-slate-800">
        <div className="flex items-center gap-3 text-sm">
          <FaEnvelope className="text-cyan-600" />

          <span className="truncate text-gray-600 dark:text-slate-300">
            {email}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <FaPhone className="text-cyan-600" />

          <span className="text-gray-600 dark:text-slate-300">
            {phone}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <FaCalendarAlt className="text-cyan-600" />

          <span className="text-gray-600 dark:text-slate-300">
            Last Appointment: {lastAppointment}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5 dark:border-slate-800">
        <span className="text-sm text-gray-500 dark:text-slate-400">
          Total Appointments
        </span>

        <span className="font-bold text-cyan-600">
          {totalAppointments}
        </span>
      </div>
    </div>
  );
};

export default PatientCard;