"use client";

const ContactForm = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 sm:p-6 lg:rounded-3xl lg:p-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
        Send Message
      </h2>

      <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-slate-300 sm:text-base">
        Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <form className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
        {/* Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300 sm:text-base">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:ring-cyan-900 sm:text-base"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300 sm:text-base">
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:ring-cyan-900 sm:text-base"
          />
        </div>

        {/* Subject */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300 sm:text-base">
            Subject
          </label>

          <input
            type="text"
            placeholder="Enter subject"
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:ring-cyan-900 sm:text-base"
          />
        </div>

        {/* Message */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300 sm:text-base">
            Message
          </label>

          <textarea
            rows={6}
            placeholder="Write your message..."
            className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400 dark:focus:ring-cyan-900 sm:text-base"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-cyan-700 hover:shadow-lg sm:py-3.5 sm:text-base"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;