import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300">
      <div className="container mx-auto px-5 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & About */}
          <div>
            <h2 className="text-3xl font-bold text-cyan-400">
              DOCTORA
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              MediCare Connect helps patients find trusted doctors,
              book appointments, and receive quality healthcare
              services anytime, anywhere.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-cyan-600 hover:text-white"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-cyan-600 hover:text-white"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-cyan-600 hover:text-white"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-800 p-3 transition hover:bg-cyan-600 hover:text-white"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xl font-semibold text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <Link href="/" className="hover:text-cyan-400 transition">
                Home
              </Link>

              <Link
                href="/find-doctors"
                className="hover:text-cyan-400 transition"
              >
                Find Doctors
              </Link>

              <Link
                href="/about"
                className="hover:text-cyan-400 transition"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="hover:text-cyan-400 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-xl font-semibold text-white">
              Services
            </h3>

            <div className="flex flex-col gap-3">
              <p>Doctor Appointment</p>
              <p>Online Consultation</p>
              <p>Medical Records</p>
              <p>Healthcare Support</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xl font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-cyan-400" />
                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-cyan-400" />
                <span>+880 1234-567890</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-cyan-400" />
                <span>support@doctora.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-slate-700 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <p>
              © {new Date().getFullYear()} DOCTORA. All Rights Reserved.
            </p>

            <div className="flex gap-6">
              <Link
                href="/privacy-policy"
                className="hover:text-cyan-400 transition"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="hover:text-cyan-400 transition"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;