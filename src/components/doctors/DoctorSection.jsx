import DoctorCard from "@/components/doctors/DoctorCard";
import SectionHeading from "@/components/SectionHeading";
import { GetFeaturedDoctors } from "@/lib/api/doctor";

const DoctorSection = async () => {
  const doctors = await GetFeaturedDoctors();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 dark:bg-black sm:px-6 lg:px-8 lg:py-16">
      <SectionHeading
        badge="Our Doctors"
        title="Meet Our Featured Doctors"
        subtitle="Access primary, pediatric, neural, and dermatological healthcare resources with validated physician consultants."
      />

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor._id}
            doctor={doctor}
          />
        ))}
      </div>
    </section>
  );
};

export default DoctorSection;