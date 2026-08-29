import {
  FaHeartbeat,
  FaBrain,
  FaBone,
  FaBaby,
  FaAllergies,
  FaEye,
  FaTooth,
  FaLungs,
} from "react-icons/fa";

const specializations = [
  {
    id: 1,
    name: "Cardiology",
    icon: <FaHeartbeat className="text-4xl text-red-500" />,
    description: "Heart and cardiovascular disease specialists.",
  },
  {
    id: 2,
    name: "Neurology",
    icon: <FaBrain className="text-4xl text-violet-500" />,
    description: "Brain, nerves and nervous system treatment.",
  },
  {
    id: 3,
    name: "Orthopedics",
    icon: <FaBone className="text-4xl text-orange-500" />,
    description: "Bone, joint and muscle care experts.",
  },
  {
    id: 4,
    name: "Pediatrics",
    icon: <FaBaby className="text-4xl text-pink-500" />,
    description: "Healthcare services for infants and children.",
  },
  {
    id: 5,
    name: "Dermatology",
    icon: <FaAllergies className="text-4xl text-green-500" />,
    description: "Skin, hair and nail treatment specialists.",
  },
  {
    id: 6,
    name: "Ophthalmology",
    icon: <FaEye className="text-4xl text-sky-500" />,
    description: "Eye care and vision treatment experts.",
  },
  {
    id: 7,
    name: "Dentistry",
    icon: <FaTooth className="text-4xl text-cyan-500" />,
    description: "Dental care and oral health specialists.",
  },
  {
    id: 8,
    name: "Pulmonology",
    icon: <FaLungs className="text-4xl text-indigo-500" />,
    description: "Lung and respiratory disease specialists.",
  },
];

const Specializations = () => {
  return (
    <section className="bg-slate-50 py-20 dark:bg-black">
      <div className="container mx-auto px-5">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Medical Departments
          </span>

          <h2 className="mt-5 dark:text-white text-4xl font-bold text-gray-800">
            Medical Specializations
          </h2>

          <p className="mt-4 dark:text-white text-gray-500">
            Connect with experienced doctors from a wide range of medical
            specialties for quality healthcare services.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {specializations.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-xl"
            >
              <div className="mb-5 flex justify-center">
                <div className="rounded-full bg-cyan-50 p-5 transition group-hover:bg-cyan-100">
                  {item.icon}
                </div>
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-800">
                {item.name}
              </h3>

              <p className="text-sm leading-6 text-gray-500">
                {item.description}
              </p>

             
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specializations;