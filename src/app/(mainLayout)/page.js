import Banner from "@/components/banner/Banner";
import Chose from "@/components/chose/Chose";
import DoctorSection from "@/components/doctors/DoctorSection";
import PlatformStatistics from "@/components/PlatformStatistics";
import Review from "@/components/review/Review";
import Specializations from "@/components/specializations/Specializations";

export default function Home() {
  return (
    <>
      <Banner
        title="Book Appointments with Trusted Doctors"
        subtitle="Connect with experienced healthcare professionals, schedule appointments online, and receive quality medical care from the comfort of your home."
        buttonText="Find Doctors"
        buttonLink="/find-doctors"
      />
  <DoctorSection />
      <Specializations />
      <PlatformStatistics />
      <Chose />
      <Review/>
      
      
    </>
  );
}