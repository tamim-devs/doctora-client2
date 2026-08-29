import Image from "next/image";
import {
  FaUserMd,
  FaHospital,
  FaHeartbeat,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaUserMd />,
    title: "Expert Doctors",
    desc: "Connect with experienced and certified medical professionals.",
  },
  {
    icon: <FaHospital />,
    title: "Modern Healthcare",
    desc: "Access advanced healthcare services from anywhere.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Patient First",
    desc: "Providing personalized and patient-focused care.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Platform",
    desc: "Your medical information stays private and protected.",
  },
];

const AboutPage = () => {
  return (
    <main className="bg-white transition-colors duration-300 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cyan-50 via-white to-blue-50 py-14 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-cyan-100 px-4 py-2 text-xs font-semibold text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300 sm:text-sm">
            About MediConnect
          </span>

          <h1 className="mt-5 text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Your Trusted Healthcare Partner
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600 dark:text-slate-300 sm:max-w-2xl sm:text-base md:max-w-3xl md:text-lg">
            We connect patients with experienced doctors, making healthcare
            easier, faster, and more accessible. Our mission is to provide
            quality medical services through a secure and user-friendly
            platform.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="container mx-auto grid grid-cols-1 gap-10 px-4 py-14 sm:px-6 sm:py-16 md:gap-12 md:py-20 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="relative h-72 overflow-hidden rounded-2xl shadow-xl sm:h-96 lg:h-[500px] lg:rounded-3xl">
          <Image
            src="/doctor3.png"
            alt="Healthcare"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
            Who We Are
          </h2>

          <p className="mt-5 text-sm leading-7 text-gray-600 dark:text-slate-300 sm:text-base sm:leading-8">
            MediConnect is an online healthcare platform designed to simplify
            medical appointments and connect patients with qualified doctors.
            Whether you need a specialist consultation or routine healthcare,
            our platform ensures a smooth experience from booking to treatment.
          </p>

          <p className="mt-5 text-sm leading-7 text-gray-600 dark:text-slate-300 sm:text-base sm:leading-8">
            Our goal is to make healthcare more accessible by combining modern
            technology with trusted medical professionals.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 py-14 transition-colors duration-300 dark:bg-slate-900 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl lg:text-4xl">
              Why Choose Us
            </h2>

            <p className="mt-4 text-sm text-gray-600 dark:text-slate-300 sm:text-base">
              We are committed to delivering reliable healthcare services.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800 lg:p-8"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 text-2xl text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-300 sm:h-16 sm:w-16 sm:text-3xl">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-slate-300 sm:text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="rounded-2xl bg-cyan-600 px-6 py-10 text-center text-white sm:px-8 sm:py-14 lg:rounded-3xl lg:px-12 lg:py-16">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            Our Mission
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-cyan-100 sm:text-base sm:leading-8">
            Our mission is to bridge the gap between patients and healthcare
            professionals by providing a reliable, secure, and easy-to-use
            digital healthcare platform. We strive to improve lives through
            accessible medical services and innovative technology.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;