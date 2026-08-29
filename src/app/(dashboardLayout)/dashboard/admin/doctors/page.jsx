import ManageDoctors from "@/components/admin/ManageDoctors";
import { GetAllDoctors } from "@/lib/api/doctor";

export default async function AdminDoctorsPage() {
  const doctors = await GetAllDoctors();

  return <ManageDoctors doctors={doctors} />;
}