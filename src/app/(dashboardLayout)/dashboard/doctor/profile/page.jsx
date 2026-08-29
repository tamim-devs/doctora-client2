import CompleteDoctorProfile from "@/components/doctors/CompleteDoctorProfile";
import DoctorProfile from "@/components/doctors/DoctorProfile";

export default function DoctorProfilePage({ doctor }) {
  if (!doctor?.profileCompleted) {
    return <CompleteDoctorProfile />;
  }

  return <DoctorProfile doctor={doctor} />;
}