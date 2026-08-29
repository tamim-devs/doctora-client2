import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 sm:p-6 lg:rounded-3xl lg:p-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
        Contact Information
      </h2>

      <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-slate-300 sm:mt-4 sm:text-base">
        Feel free to contact us through any of the following methods.
      </p>

      <div className="mt-8 space-y-6 sm:mt-10 sm:space-y-8">
        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-lg text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-300 sm:h-14 sm:w-14 sm:text-xl">
            <FaPhoneAlt />
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
              Phone
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-slate-300 sm:text-base">
              +880 1234-567890
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-lg text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-300 sm:h-14 sm:w-14 sm:text-xl">
            <FaEnvelope />
          </div>

          <div className="min-w-0">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
              Email
            </h3>
            <p className="mt-1 break-all text-sm text-gray-600 dark:text-slate-300 sm:text-base">
              support@mediconnect.com
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-lg text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-300 sm:h-14 sm:w-14 sm:text-xl">
            <FaMapMarkerAlt />
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
              Address
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-slate-300 sm:text-base">
              Dhaka, Bangladesh
            </p>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-lg text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-300 sm:h-14 sm:w-14 sm:text-xl">
            <FaClock />
          </div>

          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
              Working Hours
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-slate-300 sm:text-base">
              Sat - Thu : 9:00 AM - 8:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;