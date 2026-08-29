import PatientCard from "@/components/patient/PatientCard";
import PatientForm from "@/components/patient/PatientForm";

const PatientProfilePage = () => {
  return (
    <section className="min-h-screen bg-gray-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        
        {/* Patient Profile Card */}
        <PatientCard />

        {/* Patient Information Form */}
        <PatientForm />

      </div>
    </section>
  );
};

export default PatientProfilePage;