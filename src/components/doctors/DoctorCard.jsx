import Image from "next/image";
import Link from "next/link";
import { FaBriefcaseMedical, FaMoneyBillWave } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const DoctorCard = ({ doctor }) => {
  const {
    _id,
    image,
    name,
    specialization,
    experience,
    consultationFee,
  } = doctor;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      
      {/* Doctor Image */}
      <div className="relative h-56 w-full bg-cyan-50 sm:h-64 md:h-72 dark:bg-slate-800">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="space-y-3 p-4 sm:space-y-4 sm:p-6">

        {/* Name */}
        <div className="flex items-start gap-2">
          <MdVerified className="mt-1 shrink-0 text-lg text-cyan-600" />

          <h2 className="text-lg font-bold text-gray-800 dark:text-white sm:text-xl">
            {name}
          </h2>
        </div>

        {/* Specialization */}
        <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400 sm:text-base">
          {specialization}
        </p>

        {/* Experience */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300 sm:text-base">
          <FaBriefcaseMedical className="shrink-0 text-cyan-600" />

          <span>{experience} Years Experience</span>
        </div>

        {/* Consultation Fee */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300 sm:text-base">
          <FaMoneyBillWave className="shrink-0 text-cyan-600" />

          <span>৳ {consultationFee}</span>
        </div>

        {/* Button */}
        <Link
          href={`/find-doctors/${_id}`}
          className="block w-full rounded-xl bg-cyan-600 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-cyan-700 sm:py-3 sm:text-base"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;