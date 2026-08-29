import SectionHeading from "@/components/SectionHeading";
import {
  FaUserMd,
  FaCalendarCheck,
  FaHeartbeat,
  FaShieldAlt,
  FaClock,
  FaHospital,
} from "react-icons/fa";

const benefits = [
  {
    id: 1,
    icon: <FaUserMd />,
    title: "Experienced Doctors",
    description:
      "Consult with qualified and experienced healthcare professionals from different medical specialties.",
  },
  {
    id: 2,
    icon: <FaCalendarCheck />,
    title: "Easy Appointment Booking",
    description:
      "Book appointments online anytime without waiting in long queues.",
  },
  {
    id: 3,
    icon: <FaHeartbeat />,
    title: "Quality Healthcare",
    description:
      "Receive trusted medical care focused on your health, safety, and well-being.",
  },
  {
    id: 4,
    icon: <FaShieldAlt />,
    title: "Secure Medical Records",
    description:
      "Your personal information and medical history are safely protected.",
  },
  {
    id: 5,
    icon: <FaClock />,
    title: "24/7 Support",
    description:
      "Our support team is always ready to help you whenever you need assistance.",
  },
  {
    id: 6,
    icon: <FaHospital />,
    title: "Trusted Healthcare Platform",
    description:
      "Connecting patients with verified doctors through a reliable digital healthcare system.",
  },
];

const Chose = () => {
  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-5">
        <SectionHeading
          title="Why Choose MediCare Connect"
          subtitle="We provide a trusted healthcare platform that makes finding doctors and booking appointments simple, secure, and convenient."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500 hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-3xl text-cyan-600 transition group-hover:bg-cyan-600 group-hover:text-white">
                {item.icon}
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-800">
                {item.title}
              </h3>

              <p className="leading-7 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Chose;