"use client";

import SectionHeading from "@/components/SectionHeading";
import { platformStats } from "@/utils/data/doctor";


const PlatformStatistics = () => {
  return (
    <section className="py-20 bg-cyan-50 dark:bg-black">
      <div className="container mx-auto px-5">
        <SectionHeading
          title="Platform Statistics"
          subtitle="Trusted by thousands of patients and healthcare professionals across the country."
        />

        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {platformStats.map((stat) => (
            <div
              key={stat.id}
              className="rounded-2xl bg-white p-8 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-4 text-5xl">{stat.icon}</div>

              <h2 className="text-4xl font-bold text-cyan-600">
                {stat.value}
                {stat.suffix}
              </h2>

              <p className="mt-2 text-gray-600 font-medium">
                {stat.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStatistics;