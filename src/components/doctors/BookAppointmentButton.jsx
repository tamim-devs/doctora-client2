"use client";

import { FaUserDoctor } from "react-icons/fa6";

const BookAppointmentButton = ({ doctor }) => {
  const handleBooking = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          doctorId: doctor._id,
          doctorName: doctor.name,
          doctorImage: doctor.image,
          specialization: doctor.specialization,
          consultationFee: Number(doctor.consultationFee),
        }),
      });

      const text = await res.text();

      console.log("STATUS:", res.status);
      console.log("URL:", res.url);
      console.log("RESPONSE:", text);

      // যদি response JSON না হয়
      if (!res.headers.get("content-type")?.includes("application/json")) {
        throw new Error(
          `Server returned HTML instead of JSON. Status: ${res.status}`
        );
      }

      const data = JSON.parse(text);

      if (!res.ok) {
        throw new Error(data.error || "Payment failed");
      }

      window.location.href = data.url;

    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <button
      onClick={handleBooking}
      className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-4 font-semibold text-white transition hover:bg-cyan-700"
    >
      <FaUserDoctor />
      Book Appointment
    </button>
  );
};

export default BookAppointmentButton;