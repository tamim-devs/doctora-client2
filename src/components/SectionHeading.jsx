import React from "react";

const SectionHeading = ({
  badge,
  title,
  subtitle,
  center = true,
}) => {
  return (
    <div
      className={`mb-10 dark:bg-black mt-10 sm:mb-12 sm:mt-12 ${
        center ? "text-center" : "text-left"
      }`}
    >
      {badge && (
        <span className="inline-block rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700 transition-colors duration-300 dark:bg-cyan-900/30 dark:text-cyan-300 sm:px-4 sm:py-1.5 sm:text-sm">
          {badge}
        </span>
      )}

      <h2 className="mt-4 text-2xl font-bold leading-tight text-slate-900 transition-colors duration-300 dark:text-white sm:text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 max-w-xl text-sm leading-6 text-gray-600 transition-colors duration-300 dark:text-slate-300 sm:max-w-2xl sm:text-base sm:leading-7 ${
            center ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}

      <div
        className={`mt-5 flex ${
          center ? "justify-center" : "justify-start"
        }`}
      >
        <div className="h-1 w-16 rounded-full bg-cyan-600 dark:bg-cyan-400 sm:w-20"></div>
      </div>
    </div>
  );
};

export default SectionHeading;